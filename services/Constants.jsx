import {
  BriefcaseBusinessIcon,
  Calendar,
  Code2Icon,
  Component,
  LayoutDashboard,
  List,
  Puzzle,
  Settings,
  User2Icon,
  WalletCards,
} from "lucide-react";

export const SideBarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Scheduled Interview",
    icon: Calendar,
    path: "/scheduled-interview",
  },
  {
    name: "All Interview",
    icon: List,
    path: "/all-interview",
  },
  {
    name: "Billing",
    icon: WalletCards,
    path: "/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export const InterviewType = [
  {
    title:'Technical',
    icon: Code2Icon
  },
  {
    title:'Behavioral',
    icon: User2Icon
  },
  {
    title:'Experience',
    icon: BriefcaseBusinessIcon
  },
  {
    title:'Problem Solving',
    icon: Puzzle
  },
  {
    title:'Leadership',
    icon: Component
  }
]

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.

Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

📝 Your task:
- Analyze the job description to identify key responsibilities, required skills, and expected experience.
- Generate a list of interview questions based on interview duration.
- Adjust the number and depth of questions to match the interview duration.
- Ensure the questions match the tone and structure of a real-life {{type}} interview.

🧩 IMPORTANT: Format your response EXACTLY as valid JSON. Return ONLY the JSON object, no additional text.

Expected JSON format:
{
  "interviewQuestions": [
    {
      "question": "Your question here?",
      "type": "Technical"
    },
    {
      "question": "Another question?",
      "type": "Behavioral"
    }
  ]
}

Valid types: Technical, Behavioral, Experience, Problem Solving, Leadership

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`

export const FEEDBACK_PROMPT = `Based on the following interview conversation between an AI assistant and a candidate, provide comprehensive feedback.

Conversation:
{{conversation}}

📋 Provide feedback with:
1. Ratings out of 10 for: Technical Skills, Communication, Problem Solving, Experience
2. A summary in 3 concise points about the interview performance
3. A hiring recommendation (Yes/No) with a brief message

🧩 IMPORTANT: Return ONLY valid JSON, no additional text or markdown.

Expected JSON format:
{
  "feedback": {
    "rating": {
      "technicalSkills": 7,
      "communication": 8,
      "problemSolving": 6,
      "experience": 7
    },
    "summary": [
      "First summary point about performance",
      "Second summary point about strengths",
      "Third summary point about areas for improvement"
    ],
    "recommendation": "Yes",
    "recommendationMsg": "Brief message explaining the recommendation"
  }
}

Note: recommendation must be either "Yes" or "No"`