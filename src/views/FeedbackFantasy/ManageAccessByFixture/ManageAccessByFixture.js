import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import Table from './Table'
import AddForm from './AddForm'
import { useEffect } from 'react'
import FeedbackFantasyService from 'src/service/FeedbackFantasyService'
import ToastComponent from 'src/components/common/TaostComponent'
const ManageAccessByFixture = () => {
  const [userList, setUserList] = useState([])
  const [users, setUsers] = useState([])
  const [fixtureList, setFixtureList] = useState([])
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    FeedbackFantasyService.manageAccessByFixture()
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data)
          setFixtureList(res.fixture_list)
          setUserList(res.user_list)
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
                <strong>Assign Access By Fixtures</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AddForm
              setUsers={setUsers}
              userList={userList}
              setUserList={setUserList}
              fixtureList={fixtureList}
              setFixtureList={setFixtureList}
            />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Manage Access By Fixtures</strong>
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

export default ManageAccessByFixture
