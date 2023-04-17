import React from 'react'
const checkIfImageExists = (url) => {
  const img = new Image()
  img.src = url

  if (img.complete) {
    return (
      <>
        <img src={url} width={70} height={50} alt="sponsor_image" />
      </>
    )
  } else {
    img.onload = () => {
      return (
        <>
          <img src={url} width={70} height={50} alt="sponsor_image" />
        </>
      )
    }

    img.onerror = () => {
      return '<p>Not Available</p>'
    }
  }
}

const Helper = {
  checkIfImageExists,
}

export default Helper
