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
import { useEffect } from 'react'
import FixtureVotingService from 'src/service/FixtureVotingService'
import ToastComponent from 'src/components/common/TaostComponent'
const FixtureVote = () => {
  const [users, setUsers] = useState([])
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    FixtureVotingService.getFixtureVotingListing()
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data)
        }
      })
      .catch((e) => {
        ToastComponent('Something went wrong.Please try again', 'error')
        setLoader(false)
      })
  }, [])
  return (
    <CRow>
      <CAccordion activeItemKey={1}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            <strong>Fixture Voting</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <Table users={users} setUsers={setUsers} setLoader={setLoader} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default FixtureVote
