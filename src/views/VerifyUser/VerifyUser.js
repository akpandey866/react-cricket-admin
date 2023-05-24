import React, { useEffect, useState } from 'react'
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
      <CAccordion activeItemKey={2}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Verify Member</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <AddForm userList={userList} playerList={playerList} setUsers={setUsers} />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>
            {' '}
            <strong>Manage Articles</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <Table users={users} setUsers={setUsers} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default VerifyUser
