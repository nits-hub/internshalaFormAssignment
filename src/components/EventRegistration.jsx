import React from 'react'
import EventRegistrationForm from './EventRegistrationForm';

export default function EventRegistration() {
  return (
    <div className='w-4/6 flex flex-col items-center gap-5 mx-auto'>
        <h1 className='text-[2rem] font-semibold '>Event Registration Form</h1>
        <EventRegistrationForm />
        
    </div>
  )
}
