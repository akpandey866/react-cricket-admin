import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import Table from './Table'
import AddForm from './AddForm'
import { useState } from 'react'
import { useEffect } from 'react'
import RoundService from 'src/service/RoundService'
const Round = () => {
  const [users, setUsers] = useState([])
  const [roundNumber, setRoundNumber] = useState()
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Create Rounds</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AddForm roundNumber={roundNumber} setUsers={setUsers} />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Manage Rounds</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <Table users={users} setUsers={setUsers} setRoundNumber={setRoundNumber} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Round
