import React from 'react'
import { useState } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'

const PageInfoModal = (props) => {
  return (
    <CModal
      alignment="center"
      scrollable
      visible={props.infoPageModal}
      onClose={() => props.setInfoPageModal(false)}
    >
      <CModalHeader>
        <CModalTitle>Information</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Comming Soon!</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.setInfoPageModal(false)}>
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default PageInfoModal
