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

const FixtureVoteModal = (props) => {
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
      <CModal size="lg" visible={props.visible} onClose={() => props.setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Fixture Votes</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <table className="main-table table table-bordered innertable">
            <thead>
              <tr>
                <th>Player Name</th>
                <th>3 Votes</th>
                <th>2 Votes</th>
                <th>1 Votes</th>
                <th>Total Votes</th>
              </tr>
            </thead>
            <tbody>
              {props.fixtureDetail &&
                props.fixtureDetail.map((item, key) => (
                  <tr key={key}>
                    <th>{item?.full_name}</th>
                    <th>{item?.three_votes}</th>
                    <th>{item?.two_votes}</th>
                    <th>{item?.one_votes}</th>
                    <th>{item?.total_votes}</th>
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

export default FixtureVoteModal
