import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CSmartTable,
} from '@coreui/react-pro'
import { toast } from 'react-toastify'

import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent.js'
import PlayerAvailabilityService from 'src/service/PlayerAvailabilityService'
import EditForm from './EditForm'
import Notify from '../Notify'
const Table = (props) => {
  const [loading, setLoading] = useState()
  const [visibleHorizontal, setVisibleHorizontal] = useState(false)

  const [activePage, setActivePage] = useState(1)
  const [columnFilter, setColumnFilter] = useState([])
  const [columnSorter, setColumnSorter] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedId, setSelectedId] = useState(0)
  const [users, setUsers] = useState(props.users)
  const navigate = useNavigate()

  const [details, setDetails] = useState([])
  const columns = [
    {
      key: 'player_name',
    },
    { key: 'date_from' },
    { key: 'date_till' },
    { label: 'Status', filter: false, key: 'is_active' },
    // { label: 'Created On', key: 'created_at' },
    {
      key: 'show_details',
      label: 'Actions',
      _style: { width: '1%' },
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

  const deleteGrade = (id) => {
    setLoading(true)
    const data = {}
    data.id = id
    const position = details.indexOf(id)
    let newDetails = details.slice()
    newDetails.splice(position, 1)
    setDetails(newDetails)
    PlayerAvailabilityService.deleteAvailability(data).then((res) => {
      if (res.status === 200) {
        props.setUsers((current) => current.filter((fruit) => fruit.id !== id))
        // setUsers(res.data)
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

    PlayerAvailabilityService.getAvailability(offset, itemsPerPage, activePage, params)
      // .then((response) => response.json())
      .then((result) => {
        setUsers(result.data)
        setLoading(false)
      })
  }, [activePage, columnFilter, columnSorter, itemsPerPage, props])
  const [avData, setAvData] = useState({})
  const [dateFrom, setDateFrom] = useState()
  const [dateTill, setDateTill] = useState()
  const changeEditAction = (index) => {
    setVisibleHorizontal(true)
    PlayerAvailabilityService.getAvailabilityDetail(index)
      .then((res) => {
        if (res.status === 200) {
          setAvData(res.data)
          setDateFrom(res.data.date_from)
          setDateTill(res.data.date_till)
        }
      })
      .catch((e) => {
        ToastComponent(e.response?.data?.message, 'error')
      })
  }
  const handleStatus = (id, status) => {
    PlayerAvailabilityService.updateStatus(id, status)
      .then((res) => {
        if (res.status === 200) {
          PlayerAvailabilityService.getAvailability()
            // .then((response) => response.json())
            .then((result) => {
              setUsers(result.data)
              setLoading(false)
            })
          ToastComponent(res.message, 'success')
        }
      })
      .catch((e) => {
        console.log('Catch Block', e)
      })
  }

  // Are you sure want modal
  const [handleYes, setHandleYes] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [handleNo, setHandleNo] = useState(false)
  const [tableId, setTableId] = useState(false)

  const [isDelete, setIsDelete] = useState(0)

  const handleCancel = () => {
    console.log('You clicked No!')
    return setShowConfirm(false)
  }

  const handleConfirm = () => {
    deleteGrade(tableId)
    return setShowConfirm(false)
  }

  const areYouSureModal = (id) => {
    setShowConfirm(true)
    setTableId(id)
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
          created_at: (item) => <td>{moment(item.created_at).format('D.MM.YYYY')}</td>,
          date_from: (item) => <td>{moment(item.date_from).format('D.MM.YYYY')}</td>,
          date_till: (item) => <td>{moment(item.date_till).format('D.MM.YYYY')}</td>,
          is_active: (item) => (
            <td>
              <CBadge color={getBadge(item.is_active)}>
                {' '}
                {item.is_active === 1 ? 'Activated' : 'Deactivated'}
              </CBadge>
            </td>
          ),
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
                  <CButton
                    size="sm"
                    color="success"
                    className="ml-1"
                    onClick={() => changeEditAction(item.id)}
                    aria-expanded={visibleHorizontal}
                    aria-controls="collapseEdit"
                  >
                    Edit
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-1"
                    onClick={() => areYouSureModal(item.id)}
                  >
                    Delete
                  </CButton>
                  {item.is_active === 1 ? (
                    <CButton
                      size="sm"
                      color="dark"
                      className="ml-1"
                      onClick={() => handleStatus(item.id, 0)}
                    >
                      Deactivate
                    </CButton>
                  ) : (
                    <CButton
                      size="sm"
                      color="dark"
                      className="ml-1"
                      onClick={() => handleStatus(item.id, 1)}
                    >
                      Activate
                    </CButton>
                  )}
                  <CCollapse id="collapseEdit" horizontal visible={visibleHorizontal}>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>Edit Availability</strong>
                      </CCardHeader>
                      <CCardBody>
                        <EditForm
                          multiOption={props.multiOption}
                          avId={item.id}
                          avData={avData}
                          selectedId={selectedId}
                          dateFrom={dateFrom}
                          setDateFrom={setDateFrom}
                          dateTill={dateTill}
                          setDateTill={setDateTill}
                          visibleHorizontal={visibleHorizontal}
                          setUsers={setUsers}
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
