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
                <strong>Add Multiple Players</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AddForm setPickedPlayer={setPickedPlayer} />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        {' '}
        <Table pickedPlayer={pickedPlayer} />
      </CCol>
    </CRow>
  )
}

export default TeamPlayer
