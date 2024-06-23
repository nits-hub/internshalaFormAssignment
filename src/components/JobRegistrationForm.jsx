 import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'animate.css';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    interviewTime: null,
  });

  const [errors, setErrors] = useState({});
  const [animate, setAnimate] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const positions = ["Developer", "Designer", "Manager"];
  const skills = ["JavaScript", "CSS", "Python", "React", "Node.js"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    let newSkills = [...formData.additionalSkills];
    if (checked) {
      newSkills.push(value);
    } else {
      newSkills = newSkills.filter(skill => skill !== value);
    }
    setFormData({
      ...formData,
      additionalSkills: newSkills,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      interviewTime: date,
    });
  };

  const validate = () => {
    let validationErrors = {};

    if (!formData.fullName) validationErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email address is invalid';
    }
    if (!formData.phoneNumber) validationErrors.phoneNumber = 'Phone Number is required';
    if ((formData.position === 'Developer' || formData.position === 'Designer') && !formData.relevantExperience) {
      validationErrors.relevantExperience = 'Relevant Experience is required';
    }
    if (formData.position === 'Designer' && !formData.portfolioURL) {
      validationErrors.portfolioURL = 'Portfolio URL is required';
    } else if (formData.portfolioURL && !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.portfolioURL)) {
      validationErrors.portfolioURL = 'Invalid URL';
    }
    if (formData.position === 'Manager' && !formData.managementExperience) {
      validationErrors.managementExperience = 'Management Experience is required';
    }
    if (formData.additionalSkills.length === 0) validationErrors.additionalSkills = 'At least one skill must be selected';
    if (!formData.interviewTime) validationErrors.interviewTime = 'Preferred Interview Time is required';

    setErrors(validationErrors);
    setAnimate(true);
    return Object.keys(validationErrors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validate()) {
      setStep(2); // Go to the preview step
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
    console.log(formData);
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
          <div className='flex flex-col gap-1'>
            <label>Full Name:</label>
            <input className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring' type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <p className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
              onAnimationEnd={() => setAnimate(false)}>{errors.fullName}</p>}
          </div>
          <div className='flex flex-col gap-1'>
            <label>Email:</label>
            <input className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring' type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
              onAnimationEnd={() => setAnimate(false)}>{errors.email}</p>}
          </div>
          <div className='flex flex-col gap-1'>
            <label>Phone Number:</label>
            <input className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring' type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            {errors.phoneNumber && <p className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
              onAnimationEnd={() => setAnimate(false)}>{errors.phoneNumber}</p>}
          </div>
          <div className='flex flex-col gap-1'>
            <label>Applying for Position:</label>
            <select className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring' name="position" value={formData.position} onChange={handleChange}>
              <option value="">Select a position</option>
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>
          {(formData.position === 'Developer' || formData.position === 'Designer') && (
            <div className='flex flex-col gap-1'>
              <label>Relevant Experience (Years):</label>
              <input className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring' type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
              {errors.relevantExperience && <p className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                onAnimationEnd={() => setAnimate(false)}>{errors.relevantExperience}</p>}
            </div>
          )}
          {formData.position === 'Designer' && (
            <div className='flex flex-col gap-1'>
              <label>Portfolio URL:</label>
              <input className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring' type="text" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} />
              {errors.portfolioURL && <p className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                onAnimationEnd={() => setAnimate(false)}>{errors.portfolioURL}</p>}
            </div>
          )}
          {formData.position === 'Manager' && (
            <div className='flex flex-col gap-1'>
              <label>Management Experience:</label>
              <input className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring' type="text" name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
              {errors.managementExperience && <p className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                onAnimationEnd={() => setAnimate(false)}>{errors.managementExperience}</p>}
            </div>
          )}
          <div className='flex flex-col gap-1'>
            <label>Additional Skills:</label>
            {skills.map(skill => (
              <div key={skill} className='flex gap-5'>
                <input type="checkbox" value={skill} checked={formData.additionalSkills.includes(skill)} onChange={handleSkillChange} />
                <label>{skill}</label>
              </div>
            ))}
            {errors.additionalSkills && <p className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
              onAnimationEnd={() => setAnimate(false)}>{errors.additionalSkills}</p>}
          </div>
          <div className='flex flex-col gap-1'>
            <label>Preferred Interview Time:</label>
            <DatePicker className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring' selected={formData.interviewTime} onChange={handleDateChange} showTimeSelect dateFormat="Pp" />
            {errors.interviewTime && <p className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
              onAnimationEnd={() => setAnimate(false)}>{errors.interviewTime}</p>}
          </div>
          <button className='w-full mt-5 bg-blue-400 p-1' type="submit">Next</button>
        </form>
      ) : (
        <div className='flex flex-col gap-2 w-3/6'>
          <h2 className='text-xl mb-4'>Preview Your Information</h2>
          <div className='flex flex-col gap-1'>
            <p><strong>Full Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
            <p><strong>Applying for Position:</strong> {formData.position}</p>
            {formData.position === 'Developer' || formData.position === 'Designer' ? (
              <p><strong>Relevant Experience (Years):</strong> {formData.relevantExperience}</p>
            ) : null}
            {formData.position === 'Designer' ? (
              <p><strong>Portfolio URL:</strong> {formData.portfolioURL}</p>
            ) : null}
            {formData.position === 'Manager' ? (
              <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
            ) : null}
            <p><strong>Additional Skills:</strong> {formData.additionalSkills.join(', ')}</p>
            <p><strong>Preferred Interview Time:</strong> {formData.interviewTime && formData.interviewTime.toLocaleString()}</p>
          </div>
          <button className='w-full mt-5 bg-blue-400 p-1' onClick={handleSubmit}>Submit</button>
          <button className='w-full mt-2 bg-gray-400 p-1' onClick={() => setStep(1)}>Back</button>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
