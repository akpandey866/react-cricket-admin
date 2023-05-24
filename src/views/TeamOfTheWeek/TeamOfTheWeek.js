import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react-pro'
import React from 'react'
import TeamOfTheWeekTable from './TeamOfTheWeekTable'

const BonusCard = () => {
  return (
    <CRow>
      <CAccordion activeItemKey={1}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Team of The Round</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <TeamOfTheWeekTable />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default BonusCard
