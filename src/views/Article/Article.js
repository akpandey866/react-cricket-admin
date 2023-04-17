import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CCollapse, CRow } from '@coreui/react-pro'
import Table from './Table'

import AddForm from './AddForm'
const Article = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Add</strong> <small> Article</small>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AddForm />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardBody>
            <Table />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Article
