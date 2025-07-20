import { Button } from '@/components/ui/button'
import { Copy, Send } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({interview}) {


    const copyLink = ()=>{
        const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard');
      }

      const onSend=()=>{
        toast.loading('Sending email...');
        window.location.href='mailto:rangasaimangalagiri@gmail.com?subject=Interview+Link&body=Check+out+this+interview+link:+'+process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id;
        toast.success('Email sent successfully');
      }
  return (
    <div className='p-5 bg-white rounded-lg border'>
        <div className='flex items-center justify-between'>
            <div className='h-[40px] w-[40px] rounded-full bg-primary'>
            </div>
            <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyy')}</h2>
        
        </div>
        
        <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
        <h2 className='mt-2'>{interview?.duration}</h2>
        <div className='flex gap-3 w-full mt-5'>
            <Button variant={'outline'} className='text-sm' onClick={()=>copyLink()}><Copy /> Copy Link</Button>
            <Button className='text-sm' onClick={()=>onSend()}><Send /> Send</Button>
        </div>
    </div>
  )
}

export default InterviewCard
