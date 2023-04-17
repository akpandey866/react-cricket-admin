import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import React from 'react'
import BonusTable from './BonusTable'

const BonusCard = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Bonus Card</strong>
          </CCardHeader>
          <CCardBody>
            <BonusTable />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BonusCard
