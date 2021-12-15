function fileUpload(file) {
  let formData = new FormData()

  formData.append('file', file)

  return fetch('/api/uploadimage', {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData
  })
}