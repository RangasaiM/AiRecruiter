"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Loader2Icon, Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState, useRef } from "react";
import Vapi from "@vapi-ai/web";

import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null);
  if (!vapiRef.current) {
    const vapiKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY || process.env.NEXT_PUBLIC_VAPI_KEY;
    if (!vapiKey) {
      console.error("VAPI API key is missing!");
    } else {
      console.log("VAPI initialized successfully");
      vapiRef.current = new Vapi(vapiKey);
    }
  }
  const vapi = vapiRef.current;
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState("");
  const { interview_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  useEffect(() => {
    if (interviewInfo && vapi) {
      startCall();
    } else if (interviewInfo && !vapi) {
      toast.error("Voice API is not initialized. Please check your VAPI API key.");
    } else if (!interviewInfo) {
      toast("Please join the interview first.");
      router.replace("/interview/" + interview_id);
    }
  }, [interviewInfo, vapi, interview_id, router]);

  const startCall = () => {
    if (!vapi) {
      toast.error("Voice API is not available");
      return;
    }

    setLoading(true);
    let questionList = "";
    interviewInfo?.interviewData?.questionList.forEach(
      (item, index) => (questionList = item?.question + "," + questionList)
    );
    const assistantOptions = {
      name: "AI Recruiter",

      firstMessage:
        "Hi " +
        interviewInfo?.userName +
        ", how are you? Ready for your interview on " +
        interviewInfo?.interviewData?.jobPosition +
        "?",

      transcriber: {
        provider: "deepgram",

        model: "nova-2",

        language: "en-US",
      },

      voice: {
        provider: "playht",

        voiceId: "jennifer",
      },

      model: {
        provider: "openai",

        model: "gpt-4",

        messages: [
          {
            role: "system",

            content:
              `

  You are an AI voice assistant conducting interviews.

Your job is to ask candidates provided interview questions, assess their responses.

Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:

"Hey there! Welcome to your ` +
              interviewInfo?.interviewData?.jobPosition +
              ` interview. Let’s get started with a few questions!"

Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:

Questions: ` +
              questionList +
              `

If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:

"Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer. Example:

"Nice! That’s a solid answer."

"Hmm, not quite! Want to try again?"

Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"

After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:

"That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:

"Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:

✅ Be friendly, engaging, and witty 🎤

✅ Keep responses short and natural, like a real conversation

✅ Adapt based on the candidate’s confidence level

✅ Ensure the interview remains focused on React

`.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    vapi.stop();
    console.log("Interview stopped");
    GenerateFeedback();
  };

  // Format timer display (HH:MM:SS)
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // vapi.on("message", (message) => {
  //   console.log(message?.conversation);
  //   setConversation(message?.conversation);
  // });

  useEffect(() => {
    const handleMessage = (message) => {
      console.log("Message received:", message);
      if (message?.conversation) {
        const convoString = JSON.stringify(message?.conversation);
        console.log("Conversation string:", convoString);
        setConversation(convoString);
      }
    };

    vapi.on("message", handleMessage);
    vapi.on("call-start", () => {
      console.log("Voice conversation started");
      toast("Interview Connected...");
      setLoading(false);
      // Start timer
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    });

    vapi.on("speech-start", () => {
      console.log("AI started speaking");
      setActiveUser(true);
    });
    vapi.on("speech-end", () => {
      console.log("AI stopped speaking");
      setActiveUser(false);
    });
    vapi.on("call-end", (event) => {
      console.log("Voice conversation ended:", event);
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (event?.reason) {
        toast.error("Interview ended: " + event.reason);
      }
      GenerateFeedback();
    });

    vapi.on("error", (err) => {
      console.error("Vapi error:", err, JSON.stringify(err));
      toast.error("Voice API error: " + (err?.message || JSON.stringify(err) || "Unknown error"));
    });

    // Cleanup the listener
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      vapi.stop();
      if (vapi.destroy) vapi.destroy();
      vapi.off("message", handleMessage);
      vapi.off("call-start", () => console.log("Ended"));
      vapi.off("speech-start", () => console.log("Ended"));
      vapi.off("speech-end", () => console.log("Ended"));
      vapi.off("call-end", () => console.log("Ended"));
      vapi.off("error", () => console.log("Ended"));
    };
  }, []);

  const GenerateFeedback = async () => {
    setLoading(true);
    console.log("conversation", conversation);

    if (!conversation) {
      console.warn("No conversation data available to generate feedback.");
      toast.error("No conversation data available. Redirecting...");
      setTimeout(() => {
        router.replace("/interview/" + interview_id + "/completed");
      }, 2000);
      setLoading(false);
      return;
    }

    try {
      const result = await axios.post("/api/ai-feedback", {
        conversation: conversation,
      });
      console.log('Feedback API Response:', result?.data);

      const Content = result?.data?.content;
      // Remove markdown code blocks and trim
      let FINAL_CONTENT = Content.replace(/```json|```/g, "").trim();
      console.log('Parsed Feedback Content:', FINAL_CONTENT);

      // Parse and validate feedback
      let feedbackData;
      try {
        feedbackData = JSON.parse(FINAL_CONTENT);
      } catch (parseError) {
        console.error('Feedback JSON Parse Error:', parseError);
        throw new Error('Failed to parse feedback response');
      }

      // Save to Database
      const { data, error } = await supabase
        .from("interview-feedback")
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: feedbackData,
            recommended: feedbackData?.feedback?.recommendation === "Yes",
          },
        ])
        .select();

      if (error) {
        console.error('Supabase Error:', error);
        toast.error('Error saving feedback: ' + error.message);
      } else {
        console.log('Feedback saved:', data);
        toast.success('Interview completed successfully!');
      }

      router.replace("/interview/" + interview_id + "/completed");
    } catch (error) {
      console.error('Feedback generation error:', error);
      toast.error('Failed to generate feedback: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          {formatTime(timer)}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src={"/ai.png"}
              alt="ai"
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping" />
            )}
            <h2 className="text-2xl bg-primary text-white p-3 rounded-full px-5">
              {interviewInfo?.userName?.[0] || "U"}
            </h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-center mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />

        {!loading ? (
          <Phone
            className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer"
            onClick={() => {
              stopInterview();
            }}
          />
        ) : (
          <Loader2Icon className="animate-spin" />
        )}

      </div>
      <h2 className="text-sm text-gray-400 text-center mt-5">
        Interview is in Progress...
      </h2>
    </div>
  );
}

export default StartInterview;
