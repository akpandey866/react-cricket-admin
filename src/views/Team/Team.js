import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react-pro'
import AddForm from './AddForm'
import Table from './Table'
import { useEffect } from 'react'
import TeamService from 'src/service/TeamService'
import ToastComponent from 'src/components/common/TaostComponent'
const Team = () => {
  const [gradeList, setGradeList] = useState([])
  const [teamCategoryList, setTeamCategoryList] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    TeamService.getAddTeamData()
      .then((res) => {
        if (res.status === 200) {
          setGradeList(res.grade_list)
          setTeamCategoryList(res.team_category)
        }
      })
      .catch((e) => {
        ToastComponent(e.response?.data?.message, 'error')
      })
  }, [])
  return (
    <CRow>
      <CAccordion activeItemKey={1} alwaysOpen>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Create Teams</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <AddForm
              gradeList={gradeList}
              teamCategoryList={teamCategoryList}
              setUsers={setUsers}
            />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
      <CAccordion activeItemKey={1}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Manage Teams</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <Table gradeList={gradeList} users={users} teamCategoryList={teamCategoryList} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default Team
