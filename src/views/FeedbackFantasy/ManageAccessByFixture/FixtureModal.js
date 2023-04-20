import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import moment from 'moment'
import React from 'react'
import ToastComponent from 'src/components/common/TaostComponent'
import FeedbackFantasyService from 'src/service/FeedbackFantasyService'

const FixtureModal = (props) => {
  const deleteFixture = (id, managerAccessId) => {
    console.log('table id', id)
    FeedbackFantasyService.deleteManagerFixture(id, managerAccessId).then((res) => {
      if (res.status === 200) {
        ToastComponent(res.message, 'success')
        props.setFixtureDetail((current) => current.filter((fruit) => fruit.id !== id))
      }
    })
  }
  return (
    <>
      <CModal visible={props.visible} onClose={() => props.setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Fixture Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <table className="main-table table table-bordered innertable">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {props.fixtureDetail &&
                props.fixtureDetail.map((item, key) => (
                  <tr key={key}>
                    <th>{item?.team_name}</th>
                    <th>{moment(item.start_date).format('D.MM.YYYY')}</th>
                    <th>{moment(item.end_date).format('D.MM.YYYY')}</th>
                    <th>
                      {' '}
                      <CButton
                        size="sm"
                        color="danger"
                        className="ml-3"
                        onClick={() => deleteFixture(item.id, item.feedback_manager_access_id)}
                      >
                        Delete
                      </CButton>
                    </th>
                  </tr>
                ))}
              {props.fixtureDetail.length <= 0 && (
                <tr>
                  <td colSpan={4}>No record yet available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => props.setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default FixtureModal
