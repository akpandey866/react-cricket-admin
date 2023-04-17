import React, { useState } from 'react'
import Bootbox from 'bootbox-react'

const Notify = (props) => {
  // const [showConfirm, setShowConfirm] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  const handleClose = () => {
    console.log('You closed Alert!')
    return setShowAlert(false)
  }

  const handlePrompt = (result) => {
    console.log(`User input: ${result}`)
    return setShowPrompt(false)
  }
  return (
    <>
      {/* <button onClick={() => props.setShowConfirm(true)}>Confirm </button> */}
      <Bootbox
        show={props.showConfirm}
        type={'confirm'}
        message={props.text}
        onSuccess={props.handleConfirm}
        onCancel={props.handleCancel}
        onClose={props.handleCancel}
      />

      {/* <button onClick={() => setShowAlert(true)}> Alert </button> */}
      <Bootbox
        show={showAlert}
        type={'alert'}
        message={'This is a simple alert'}
        onClose={handleClose}
      />

      {/* <button onClick={() => setShowPrompt(true)}> Prompt </button> */}
      <Bootbox
        show={showPrompt}
        type={'prompt'}
        message={"What's your name"}
        onPrompt={handlePrompt}
      />
    </>
  )
}

export default Notify
