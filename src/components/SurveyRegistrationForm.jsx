import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'animate.css';
import { AppContext } from './context/AppContext';

const SurveyRegistrationForm = () => {

  const { formData, errors, isSubmitted, step, setFormData, setErrors, setIsSubmitted, setStep } = useContext(AppContext);
  
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [animate, setAnimate] = useState(false);

  const programmingLanguages = ["JavaScript", "Python", "Java", "C#"];
  const surveyTopics = ["Technology", "Health", "Education"];

  useEffect(() => {
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic); 
    }
  }, [formData.surveyTopic]);

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await axios.get(`https://api.example.com/questions?topic=${topic}`);
      setAdditionalQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name.includes('.')) {
      const [section, key] = name.split('.');
      setFormData(prevState => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [key]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSurveyTopicChange = (event) => {
    const { value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      surveyTopic: value,
      technology: { favoriteLanguage: '', yearsOfExperience: '' },
      health: { exerciseFrequency: '', dietPreference: '' },
      education: { highestQualification: '', fieldOfStudy: '' },
    }));
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.surveyTopic) {
      errors.surveyTopic = 'Survey Topic is required';
    }

    if (formData.surveyTopic === 'Technology') {
      if (!formData.technology.favoriteLanguage) {
        errors.favoriteLanguage = 'Favorite Programming Language is required';
      }
      if (!formData.technology.yearsOfExperience) {
        errors.yearsOfExperience = 'Years of Experience is required';
      }
    }

    if (formData.surveyTopic === 'Health') {
      if (!formData.health.exerciseFrequency) {
        errors.exerciseFrequency = 'Exercise Frequency is required';
      }
      if (!formData.health.dietPreference) {
        errors.dietPreference = 'Diet Preference is required';
      }
    }

    if (formData.surveyTopic === 'Education') {
      if (!formData.education.highestQualification) {
        errors.highestQualification = 'Highest Qualification is required';
      }
      if (!formData.education.fieldOfStudy) {
        errors.fieldOfStudy = 'Field of Study is required';
      }
    }

    if (!formData.feedback.trim() || formData.feedback.trim().length < 50) {
      errors.feedback = 'Feedback is required and must be at least 50 characters';
    }

    // Debugging the length of the feedback text
    console.log('Feedback length:', formData.feedback.trim().length);

    setErrors(errors);
    setAnimate(true);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setStep(2); // Go to the preview step
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      setIsSubmitted(true);
    } else {
      console.log(formData);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center w-full">
        <h2>Thank you for registering!</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {step === 1 ? (
        <form onSubmit={handleNextStep} className='flex flex-col gap-2 w-3/6'>
          {/* Full Name */}
          <div className='flex flex-col gap-1'>
            <label>Full Name:</label>
            <input
              className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring'
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName && (
              <span className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                onAnimationEnd={() => setAnimate(false)}>{errors.fullName}</span>
            )}
          </div>

          {/* Email */}
          <div className='flex flex-col gap-1'>
            <label>Email:</label>
            <input
              className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring'
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <span className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                onAnimationEnd={() => setAnimate(false)}>{errors.email}</span>
            )}
          </div>

          {/* Survey Topic */}
          <div className='flex flex-col gap-1'>
            <label>Survey Topic:</label>
            <select
              className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring'
              name="surveyTopic"
              value={formData.surveyTopic}
              onChange={handleSurveyTopicChange}
            >
              <option value="">Select...</option>
              {surveyTopics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
            {errors.surveyTopic && (
              <span className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                onAnimationEnd={() => setAnimate(false)}>{errors.surveyTopic}</span>
            )}
          </div>

          {/* Dynamic Section based on Survey Topic */}
          {formData.surveyTopic === 'Technology' && (
            <div className='flex flex-col gap-3'>
              {/* Technology Section */}
              <div className='flex flex-col gap-1'>
                <label>Favorite Programming Language:</label>
                <select
                  className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring'
                  name="technology.favoriteLanguage"
                  value={formData.technology.favoriteLanguage}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  {programmingLanguages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
                {errors.favoriteLanguage && (
                  <span className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                    onAnimationEnd={() => setAnimate(false)}>{errors.favoriteLanguage}</span>
                )}
              </div>

              <div className='flex flex-col gap-1'>
                <label>Years of Experience:</label>
                <input
                  className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring'
                  type="number"
                  name="technology.yearsOfExperience"
                  value={formData.technology.yearsOfExperience}
                  onChange={handleInputChange}
                />
                {errors.yearsOfExperience && (
                  <span className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                    onAnimationEnd={() => setAnimate(false)}>{errors.yearsOfExperience}</span>
                )}
              </div>
            </div>
          )}

          {formData.surveyTopic === 'Health' && (
            <div className='flex flex-col gap-3'>
              {/* Health Section */}
              <div className='flex flex-col gap-1'>
                <label>Exercise Frequency:</label>
                <select
                  className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring'
                  name="health.exerciseFrequency"
                  value={formData.health.exerciseFrequency}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Rarely">Rarely</option>
                </select>
                {errors.exerciseFrequency && (
                  <span className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                    onAnimationEnd={() => setAnimate(false)}>{errors.exerciseFrequency}</span>
                )}
              </div>

              <div className='flex flex-col gap-1'>
                <label>Diet Preference:</label>
                <select
                  className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring'
                  name="health.dietPreference"
                  value={formData.health.dietPreference}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Omnivore">Omnivore</option>
                  <option value="Other">Other</option>
                </select>
                {errors.dietPreference && (
                  <span className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                    onAnimationEnd={() => setAnimate(false)}>{errors.dietPreference}</span>
                )}
              </div>
            </div>
          )}

          {formData.surveyTopic === 'Education' && (
            <div className='flex flex-col gap-3'>
              {/* Education Section */}
              <div className='flex flex-col gap-1'>
                <label>Highest Qualification:</label>
                <input
                  className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring'
                  type="text"
                  name="education.highestQualification"
                  value={formData.education.highestQualification}
                  onChange={handleInputChange}
                />
                {errors.highestQualification && (
                  <span className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                    onAnimationEnd={() => setAnimate(false)}>{errors.highestQualification}</span>
                )}
              </div>

              <div className='flex flex-col gap-1'>
                <label>Field of Study:</label>
                <input
                  className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring'
                  type="text"
                  name="education.fieldOfStudy"
                  value={formData.education.fieldOfStudy}
                  onChange={handleInputChange}
                />
                {errors.fieldOfStudy && (
                  <span className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                    onAnimationEnd={() => setAnimate(false)}>{errors.fieldOfStudy}</span>
                )}
              </div>
            </div>
          )}

          {/* Feedback */}
          <div className='flex flex-col gap-1'>
            <label>Feedback:</label>
            <textarea
              className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring'
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
            />
            {errors.feedback && (
              <span className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                onAnimationEnd={() => setAnimate(false)}>{errors.feedback}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className='mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
          >
            Next
          </button>
        </form>
      ) : (
        <div className='flex flex-col gap-2 w-3/6'>
          <h2 className='text-xl mb-4'>Preview Your Information</h2>
          <div className='flex flex-col gap-1'>
            <p><strong>Full Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Survey Topic:</strong> {formData.surveyTopic}</p>
            
            {formData.surveyTopic === 'Technology' && (
              <>
                <p><strong>Favorite Programming Language:</strong> {formData.technology.favoriteLanguage}</p>
                <p><strong>Years of Experience:</strong> {formData.technology.yearsOfExperience}</p>
              </>
            )}

            {formData.surveyTopic === 'Health' && (
              <>
                <p><strong>Exercise Frequency:</strong> {formData.health.exerciseFrequency}</p>
                <p><strong>Diet Preference:</strong> {formData.health.dietPreference}</p>
              </>
            )}

            {formData.surveyTopic === 'Education' && (
              <>
                <p><strong>Highest Qualification:</strong> {formData.education.highestQualification}</p>
                <p><strong>Field of Study:</strong> {formData.education.fieldOfStudy}</p>
              </>
            )}

            <p><strong>Feedback:</strong> {formData.feedback}</p>

            <button
              onClick={() => setStep(1)}
              className='mt-4 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600'
            >
              Back
            </button>

            <button
              onClick={handleSubmit}
              className='mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyRegistrationForm;
