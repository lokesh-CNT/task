'use client';

import AutoImageSlider from '@/app/components/ImageSlider';
import TextField from '@/app/components/TextFeild';
import React, { useState } from 'react';


const Page = () => {
  // State declarations
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode:'10',
    mobile: '',
    password: '',
    rePassword: '',
    gender: '',
    work: [],
    framework: '',
  });

  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    mobileError: '',
    passwordError: '',
    rePasswordError: '',
    genderError: '',
    workError: '',
    frameworkError: '',
    formError: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handlers for field updates
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        work: checked
          ? [...prev.work, value]
          : prev.work.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (name === 'name') validateName();
    if (name === 'email') validateEmail();
    if (name === 'mobile') validateMobile();
    if (name === 'password') validatePassword();
    if (name === 'rePassword') validateRePassword();
    if (name === 'gender') validateDropdowns();
    if (name === 'work') validateDropdowns();
    if (name === 'framework') validateDropdowns();
  };

  // Validations

  // username validation it allows only alphabets
  const validateName = () => {
    const { name } = formData;
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!name) {
      setErrors((prev) => ({ ...prev, nameError: 'Name is required' }));
    }else if (name.length<3 || name.length>20){
       setErrors((prev) => ({ ...prev, nameError: 'Name should be between 3-20 character only' })) 
    } 
    else if (!nameRegex.test(name)) {
      setErrors((prev) => ({
        ...prev,
        nameError: 'Name should only contain letters and spaces',
      }));
    } else {
      setErrors((prev) => ({ ...prev, nameError: '' }));
      
    }
  };


  // Email validation it allows only a alphanumberic and some special charater
  const validateEmail = () => {
    const { email } = formData;
    const emailRegex = /^[a-zA-Z0-9][^\s@]*@[^\s@]+\.[^\s@]+[a-zA-Z0-9]$/;
  
    if (!email) {
      setErrors((prev) => ({ ...prev, emailError: 'Email is required' }));
    } else if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, emailError: 'Invalid email format' }));
    } else {
      setErrors((prev) => ({ ...prev, emailError: '' }));
    }
  };
  

// this methods is for validate a mobile number based on the country code

const validateMobile = () => {
  const { mobile, countryCode } = formData;

  if (!mobile) {
    setErrors((prev) => ({ ...prev, mobileError: 'Mobile number is required' }));
  } else if (!new RegExp(`^\\d{${countryCode}}$`).test(mobile)) {
    setErrors((prev) => ({
      ...prev,
      mobileError: `Mobile number must be exactly ${countryCode} digits`,
    }));
  } else {
    setErrors((prev) => ({ ...prev, mobileError: '' }));
  }
};

