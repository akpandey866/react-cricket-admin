import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import AddForm from './AddForm'
import Table from './Table'

const Player = () => {
  const [users, setUsers] = useState([])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol xs={10}>
                  <strong>Create Players</strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <AddForm setUsers={setUsers} />
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol xs={10}>
                  <strong>Manage Players List</strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <Table users={users} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Player
