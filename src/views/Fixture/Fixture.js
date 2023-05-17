import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CCollapse, CRow } from '@coreui/react-pro'
import Table from './Table'
import AddForm from './AddForm'
import { useEffect } from 'react'
import FixtureService from 'src/service/FixtureService'
import ToastComponent from 'src/components/common/TaostComponent'
const Fixture = () => {
  const [displayDetails, setDisplayDetails] = useState([])
  useEffect(() => {
    FixtureService.getActivatedDisplay()
      .then((res) => {
        if (res.status === 200) {
          setDisplayDetails(res.data)
        }
      })
      .catch((e) => {
        ToastComponent('Something went wrong. Please try again', 'error')
      })
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Create Fixture</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AddForm />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Manage Fixtures List</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            {' '}
            <Table displayDetails={displayDetails} setDisplayDetails={setDisplayDetails} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Fixture
