import React, { useState } from 'react'
import { CButton } from '@coreui/react-pro'
import moment from 'moment'
import ToastComponent from 'src/components/common/TaostComponent.js'
import FeedbackFantasyService from 'src/service/FeedbackFantasyService'
import TeamModal from './TeamModal'
const Table = (props) => {
  const deleteManager = (id) => {
    props.setLoader(true)
    FeedbackFantasyService.deleteManagerAccess(id).then((res) => {
      if (res.status === 200) {
        props.setUsers((current) => current.filter((fruit) => fruit.id !== id))
        ToastComponent(res.message, 'success')
        props.setLoader(false)
      }
    })
  }
  const [visible, setVisible] = useState(false)
  const [teamDetail, setTeamDetail] = useState([])
  const [feedbackManagerId, setFeedbackManagerId] = useState([])
  const viewTeam = (id) => {
    setVisible(true)
    setFeedbackManagerId(id)
    FeedbackFantasyService.showTeamListing(id).then((res) => {
      if (res.status === 200) {
        setTeamDetail(res.data)
        props.setLoader(false)
      }
    })
  }
  return (
    <>
      <table className="main-table table innertable">
        <thead>
          <tr>
            <th>SN</th>
            <th>User Name</th>
            <th>Added On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.users &&
            props.users.map((item, key) => (
              <tr key={key}>
                <th>{key + 1}</th>
                <th>{item.username}</th>
                <th>{moment(item.created_at).format('D.MM.YYYY')}</th>
                <td>
                  <CButton
                    size="sm"
                    color="success"
                    className="ml-3"
                    onClick={() => viewTeam(item.id)}
                  >
                    View
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-3"
                    onClick={() => deleteManager(item.id)}
                  >
                    Delete
                  </CButton>
                </td>
              </tr>
            ))}
          {props.users.length <= 0 && (
            <tr>
              <td colSpan={4}>No record yet available.</td>
            </tr>
          )}
        </tbody>
      </table>
      <TeamModal
        visible={visible}
        setVisible={setVisible}
        teamDetail={teamDetail}
        setTeamDetail={setTeamDetail}
        feedbackManagerId={feedbackManagerId}
      />
    </>
  )
}

export default Table
