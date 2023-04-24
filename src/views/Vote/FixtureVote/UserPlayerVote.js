import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import { useEffect } from 'react'
import FixtureVotingService from 'src/service/FixtureVotingService'
import ToastComponent from 'src/components/common/TaostComponent'
import moment from 'moment'
import TotalUserVoteModal from './TotalUserVoteModal'
import { useParams } from 'react-router-dom'
const UserPlayerVote = () => {
  const urlParams = useParams()
  const [fixtureDetail, setFixtureDetail] = useState([])
  const [users, setUsers] = useState([])
  const [loader, setLoader] = useState(false)
  const fixtureId = urlParams.fixtureId
  useEffect(() => {
    FixtureVotingService.userPlayerRating(fixtureId)
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data)
        }
      })
      .catch((e) => {
        ToastComponent('Something went wrong.Please try again', 'error')
        setLoader(false)
      })
  }, [fixtureId])
  const [visible, setVisible] = useState(false)
  const viewUserTotalVote = (fixtureId, userId) => {
    setVisible(true)
    FixtureVotingService.getUserPlayingModal(fixtureId, userId).then((res) => {
      if (res.status === 200) {
        setFixtureDetail(res.data)
        setLoader(false)
      }
    })
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>{"User's Ratings"}</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={12}>
                <table className="main-table table table-bordered innertable">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Voted On</th>
                      <th>View Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((item, key) => (
                        <tr key={key}>
                          <th>{item.username}</th>
                          <th>{moment(item.created_at).format('D.MM.YYYY')}</th>
                          <th>
                            {' '}
                            <CButton
                              size="sm"
                              color="success"
                              className="ml-3"
                              onClick={() => viewUserTotalVote(item.fixture_id, item.user_id)}
                            >
                              Fixture Average Votes
                            </CButton>
                          </th>
                        </tr>
                      ))}
                    {users.length <= 0 && (
                      <tr>
                        <td colSpan={4}>No record yet available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CCol>
            </CRow>
            <TotalUserVoteModal
              visible={visible}
              setVisible={setVisible}
              fixtureDetail={fixtureDetail}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserPlayerVote
