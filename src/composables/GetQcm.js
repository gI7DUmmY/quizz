import { ref } from "vue"

const GetQcm = () => {
  const qcm = ref([])
  const erreur = ref(null)

  // const load = () => {
  //   fetch("http://localhost:3000/quizz")
  //     .then(res => res.json())
  //     .then(data => qcm.value = data)
  //     .catch(err => console.log(err.message))
  // }
  
  const load = async () => {
    try {
      let data = await fetch("http://localhost:3000/quizz")
      if (!data.ok) {
        throw Error('Problème de fetch')
      }
      qcm.value = await data.json()
    } catch (err) {
      erreur.value = err.message
      console.log(erreur.value)
    }
  }

  return { qcm, erreur, load }
}

export default GetQcm