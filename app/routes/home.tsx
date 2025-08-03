import { resumes  as key} from "constant";
import type { Route } from "./+types/home";
import NavBar from "~/component/NavBar";
import ResumeCard from "~/component/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Template from "~/component/Template";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resu-AI" },
    { name: "description", content: "Smart Resume Analyzer" },
  ];
}

export default function Home() {

  const { kv } = usePuterStore();
  const [loadingResumes, setloadingResumes] = useState<boolean>()
  const [resumes, setResumes] = useState<Resume[]>([])

  useEffect(() => {

    const loadResume = async () => {
      
      setloadingResumes(true)

      try {
        const resumes = (await kv.list("resume:*", true)) as KVItem[]

        console.log(resumes)

      const parseResume = resumes?.map((resume) => (
        JSON.parse(resume.value) as Resume
      ))

      setResumes(parseResume || [])
      } catch (error) {
        console.log(error);
      }

      

      setloadingResumes(false)
    }

    loadResume()

  }, []);


  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">

      <NavBar />

      <section className="main-section">
        <div className="page-heading">
          <h1>Track Your Applications & Resume Rating</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}

        {resumes?.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div>
            <div className="resumes-section">
            {key.map((resume) => (
              <Template key={resume.id} resume={resume} />
            ))}
          </div>
            
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
          </div>
        )}

        

      </section>

    </main>

  )
}
