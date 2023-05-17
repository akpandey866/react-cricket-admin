import React, { useState, useEffect } from 'react'
import ToastComponent from 'src/components/common/TaostComponent'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import PlayerService from 'src/service/PlayerService'
import moment from 'moment'
const PlayerClaimProfile = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    PlayerService.playerProfileClaimListing()
      .then((res) => {
        if (res.status === 200) {
          setData(res.data)
        }
      })
      .catch((e) => {
        console.log('Error =>', e)
        ToastComponent('Something went wrong. Please try again.', 'error')
      })
  }, [])
  const handleApprove = (verifyUserid) => {
    const data = {}
    data.id = verifyUserid
    data.status = 1
    PlayerService.verifyPlayerRequest(data)
      .then((res) => {
        if (res.status === 200) {
          setData((current) => current.filter((fruit) => fruit.id !== verifyUserid))
          ToastComponent(res.message, 'success')
        }
      })
      .catch((e) => {
        console.log('Error =>', e)
        ToastComponent('Something went wrong. Please try again.', 'error')
      })
  }
  const handleDecline = (verifyUserid) => {
    const data = {}
    data.id = verifyUserid
    data.status = 2
    PlayerService.verifyPlayerRequest(data)
      .then((res) => {
        if (res.status === 200) {
          setData((current) => current.filter((fruit) => fruit.id !== verifyUserid))
          ToastComponent(res.message, 'success')
        }
      })
      .catch((e) => {
        console.log('Error =>', e)
        ToastComponent('Something went wrong. Please try again.', 'error')
      })
  }
  return (
    <CRow>
      <CCol xs={12} md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Verify as Player Requests</strong>
          </CCardHeader>
          <CCardBody>
            <table className="main-table table innertable">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Position</th>
                  <th>Value</th>
                  <th>Date</th>
                  <th>Member</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, key) => (
                    <tr key={key}>
                      <th>{item?.player_data?.full_name}</th>
                      <th>{item?.player_data?.position_name}</th>
                      <th>${item?.player_data?.svalue}m</th>
                      <th> {moment(item?.created_at).format('D.MM.YYYY')}</th>
                      <th>{item?.user_full_name}</th>
                      <th>{item?.email}</th>
                      <td>
                        <CButton color={'success'} size="sm" onClick={() => handleApprove(item.id)}>
                          Approve
                        </CButton>
                        <CButton
                          color={'danger'}
                          className={'ml-2'}
                          size="sm"
                          onClick={() => handleDecline(item.id)}
                        >
                          Decline
                        </CButton>
                      </td>
                    </tr>
                  ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={7}>No record yet available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PlayerClaimProfile
