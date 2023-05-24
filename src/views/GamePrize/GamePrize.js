import React, { useState } from 'react'
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
import Table from './Table'
import AddForm from './AddForm'
const GamePrize = () => {
  const [users, setUsers] = useState([])
  return (
    <CRow>
      <CAccordion activeItemKey={2}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Create Prize</strong>
          </CAccordionHeader>
          <CAccordionBody>
            {' '}
            <AddForm setUsers={setUsers} />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>
            {' '}
            <strong>Manage Prizes</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <Table users={users} setUsers={setUsers} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default GamePrize
