import React from 'react'
import { Link } from 'react-router'
import ScoreCircle from './ScoreCircle'


function Template({ resume }: { resume: Resume }) {
    const { id, companyName, jobTitle, imagePath, feedback } = resume
  return (
    <div>
        <Link to={`/dummy-resume`} className='resume-card animate-in fade-in duration-1000'>
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
                        src={imagePath} 
                        alt={id}
                        className=' w-full h-[350px] max-sm:w-[200px] object-cover object-top'
                    />
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Template