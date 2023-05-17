import React from 'react'
import moment from 'moment'
import { CButton } from '@coreui/react-pro'
import FixtureService from 'src/service/FixtureService'
import ToastComponent from 'src/components/common/TaostComponent'
const Table = (props) => {
  const deleteAssignedFeedbackManager = (id) => {
    const data = {}
    data.id = id
    data.fixtureId = props.fixtureId
    FixtureService.deleteAssignedFeedbackManager(data)
      .then((res) => {
        if (res.status === 200) {
          props.setCoachListing(res.coach_listing)
          ToastComponent(res.message, 'success')
        }
      })
      .catch((e) => {
        console.log('Error Comes here', e)
      })
  }
  return (
    <>
      <table className="main-table table innertable">
        <thead>
          <tr>
            <th>Username </th>
            <th>Created On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.coachListing &&
            props.coachListing.map((item, key) => (
              <tr key={key}>
                <th>{item?.username}</th>
                <td>{moment(item.created_at).format('D.MM.YYYY')}</td>
                <td>
                  <CButton
                    className="mx-2"
                    color="success"
                    onClick={() => deleteAssignedFeedbackManager(item.id)}
                  >
                    Delete
                  </CButton>
                </td>
              </tr>
            ))}
          {props.coachListing.length === 0 && (
            <tr>
              <td colSpan={4}>No record yet available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Table
