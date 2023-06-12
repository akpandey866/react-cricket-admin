import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CFormSwitch,
  CSmartTable,
} from '@coreui/react-pro'
import { toast } from 'react-toastify'

import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent.js'
import FixtureService from 'src/service/FixtureService'
import EditForm from './EditForm'
import Notify from '../Notify'
import CommonService from 'src/service/CommonService'
const Table = (props) => {
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
    {
      label: 'Team Name',
      key: 'team_name',
    },
    { label: 'Type', key: 'match_type', filter: false, sorter: false },
    { label: 'Start Date', filter: false, key: 'start_date' },
    { label: 'End Date', filter: false, key: 'end_date' },
    { label: 'Status', filter: false, key: 'status' },
    {
      key: 'display',
      label: 'Display',
      filter: false,
      sorter: false,
    },
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
        navigate('/create-fixtures')
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
  const handleChangeStatus = (itemId) => {
    const position = props.displayDetails.indexOf(itemId)
    let newDetails = props.displayDetails.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...props.displayDetails, itemId]
    }

    props.setDisplayDetails(newDetails)
    //setIsRadio(+itemId)

    const data = {}
    data.fixtureId = itemId
    FixtureService.changeDisplayStatus(data).then((res) => {
      if (res.status === 200) {
        props.setData(res.data)
        ToastComponent(res.message, 'success')
      }
    })
  }

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
    deleteFixture(tableId)
    return setShowConfirm(false)
  }
  const areYouSureModal = (id) => {
    const data = {}
    data.id = id
    data.type = 'fixture'
    CommonService.checkItemExists(data).then((res) => {
      if (res.status === 200) {
        if (res.data) {
          ToastComponent(res.message, 'error')
        } else {
          setShowConfirm(true)
          setTableId(id)
        }
      }
    })
  }
  return (
    <>
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
          display: (item, key) => {
            return (
              <>
                <td className="py-2">
                  {' '}
                  <CFormSwitch
                    label=""
                    id={`display_id${item.id}`}
                    name={`display_name${item.id}`}
                    value={item.id}
                    // checked={isRadio === item.id}
                    checked={props.displayDetails.includes(item.id) ? false : true}
                    onChange={(e) => handleChangeStatus(item.id)}
                  />
                  {/* <input
                    type="radio"
                    id={`radio${item.id}`}
                    value={key}
                    onChange={handleChangeStatus}
                    checked={isRadio === key}
                  /> */}
                </td>
              </>
            )
          },
          details: (item) => {
            return (
              <CCollapse visible={details.includes(item.id)}>
                <CCardBody>
                  <CButton
                    size="sm"
                    color="success"
                    className="ms-1"
                    onClick={() => setVisibleHorizontal(!visibleHorizontal)}
                    aria-expanded={visibleHorizontal}
                    aria-controls="collapseEdit"
                  >
                    Edit
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    className="ms-1"
                    onClick={() => areYouSureModal(item.id)}
                  >
                    Delete
                  </CButton>
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
