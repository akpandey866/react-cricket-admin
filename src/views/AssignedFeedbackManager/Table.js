import React from 'react'
import moment from 'moment'
import { CButton } from '@coreui/react-pro'
import FixtureService from 'src/service/FixtureService'
import ToastComponent from 'src/components/common/TaostComponent'
import Notify from '../Notify'
import { useState } from 'react'
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
  // Are you sure want modal
  // Are you sure want modal
  // Are you sure want modal
  const [handleYes, setHandleYes] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [handleNo, setHandleNo] = useState(false)
  const [tableId, setTableId] = useState(false)

  const handleCancel = () => {
    console.log('You clicked No!')
    return setShowConfirm(false)
  }

  const handleConfirm = () => {
    deleteAssignedFeedbackManager(tableId)
    return setShowConfirm(false)
  }
  const areYouSureModal = (id) => {
    setShowConfirm(true)
    setTableId(id)
  }
  return (
    <>
      <table className="main-table table innertable">
        <thead>
          <tr>
            <th>Manager </th>
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
                  <CButton className="mx-2" color="danger" onClick={() => areYouSureModal(item.id)}>
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
      <Notify
        setShowConfirm={setShowConfirm}
        showConfirm={showConfirm}
        setHandleNo={setHandleNo}
        handleNo={handleNo}
        handleYes={handleYes}
        setHandleYes={setHandleYes}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        text="Are you sure you want to delete this?"
      />
    </>
  )
}

export default Table
