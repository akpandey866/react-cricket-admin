import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CCollapse, CRow } from '@coreui/react-pro'
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
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Add Teams</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AddForm
              gradeList={gradeList}
              teamCategoryList={teamCategoryList}
              setUsers={setUsers}
            />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Manage Teams</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <Table gradeList={gradeList} teamCategoryList={teamCategoryList} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Team
