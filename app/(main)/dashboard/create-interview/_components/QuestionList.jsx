"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";

function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const onFinish = async () => {
    setSaveLoading(true);
    try {
      const interview_id = uuidv4();
      
      // Prepare data for database - ensure type is JSON string
      const interviewData = {
        jobPosition: formData.jobPosition,
        jobDescription: formData.jobDescription,
        duration: formData.duration,
        type: JSON.stringify(formData.type), // Convert array to JSON string
        questionList: questionList,
        userEmail: user?.email,
        interview_id: interview_id,
      };
      
      console.log('Saving interview data:', interviewData);
      
      const { data, error } = await supabase
        .from("Interviews")
        .insert([interviewData])
        .select();
      
      if (error) {
        console.error('Supabase Error:', error);
        toast.error(`Error creating interview: ${error.message}`);
        setSaveLoading(false);
        return;
      }
      
      console.log('Interview created successfully:', data);
      setSaveLoading(false);
      onCreateLink(interview_id);
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to create interview');
      setSaveLoading(false);
    }
  };

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });
      
      console.log('API Response:', result.data);
      
      // Check for error response
      if (result.data.error) {
        throw new Error(result.data.error);
      }
      
      const Content = result.data.content;
      // Remove markdown code blocks and trim
      let FINAL_CONTENT = Content.replace(/```json|```/g, "").trim();

      // Handle legacy format: interviewQuestions=...
      if (FINAL_CONTENT.startsWith("interviewQuestions=")) {
        FINAL_CONTENT = FINAL_CONTENT.replace(
          /^interviewQuestions\s*=\s*/,
          ""
        ).trim();
      }

      // Parse the JSON
      let parsed;
      try {
        // If it starts with [, wrap it in an object
        if (FINAL_CONTENT.startsWith("[")) {
          parsed = { interviewQuestions: JSON.parse(FINAL_CONTENT) };
        } else {
          parsed = JSON.parse(FINAL_CONTENT);
        }
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.log('Failed content:', FINAL_CONTENT);
        throw new Error('Failed to parse AI response. Please try again.');
      }

      const questions = parsed.interviewQuestions || [];
      if (questions.length === 0) {
        throw new Error('No questions were generated. Please try again.');
      }
      
      setQuestionList(questions);
      setLoading(false);
    } catch (e) {
      console.error('Question Generation Error:', e);
      toast.error(e.message || "Server Error, Try Again!");
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI is crafting personalized questions
            </p>
          </div>
        </div>
      )}
      {questionList?.length > 0 && (
        <div>
          <QuestionListContainer questionList={questionList} />
        </div>
      )}
      <div className="flex justify-end mt-10">
        <Button onClick={() => onFinish()} disabled={saveLoading || loading}>
          {(saveLoading || loading) && <Loader2 className="animate-spin" />}
          Create Interview Link & Finish
        </Button>
      </div>
    </div>
  );
}

export default QuestionList;
