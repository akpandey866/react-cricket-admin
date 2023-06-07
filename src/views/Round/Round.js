import React from 'react'
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
import { useState } from 'react'
import { useEffect } from 'react'
import RoundService from 'src/service/RoundService'
const Round = () => {
  const [users, setUsers] = useState([])
  const [roundNumber, setRoundNumber] = useState()
  return (
    <CRow>
      <CAccordion activeItemKey={1} alwaysOpen>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Create Rounds</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <AddForm roundNumber={roundNumber} setUsers={setUsers} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
      <CAccordion activeItemKey={1}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Manage Rounds</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <Table users={users} setUsers={setUsers} setRoundNumber={setRoundNumber} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default Round
