import React, { useState } from 'react';
import 'animate.css';

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    isAttendingWithGuest: false,
    guestName: ''
  });

  const [errors, setErrors] = useState({});
  const [animate, setAnimate] = useState(false);
  const [step, setStep] = useState(1); 
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: fieldValue });
  };

  const validateForm = () => {
    const { name, email, age, isAttendingWithGuest, guestName } = formData;
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!age.trim() || isNaN(age) || parseInt(age) <= 0) {
      errors.age = 'Age must be a valid number greater than 0';
    }

    if (isAttendingWithGuest && !guestName.trim()) {
      errors.guestName = 'Guest Name is required';
    }

    setErrors(errors);
    setAnimate(true);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setStep(2); // Go to the preview step
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <div>Thank you for registering!</div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      {step === 1 ? (
        <form onSubmit={handleNextStep} className='flex flex-col gap-2 w-3/6'>
          <div className='flex flex-col gap-1 '>
            <label>Name:</label>
            <input className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring' type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                                  onAnimationEnd={() => setAnimate(false)}>{errors.name}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <label>Email:</label>
            <input className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring' type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                                  onAnimationEnd={() => setAnimate(false)}>{errors.email}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <label>Age:</label>
            <input className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring' type="number" name="age" value={formData.age} onChange={handleChange} />
            {errors.age && <span className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                                  onAnimationEnd={() => setAnimate(false)}>{errors.age}</span>}
          </div>
          <div className='flex gap-4'>
            <input className='rounded-md border-2 border-[#d6eaf0]' type="checkbox" name="isAttendingWithGuest" checked={formData.isAttendingWithGuest} onChange={handleChange} />
            <label>Are you attending with a guest?</label>
          </div>
          {formData.isAttendingWithGuest && (
            <div className='flex flex-col gap-1'>
              <label>Guest Name:</label>
              <input className='rounded-md p-1 border-2 border-[#d6eaf0] focus:ring' type="text" name="guestName" value={formData.guestName} onChange={handleChange} />
              {errors.guestName && <span className={`error text-red-500 text-sm ${animate ? 'animate__animated animate__headShake' : ''}`}
                                        onAnimationEnd={() => setAnimate(false)}>{errors.guestName}</span>}
            </div>
          )}
          <button className='w-full mt-5 bg-blue-400 p-1' type="submit">Next</button>
        </form>
      ) : (
        <div className='flex flex-col gap-2 w-3/6'>
          <h2 className='text-xl mb-4'>Preview Your Information</h2>
          <div><strong>Name:</strong> {formData.name}</div>
          <div><strong>Email:</strong> {formData.email}</div>
          <div><strong>Age:</strong> {formData.age}</div>
          {formData.isAttendingWithGuest && <div><strong>Guest Name:</strong> {formData.guestName}</div>}
          <button className='w-full mt-5 bg-blue-400 p-1' onClick={handleSubmit}>Submit</button>
          <button className='w-full mt-2 bg-gray-400 p-1' onClick={() => setStep(1)}>Back</button>
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
