import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CCollapse, CRow } from '@coreui/react-pro'
import Table from './Table'
import AddForm from './AddForm'
const TeamPlayer = () => {
  const [pickedPlayer, setPickedPlayer] = useState([])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Add</strong> <small> Players</small>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AddForm setPickedPlayer={setPickedPlayer} />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardBody>
            <Table pickedPlayer={pickedPlayer} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default TeamPlayer
