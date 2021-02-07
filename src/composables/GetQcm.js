import { ref } from "vue"
import { db } from '../firebase/config'

const GetQcm = () => {
  const qcm = ref([])
  const erreur = ref(null)

  const load = async () => {
    try {
      const res = await db.collection('quizz').get()

      qcm.value = res.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
    } catch (err) {
      erreur.value = err.message
      console.log(erreur.value)
    }
  }

  return { qcm, erreur, load }
}

export default GetQcm