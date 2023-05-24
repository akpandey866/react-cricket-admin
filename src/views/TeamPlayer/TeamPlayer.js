import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react-pro'
import Table from './Table'
import AddForm from './AddForm'
const TeamPlayer = () => {
  const [pickedPlayer, setPickedPlayer] = useState([])
  return (
    <CRow>
      <CAccordion>
        <CAccordionItem>
          <CAccordionHeader>
            {' '}
            <strong>Add Multiple Players</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <AddForm setPickedPlayer={setPickedPlayer} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
      <CCol xs={12}>
        {' '}
        <Table pickedPlayer={pickedPlayer} />
      </CCol>
    </CRow>
  )
}

export default TeamPlayer
