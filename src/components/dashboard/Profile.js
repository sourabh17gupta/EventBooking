import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateApi } from '../../api/Services/updateApi'
import { setUser } from '../../redux/slices/profileSlice'

function Profile() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile)

  const [editableFields, setEditableFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
  })

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    role: user?.role || '',
  })

  const [statusMessage, setStatusMessage] = useState('')

  const handleEditClick = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: true }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (field) => {
    try {
      const updatedData = { ...formData, role: user.role }
      await UpdateApi(updatedData)
      dispatch(setUser(updatedData))
      setStatusMessage('Profile updated successfully!')
      setEditableFields((prev) => ({ ...prev, [field]: false }))
    } catch (err) {
      console.error(err)
      setStatusMessage('Failed to update profile.')
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 text-white rounded-2xl min-h-[calc(100vh-160px)] overflow-hidden">


      <div className="space-y-6">
        {/* Field Renderer */}
        {['firstName', 'lastName', 'email'].map((field) => (
          <div key={field} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <label className="text-sm font-medium text-blue-400 sm:w-1/4 capitalize">
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
            <div className="flex-1 flex items-center justify-between gap-4">
              {editableFields[field] ? (
                <>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full sm:w-auto flex-1 bg-white text-black px-3 py-2 rounded-md shadow"
                  />
                  <button
                    onClick={() => handleSubmit(field)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded-md"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className="text-lg truncate">{formData[field]}</p>
                  <button
                    onClick={() => handleEditClick(field)}
                    className="text-sm text-blue-500 hover:text-blue-300"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Role - Read Only */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <label className="text-sm font-medium text-blue-400 sm:w-1/4">Role</label>
          <p className="text-lg truncate">{formData.role}</p>
        </div>
      </div>

      {/* Status Message */}
      {statusMessage && (
        <div className="mt-6 text-center text-sm text-green-400">
          {statusMessage}
        </div>
      )}
    </div>
  )
}

export default Profile
