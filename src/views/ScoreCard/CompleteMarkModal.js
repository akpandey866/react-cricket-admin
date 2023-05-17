import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import React from 'react'

const CompleteMarkModal = (props) => {
  return (
    <CModal backdrop="static" visible={props.visible} onClose={() => props.setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Scoring Tip</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <ul className="fw-bold">
          <li>
            Always press `Save` and set the status as `In-Progress` as you continue to enter your
            scores.
          </li>
          <li>See fantasy points column to ensure the numbers seem correct.</li>
          <li>
            Only mark the fixture as ‘Completed’ when you`re sure you don`t want any further updates
            to the fixture.
          </li>
          <li>Completed fixtures cannot be re-opened or reversed!</li>
          <li>
            See more details{' '}
            <a
              href="https://myclubtap.freshdesk.com/support/solutions/articles/43000534774-step-1-4-1-add-squad-enter-match-score-set-match-status-for-score-entry"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            .
          </li>
        </ul>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.setVisible(false)}>
          Close
        </CButton>
        {/* <CButton color="primary">Save changes</CButton> */}
      </CModalFooter>
    </CModal>
  )
}

export default CompleteMarkModal
