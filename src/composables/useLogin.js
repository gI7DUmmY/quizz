import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const erreur = ref(null)

const login = async (email, password) => {
  erreur.value = null

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    erreur.value = null
    return res
  } catch (err) {
    console.log(err.message)
    erreur.value = 'login failed'
  }
}

const useLogin = () => {
  return { erreur, login }
}

export default useLogin