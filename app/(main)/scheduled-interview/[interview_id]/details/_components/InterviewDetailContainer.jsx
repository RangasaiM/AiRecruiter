import { Calendar, Clock, MessageCircleQuestion, MessageCircleQuestionIcon } from 'lucide-react'
import React from 'react'
import moment from 'moment/moment'

function InterviewDetailContainer({InterviewDetail}){
    return (
        <div className='p-5 bg-white rounded-lg mt-5'>
            <h2>{InterviewDetail?.jobPosition}</h2>
            <div className='mt-4 flex items-center justify-between lg:pr-52'>
                <div>
                    <h2 className='text-sm text-gray-500'>Duration</h2>
                    <h2 className='flex text-md font-bold items-center gap-2'><Clock className='h-4 w-4'/> {InterviewDetail?.duration}</h2>
                </div>
                <div>
                    <h2 className='text-sm text-gray-500'>Created on</h2>
                    <h2 className='flex text-md font-bold items-center gap-2'><Calendar className='h-4 w-4'/> {moment(InterviewDetail?.created_at).format('MMM DD, yyy')}</h2>
                </div>
                {InterviewDetail?.type && <div>
                    <h2 className='text-sm text-gray-500'>Type</h2>
                    <h2 className='flex text-md font-bold items-center gap-2'><Clock className='h-4 w-4'/> {JSON.parse(InterviewDetail?.type)[0]}</h2>
                </div>}
            </div>
            <div className='mt-5'>
                <h2 className='font-bold'>Job Description</h2>
                <p className='text-sm leading-6'>{InterviewDetail?.jobDescription}</p>
            </div>
            <div className='mt-5'>
                <h2 className='font-bold'>Interview Questions</h2>
                <div className='grid grid-cols-2 gap-3'>
                    {InterviewDetail?.questionList.map((item,index)=>(
                         <h2 className='text-xs'>{index+1}.{item?.question}</h2>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InterviewDetailContainer
