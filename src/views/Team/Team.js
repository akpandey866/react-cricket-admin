import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CCollapse, CRow } from '@coreui/react-pro'
import AddForm from './AddForm'
import Table from './Table'
const Team = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Add Teams</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AddForm />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Manage Teams</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <Table />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Team
