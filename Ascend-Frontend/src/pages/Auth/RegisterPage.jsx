import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContexts'
import OtpVerification from '../../components/Registration/OtpVerification'
import GenderRoleSelect from '../../components/Registration/GenderRoleSelect'
import BASE_URL from '../../api/BaseUrl'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    role: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${formData.role.toLowerCase()}/complete-profile`)
    }
  }, [isAuthenticated, formData.role, navigate])

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim() ? '' : 'This field is required'
      case 'email':
        return /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email address'
      case 'phone':
        return /^\d{10}$/.test(value) ? '' : 'Invalid phone number (10 digits required)'
      case 'password':
        return value.length >= 8 ? '' : 'Password must be at least 8 characters long'
      case 'confirmPassword':
        return value === formData.password ? '' : 'Passwords do not match'
      case 'gender':
      case 'role':
        return value ? '' : 'Please select an option'
      default:
        return ''
    }
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    const emailError = validateField('email', email)
    if (emailError) {
      setErrors({ email: emailError })
      return
    }
    try {
      const response = await fetch(`${BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        setStep('otp')
        setErrors({})
      } else {
        const errorData = await response.json()
        setError(errorData.message)
      }
    } catch (error) {
      // console.error()
      setError('Failed to send OTP:', error)
    }
  }

  const handleOtpVerification = async (otp) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      })

      if (response.ok) {
        setStep('details')
        setError('')
        setFormData(prev => ({ ...prev, email }))
        // setErrors(" ")
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'OTP verification failed. Please try again.')
      }
    } catch (error) {
      console.error('OTP verification failed:', error)
      setError('An unexpected error occurred. Please try again.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) {
        newErrors[key] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const { confirmPassword, ...registrationData } = formData
    console.log(confirmPassword)
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      })
      
      if (response.ok) {
        const data = await response.json()
        login(data.token, data.role.toLowerCase())
        localStorage.setItem('token', data.token)
        localStorage.setItem('userrole', data.role.toLowerCase())
        navigate(`/${data.role.toLowerCase()}/complete-profile`)
      } else {
        const errorData = await response.json()
        setError(errorData.message)
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.'+ error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
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
          onChange={(e) => {
            setEmail(e.target.value)
            setErrors(prev => ({ ...prev, email: validateField('email', e.target.value) }))
          }}
          className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Send OTP
      </button>
    </form>
  )

  const renderRegistrationForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full p-3 border  text-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block  text-black text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg text-black  focus:ring-2 focus:ring-black focus:border-black transition-colors ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-3 border  text-black rounded-lg text-black focus:ring-2 focus:ring-black focus:border-black transition-colors ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          readOnly
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg  text-black focus:ring-2 focus:ring-black focus:border-black transition-colors ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="password" className="block  text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
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
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GenderRoleSelect
          onGenderChange={(value) => handleChange({ target: { name: 'gender', value } })}
          onRoleChange={(value) => handleChange({ target: { name: 'role', value } })}
          initialGender={formData.gender}
          initialRole={formData.role}
          genderError={errors.gender}
          roleError={errors.role}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        SIGN UP
      </button>
    </form>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative bg-black text-white">
        <div 
          className="absolute inset-0 bg-[url('src/assets/Searcch.jpg')] bg-cover bg-center opacity-50"
          style={{ top: '0', height: '100vh' }}
          aria-hidden="true"
        />
        <div className="relative container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-center mb-4">Create an Account</h1>
          <div className="flex items-center justify-center gap-2 text-sm mb-8">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>SignUp</span>
          </div>
          
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm border p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {step === 'email' && renderEmailForm()}
            {step === 'otp' && <OtpVerification email={email} onVerify={handleOtpVerification} />}
            {step === 'details' && renderRegistrationForm()}
          </div>
        </div>
      </div>
    </div>
  )
}

