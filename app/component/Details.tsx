import React from 'react'
import { cn } from '~/lib/utils';

function Details({ feedback }: { feedback: Feedback }) {

  const ScoreBadge = ({ score }: { score: number }) => {
    return (
      <div
        className={cn(
          "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
          score > 69
            ? "bg-badge-green"
            : score > 39
              ? "bg-badge-yellow"
              : "bg-badge-red"
        )}
      >
        <img
          src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
          alt="score"
          className="size-4"
        />
        <p
          className={cn(
            "text-sm font-medium",
            score > 69
              ? "text-badge-green-text"
              : score > 39
                ? "text-badge-yellow-text"
                : "text-badge-red-text"
          )}
        >
          {score}/100
        </p>
      </div>
    );
  };

  const CategoryHeader = ({
    title,
    categoryScore,
  }: {
    title: string;
    categoryScore: number;
  }) => {
    return (
      <div className="flex flex-row gap-4 items-center py-2">
        <p className="text-2xl font-semibold">{title}</p>
        <ScoreBadge score={categoryScore} />
      </div>
    );
  };

  const CategoryContent = ({
    tips,
  }: {
    tips: { type: "good" | "improve"; tip: string; explanation: string }[];
  }) => {
    return (
      <div className="flex flex-col gap-4 items-center w-full">
        <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div className="flex flex-row gap-2 items-center" key={index}>
              <img
                src={
                  tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
                }
                alt="score"
                className="size-4"
              />
              <p className="text-lg text-gray-500 ">{tip.tip}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 w-full">
          {tips.map((tip, index) => (
            <div
              key={index + tip.tip}
              className={cn(
                "flex flex-col gap-2 rounded-2xl p-4",
                tip.type === "good"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-yellow-50 border border-yellow-200 text-yellow-700"
              )}
            >
              <div className="flex flex-row gap-2 items-center">
                <img
                  src={
                    tip.type === "good"
                      ? "/icons/check.svg"
                      : "/icons/warning.svg"
                  }
                  alt="score"
                  className="size-4"
                />
                <p className="text-lg font-semibold">{tip.tip}</p>
              </div>
              <p>{tip.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };


  return (
    <div className='flex flex-col gap-4 rounded-xl shadow-xl w-full p-6'>
      <details className=' bg-gray-50 rounded-2xl p-4 w-full'>
        <summary className='w-full flex justify-between items-center'>
          <CategoryHeader title='Tone And Syle' categoryScore={feedback.toneAndStyle.score}/>
          <img src={"/icons/arrow.png"} className='w-4 h-4'/>
        </summary>
        
        <CategoryContent tips={feedback.toneAndStyle.tips}/>
      </details>

      <details className=' bg-gray-50 rounded-2xl p-4 w-full '>
        <summary className='w-full flex justify-between items-center'>
          <CategoryHeader title='Content' categoryScore={feedback.content.score}/>
          <img src={"/icons/arrow.png"} className='w-4 h-4'/>
        </summary>
        <CategoryContent tips={feedback.content.tips}/>
      </details>

      <details className=' bg-gray-50 rounded-2xl p-4 w-full '>
        <summary className='w-full flex justify-between items-center'>
          <CategoryHeader title='Skills' categoryScore={feedback.skills.score}/>
          <img src={"/icons/arrow.png"} className='w-4 h-4'/>
        </summary>
        <CategoryContent tips={feedback.skills.tips}/>
      </details>

      <details className=' bg-gray-50 rounded-2xl p-4 w-full '>
        <summary className='w-full flex justify-between items-center'>
          <CategoryHeader title='Structure' categoryScore={feedback.structure.score}/>
          <img src={"/icons/arrow.png"} className='w-4 h-4'/>
        </summary>
        <CategoryContent tips={feedback.structure.tips}/>
      </details>

    </div>
  )
}

export default Details