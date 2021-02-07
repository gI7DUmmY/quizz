import { ref } from "vue"
import { db } from '../firebase/config'

const GetQuestion = (id) => {
  const question = ref(null)
  const erreur = ref(null)

  const load = async () => {
    try {
      const res = await db.collection('quizz').doc(id).get()

      if (!res.exists) throw Error('Question introuvable')

      question.value = { ...res.data(), id: res.id }
    } catch (err) {
      erreur.value = err.message
      console.log(erreur.value)
    }
  }

  return { question, erreur, load }
}

export default GetQuestion