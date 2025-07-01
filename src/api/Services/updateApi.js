// UpdateApi.js
import { apiConnector } from '../apiconnector'
import {userendpoints} from '../apis'

const { UPDATE_PROFILE } = userendpoints

export async function UpdateApi(data) {
  try {
    const response = await apiConnector('POST', UPDATE_PROFILE, data)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || 'Update failed')
    }

    return response.data.response
  } catch (err) {
    console.error('Error updating profile:', err)
    throw err
  }
}
