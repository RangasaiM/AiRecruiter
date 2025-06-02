"use client";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });
      console.log(result.data);
      const Content = result.data.content;
      let FINAL_CONTENT = Content.replace(/```json|```/g, "").trim();

      if (FINAL_CONTENT.startsWith("interviewQuestions=")) {
        FINAL_CONTENT = FINAL_CONTENT.replace(
          /^interviewQuestions\s*=\s*/,
          ""
        ).trim();
      }

      let parsed;
      if (FINAL_CONTENT.startsWith("[")) {
        parsed = { interviewQuestions: JSON.parse(FINAL_CONTENT) };
      } else {
        parsed = JSON.parse(FINAL_CONTENT);
      }

      setQuestionList(parsed.interviewQuestions || []);
      setLoading(false);
    } catch (e) {
      toast("Server Error, Try Again!");
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
        <div className="p-5 border border-gray-300 rounded-xl">
          {questionList.map((item, index) => (
            <div key={index} className="p-3 border border-gray-50 rounded-xl">
              <h2 className="font-medium">{item.question}</h2>
              <h2>Type: {item?.type}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionList;
