const openModal = (id) => {
  const elem = document.querySelector('#' + id)
  const instance = M.Modal.getInstance(elem)
  instance.open()
}

export default openModal