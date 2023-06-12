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
import SponsorService from 'src/service/SponsorService'
import EditForm from './EditForm'
import Helper from '../Helper'
import { useNavigate } from 'react-router-dom'
import Notify from '../Notify'
const Table = (props) => {
  const [loading, setLoading] = useState()
  const [visibleHorizontal, setVisibleHorizontal] = useState(false)
  const [activePage, setActivePage] = useState(1)
  const [columnFilter, setColumnFilter] = useState([])
  const [columnSorter, setColumnSorter] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedId, setSelectedId] = useState(0)
  const [users, setUsers] = useState([])
  const [value, setValue] = useState('')
  const [details, setDetails] = useState([])
  const columns = [
    {
      label: 'Logo',
      key: 'logo',
      filter: false,
      sorter: false,
    },
    { key: 'name' },
    { label: 'Status', filter: false, key: 'is_active', _style: { width: '20%' } },
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
    // setSelectedId(index)
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const deleteSponsor = (id) => {
    setLoading(true)
    const data = {}
    data.id = id
    const position = details.indexOf(id)
    let newDetails = details.slice()
    newDetails.splice(position, 1)
    setDetails(newDetails)
    // setUsers((previousEmployeeData) => previousEmployeeData.data.filter((data) => data.id !== id))
    SponsorService.deleteSponsor(data).then((res) => {
      if (res.status === 200) {
        toast.dismiss()
        setUsers(res.data)
        ToastComponent(res.message, 'success')
        setLoading(false)
      }
    })
  }

  const navigate = useNavigate()
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

    SponsorService.getSponsor(offset, itemsPerPage, activePage, params)
      // .then((response) => response.json())
      .then((result) => {
        setUsers(result.data)
        setLoading(false)
      })
  }, [activePage, columnFilter, columnSorter, itemsPerPage, props])

  const handleEdit = (id) => {
    setSelectedId(id)
  }
  const handleFeaturedUnfeatured = (id, status) => {
    SponsorService.updateFeatured(id, status)
      .then((res) => {
        if (res.status === 200) {
          SponsorService.getSponsor()
            // .then((response) => response.json())
            .then((result) => {
              setUsers(result.data)
              setLoading(false)
            })
          ToastComponent(res.message, 'success')
        } else {
          ToastComponent(res.message, 'error')
        }
      })
      .catch((e) => {
        console.log('Catch Block', e)
      })
  }
  const handleStatus = (id, status) => {
    SponsorService.updateStatus(id, status)
      .then((res) => {
        if (res.status === 200) {
          SponsorService.getSponsor()
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

  const handleCancel = () => {
    console.log('You clicked No!')
    return setShowConfirm(false)
  }

  const handleConfirm = () => {
    deleteSponsor(tableId)
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
          logo: (item) => (
            <td>
              {item.logo &&
                Helper.checkIfImageExists(
                  `${process.env.REACT_APP_API_URL}uploads/sponsor/${item.logo}`,
                )}
            </td>
          ),
          is_active: (item) => (
            <td>
              <CBadge color={getBadge(item.is_active)}>
                {' '}
                {item.is_active === 1 ? 'Activated' : 'Deactivated'}
              </CBadge>
              &nbsp;{' '}
              {item.is_featured === 1 && (
                <CBadge color={getBadge(item.is_featured)}>Featured</CBadge>
              )}
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
                    onClick={() => {
                      setVisibleHorizontal(!visibleHorizontal)
                      handleEdit(item.id)
                    }}
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
                  {item.is_featured === 1 ? (
                    <CButton
                      size="sm"
                      color="info"
                      className="ml-1"
                      onClick={() => handleFeaturedUnfeatured(item.id, 0)}
                    >
                      Remove Featured
                    </CButton>
                  ) : (
                    <CButton
                      size="sm"
                      color="info"
                      className="ml-1"
                      onClick={() => handleFeaturedUnfeatured(item.id, 1)}
                    >
                      Mark Featured
                    </CButton>
                  )}

                  <CCollapse id="collapseEdit" horizontal visible={visibleHorizontal}>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>Edit Sponsor</strong>
                      </CCardHeader>
                      <CCardBody>
                        <EditForm
                          sponsorId={item.id}
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
