"use client";

import { createContext } from "react";

export const InterviewDataContext = createContext({
  interviewInfo: null,
  setInterviewInfo: (info) => {},
});
