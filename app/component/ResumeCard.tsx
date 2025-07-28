import React, { useEffect, useState } from 'react'
import ScoreCircle from './ScoreCircle'
import { Link } from 'react-router'
import { usePuterStore } from '~/lib/puter'

function ResumeCard({ resume }: { resume: Resume }) {
    const { id, companyName, jobTitle, imagePath, feedback } = resume
    const {fs} = usePuterStore()
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);
    return (
        <Link to={`/resume/${id}`} className='resume-card animate-in fade-in duration-1000'>
            <div className='resume-card-header'>
                <div className='flex flex-col'>
                    <h2 className='!text-black font-semibold'>{companyName}</h2>
                    <h3 className='text-gray-600 text-lg'>{jobTitle}</h3>
                </div>
                <div className='shrink-0'>
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>
            <div className="gradient-border animate-in fade-in duration-1000">
                <div className='w-full h-full'>
                    <img
                        src={resumeUrl} 
                        alt={id}
                        className=' w-full h-[350px] max-sm:w-[200px] object-cover object-top'
                    />
                </div>
            </div>
        </Link>
    )
}

export default ResumeCard