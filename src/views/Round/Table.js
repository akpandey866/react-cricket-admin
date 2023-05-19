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
import ToastComponent from 'src/components/common/TaostComponent.js'
import RoundService from 'src/service/RoundService'
import EditForm from './EditForm'
const Table = (props) => {
  const [loading, setLoading] = useState()
  const [visibleHorizontal, setVisibleHorizontal] = useState(false)

  const [activePage, setActivePage] = useState(1)
  const [columnFilter, setColumnFilter] = useState([])
  const [columnSorter, setColumnSorter] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedId, setSelectedId] = useState(0)
  const [users, setUsers] = useState(props.users)
  const [details, setDetails] = useState([])
  const columns = [
    {
      key: 'round',
      _style: { width: '15%' },
      filter: false,
      sorter: false,
    },
    { key: 'start_date', filter: false, sorter: false },
    { label: 'Start Time', key: 'lockout_start_time', filter: false, sorter: false },
    { key: 'end_date', filter: false, sorter: false },
    { label: 'End Time', key: 'lockout_end_time', filter: false, sorter: false },
    {
      key: 'show_details',
      label: 'Action',
      _style: { width: '5%' },
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
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const deleteRound = (id) => {
    setLoading(true)
    const data = {}
    data.id = id
    const position = details.indexOf(id)
    let newDetails = details.slice()
    newDetails.splice(position, 1)
    setDetails(newDetails)
    RoundService.deleteRound(data).then((res) => {
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

    RoundService.getRound(offset, itemsPerPage, activePage, params)
      // .then((response) => response.json())
      .then((result) => {
        setUsers(result.data)
        props.setRoundNumber(result.rd_number)
        setLoading(false)
      })
  }, [activePage, columnFilter, columnSorter, itemsPerPage, props])

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
          start_date: (item) => <td>{moment(item.start_date).format('D.MM.YYYY hh:mm')}</td>,
          end_date: (item) => <td>{moment(item.end_date).format('D.MM.YYYY hh:mm')}</td>,
          lockout_start_time: (item) => (
            <td>{moment(item.lockout_start_time).format('D.MM.YYYY hh:mm')}</td>
          ),
          lockout_end_time: (item) => (
            <td>{moment(item.lockout_end_time).format('D.MM.YYYY hh:mm')}</td>
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
                    onClick={() => setVisibleHorizontal(!visibleHorizontal)}
                    aria-expanded={visibleHorizontal}
                    aria-controls="collapseEdit"
                  >
                    Edit
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-3"
                    onClick={() => deleteRound(item.id)}
                  >
                    Delete
                  </CButton>
                  <CCollapse id="collapseEdit" horizontal visible={visibleHorizontal}>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>Edit Round</strong>
                      </CCardHeader>
                      <CCardBody>
                        <EditForm
                          roundId={item.id}
                          selectedId={selectedId}
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
    </>
  )
}

export default Table