// this method is for validate a password

  const validatePassword = () => {
    const { password } = formData;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+=\-{}[\]:;"'<>,.?/`~\\|]).{8,}$/;

    if (!password) {
      setErrors((prev) => ({ ...prev, passwordError: 'Password is required' }));
    } else if (!passwordRegex.test(password)) {
      setErrors((prev) => ({
        ...prev,
        passwordError:
          'Password must be at least 8 characters, including an uppercase letter, a number, and a special character.',
      }));
    } else {
      setErrors((prev) => ({ ...prev, passwordError: '' }));
    }
  };

  // this method is compare the both password 
  const validateRePassword = () => {
    const { password, rePassword } = formData;
    if (!rePassword) { 
      setErrors((prev) => ({ ...prev, rePasswordError: 'Please confirm your password' }));
    } else if (password !== rePassword) {
      setErrors((prev) => ({ ...prev, rePasswordError: 'Passwords do not match' }));
    } else {
      setErrors((prev) => ({ ...prev, rePasswordError: '' }));
    }
  };

  // this method is check the dropdown radio checkbox all are selected or not

  const validateDropdowns = () => {
    const { gender, work, framework } = formData;
    setErrors((prev) => ({
      ...prev,
      genderError: !gender ? 'Please select a gender' : '',
      workError: work.length === 0 ? 'Please select at least one work type' : '',
      frameworkError: !framework ? 'Please choose a framework' : '',
    }));
  };


  // this method is for validate a form to check all feilds are completed 

  const handleSubmit = (e) => {
    e.preventDefault();

    validateName();
    validateEmail();
    validateMobile();
    validatePassword();
    validateRePassword();
    validateDropdowns();
   

    // Check for any errors
    if (
      !Object.values(errors).some((err) => err !== '') &&
      Object.values(formData).every((field) => field)
    ) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log('Form Data:', formData);
        alert('Form submitted successfully!');
        setIsSubmitting(false);
      }, 1000);
    } else {
      setErrors((prev) => ({ ...prev, formError: 'Please fill all fields correctly' }));
      return;
    }
    console.log(formData, errors);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div> <AutoImageSlider/> </div>
      <div className="max-w-lg w-full p-5 border border-gray-300 rounded-md bg-gray-800 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Registration Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <TextField
            label="Name" 
            id="name"
            name="name"
            value={formData.name} 
            onChange={(e) =>  setFormData((prev) => ({
              ...prev,
              name: e.target.value.replace(/[^a-zA-Z\s]/g, '').trim(),
              // this will allow only alphabetic
            }))
            }
            onBlur={handleBlur}
            />
            {errors.nameError && <p className="text-red-600 text-sm">{errors.nameError}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <TextField
              label="Email" 
              id="email"
              name="email"
              value={formData.email} 
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value.replace(/[^a-zA-Z0-9._@\-]/gi, '').toLowerCase().trim()                  
                  // we can able to type only a alpabets and mentioned specail char and number
                }))
              }
              onBlur={handleBlur}
              />
            {errors.emailError && <p className="text-red-600 text-sm">{errors.emailError}</p>}
          </div>

          {/* Mobile */}
          <div className="mb-4 ">
            <label className=''>Mobile Number</label>
            <div className='flex  '>
              <div className=''>
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="px-4 py-[14.2px] mr-3 text-base text-white  bg-gray-800 border-2 rounded-md border-gray-500 focus:outline-none focus:border-gray-400  ">
                    <option value={10}>+91</option>
                    <option value={12}>+633</option>
                    <option value={9}>+89</option>
                </select>
              </div>
              <div className='w-full'>
                <input
                  className=" signup-input"
                  type="text"
                  name="mobile"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      mobile: e.target.value.replace(/[^0-9]/g, '').trim(),
                      // we can able to type only a number 
                    }))
                  }
                  onBlur={handleBlur}
                  maxLength={formData.countryCode}
                />
              </div>
            </div>
            {errors.mobileError && <p className="text-red-600 text-sm">{errors.mobileError}</p>}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label>Gender</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Male
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Female
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === 'Other'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Other
              </label>
            </div>
            {errors.genderError && <p className="text-red-600 text-sm">{errors.genderError}</p>}
          </div>

          {/* Work Type (Checkboxes) */}
          <div className="mb-4">
            <label>Work Type</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="work"
                  value="Full-time"
                  checked={formData.work.includes('Full-time')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Full-time
              </label>
              <label className="ml-4">
                <input
                  type="checkbox"
                  name="work"
                  value="Part-time"
                  checked={formData.work.includes('Part-time')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Part-time
              </label>
              <label className="ml-4">
                <input
                  type="checkbox"
                  name="work"
                  value="Freelance"
                  checked={formData.work.includes('Freelance')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Freelance
              </label>
            </div>
            {errors.workError && <p className="text-red-600 text-sm">{errors.workError}</p>}
          </div>

          {/* Framework (Dropdown) */}
          <div className="mb-4">
            
            <select
              name="framework"
              value={formData.framework}
              onChange={handleChange}
              onBlur={handleBlur}
              className="signup-input"
            >
              <option value="">Select a framework</option>
              <option value="React">React</option>
              <option value="Angular">Angular</option>
              <option value="Vue">Vue</option>
              <option value="Svelte">Svelte</option>
            </select>
            {errors.frameworkError && <p className="text-red-600 text-sm">{errors.frameworkError}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <TextField
              label="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  password: e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi, '').trim()
                  // Allows letters, numbers, and common special characters
                }))
              }
              onBlur={handleBlur}
            />
            {errors.passwordError && <p className="text-red-600 text-sm">{errors.passwordError}</p>}
          </div>

          {/* Re-enter Password */}
          <div className="mb-4">
            <TextField
              label="Re-Enter Password"
              id="repassword"
              name="rePassword"
              value={formData.rePassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  rePassword: e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi, '').trim()
                  // Allows letters, numbers, and common special characters
                }))
              }
              onBlur={handleBlur}
            />
            
            {errors.rePasswordError && <p className="text-red-600 text-sm">{errors.rePasswordError}</p>}
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>

          {/* Form Error */}
          {errors.formError && <p className="text-red-600 text-sm">{errors.formError}</p>}
        </form>
      </div>
    </div>
  );
};

export default Page;
