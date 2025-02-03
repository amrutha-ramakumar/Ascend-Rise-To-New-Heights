import { useState, useEffect } from 'react'
import BASE_URL from '../../api/BaseUrl'
import PropTypes from 'prop-types'
export default function GenderRoleSelect({ onGenderChange, onRoleChange, initialGender, initialRole, genderError, roleError }) {
  const [genders, setGenders] = useState([])
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`${BASE_URL}/auth/gender-roles`)
        if (!response.ok) {
          throw new Error('Failed to fetch gender and role options')
        }
        const data = await response.json()
        setGenders(data.genders)
        setRoles(data.roles.filter(role => role !== 'Admin')) // Exclude 'Admin' role
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchOptions()
  }, [])

  if (loading) return <p>Loading options...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <div>
        <select
          name="gender"
          value={initialGender}
          onChange={(e) => onGenderChange(e.target.value)}
          className={`w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-black-500 focus:border-black-500 ${
            genderError ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select Gender</option>
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        {genderError && <p className="mt-1 text-red-500 text-sm">{genderError}</p>}
      </div>
      <div>
        <select
          name="role"
          value={initialRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className={`w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-black-500 focus:border-black-500 ${
            roleError ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {roleError && <p className="mt-1 text-red-500 text-sm">{roleError}</p>}
      </div>
    </>
  )
}

// PropTypes validation
GenderRoleSelect.propTypes = {
    onGenderChange: PropTypes.func.isRequired,
    onRoleChange: PropTypes.func.isRequired,
    initialGender: PropTypes.string.isRequired,
    initialRole: PropTypes.string.isRequired,
    genderError: PropTypes.string,
    roleError: PropTypes.string,
  }
  
  // Default props
  GenderRoleSelect.defaultProps = {
    genderError: null,
    roleError: null,
  }