import React from 'react'
import { CButton, CCol, CRow } from '@coreui/react-pro'
import moment from 'moment'
import ToastComponent from 'src/components/common/TaostComponent.js'
import FeedbackFantasyService from 'src/service/FeedbackFantasyService'
import { useState } from 'react'
import FixtureModal from './FixtureModal'
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
  const [fixtureDetail, setFixtureDetail] = useState([])
  const [feedbackManagerId, setFeedbackManagerId] = useState([])
  const viewFixture = (id) => {
    setVisible(true)
    setFeedbackManagerId(id)
    FeedbackFantasyService.showFixtureListing(id).then((res) => {
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
                    <th>
                      <CButton
                        size="sm"
                        color="success"
                        className="ml-3"
                        onClick={() => viewFixture(item.id)}
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
      <FixtureModal
        visible={visible}
        setVisible={setVisible}
        fixtureDetail={fixtureDetail}
        setFixtureDetail={setFixtureDetail}
        feedbackManagerId={feedbackManagerId}
      />
    </>
  )
}

export default Table
