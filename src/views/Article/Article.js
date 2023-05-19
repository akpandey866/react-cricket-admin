import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import Table from './Table'
import AddForm from './AddForm'
const Article = () => {
  const [users, setUsers] = useState([])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Create Article</strong>
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
                <strong>Manage Articles</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <Table users={users} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Article
