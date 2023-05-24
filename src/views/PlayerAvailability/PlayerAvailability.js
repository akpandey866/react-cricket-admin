import React, { useEffect, useState } from 'react'
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
import CommonService from 'src/service/CommonService'
const PlayerAvailability = () => {
  const [multiOption, setMultiOption] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    CommonService.clubPlayers().then((result) => {
      setMultiOption(result.data)
    })
  }, [])
  return (
    <CRow>
      <CAccordion activeItemKey={2}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Create Availability</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <AddForm multiOption={multiOption} setUsers={setUsers} />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>
            {' '}
            <strong>Manage Availability</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <Table users={users} multiOption={multiOption} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default PlayerAvailability
