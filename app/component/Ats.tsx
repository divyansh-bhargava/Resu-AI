import React from 'react'

interface suggestions {
  type: "good" | "improve";
  tip: string;
}

interface Atsprops {
  score: number,
  suggestions: suggestions[]
}

function Ats({ score, suggestions }: Atsprops) {

  const gradientClass = score > 69
    ? 'from-green-100'
    : score > 49
      ? 'from-yellow-100'
      : 'from-red-100';

  const iconSrc = score > 69
    ? '/icons/ats-good.svg'
    : score > 49
      ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';


  const subtitle = score > 69
    ? 'Great Job!'
    : score > 49
      ? 'Good Start'
      : 'Needs Improvement';

  return (
    <div className={`bg-gradient-to-b ${gradientClass} to-white rounded-xl shadow-xl w-full p-6`}>
      <div className='flex flex-row items-center gap-4 mb-6'>
        <img src={iconSrc} alt={iconSrc} className='w-10  h-10' />
        <h2 className='text-xl font-bold'>ATS Score - {score} /100</h2>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">{subtitle}</h3>
        <p className="text-gray-600 mb-4">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
        </p>

        <div className='mb-3'>
          {
            suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3">
                <img
                  src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                  alt={suggestion.type === "good" ? "Check" : "Warning"}
                  className="w-5 h-5 mt-1"
                />
                <p className={suggestion.type === "good" ? "text-green-700" : "text-amber-700"}>
                  {suggestion.tip}
                </p>
              </div>
            ))
          }
        </div>

        <p className="text-gray-700 italic">
          Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
        </p>


      </div>
    </div>
  )
}

export default Ats