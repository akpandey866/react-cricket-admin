import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import React from 'react'

const TotalUserVoteModal = (props) => {
  return (
    <>
      <CModal size="lg" visible={props.visible} onClose={() => props.setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Match Votes - By Users</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <table className="main-table table table-bordered innertable">
            <thead>
              <tr>
                <th>Player</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              {props.fixtureDetail &&
                props.fixtureDetail.map((item, key) => (
                  <tr key={key}>
                    <th>{item?.player_name}</th>
                    <th>{item?.rating_star}</th>
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

export default TotalUserVoteModal
