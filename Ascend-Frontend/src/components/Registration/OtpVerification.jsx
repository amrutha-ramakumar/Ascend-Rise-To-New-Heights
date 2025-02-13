// import { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import BASE_URL from '../../api/BaseUrl'

// const OtpVerification = ({ email, onVerify }) => {
//   const [otp, setOtp] = useState(['', '', '', '', '', ''])
//   const [timer, setTimer] = useState(60)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const countdown = setInterval(() => {
//       setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0))
//     }, 1000)

//     return () => clearInterval(countdown)
//   }, [])

//   const handleChange = (element, index) => {
//     if (isNaN(element.value)) return false

//     setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

//     if (element.nextSibling) {
//       element.nextSibling.focus()
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const otpString = otp.join('')
//     if (otpString.length === 6) {
//       onVerify(otpString)
//     } else {
//       setError('Please enter a valid 6-digit OTP')
//     }
//   }

//   const handleResendOTP = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/auth/resend-otp`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       })
      
//       if (response.ok) {
//         setTimer(60)
//         setError('')
//       } else {
//         const errorData = await response.json()
//         setError(errorData.message)
//       }
//     } catch (error) {
//       console.error('Failed to resend OTP:', error)
//       setError('An unexpected error occurred. Please try again.')
//     }
//   }

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <h3 className="text-2xl font-bold text-center mb-4">Email Verification</h3>
//       <p className="text-center text-gray-600 mb-6">
//         We&apos;ve sent a verification code to <strong className="text-black">{email}</strong>
//       </p>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="flex justify-center gap-2">
//           {otp.map((data, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength="1"
//               value={data}
//               onChange={(e) => handleChange(e.target, index)}
//               onFocus={(e) => e.target.select()}
//               className="w-12 h-12 text-center text-black text-xl font-semibold border-2 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
//             />
//           ))}
//         </div>
        
//         {error && (
//           <p className="text-red-500 text-center text-sm">{error}</p>
//         )}

//         <div className="flex flex-col items-center gap-4">
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
//           >
//             Verify OTP
//           </button>
          
//           {timer > 0 ? (
//             <p className="text-sm text-gray-600">
//               Resend OTP in {timer} seconds
//             </p>
//           ) : (
//             <button
//               type="button"
//               onClick={handleResendOTP}
//               className="text-sm text-black hover:underline"
//             >
//               Resend OTP
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   )
// }

// OtpVerification.propTypes = {
//   email: PropTypes.string.isRequired,
//   onVerify: PropTypes.func.isRequired,
// }

// export default OtpVerification

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import BASE_URL from '../../api/BaseUrl'

const OtpVerification = ({ email, onVerify }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(120)
  const [error, setError] = useState('')

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0))
    }, 1000)

    return () => clearInterval(countdown)
  }, [])

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    if (element.nextSibling) {
      element.nextSibling.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const otpString = otp.join('')
    if (otpString.length === 6) {
      onVerify(otpString)
      setOtp(['', '', '', '', '', '']) // Reset OTP input fields
      setError('') // Clear error on success
    } else {
      setError('Please enter a valid 6-digit OTP')
    }
  }
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const otpString = otp.join('');
  
  //   if (otpString.length !== 6) {
  //     setError('Please enter a valid 6-digit OTP');
  //     return;
  //   }
  //  console.log(otpString);
  //   try {
  //     const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, otp: otpString }),
  //     });
  
  //     const data = await response.json();
  
  //     if (!response.ok) {
  //       setError(data.error || 'An unexpected error occurred. Please try again.');
  //       setOtp(['', '', '', '', '', '']); // Reset OTP input on error
  //       return;
  //     }
      
  //     setError('');
  //     setOtp(['', '', '', '', '', '']); // Reset OTP input on success
  //     onVerify(otpString);
  //   } catch (error) {
  //     console.error('Error verifying OTP:', error);
  //     setError('An unexpected error occurred. Please try again.');
  //     setOtp(['', '', '', '', '', '']); // Reset OTP input on error
  //   }
  // };
  
  // const handleResendOTP = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/auth/resend-otp`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email }),
  //     })
      
  //     if (response.ok) {
  //       setOtp(['', '', '', '', '', '']) // Reset OTP input fields
  //       setTimer(60)
  //       setError('')
  //       document.getElementById('otp-0')?.focus() // Focus first input field
  //     } else {
  //       const errorData = await response.json()
  //       setError(errorData.message)
  //       setOtp(['', '', '', '', '', '']) // Reset OTP input fields on error
  //     }
  //   } catch (error) {
  //     console.error('Failed to resend OTP:', error)
  //     setError('An unexpected error occurred. Please try again.')
  //     setOtp(['', '', '', '', '', '']) // Reset OTP input fields on error
  //   }
  // }
  const handleResendOTP = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        setTimer(60);
        setError('');
        setOtp(['', '', '', '', '', '']); // Reset OTP input when a new OTP is sent
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setOtp(['', '', '', '', '', '']); // Reset OTP input on failure
      }
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      setError('An unexpected error occurred. Please try again.');
      setOtp(['', '', '', '', '', '']); // Reset OTP input on failure
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-center mb-4">Email Verification</h3>
      {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}

      <p className="text-center text-gray-600 mb-6">
        We&apos;ve sent a verification code to <strong className="text-black">{email}</strong>
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-2">
          {otp.map((data, index) => (
            <input
              key={index}
              id={`otp-${index}`} // Unique ID for focus handling
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              className="w-12 h-12 text-center text-black text-xl font-semibold border-2 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
            />
          ))}
        </div>
        
       
        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Verify OTP
          </button>
          
          {timer > 0 ? (
            <p className="text-sm text-gray-600">
              Resend OTP in {timer} seconds
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOTP}
              className="text-sm text-black hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

OtpVerification.propTypes = {
  email: PropTypes.string.isRequired,
  onVerify: PropTypes.func.isRequired,
}

export default OtpVerification
