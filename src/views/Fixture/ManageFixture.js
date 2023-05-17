import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CRow,
  CSmartTable,
} from '@coreui/react-pro'
import { toast } from 'react-toastify'

import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent.js'
import FixtureService from 'src/service/FixtureService'
import EditForm from './EditForm'
const ManageFixture = (props) => {
  const [loading, setLoading] = useState()
  const [visibleHorizontal, setVisibleHorizontal] = useState(false)
  const [selectedId, setSelectedId] = useState(0)

  const [activePage, setActivePage] = useState(1)
  const [columnFilter, setColumnFilter] = useState([])
  const [columnSorter, setColumnSorter] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [users, setUsers] = useState({})
  const navigate = useNavigate()

  const [details, setDetails] = useState([])
  const columns = [
    { label: 'Comp Name', key: 'grade' },
    {
      label: 'Team Name',
      key: 'team_name',
    },
    { label: 'Match Type', key: 'match_type' },
    { label: 'Start Date', filter: false, key: 'start_date' },
    { label: 'End Date', filter: false, key: 'end_date' },
    { label: 'Status', filter: false, key: 'status' },
    {
      key: 'show_details',
      label: 'Actions',
      filter: false,
      sorter: false,
    },
  ]
  const getBadge = (status) => {
    switch (status) {
      case 1:
        return 'success'
      case 0:
        return 'warning'
      default:
        return 'primary'
    }
  }
  const toggleDetails = (index) => {
    setSelectedId(index)
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const deleteFixture = (id) => {
    setLoading(true)
    const data = {}
    data.id = id
    const position = details.indexOf(id)
    let newDetails = details.slice()
    newDetails.splice(position, 1)
    setDetails(newDetails)
    // setUsers((previousEmployeeData) => previousEmployeeData.data.filter((data) => data.id !== id))
    FixtureService.deleteFixture(data).then((res) => {
      if (res.status === 200) {
        toast.dismiss()
        setUsers(res.data)
        ToastComponent(res.message, 'success')
        setLoading(false)
      }
    })
  }

  const getUsers = useEffect(() => {
    setLoading(true)
    const offset = itemsPerPage * activePage - itemsPerPage
    let params = new URLSearchParams()
    Object.keys(columnFilter).forEach((key) => {
      params.append(key, columnFilter[key])
    })
    columnSorter &&
      columnSorter.column !== undefined &&
      params.append('sort', `${columnSorter.column}%${columnSorter.state}`)

    FixtureService.getFixture(offset, itemsPerPage, activePage, params)
      // .then((response) => response.json())
      .then((result) => {
        setUsers(result.data)

        setLoading(false)
      })
  }, [activePage, columnFilter, columnSorter, itemsPerPage, props])

  const hideEditDiv = () => {
    setVisibleHorizontal(false)
  }
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol xs={10}>
                  <strong>Manage Fixtures</strong>
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
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status === 0
                          ? 'Not yet started'
                          : item.status === 1
                          ? 'Up-Comming'
                          : item.status === 2
                          ? 'In-Progress'
                          : 'Completed'}
                      </CBadge>
                    </td>
                  ),
                  grade: (item) => <td>{item.grade ?? ''}</td>,
                  start_date: (item) => <td>{moment(item.start_date).format('D.MM.YYYY')}</td>,
                  end_date: (item) => <td>{moment(item.end_date).format('D.MM.YYYY')}</td>,
                  show_details: (item) => {
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
                            {details.includes(item.id) ? 'Hide' : 'Show'}
                          </CButton>
                        </td>
                      </>
                    )
                  },
                  details: (item) => {
                    return (
                      <CCollapse visible={details.includes(item.id)}>
                        <CCardBody>
                          <Link
                            size="sm"
                            color="danger"
                            className="btn btn-success btn-sm ms-1"
                            to={`/manage-fixtures/team-players/${item.id}`}
                          >
                            1. Create Squad
                          </Link>
                          <Link
                            size="sm"
                            color="danger"
                            className="btn btn-success btn-sm ms-1"
                            to={`/scorecard/${item.id}`}
                          >
                            2. Manage Scores
                          </Link>
                          <Link
                            size="sm"
                            color="danger"
                            className="btn btn-success btn-sm ms-1"
                            to={`/assign-feedback-mnager/${item.id}`}
                          >
                            3. Assign Feedback Manager
                          </Link>
                          {/* <Link
                            size="sm"
                            color="danger"
                            className="btn btn-success btn-sm ms-1"
                            to={`/scorecard/${item.id}`}
                          >
                            4. Feedback Page
                          </Link> */}
                          <CCollapse id="collapseEdit" horizontal visible={visibleHorizontal}>
                            <CCard className="mb-4">
                              <CCardHeader>
                                <strong>Edit Fixture</strong>
                              </CCardHeader>
                              <CCardBody>
                                <EditForm
                                  fixtureId={item.id}
                                  selectedId={selectedId}
                                  hideEditDiv={hideEditDiv}
                                  toggleDetails={toggleDetails}
                                />
                              </CCardBody>
                            </CCard>
                          </CCollapse>
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

export default ManageFixture
