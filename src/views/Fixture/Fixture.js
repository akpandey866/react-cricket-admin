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
      <CAccordion activeItemKey={2}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Create Fixture</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <AddForm />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>
            {' '}
            <strong>Manage Fixtures List</strong>
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
