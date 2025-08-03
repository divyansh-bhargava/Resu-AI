import React from 'react'
import { Link } from 'react-router'

function Dummy() {
  return (
    <main className='w-screen h-screen flex justify-center items-center'>
        <div className='text-center flex flex-col gap-5'>
          <h1>404</h1>
          <h2>This is DUMMY RESUME</h2>

          <p>Upload your resume first</p>

          <Link to={"/"}  className='primary-button'>
            back to Home
          </Link>
        </div>
        
    </main>
  )
}

export default Dummy