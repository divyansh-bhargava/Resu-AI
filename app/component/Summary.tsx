import React from 'react'
import ScoreGauge from './ScoreGauge'
import ScoreBadge from './ScoreBadge'

function Category({title, score} : {title : string , score : number}){

    const textColor = score > 70 ? 'text-green-600'
            : score > 49
        ? 'text-yellow-600' : 'text-red-600';

    return (
        <div className='resume-summary'>
            <div className='category'>
                <div className='flex flex-row gap-2 items-center'>
                    <p className='text-xl font-semibold'>{title}</p>
                    <ScoreBadge score={score}/>
                </div>
                <div className='text-xl font-[400]'>
                    <span className={textColor}>{score}</span>/100
                </div>
            </div>
        </div>
    )
}

function Summary({feedback} : {feedback : Feedback}) {
  return (
    <div className='w-full rounded-2xl bg-white shadow-md'>
         <div className='flex flex-rox items-center p-4 gap-8'>
            <ScoreGauge score={feedback?.overallScore | 0}/>

            <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
         </div>

        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />

    </div>
  )
}

export default Summary