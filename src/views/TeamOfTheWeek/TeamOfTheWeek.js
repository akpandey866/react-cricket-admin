import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import React from 'react'
import TeamOfTheWeekTable from './TeamOfTheWeekTable'

const BonusCard = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Team of The Round</strong>
          </CCardHeader>
          <CCardBody>
            <TeamOfTheWeekTable />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BonusCard
