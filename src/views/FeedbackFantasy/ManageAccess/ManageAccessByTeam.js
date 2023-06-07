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
      <CAccordion activeItemKey={1} alwaysOpen>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Assign Access By Teams</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <AddForm
              setUsers={setUsers}
              managerDropdown={managerDropdown}
              setManagerDropdown={setManagerDropdown}
              options={options}
              userList={userList}
              setUserList={setUserList}
            />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
      <CAccordion activeItemKey={1}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Manage Access By Teams</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <Table users={users} setUsers={setUsers} setLoader={setLoader} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default ManageAccessByTeam
