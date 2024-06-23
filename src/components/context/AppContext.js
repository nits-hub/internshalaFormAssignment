import { createContext, useState } from "react";

// create the context object
export const AppContext = createContext();

export default function AppContextProvider({children}) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        surveyTopic: '',
        technology: {
          favoriteLanguage: '',
          yearsOfExperience: ''
        },
        health: {
          exerciseFrequency: '',
          dietPreference: ''
        },
        education: { 
          highestQualification: '',
          fieldOfStudy: ''
        },
        feedback: ''
      });
    
      const [errors, setErrors] = useState({});
      const [isSubmitted, setIsSubmitted] = useState(false);
      const [step, setStep] = useState(1);

      const value = {
        formData,
        errors,
        isSubmitted,
        step,
        setFormData,
        setErrors,
        setIsSubmitted,
        setStep
      };

    return <AppContext.Provider value={value}>
            {children}
           </AppContext.Provider>
}