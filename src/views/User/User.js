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
const User = () => {
  const [users, setUsers] = useState([])
  return (
    <CRow>
      <CAccordion activeItemKey={1} alwaysOpen>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            <strong>Create Member</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <AddForm setUsers={setUsers} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
      <CAccordion activeItemKey={1}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            <strong>Manage Members List</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <Table users={users} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default User
