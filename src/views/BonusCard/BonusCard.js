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
import BonusTable from './BonusTable'

const BonusCard = () => {
  return (
    <CRow>
      <CAccordion activeItemKey={1} alwaysOpen>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Bonus Card</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <BonusTable />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default BonusCard
