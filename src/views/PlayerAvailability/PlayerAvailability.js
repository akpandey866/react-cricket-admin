import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CCollapse, CRow } from '@coreui/react-pro'
import Table from './Table'
import AddForm from './AddForm'
import CommonService from 'src/service/CommonService'
const PlayerAvailability = () => {
  const [multiOption, setMultiOption] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    CommonService.clubPlayers().then((result) => {
      setMultiOption(result.data)
    })
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Add</strong> <small> Availability</small>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AddForm multiOption={multiOption} setUsers={setUsers} />
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

export default PlayerAvailability
