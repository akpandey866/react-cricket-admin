import React from 'react'
import { CButton, CCol, CRow } from '@coreui/react-pro'
import moment from 'moment'
import ToastComponent from 'src/components/common/TaostComponent.js'
import FixtureVotingService from 'src/service/FixtureVotingService'
import { useState } from 'react'
import FixtureVoteModal from './FixtureVoteModal'
import AverageVoteModal from './AverageVoteModal'
import { Link } from 'react-router-dom'
const Table = (props) => {
  const deleteManager = (id) => {
    props.setLoader(true)
    FixtureVotingService.deleteManagerAccess(id).then((res) => {
      if (res.status === 200) {
        props.setUsers((current) => current.filter((fruit) => fruit.id !== id))
        ToastComponent(res.message, 'success')
        props.setLoader(false)
      }
    })
  }
  const [visible, setVisible] = useState(false)
  const [avgVisible, setAvgVisible] = useState(false)
  const [fixtureDetail, setFixtureDetail] = useState([])
  const [averageVote, setAverageVote] = useState([])
  const [voteByUser, setVoteByUser] = useState([])

  const viewFixtureVote = (fixtureId) => {
    setVisible(true)

    FixtureVotingService.getFixtureVote(fixtureId).then((res) => {
      if (res.status === 200) {
        setFixtureDetail(res.data)
        props.setLoader(false)
      }
    })
  }
  const viewAverageVote = (fixtureId) => {
    setAvgVisible(true)
    FixtureVotingService.getAverageFitureVote(fixtureId).then((res) => {
      if (res.status === 200) {
        setAverageVote(res.data)
        props.setLoader(false)
      }
    })
  }
  const viewVoteByUser = (id) => {
    setVisible(true)
    setVoteByUser(id)
    FixtureVotingService.getVoteByUser(id).then((res) => {
      if (res.status === 200) {
        setFixtureDetail(res.data)
        props.setLoader(false)
      }
    })
  }
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <table className="main-table table table-bordered innertable">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Start Date</th>
                <th>Added On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {props.users &&
                props.users.map((item, key) => (
                  <tr key={key}>
                    <th>{item.team_name}</th>
                    <th>{moment(item.start_date).format('D.MM.YYYY')}</th>
                    <th>{moment(item.end_date).format('D.MM.YYYY')}</th>
                    <th>
                      <CButton
                        size="sm"
                        color="success"
                        className="ml-3"
                        onClick={() => viewFixtureVote(item.fixture_id)}
                      >
                        Fixture Votes
                      </CButton>
                      <CButton
                        size="sm"
                        color="success"
                        className="ml-3"
                        onClick={() => viewAverageVote(item.fixture_id)}
                      >
                        Fixture Average Votes
                      </CButton>
                      <Link
                        to={`/fixture-voting/user-player-voting/${item.fixture_id}`}
                        size="sm"
                        className="btn btn-success ml-3"
                      >
                        Fixture Votes - By Users
                      </Link>
                    </th>
                  </tr>
                ))}
              {props.users.length <= 0 && (
                <tr>
                  <td colSpan={4}>No record yet available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </CCol>
      </CRow>
      <FixtureVoteModal
        visible={visible}
        setVisible={setVisible}
        fixtureDetail={fixtureDetail}
        setFixtureDetail={setFixtureDetail}
      />
      <AverageVoteModal
        visible={avgVisible}
        setVisible={setAvgVisible}
        averageVote={averageVote}
        setAverageVote={setAverageVote}
      />
    </>
  )
}

export default Table
