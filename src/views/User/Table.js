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
import UserService from 'src/service/UserService'
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
  const navigate = useNavigate()

  const [details, setDetails] = useState([])
  const columns = [
    {
      label: 'Full Name',
      key: 'full_name',
    },
    { key: 'email' },
    { label: 'team_name', key: 'my_team_name' },
    { label: 'Phone', key: 'phone' },
    { label: 'Status', filter: false, key: 'is_active' },
    { label: 'Created On', key: 'created_at' },
    {
      key: 'show_details',
      label: '',
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

  const deleteUser = (id) => {
    setLoading(true)
    const data = {}
    data.id = id
    const position = details.indexOf(id)
    let newDetails = details.slice()
    newDetails.splice(position, 1)
    setDetails(newDetails)
    UserService.deleteUser(data).then((res) => {
      if (res.status === 200) {
        toast.dismiss()
        setUsers(res.data)
        ToastComponent(res.message, 'success')
        setLoading(false)
        navigate('/grades')
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

  const changeSearchField = (e) => {
    console.log(e)
    return false
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
          is_active: (item) => (
            <td>
              <CBadge color={getBadge(item.is_active)}>
                {' '}
                {item.is_active === 1 ? 'Activated' : 'Deactivated'}
              </CBadge>
            </td>
          ),
          my_team_name: (item) => <td>{item.my_team_name && <>{item.my_team_name}</>}</td>,
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
                    onClick={() => deleteUser(item.id)}
                  >
                    Delete
                  </CButton>
                  <CCollapse id="collapseEdit" horizontal visible={visibleHorizontal}>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>Edit User</strong>
                      </CCardHeader>
                      <CCardBody>
                        <EditForm
                          userId={item.id}
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
