import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import Table from './Table'
import AddForm from './AddForm'
import CommonService from 'src/service/CommonService'
const VerifyUser = () => {
  const [userList, setUserList] = useState([])
  const [playerList, setPlayerList] = useState([])
  const [users, setUsers] = useState({})
  useEffect(() => {
    CommonService.getVerifyUser()
      .then((res) => {
        if (res.status === 200) {
          setUserList(res.user_list)
          setPlayerList(res.player_list)
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
                <strong>Add</strong> <small> Verify User</small>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AddForm userList={userList} playerList={playerList} setUsers={setUsers} />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardBody>
            <Table users={users} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default VerifyUser
