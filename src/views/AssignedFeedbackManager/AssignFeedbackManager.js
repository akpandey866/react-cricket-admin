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
import moment from 'moment'
const AssignFeedbackManager = () => {
  const param = useParams()
  // getFeedbackManagerList
  const [userList, setUserList] = useState([])
  const [coachListing, setCoachListing] = useState([])
  const [fixtureDetails, setFixtureDetails] = useState({})
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
    FixtureService.getFixtureDetail(param.fixtureId).then((res) => {
      if (res.status === 200) {
        setFixtureDetails(res.data)
      }
    })
  }, [param.fixtureId])
  return (
    <CRow>
      <CCol xs={12} md={3} className="mb-3">
        <span>
          <b> Team</b>: {fixtureDetails?.team_name}
        </span>
      </CCol>
      <CCol xs={12} md={3}>
        <span>
          <b> Start Date</b>: {moment(fixtureDetails.start_date).format('D.MM.YYYY')}
        </span>
      </CCol>
      <CCol xs={12} md={3}>
        <span>
          <b> End Date</b>: {moment(fixtureDetails.end_date).format('D.MM.YYYY')}
        </span>
      </CCol>
      <CAccordion activeItemKey={1}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Assign Feedback Manager</strong>
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
      </CAccordion>
      <CAccordion activeItemKey={1}>
        <CAccordionItem itemKey={1}>
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
