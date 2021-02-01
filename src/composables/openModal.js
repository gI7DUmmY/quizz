const openModal = () => {
  const elem = document.querySelector('#modal1')
  const instance = M.Modal.getInstance(elem)
  instance.open()
}

export default openModal