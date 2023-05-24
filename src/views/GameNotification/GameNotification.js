import React, { useState } from 'react'
import {
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react-pro'
import Table from './Table'
import AddForm from './AddForm'
const GameNotification = () => {
  const [users, setUsers] = useState([])
  return (
    <CRow>
      <CAccordion activeItemKey={2}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Create Notification</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <AddForm setUsers={setUsers} />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>
            {' '}
            <strong>Manage Notifications</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <Table users={users} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default GameNotification
