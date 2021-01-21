import { ref } from "vue"

const GetQuestion = (id) => {
  const question = ref(null)
  const erreur = ref(null)

  const load = async () => {
    try {
      let data = await fetch("http://localhost:3000/quizz/" + id)
      if (!data.ok) {
        throw Error('Problème de fetch')
      }
      question.value = await data.json()
    } catch (err) {
      erreur.value = err.message
      console.log(erreur.value)
    }
  }

  return { question, erreur, load }
}

export default GetQuestion