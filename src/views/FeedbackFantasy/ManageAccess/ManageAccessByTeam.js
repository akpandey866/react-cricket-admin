import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import Table from './Table'
import AddForm from './AddForm'
import { useEffect } from 'react'
import FeedbackFantasyService from 'src/service/FeedbackFantasyService'
import ToastComponent from 'src/components/common/TaostComponent'
const ManageAccessByTeam = () => {
  const [options, setOptions] = useState([])
  const [userList, setUserList] = useState([])
  const [users, setUsers] = useState([])
  const [managerDropdown, setManagerDropdown] = useState([])
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    FeedbackFantasyService.manageAccessByTeam()
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data)
          setOptions(res.team_list)
          setUserList(res.user_list)
          // setManagerDropdown(res.coach_listing)
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
                <strong>Manage Access</strong> <small>By Access</small>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AddForm
              setUsers={setUsers}
              managerDropdown={managerDropdown}
              setManagerDropdown={setManagerDropdown}
              options={options}
              userList={userList}
              setUserList={setUserList}
            />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardBody>
            <Table users={users} setUsers={setUsers} setLoader={setLoader} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ManageAccessByTeam
