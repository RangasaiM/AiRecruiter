import { Button } from "@/components/ui/button";
import moment from "moment/moment";
import React from "react";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

function CandidatList({ candidateList }) {
    // Ensure candidateList is an array
    const candidates = Array.isArray(candidateList) ? candidateList : [];
    
    // Calculate average rating for a candidate
    const calculateAverageRating = (candidate) => {
        const ratings = candidate?.feedback?.feedback?.rating;
        if (!ratings) return 0;
        const sum = (ratings.technicalSkills || 0) + (ratings.communication || 0) + 
                    (ratings.problemSolving || 0) + (ratings.experience || 0);
        return Math.round(sum / 4);
    };
    
    return (
        <div className="">
            <h2 className="font-bold my-5">Candidates ({candidates.length})</h2>
            {candidates.length > 0 ? (
                candidates.map((candidate, index) => (
                <div key={index} className="p-5 flex gap-3 items-center justify-between bg-white rounded-lg mb-3">
                    <div className="flex items-center gap-5">
                        <h2 className="bg-primary p-3 px-4.5 font-bold text-white rounded-full">{candidate?.userName?.[0] || "U"}</h2>
                        <div>
                            <h2 className="font-bold">{candidate?.userName}</h2>
                            <h2 className="text-sm text-gray-500">Completed On: {moment(candidate?.created_at).format("MMM DD, yyy")}</h2>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <h2 className="text-green-600">{calculateAverageRating(candidate)}/10</h2>
                        <CandidateFeedbackDialog candidate={candidate} />
                    </div>
                </div>
            ))
            ) : (
                <div className="p-5 bg-white rounded-lg text-center">
                    <p className="text-gray-500">No candidates have completed this interview yet.</p>
                </div>
            )}
        </div>  
    )
}

export default CandidatList;