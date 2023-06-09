import React from 'react'
import { CButton } from '@coreui/react-pro'
import moment from 'moment'
import ToastComponent from 'src/components/common/TaostComponent.js'
import FeedbackFantasyService from 'src/service/FeedbackFantasyService'
const Table = (props) => {
  const deleteManager = (id) => {
    props.setLoader(true)
    const data = {}
    data.id = id
    FeedbackFantasyService.deleteFeedbackManager(data).then((res) => {
      if (res.status === 200) {
        props.setUsers(res.data)
        ToastComponent(res.message, 'success')
        props.setLoader(false)
      }
    })
  }
  return (
    <>
      <div className="table-responsive">
        <table className="main-table table innertable">
          <thead>
            <tr>
              <th>Member</th>
              <th>Email</th>
              <th>Created On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.users &&
              props.users.map((item, key) => (
                <tr key={key}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{moment(item.created_at).format('D.MM.YYYY')}</td>
                  <td>
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
      </div>
    </>
  )
}

export default Table
