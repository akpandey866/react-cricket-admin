import React from 'react'
import { CToast, CToastBody, CToastClose } from '@coreui/react-pro'
const SweetToast = () => {
  return (
    <>
      <CToast
        autohide={false}
        visible={true}
        color="primary"
        className="text-white align-items-center"
      >
        <div className="d-flex">
          <CToastBody>Hello, world! This is a toast message.</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
    </>
  )
}

export default SweetToast
