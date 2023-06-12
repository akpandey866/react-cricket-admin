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
import { useEffect } from 'react'
import FixtureService from 'src/service/FixtureService'
import ToastComponent from 'src/components/common/TaostComponent'
const Fixture = () => {
  const [displayDetails, setDisplayDetails] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    FixtureService.getActivatedDisplay()
      .then((res) => {
        if (res.status === 200) {
          setDisplayDetails(res.data)
        }
      })
      .catch((e) => {
        ToastComponent('Something went wrong. Please try again', 'error')
      })
  }, [])
  return (
    <CRow>
      <CAccordion activeItemKey={1} alwaysOpen>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Create Fixtures</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <AddForm users={users} setUsers={setUsers} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
      <CAccordion activeItemKey={1}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Manage Fixtures</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <Table displayDetails={displayDetails} setDisplayDetails={setDisplayDetails} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default Fixture
