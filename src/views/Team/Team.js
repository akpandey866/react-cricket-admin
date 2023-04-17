import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CCollapse, CRow } from '@coreui/react-pro'
import AddForm from './AddForm'
import Table from './Table'
const Team = () => {
  const [visibleHorizontal, setVisibleHorizontal] = useState(false)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Add</strong> <small> Team</small>
              </CCol>
              <CCol xs={2}>
                <CButton
                  className="mb-3"
                  onClick={() => setVisibleHorizontal(!visibleHorizontal)}
                  aria-expanded={visibleHorizontal}
                  aria-controls="collapseWidthExample"
                >
                  Add
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CCollapse id="collapseWidthExample" horizontal visible={visibleHorizontal}>
              <AddForm />
            </CCollapse>
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

export default Team
