import React, { useState, useEffect } from 'react'
import ToastComponent from 'src/components/common/TaostComponent'
import UserService from 'src/service/UserService'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react-pro'

const PaidUser = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    UserService.paidUserListing()
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

  const handleApproveOrDecline = (tableId, userId, status) => {
    UserService.markAsPaidOrUnPaid(2, userId, status)
      .then((res) => {
        if (res.status === 200) {
          setData((current) => current.filter((fruit) => fruit.id !== tableId))
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
      <CAccordion activeItemKey={1}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Paid Member Requests</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <table className="main-table table innertable">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, key) => (
                    <tr key={key}>
                      <th>{item?.user_data?.full_name}</th>
                      <td>
                        {' '}
                        <CButton
                          color={'success'}
                          size="sm"
                          onClick={() => handleApproveOrDecline(item.id, item.user_id, 1)}
                        >
                          Approve
                        </CButton>
                        <CButton
                          color={'danger'}
                          className={'ml-2'}
                          size="sm"
                          onClick={() => handleApproveOrDecline(item.id, item.user_id, 0)}
                        >
                          Decline
                        </CButton>
                      </td>
                    </tr>
                  ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={2}>No record yet available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default PaidUser
