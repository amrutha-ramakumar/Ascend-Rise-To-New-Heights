import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BASE_URL from '../../../api/BaseUrl'

export default function JobseekerPlans() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(
          `${BASE_URL}/api/subscription-plans/role/jobseeker`,
          {
            method:'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobseeker plans')
        }
        
        const data = await response.json()
        setPlans(data)
        console.log(data);
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  const handleSelectPlan = async (planId) => {
    const confirmSelection = window.confirm('Are you sure you want to select this plan?')
    
    if (confirmSelection) {
      const autoRenewal = window.confirm('Would you like to enable auto-renewal for this plan?')
      
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}/api/user-subscriptions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            plan: planId,
            autoRenewal: autoRenewal
          })
        })

        if (!response.ok) {
          throw new Error('Failed to create subscription')
        }

        // Redirect to Razorpay payment page
        navigate('/jobseeker/payment')
      } catch (err) {
        console.error('Error creating subscription:', err)
        alert('Failed to create subscription. Please try again.')
      }
    }
  }
  const handlePaymentPlan = async () => {
    navigate('/jobseeker/payment')
  }
  if (loading) return <div className="text-center py-10">Loading jobseeker plans...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Jobseeker Subscription Plans</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Unlock premium features to boost your job search and career growth
            <button  
            onClick={() => handlePaymentPlan()}
            className="mt-8  bg-black hover:bg-primary/90 text-white py-3 px-6 rounded-xl transition-colors duration-200">Already selected one</button>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Special Offer Card */}
          <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Jobseeker Special Offers</h3>
            <p className="mb-6">
              Get noticed by top employers and access premium job search features at special discounted rates.
            </p>
            
            <div className="aspect-video bg-white/10 rounded-xl backdrop-blur-sm" />
          </div>

          {/* Subscription Plan Cards */}
          {plans.map((plan) => {
            const features = JSON.parse(plan.features)
            
            return (
              <div
                key={plan.id}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-primary/20 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900">{plan.planName}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                  ₹{plan.price}
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">
                    /{plan.duration} days
                  </span>
                </div>

                <ul className="mt-8 space-y-4">
                  {Object.values(features).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className="mt-8 w-full bg-lime-400 hover:bg-primary/90 text-black py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  Select Plan
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

