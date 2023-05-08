import React, { useEffect, useState } from 'react'
import {
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

import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent.js'
import GradeService from 'src/service/GradeService'
import PointSystem from './PointSystem'
const GradePoint = () => {
  const [loading, setLoading] = useState()
  const [gradePointData, setGradePointData] = useState([])

  const [activePage, setActivePage] = useState(1)
  const [columnFilter, setColumnFilter] = useState([])
  const [columnSorter, setColumnSorter] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [users, setUsers] = useState({})
  const navigate = useNavigate()

  const [details, setDetails] = useState([])
  const columns = [
    {
      label: 'Grade Name',
      key: 'grade',
      filter: false,
    },
    {
      key: 'show_details',
      label: '',
      filter: false,
      sorter: false,
    },
  ]

  const toggleDetails = (index) => {
    setLoading(true)
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)

    GradeService.gradePointSystem(index).then((res) => {
      setGradePointData(res.data)
      setLoading(false)
    })
  }

  const deleteGrade = (id) => {
    setLoading(true)
    const data = {}
    data.id = id
    const position = details.indexOf(id)
    let newDetails = details.slice()
    newDetails.splice(position, 1)
    setDetails(newDetails)
    // setUsers((previousEmployeeData) => previousEmployeeData.data.filter((data) => data.id !== id))
    GradeService.deleteGrade(data).then((res) => {
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
      params.append(key, columnFilter[key])
    })
    columnSorter &&
      columnSorter.column !== undefined &&
      params.append('sort', `${columnSorter.column}%${columnSorter.state}`)

    GradeService.getGrades(offset, itemsPerPage, activePage, params)
      // .then((response) => response.json())
      .then((result) => {
        setUsers(result.data)
        setLoading(false)
      })
  }, [activePage, columnFilter, columnSorter, itemsPerPage])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Manage Point System</strong>
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
                          {'Edit Point System'}
                        </CButton>
                      </td>
                    </>
                  )
                },
                details: (item) => {
                  return (
                    <CCollapse visible={details.includes(item.id)}>
                      <CCardBody>
                        <PointSystem
                          gradePointData={gradePointData}
                          setGradePointData={setGradePointData}
                          gradeId={item.id}
                          setLoading={setLoading}
                          toggleDetails={toggleDetails}
                        />
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
  )
}

export default GradePoint
