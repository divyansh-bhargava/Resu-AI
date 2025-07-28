import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter'

export const meta = () => ([
    { title: 'ResuAi | Auth' },
    { name: 'description', content: 'Log into your account' },
])

function Auth() {

    const {auth , isLoading } = usePuterStore();
    const navigate = useNavigate()

    const location = useLocation(); // location.search = "?next=/profile"
    const next = location.search.split('next=')[1]; // "/profile"
     // const params = new URLSearchParams(location.search);
    // const next = params.get("next");

    useEffect(() => {
        if(auth.isAuthenticated){
            navigate(next)
        }
    }, [auth.isAuthenticated , next]);


  return (
    <main className="bg-[url('./images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
        <div className='gradient-border shadow-xl '>
            <section className='flex flex-col gap-8 bg-white p-10 rounded-2xl '>
                <div className='flex flex-col gap-2 text-center items-center'>
                    <h1>Welcome</h1>
                    <h2>Log In to Continue Your Job Journey</h2>
                </div>
                <div>
                    {
                        isLoading ? 
                        (
                            <button className='auth-button animate-pulse'>Sign in....</button>
                        ) : (
                            <>
                                {
                                    auth.isAuthenticated ? (
                                        <button 
                                            className='auth-button'
                                            onClick={auth.signOut}
                                        >Sign Out</button>
                                    ) :  (
                                        <button 
                                            className='auth-button '
                                            onClick={auth.signIn}    
                                        >Sign In</button>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </section>
        </div>
    </main>
  )
}

export default Auth