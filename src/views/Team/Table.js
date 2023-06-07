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
import TeamService from 'src/service/TeamService'
import EditForm from './EditForm'
import Notify from '../Notify'
const Table = (props) => {
  const [loading, setLoading] = useState()
  const [visibleHorizontal, setVisibleHorizontal] = useState(false)
  const [selectedTeamId, setSelectedTeamId] = useState(0)
  const [activePage, setActivePage] = useState(1)
  const [columnFilter, setColumnFilter] = useState([])
  const [columnSorter, setColumnSorter] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [users, setUsers] = useState(props.users)
  const navigate = useNavigate()

  const [details, setDetails] = useState([])
  const columns = [
    {
      label: 'Team Code',
      key: 'sn',
    },
    { label: 'Team Name', key: 'team_name' },
    // { label: 'Created On', key: 'created_at' },
    // { label: 'Status', filter: false, key: 'is_active' },
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
    setSelectedTeamId(index)
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const deleteTeam = (id) => {
    setLoading(true)
    const data = {}
    data.id = id
    const position = details.indexOf(id)
    let newDetails = details.slice()
    newDetails.splice(position, 1)
    setDetails(newDetails)
    // setUsers((previousEmployeeData) => previousEmployeeData.data.filter((data) => data.id !== id))
    TeamService.deleteTeam(data).then((res) => {
      if (res.status === 200) {
        toast.dismiss()
        setUsers(res.data)
        ToastComponent(res.message, 'success')
        setLoading(false)
        navigate('/teams')
      }
    })
  }

  const getUsers = useEffect(() => {
    setLoading(true)
    const offset = itemsPerPage * activePage - itemsPerPage
    console.log(offset)
    let params = new URLSearchParams()
    Object.keys(columnFilter).forEach((key) => {
      params.append(key, columnFilter[key])
    })
    columnSorter &&
      columnSorter.column !== undefined &&
      params.append('sort', `${columnSorter.column}%${columnSorter.state}`)

    TeamService.getTeam(offset, itemsPerPage, activePage, params)
      // .then((response) => response.json())
      .then((result) => {
        setUsers(result.data)
        setLoading(false)
      })
  }, [activePage, columnFilter, columnSorter, itemsPerPage, props])

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
    deleteTeam(tableId)
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
          svalue: (item) => <td>${item.svalue}m</td>,
          is_active: (item) => (
            <td>
              <CBadge color={getBadge(item.is_active)}>
                {' '}
                {item.is_active === 1 ? 'Activated' : 'Deactivated'}
              </CBadge>
            </td>
          ),
          created_at: (item) => <td>{moment(item.created_at).format('D.MM.YYYY')}</td>,
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
                    onClick={() => areYouSureModal(item.id)}
                  >
                    Delete
                  </CButton>
                  <CCollapse id="collapseEdit" horizontal visible={visibleHorizontal}>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>Edit Team</strong>
                      </CCardHeader>
                      <CCardBody>
                        <EditForm
                          teamId={item.id}
                          selectedTeamId={selectedTeamId}
                          users={users}
                          setUsers={setUsers}
                          gradeList={props.gradeList}
                          teamCategoryList={props.teamCategoryList}
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
