import { ref } from "vue"
import { db } from '../firebase/config'

const GetQcm = () => {
  const qcm = ref([])
  const erreur = ref(null)

  const load = async () => {
    db.collection('quizz')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        let database = snap.docs.map(doc => {
          return { ...doc.data(), id: doc.id }
        })
        qcm.value = database
      }), (err) => erreur.value = err
  }

  return { qcm, erreur, load }
}

export default GetQcm