import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import Table from './Table'
import { useEffect } from 'react'
import FixtureVotingService from 'src/service/FixtureVotingService'
import ToastComponent from 'src/components/common/TaostComponent'
const FixtureVote = () => {
  const [users, setUsers] = useState([])
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    FixtureVotingService.getFixtureVotingListing()
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data)
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
                <strong>Fixture Voting</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <Table users={users} setUsers={setUsers} setLoader={setLoader} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FixtureVote
