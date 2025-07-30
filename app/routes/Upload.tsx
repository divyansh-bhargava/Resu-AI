import { prepareInstructions } from 'constant'
import React, { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import NavBar from '~/component/NavBar'
import Uploder from '~/component/Uploder'
import { convertPdfToImage } from '~/lib/Pdf2img'
import { usePuterStore } from '~/lib/puter'
import { generateUUID } from '~/lib/utils'

export const meta = () => ([
    { title: 'ResuAi | Upload' },
    { name: 'description', content: 'Upload Your Resume' },
])

function Upload() {

    const {auth , fs , kv , ai} = usePuterStore()

    const [isprocessing, setisprocessing] = useState(false);
    const [status, setstatus] = useState("")
    const [file , setFile] = useState<File | null>();
    const navigate = useNavigate()

    const fileSubmit = (file : File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({companyName , jobTitle , jobDescription , file}  :{ companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {

        setisprocessing(true)

        setstatus('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setstatus('Error: Failed to upload file'); 

        setstatus("Converting PDF to IMG...");
        const image = await convertPdfToImage(file)
        if(!image.file) return setstatus('Error: Failed to convert PDF to image');

        setstatus("Uploading the image...");
        const uploadedImage = await fs.upload([image.file])
        if(!uploadedImage) return setstatus('Error: Failed to upload Image'); 

        setstatus("Preparing Data...")
        const uuid = generateUUID()
        const resume = {
            id : uuid ,
            imagePath : uploadedImage.path,
            resumePath : uploadedFile.path,
            companyName , jobTitle , jobDescription,
            feedback : ""
        }

        await kv.set(`resume:${uuid}` , JSON.stringify(resume))

        setstatus("Analyzing...");
        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({jobTitle , jobDescription})
        )

        if(!feedback) return

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        resume.feedback = JSON.parse(feedbackText);

        await kv.set(`resume:${uuid}` , JSON.stringify(resume))
        setstatus("Analyzing complete , Redirecting...");
        console.log(resume);
        navigate(`/resume/${resume.id}`)
    }

    const handlesubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest("form")

        if(!form) return;

        const formData = new FormData(form);

        const companyName = formData.get("company-name") as string
        const jobTitle = formData.get("job-title") as string
        const jobDescription = formData.get("job-description") as string

        if(!file) return;

        handleAnalyze({companyName , jobTitle , jobDescription , file})
    }

    return (
        <main className="bg-[url('./images/bg-main.svg')] bg-cover ">

            <NavBar />

            <section className="main-section">
                <div className='page-heading p-10'>
                    <h1>Smart feedback for your dream job</h1>
                    {
                        isprocessing ?
                            (
                                <>
                                    <h2>{status}</h2>
                                    <img src="./images/resume-scan.gif" className="size-50" />
                                </>
                            ) :
                            (
                                <h2>Drop your resume for an ATS score and improvement tips</h2>
                            )
                    }
                </div>

                {
                    !isprocessing &&
                    (

                        <form onSubmit={handlesubmit} className='flex flex-col gap-4 mt-8 !w-4xl' id='form'>
                            <div className='form-div'>
                                <label htmlFor='company-name'>Company Name</label>
                                <input name='company-name' id='company-name' placeholder='Company Name'  />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="Job Title" id="job-title"  />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <Uploder fileSubmit={fileSubmit} />
                            </div>

                            <button
                                className="primary-button"
                                type='submit'
                            >Analyze Resume</button>

                        </form>

                    )
                }

            </section>

        </main>
    )
}

export default Upload