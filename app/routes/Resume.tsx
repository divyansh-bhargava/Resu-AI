import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { usePuterStore } from '~/lib/puter'
import Summary from '~/component/Summary'
import Details from '~/component/Details'
import Ats from '~/component/Ats'

  export const meta = () => ([
    { title: 'ResuAi | Review' },
    { name: 'description', content: 'Details of your Resume' },
])


function Resume() {

  const {auth ,fs, kv} = usePuterStore()
  const id = useParams()
  const [resumeUrl , setResumeUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [feedback , setFeedback] = useState<Feedback | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
  }, [auth.isAuthenticated]);

  useEffect(() => {
    
    const load = async () => {
      const resume = await kv.get(`resume:${id}`)

      if(!resume) return 

      const data = JSON.parse(resume)

      const resumeblob = await fs.read(data.resumePath);
      if(!resumeblob) return

      const pdfblob = new Blob([resumeblob] , {type: "application/pdf"})
      setResumeUrl(URL.createObjectURL(pdfblob)) ;

      const imageblob = await fs.read(data.imagePath);
      if(!imageblob) return
      setImageUrl(URL.createObjectURL(imageblob))

      setFeedback(data.feedback)
    }

  }, []);


  return (
    <main className='!pt-0'>
        <div className=''>
          <nav className='resume-nav'>
            <Link to={"/"} className='back-button'>
              <img
                src={"/icons/back.svg"}
                className="w-2.5 h-2.5"
              />
              <p className='text-gray-600 text-sm font-semibold'>Back to HomePage</p>
            </Link>
          </nav>

          <div className='flex flex-row w-full max-lg:flex-col-reverse'>
            
            <section className='feedback-section bg-[url("/images/bg-small.svg") bg-cover h-[100vh] sticky top-0 items-center justify-center'>
              {/* {imageUrl && resumeUrl &&  */}{
              (
                <div className=' gradient-border animate-in fade-in duration-1000 h-[90%] max-sm:m-0 max-w-2xl:h-fit w-fit'>
                    <a href={resumeUrl}>
                      <img
                        src={imageUrl}
                        className='w-full h-full object-contain rounded-2xl' 
                      />
                    </a>
                </div>
              )}
            </section>

            <section className='feedback-section '>
              {
                feedback ? 
                (
                  <div className='flex flex-col gap-8 animate-in fade-in duration-1000'>
                    <h1 className='text-4xl !text-black font-bold'>Resume Review</h1>
                    <Summary feedback={feedback}/>
                    <Ats />
                    <Details/>
                  </div>
                ) 
                  : 
                (
                  <div>
                      <img src="/images/resume-scan-2.gif" className="w-full" />
                  </div>
                )
              }
            </section>

          </div>

        </div>
    </main>
  )
}

export default Resume