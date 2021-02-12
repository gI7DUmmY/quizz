import { ref, watchEffect } from "vue"
import { db } from '../firebase/config'

const GetQcm = () => {
  const qcm = ref([])
  const erreur = ref(null)

  const load = async () => {
    let collec = db.collection('quizz').orderBy('createdAt', 'desc')

    const unsub = collec.onSnapshot(snap => {
      let database = snap.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      qcm.value = database
    }, (err) => erreur.value = err.message)

    watchEffect((onInvalidate) => {
      // désactivation du listener snapshot quand composant unmount
      onInvalidate(() => unsub())
    })
  }

  return { qcm, erreur, load }
}

export default GetQcm