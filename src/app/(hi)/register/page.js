'use client';

import Carousel from '@/app/components/ImageSlider';
import { Loader } from '@/app/components/Loader';
import TextField from '@/app/components/TextFeild';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Page = () => {
  // State declarations
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode:'+91',
    mobile: '',
    password: '',
    rePassword: '',
    gender: '',
    work: [],
    framework: '',
    displayData:false,
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
    
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const routing=useRouter();
  const countryCodes = {
    '+91': 10, // India
    '+1': 10,  // USA
    '+44': 10, // UK
    '+81': 10, // Japan
    '+63': 9,  // Philippines
  };
  
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
    if (name === 'gender') validateGender();
    if (name === 'work') validateWork();
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
  const expectedLength = countryCodes[countryCode];

  if (!mobile) {
    setErrors((prev) => ({ ...prev, mobileError: 'Mobile number is required' }));
  } else if (mobile.length !== expectedLength) {
    setErrors((prev) => ({
      ...prev,
      mobileError: `Mobile number must be exactly ${expectedLength} digits`,
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

  // this method is check the dropdown is  selected or not

  const validateDropdowns = () => {
    const {  framework } = formData;
    if(!framework){
      setErrors((prev) => ({
        ...prev,
        frameworkError:   'Please choose a framework' ,
      }));
    }
    else{
      setErrors((prev) => ({
        ...prev,
        frameworkError:   '' ,
      }));
    }
  };

  // this method is validate the gender feild
  const validateGender = () => {
    const { gender } = formData;
    if(!gender){
      setErrors((prev) => ({
        ...prev,
        genderError:   'Please choose a Gender' ,
      }));
    }
    else{
      setErrors((prev) => ({
        ...prev,
        genderError:   '' ,
      }));
    }
  };

  // this method is validate the work feild
  const validateWork = () => {
    const{work}=formData;
    if(work.length<1){
      setErrors((prev) => ({
        ...prev,
        workError: 'Please choose a Work' ,
      }));
    }
    else{
      setErrors((prev) => ({
        ...prev,
        workError:   '' ,
      }));
    }
    
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
    validateGender();
    validateWork();

    // Check for any errors
    if (
      !Object.values(errors).some((err) => err !== '') 
    ) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log('Form Data:', formData);
        // routing.push('/successPage');
        setIsSubmitting(false);
        setFormData(prev=>({...prev,displayData:true}))

      }, 1000);
    } 
  
  };

  

  return (
    <div className="flex flex-col justify-center items-center   max-w-full min-h-screen lg:flex-row p-3  gap-8 ">
      <div className='max-w-full md:max-w-lg '> <Carousel/> </div>
      <div className="max-w-full  w-full  p-5 border border-gray-300 rounded-md bg-gray-800 shadow-md sm:max-w-lg ">
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
                  onChange={(e) => {
                    const code = e.target.value;
                    setFormData((prev) => ({ ...prev, countryCode: code }));
                  }}
                  onBlur={handleBlur}
                  className="px-4 py-[14.2px] mr-3 text-base text-white bg-gray-800 border-2 rounded-md border-gray-500 focus:outline-none focus:border-gray-400"
                >
                  {Object.keys(countryCodes).map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
              </select>

              </div>
              <div className='w-full'>
              <input
                  className="signup-input"
                  type="text"
                  name="mobile"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      mobile: e.target.value.replace(/[^0-9]/g, '').trim(),
                    }))
                  }
                  onBlur={handleBlur}
                  maxLength={countryCodes[formData.countryCode]}
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
              {isSubmitting ?<Loader/>  : 'Submit'}
            </button>
          </div>

          
        </form>
      </div>
    </div>
  );
};

export default Page;
