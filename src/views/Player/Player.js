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
import React, { useState } from 'react'
import AddForm from './AddForm'
import Table from './Table'

const Player = () => {
  const [users, setUsers] = useState([])
  return (
    <>
      <CRow>
        <CAccordion activeItemKey={1} alwaysOpen>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              {' '}
              <strong>Create Players</strong>
            </CAccordionHeader>
            <CAccordionBody>
              <AddForm setUsers={setUsers} />
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
        <CAccordion activeItemKey={1}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              {' '}
              <strong>Manage Players</strong>
            </CAccordionHeader>
            <CAccordionBody>
              <Table users={users} setUsers={setUsers} />
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </CRow>
    </>
  )
}

export default Player
