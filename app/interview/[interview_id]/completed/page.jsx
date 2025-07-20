import React from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

function InterviewComplete() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-center">Your interview is completed!</h1>
      <p className="text-gray-600 mb-6 text-center">Thank you for participating in the interview process.</p>
    </div>
  );
}

export default InterviewComplete;