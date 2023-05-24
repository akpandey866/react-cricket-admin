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
      <CAccordion activeItemKey={2}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Assign Access By Fixtures</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <AddForm
              setUsers={setUsers}
              userList={userList}
              setUserList={setUserList}
              fixtureList={fixtureList}
              setFixtureList={setFixtureList}
            />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>
            {' '}
            <strong>Manage Access By Fixtures</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <Table users={users} setUsers={setUsers} setLoader={setLoader} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default ManageAccessByFixture
