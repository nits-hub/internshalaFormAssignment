import React from 'react'
import SurveyRegistrationForm from './SurveyRegistrationForm'
import AppContextProvider from '../components/context/AppContext';

export default function Survey() {
  return (
    <div className='w-4/6 flex flex-col items-center gap-5 mx-auto'>
    <h1 className='text-[2rem] font-semibold '>Survery Form</h1> 
    <AppContextProvider>
      <SurveyRegistrationForm />
    </AppContextProvider>
</div>
  )
}