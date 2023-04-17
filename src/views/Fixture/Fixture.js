import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CCollapse, CRow } from '@coreui/react-pro'
import Table from './Table'
import AddForm from './AddForm'
const Fixture = () => {
  const [visibleHorizontal, setVisibleHorizontal] = useState(false)
  // const [gradeList, setGradeList] = useState()
  // const chooseMessage = (data) => {
  //   setGradeList(data)
  // }
  // console.log('gradeas', gradeList)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Add</strong> <small> Fixture</small>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AddForm />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardBody>
            <Table />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Fixture
