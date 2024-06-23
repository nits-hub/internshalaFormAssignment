import React from 'react'
import JobRegistrationForm from './JobRegistrationForm';

export default function JobRegistration() {
  return (
    <div className='w-4/6 flex flex-col items-center gap-5 mx-auto'>
        <h1 className='text-[2rem] font-semibold '>Job Registration Form</h1> 
        <JobRegistrationForm />
    </div>
  )
}
