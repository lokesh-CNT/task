'use client';

import React, { useState } from 'react';

const Page = () => {
  // State declarations
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
  const validateName = () => {
    const { name } = formData;
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!name) {
      setErrors((prev) => ({ ...prev, nameError: 'Name is required' }));
    } else if (!nameRegex.test(name)) {
      setErrors((prev) => ({
        ...prev,
        nameError: 'Name should only contain letters and spaces',
      }));
    } else {
      setErrors((prev) => ({ ...prev, nameError: '' }));
    }
  };

  const validateEmail = () => {
    const { email } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors((prev) => ({ ...prev, emailError: 'Email is required' }));
    } else if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, emailError: 'Invalid email format' }));
    } else {
      setErrors((prev) => ({ ...prev, emailError: '' }));
    }
  };

  const validateMobile = () => {
    const { mobile } = formData;
    if (!mobile) {
      setErrors((prev) => ({ ...prev, mobileError: 'Mobile number is required' }));
    } else if (!/^\d{10}$/.test(mobile)) {
      setErrors((prev) => ({
        ...prev,
        mobileError: 'Mobile number must be exactly 10 digits',
      }));
    } else {
      setErrors((prev) => ({ ...prev, mobileError: '' }));
    }
  };

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

  const validateDropdowns = () => {
    const { gender, work, framework } = formData;
    setErrors((prev) => ({
      ...prev,
      genderError: !gender ? 'Please select a gender' : '',
      workError: work.length === 0 ? 'Please select at least one work type' : '',
      frameworkError: !framework ? 'Please choose a framework' : '',
    }));
  };


  

  const handleSubmit = (e) => {
    e.preventDefault();

    validateName();
    validateEmail();
    validateMobile();
    validatePassword();
    validateRePassword();
    validateDropdowns();
    validateWork();
    validateFramework();

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
      <div className="max-w-lg w-full p-5 border border-gray-300 rounded-md bg-gray-800 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Registration Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label>Name</label>
            <input
              className="signup-input"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value.replace(/[^a-zA-Z\s]/g, ''),
                }))
              }
              onBlur={handleBlur}
            />
            {errors.nameError && <p className="text-red-600 text-sm">{errors.nameError}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label>Email</label>
            <input
              className="signup-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value.replace(/[^0-9a-z._%+-@]/gi, '').toLowerCase(),
                }))
              }
              onBlur={handleBlur}
            />
            {errors.emailError && <p className="text-red-600 text-sm">{errors.emailError}</p>}
          </div>

          {/* Mobile */}
          <div className="mb-4">
            <label>Mobile Number</label>
            <input
              className="signup-input"
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  mobile: e.target.value.replace(/[^0-9]/g, ''),
                }))
              }
              onBlur={handleBlur}
              maxLength={10}
            />
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
            <label>Preferred Framework</label>
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
            <label>Password</label>
            <input
              className="signup-input"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.passwordError && <p className="text-red-600 text-sm">{errors.passwordError}</p>}
          </div>

          {/* Re-enter Password */}
          <div className="mb-4">
            <label>Confirm Password</label>
            <input
              className="signup-input"
              type="password"
              name="rePassword"
              placeholder="Confirm your password"
              value={formData.rePassword}
              onChange={handleChange}
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
