"use client"

import { CustomButton, DatePick, OTPField } from '@/components';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState('January');
  const [day, setDay] = useState(1);

  const { push } = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  }

  const nextStep = async () => {
    let data;
    if (step === 1) {
      const res = await axios.post('http://localhost:8000/register1', {
        email
      });
      data = res.data;
    } else if (step === 2) {
      const res = await axios.post('http://localhost:8000/register2', {
        email,
        first_name: firstName,
        last_name: lastName
      });
      data = res.data;
    } else if (step === 3) {
      const res = await axios.post('http://localhost:8000/register3', {
        email,
        password,
        confirm_password: confirmPass
      });
      data = res.data;
    } else if (step == 4) {
      const res = await axios.post('http://localhost:8000/register4', {
        email,
        year,
        month,
        day
      });
      data = res.data;
    }
    if (data.error) {
      setError(data.error);
      setPassword('');
      setConfirmPass('');
    } else {
      setError('');
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    const { data } = await axios.post('http://localhost:8000/register5', {
      email,
      verification_code: otp.map(ref => ref.toString()).join('')
    });
    if (data.error) {
      setError(data.error);
    } else {
      push('/signin');
    }
  };

  return (
    <>
      <form className='sign-in__bar' onSubmit={handleSubmit}>
        <div className='flex justify-center'>
          <h1 className='title'>Register to ThreadVisio</h1>
        </div>
        {step === 1 && (
          <div>
            <div className='flex flex-row justify-between'>
              <p>Email</p>
            </div>
            <div className='bar__item'>
              <input
                id='email'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bar__input'
                required
              />
            </div>
            <div style={{ color: 'red' }}>{error}</div>
            <div className='margin-20 flex justify-center'>
              <CustomButton
                title='Next'
                btnType='button'
                containerStyles='rounded-full bg-transparent sign-in__btn min-w-[130px]'
                handleClick={nextStep}
              />
            </div>
            <a href='/signin' className='flex margin-20 justify-center underlined'>Already have an account?</a>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className='flex flex-row justify-between'>
              <p>First Name</p>
            </div>
            <div className='bar__item'>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='bar__input'
                required
              />
            </div>
            <div className='flex flex-row justify-between margin-20'>
              <p>Last Name</p>
            </div>
            <div className='bar__item'>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='bar__input'
                required
              />
            </div>
            <div style={{ color: 'red' }}>{error}</div>
            <div className='margin-20 flex justify-between'>
              <CustomButton
                title='Previous'
                btnType='button'
                containerStyles='rounded-full bg-transparent sign-in__btn min-w-[130px]'
                handleClick={prevStep}
              />
              <CustomButton
                title='Next'
                btnType='button'
                containerStyles='rounded-full bg-transparent sign-in__btn min-w-[130px]'
                handleClick={nextStep}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className='flex flex-row justify-between'>
              <p>Password</p>
            </div>
            <div className='bar__item'>
              <input
                type={showPassword1 ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='bar__input'
                required
              />
              {password && (
                <div className='password-toggle' onClick={() => setShowPassword1(!showPassword1)}>
                  <img
                    src={showPassword1 ? 'toggle-hide.png' : 'toggle-show.png'}
                    alt='show-hide toggle'
                    width={25} height={25}
                  />
                </div>
              )}
            </div>
            <div className='flex flex-row justify-between margin-20'>
              <p>Confirm Password</p>
            </div>
            <div className='bar__item'>
              <input
                type={showPassword2 ? 'text' : 'password'}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className='bar__input'
                required
              />
              {confirmPass && (
                <div className='password-toggle' onClick={() => setShowPassword2(!showPassword2)}>
                  <img
                    src={showPassword2 ? 'toggle-hide.png' : 'toggle-show.png'}
                    alt='show-hide toggle'
                    width={25} height={25}
                  />
                </div>
              )}
            </div>
            <div style={{ color: 'red' }}>{error}</div>
            <div className='margin-20 flex justify-between'>
              <CustomButton
                title='Previous'
                btnType='button'
                containerStyles='rounded-full bg-transparent sign-in__btn min-w-[130px]'
                handleClick={prevStep}
              />
              <CustomButton
                title='Next'
                btnType='button'
                containerStyles='rounded-full bg-transparent sign-in__btn min-w-[130px]'
                handleClick={nextStep}
              />
            </div>
          </div>
        )}
        {step == 4 && (
          <div>
            <div className='flex flex-row justify-between margin-20'>
              <p className='text-lg'>Date of Birth</p>
            </div>
            <DatePick
              year={year}
              setYear={setYear}
              month={month}
              setMonth={setMonth}
              day={day}
              setDay={setDay}
            />
            <div className='margin-20 flex justify-between'>
              <CustomButton
                title='Previous'
                btnType='button'
                containerStyles='rounded-full bg-transparent sign-in__btn min-w-[130px]'
                handleClick={prevStep}
              />
              <CustomButton
                title='Next'
                btnType='button'
                containerStyles='rounded-full bg-transparent sign-in__btn min-w-[130px]'
                handleClick={nextStep}
              />
            </div>
          </div>
        )}
        {step == 5 && (
          <div className='margin-20'>
            <div className='flex flex-row justify-between'>
              <p>A verification code has been sent to your email.
                <br />Enter the code to continue</p>
            </div>
            <div className='flex justify-center'>
              <OTPField otp={otp} setOtp={setOtp} />
            </div>
            <div style={{ color: 'red' }}>{error}</div>
            <div className='margin-20 flex justify-between'>
              <CustomButton
                title='Previous'
                btnType='button'
                containerStyles='rounded-full bg-transparent sign-in__btn min-w-[130px]'
                handleClick={prevStep}
              />
              <CustomButton
                title='Register'
                btnType='button'
                containerStyles='rounded-full bg-transparent sign-in__btn min-w-[130px]'
                handleClick={handleSubmit}
              />
            </div>
          </div>
        )}
      </form>
      <br /><br />
    </>
  )
}

export default Signup;