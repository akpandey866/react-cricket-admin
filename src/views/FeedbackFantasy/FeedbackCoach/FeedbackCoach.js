import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import Table from './Table'
import AddForm from './AddForm'
import { useEffect } from 'react'
import FeedbackFantasyService from 'src/service/FeedbackFantasyService'
import ToastComponent from 'src/components/common/TaostComponent'
const FeedbackCoach = () => {
  const [users, setUsers] = useState([])
  const [managerDropdown, setManagerDropdown] = useState([])
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    FeedbackFantasyService.managerListing()
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data)
          setManagerDropdown(res.coach_listing)
        }
      })
      .catch((e) => {
        ToastComponent('Something went wrong.Please try again', 'error')
        setLoader(false)
      })
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Create Feedback Manager</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AddForm
              setUsers={setUsers}
              managerDropdown={managerDropdown}
              setManagerDropdown={setManagerDropdown}
            />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Manage Feedback Managers</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <Table users={users} setUsers={setUsers} setLoader={setLoader} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FeedbackCoach
