'use client'

import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import React, { useEffect, useState } from 'react'
import { Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import InterviewCard from '../dashboard/_components/InterviewCard';

function AllInterview() {
    
    const [interviewList, setInterviewList] = useState([]);
    const { user } = useUser();
    
    useEffect(()=>{
        user && GetInterviewList()
    },[user])
    
    const GetInterviewList = async ()=>{
        
        let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select('*')
        .eq('userEmail',user?.email)
        .order('id',{ascending:false});
        setInterviewList(Interviews);
        console.log(Interviews)
    }
    
    
    return (
        <div className="my-5">
        <h2 className="font-bold text-2xl">Previously Created</h2>
    
        {interviewList?.length == 0 && (
            <div className="p-5 flex flex-col gap-3 items-center mt-5 bg-white rounded-lg">
            <Video className="h-10 w-10 text-primary" />
            <h2>You don't have any interview created!</h2>
            <Button>+ Create New Interview</Button>
            </div>
        )}
        {interviewList?.length > 0 && (
            <div className="grid grid-cols-2 mt-5 xl-grid-cols-3 gap-5">
            {interviewList.map((interview,index)=>(
                <InterviewCard interview={interview} key={index}/>
            ))}
            </div>
        )}
        </div>
    );
    }


export default AllInterview;