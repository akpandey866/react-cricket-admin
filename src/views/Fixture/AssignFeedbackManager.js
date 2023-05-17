import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import AddForm from './AddForm'
import { Table } from 'react-bootstrap'
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
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Assign FeedbackManager</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AddForm userList={userList} setUserList={setUserList} />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Manage Assigned Members</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <Table coachListing={coachListing} setCoachListing={setCoachListing} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AssignFeedbackManager
