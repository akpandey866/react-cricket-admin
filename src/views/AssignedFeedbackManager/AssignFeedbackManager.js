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
import AddForm from './AddForm'
import Table from './Table'
import { useState } from 'react'
import { useEffect } from 'react'
import FixtureService from 'src/service/FixtureService'
import { useParams } from 'react-router-dom'
const AssignFeedbackManager = () => {
  const param = useParams()
  // getFeedbackManagerList
  const [userList, setUserList] = useState([])
  const [coachListing, setCoachListing] = useState([])
  useEffect(() => {
    FixtureService.getFeedbackManagerList(param.fixtureId)
      .then((res) => {
        if (res.status === 200) {
          setUserList(res.data)
          setCoachListing(res.coach_listing)
        }
      })
      .catch((e) => {
        console.log('Error Comes here', e)
      })
  }, [param.fixtureId])
  return (
    <CRow>
      <CAccordion activeItemKey={2}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Assign FeedbackManager</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <AddForm
              userList={userList}
              setUserList={setUserList}
              fixtureId={param.fixtureId}
              setCoachListing={setCoachListing}
            />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>
            {' '}
            <strong>Manage Assigned Members</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <Table
              coachListing={coachListing}
              setCoachListing={setCoachListing}
              fixtureId={param.fixtureId}
            />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default AssignFeedbackManager
