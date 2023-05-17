import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CFormLabel,
  CRow,
  CSmartTable,
} from '@coreui/react-pro'
import { toast } from 'react-toastify'

import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent.js'
import UserService from 'src/service/UserService'
const ManageMember = (props) => {
  const [loading, setLoading] = useState()
  const [activePage, setActivePage] = useState(1)
  const [columnFilter, setColumnFilter] = useState([])
  const [columnSorter, setColumnSorter] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedId, setSelectedId] = useState(0)
  const [users, setUsers] = useState(props.users)

  const [details, setDetails] = useState([])
  const [userDetails, setUserDetails] = useState({})
  const columns = [
    {
      label: 'Member',
      key: 'full_name',
      filter: false,
      sorter: false,
    },
    {
      key: 'action',
      label: 'Actions',
      filter: false,
      sorter: false,
    },
  ]

  const toggleDetails = (index) => {
    setSelectedId(index)
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      //newDetails = [...details, index]
      newDetails = [index]
    }
    setDetails(newDetails)

    UserService.getUserDetail(index).then((res) => {
      if (res.status === 200) {
        setUserDetails(res.data)
        setLoading(false)
      }
    })
  }

  const getUsers = useEffect(() => {
    setLoading(true)
    const offset = itemsPerPage * activePage - itemsPerPage
    let params = new URLSearchParams()
    Object.keys(columnFilter).forEach((key) => {
      setLoading(true)
      params.append(key, columnFilter[key])
    })
    columnSorter &&
      columnSorter.column !== undefined &&
      params.append('sort', `${columnSorter.column}%${columnSorter.state}`)

    UserService.getUser(offset, itemsPerPage, activePage, params)
      // .then((response) => response.json())
      .then((result) => {
        setUsers(result.data)
        setLoading(false)
      })
  }, [activePage, columnFilter, columnSorter, itemsPerPage, props])

  const markAsPaid = (userId, status) => {
    UserService.markAsPaidOrUnPaid(3, userId, status)
      // .then((response) => response.json())
      .then((result) => {
        UserService.getUser()
          // .then((response) => response.json())
          .then((result) => {
            setUsers(result.data)
            setLoading(false)
          })
        ToastComponent(result.message, 'success')
        setLoading(false)
      })
  }
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol xs={10}>
                  <strong>Manage Members</strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CSmartTable
                columns={columns}
                columnFilter={{
                  external: true,
                }}
                columnSorter={{
                  external: true,
                }}
                scopedColumns={{
                  action: (item) => {
                    return (
                      <>
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              toggleDetails(item.id)
                            }}
                          >
                            {details.includes(item.id) ? 'Hide Details' : 'Member Info'}
                          </CButton>{' '}
                          {/* <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              //toggleDetails(item.id)
                            }}
                          >
                            Send Login Credentials
                          </CButton>{' '}
                          &nbsp;&nbsp; */}
                          {item.is_fund_paid === 0 ? (
                            <CButton
                              color="danger"
                              // variant="outline"
                              shape="square"
                              size="sm"
                              onClick={() => {
                                markAsPaid(item.id, 1)
                              }}
                            >
                              Unpaid
                            </CButton>
                          ) : (
                            <CButton
                              color="success"
                              // variant="outline"
                              shape="square"
                              size="sm"
                              onClick={() => {
                                markAsPaid(item.id, 0)
                              }}
                            >
                              Paid
                            </CButton>
                          )}
                          &nbsp;&nbsp;
                          {/* <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              //toggleDetails(item.id)
                            }}
                          >
                            Suspend Member
                          </CButton> */}
                        </td>
                      </>
                    )
                  },
                  details: (item) => {
                    return (
                      <CCollapse visible={details.includes(item.id)}>
                        <CCardBody>
                          <CRow>
                            <CCol xs="auto">
                              <CFormLabel className="fw-bold">Name:</CFormLabel>
                              <span className="px-2">{userDetails?.full_name}</span>
                            </CCol>
                            <CCol xs="auto">
                              <CFormLabel className="fw-bold">Email:</CFormLabel>
                              <span className="px-2">{userDetails?.email}</span>
                            </CCol>
                            <CCol xs="auto">
                              <CFormLabel className="fw-bold">Date of Birth:</CFormLabel>
                              <span className="px-2">
                                {moment(userDetails?.created_at).format('D.MM.YYYY')}
                              </span>
                            </CCol>
                            <CCol xs="auto">
                              <CFormLabel className="fw-bold">Phone:</CFormLabel>
                              <span className="px-2">{userDetails?.phone}</span>
                            </CCol>
                          </CRow>
                        </CCardBody>
                      </CCollapse>
                    )
                  },
                }}
                items={users?.data}
                itemsPerPage={itemsPerPage}
                itemsPerPageSelect
                loading={loading}
                pagination={{
                  external: true,
                }}
                paginationProps={{
                  activePage: activePage,
                  pages: Math.ceil(users?.total / itemsPerPage) || 1,
                }}
                tableProps={{
                  hover: true,
                  responsive: true,
                }}
                onActivePageChange={(activePage) => setActivePage(activePage)}
                onColumnFilterChange={(filter) => {
                  setActivePage(1)
                  setColumnFilter(filter)
                }}
                onItemsPerPageChange={(itemsPerPage) => {
                  setActivePage(1)
                  setItemsPerPage(itemsPerPage)
                }}
                onSorterChange={(sorter) => setColumnSorter(sorter)}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ManageMember
