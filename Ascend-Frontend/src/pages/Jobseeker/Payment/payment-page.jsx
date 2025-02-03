import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Check } from 'lucide-react'
import BASE_URL from '../../../api/BaseUrl'
import { useAuth } from '../../../contexts/AuthContexts' 

export default function PaymentPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { logout } = useAuth() 
  const [subscriptionDetails, setSubscriptionDetails] = useState(null)

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}/api/user-subscriptions`, {
          method:'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        
        if (!response.ok) throw new Error('Failed to fetch subscription details')
        
        const data = await response.json()
        setSubscriptionDetails(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscriptionDetails()

    
    const logoutTimeout = setTimeout(() => {
      logout() // Log out the user if they don't proceed to payment
      navigate('/login') // Navigate to login page after logout
    // }, 5 * 60 * 1000); // 5 minutes
    }, 30 * 1000);
    
    return () => clearTimeout(logoutTimeout)
  }, [])

  const handlePayment = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      // Create order in Razorpay
      const orderResponse = await fetch(`${BASE_URL}/api/create-razorpay-order`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: subscriptionDetails.plan.price * 100, // Convert to paise
          subscriptionId: subscriptionDetails.id
        })
      })

      if (!orderResponse.ok) throw new Error('Failed to create order')
      
      const orderData = await orderResponse.json()

      const options = {
        key: 'rzp_test_NeTo17DpgmKAdp', 
        amount: orderData.amount,
        currency: 'INR',
        name: 'Ascend',
        description: `Subscription - ${subscriptionDetails.plan.planName}`,
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // Save payment details to backend
            const paymentResponse = await fetch(`${BASE_URL}/api/subscription-payments`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                subscriptionId: subscriptionDetails.id,
                amount: subscriptionDetails.plan.price,
                paymentMethod: 'RAZORPAY',
                transactionId: response.razorpay_payment_id,
                status: 'COMPLETED',
                paymentDate: new Date().toISOString()
              })
            })

            if (!paymentResponse.ok) throw new Error('Failed to save payment details')

            // Navigate to success page
            navigate('/jobseeker/payment-success')
          } catch (err) {
            setError('Payment verification failed. Please contact support.' + err)
          }
        },
        prefill: {
          name: `${subscriptionDetails.user.firstName} ${subscriptionDetails.user.lastName}`,
          email: subscriptionDetails.user.email,
        },
        theme: {
          color: '#10B981'
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center">Loading subscription details...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      </div>
    )
  }

  if (!subscriptionDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center">No subscription details found.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mt-14 bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Complete Your Subscription</h1>
          <p className="text-gray-500 mt-2">Secure payment powered by Razorpay</p>
          
        </div>

        <div className="space-y-6">
          {/* Subscription Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-gray-900">{subscriptionDetails.plan.planName}</h2>
            <div className="mt-2 flex justify-between items-baseline">
              <span className="text-3xl font-bold">₹{subscriptionDetails.plan.price}</span>
              <span className="text-gray-500">/{subscriptionDetails.plan.duration} days</span>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Name:</span> {subscriptionDetails.user.firstName} {subscriptionDetails.user.lastName}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Email:</span> {subscriptionDetails.user.email}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">User Type:</span> {subscriptionDetails.user.role}
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Plan Features:</h3>
            {subscriptionDetails.plan.features && Object.values(JSON.parse(subscriptionDetails.plan.features)).map((feature, index) => (
              <div key={index} className="flex items-center text-gray-600">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Auto-renewal Notice */}
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Auto-renewal:</span> {subscriptionDetails.autoRenewal ? 'Enabled' : 'Disabled'}
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-black hover:bg-primary/90 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <CreditCard className="h-5 w-5" />
            <span>{loading ? 'Processing...' : 'Pay Now'}</span>
          </button>
          <span className="text-xs text-red-400 text-center mt-4">You will be logged out if you do not proceed within 30 seconds.</span>
          {/* Security Notice */}
          <p className="text-sm text-gray-500 text-center mt-4">
            🔒 Your payment is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  )
}
