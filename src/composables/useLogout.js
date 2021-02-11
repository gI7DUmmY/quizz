import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const logoutError = ref(null)

const logout = async () => {
  logoutError.value = null

  try {
    await projectAuth.signOut()
  } catch (err) {
    console.log(err.message)
    logoutError.value = err.message
  }
}

const useLogout = () => {
  return { logoutError, logout }
}

export default useLogout