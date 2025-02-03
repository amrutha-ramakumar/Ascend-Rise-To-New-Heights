import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Eye, EyeOff } from 'lucide-react'
import BASE_URL from '../../api/BaseUrl'
import OtpVerification from '../../components/Registration/OtpVerification'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [password, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        setStep('otp')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to send OTP. Please try again.')
      }
    } catch (error) {
      console.error('Failed to send OTP:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpVerification = async (otp) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      })

      if (response.ok) {
        setStep('newPassword')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Invalid OTP. Please try again.')
      }
    } catch (error) {
      console.error('OTP verification failed:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        // Password reset successful, navigate to login page
        navigate('/login', { state: { message: 'Password reset successful. Please login with your new password.' } })
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to reset password. Please try again.')
      }
    } catch (error) {
      console.error('Password reset failed:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderEmailForm = () => (
    <form onSubmit={handleEmailSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Sending...' : 'Send OTP'}
      </button>
    </form>
  )

  const renderNewPasswordForm = () => (
    <form onSubmit={handleNewPasswordSubmit} className="space-y-6">
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  )

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="relative bg-black text-white">
        <div 
          className="absolute inset-0 bg-[url('src/assets/Searcch.jpg')] bg-cover bg-center opacity-50"
          style={{ top: '0', height: '100vh' }}
          aria-hidden="true"
        />
        <div className="relative container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-center mb-4">Forgot Password</h1>
          <div className="flex items-center justify-center gap-2 text-sm mb-8">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Forgot Password</span>
          </div>
          
          {/* Form Section */}
          <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {step === 'email' && renderEmailForm()}
            {step === 'otp' && (
              <OtpVerification 
                email={email} 
                onVerify={handleOtpVerification}
              />
            )}
            {step === 'newPassword' && renderNewPasswordForm()}
          </div>
        </div>
      </div>
    </div>
  )
}

