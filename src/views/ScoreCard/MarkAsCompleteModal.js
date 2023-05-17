import React from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
const MarkAsCompleteModal = (props) => {
  return (
    <>
      <CModal
        backdrop="static"
        visible={props.completMarkModalVisible}
        onClose={() => props.setCompletMarkModalVisible(false)}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>Scoring Tip</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p className="fw-bold">
            Proceed further if the fantasy points numbers look good, or go back to make any required
            adjustments!
          </p>
          <table className="main-table table table-bordered innertable">
            <thead>
              <tr>
                <th>Player</th>
                <th>Fantasy Points</th>
              </tr>
            </thead>
            <tbody>
              {props.data &&
                props.data?.map((item, key) => (
                  <tr key={key}>
                    <th>
                      {item.player_name} <br></br> (<em>{item.position}</em>)
                    </th>
                    <th>{item.fantasy_points}</th>
                  </tr>
                ))}
              {props.data.length === 0 && (
                <tr>
                  <td colSpan={2}>No record yet available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => props.setCompletMarkModalVisible(false)}>
            Close
          </CButton>
          <CButton color="success">Mark as Complete</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default MarkAsCompleteModal
