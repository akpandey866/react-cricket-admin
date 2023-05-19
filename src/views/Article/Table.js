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
import ArticleService from 'src/service/ArticleService'
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
      key: 'title',
    },
    { key: 'date' },
    { label: 'Status', filter: false, key: 'is_active', _style: { width: '20%' } },
    { label: 'Created On', key: 'created_at', _style: { width: '20%' } },
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
  const [articleDetail, setArticleDetail] = useState([])
  const [articleId, setArticleId] = useState(0)
  const [date, setDate] = useState()
  const [description, setDescription] = useState('')
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
    //Set Article Detail Data
  }

  const changeEditAction = (index) => {
    setArticleId(index)
    setVisibleHorizontal(true)
    ArticleService.getArticleDetail(index)
      .then((res) => {
        if (res.status === 200) {
          setDescription(res.data.description)
          setArticleDetail(res.data)
          setDate(res.data.date)
        }
      })
      .catch((e) => {
        ToastComponent(e.response?.data?.message, 'error')
      })
  }
  const deleteArticle = (id) => {
    setLoading(true)
    const data = {}
    data.id = id
    const position = details.indexOf(id)
    let newDetails = details.slice()
    newDetails.splice(position, 1)
    setDetails(newDetails)
    // setUsers((previousEmployeeData) => previousEmployeeData.data.filter((data) => data.id !== id))
    ArticleService.deleteArticle(data).then((res) => {
      if (res.status === 200) {
        props.setUsers((current) => current.filter((fruit) => fruit.id !== id))
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

    ArticleService.getArticle(offset, itemsPerPage, activePage, params)
      // .then((response) => response.json())
      .then((result) => {
        setUsers(result.data)
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
          date: (item) => <td>{moment(item.date).format('D.MM.YYYY')}</td>,
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
                    onClick={() => deleteArticle(item.id)}
                  >
                    Delete
                  </CButton>
                  <CCollapse id="collapseEdit" horizontal visible={visibleHorizontal}>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>Edit Article</strong>
                      </CCardHeader>
                      <CCardBody>
                        <EditForm
                          articleDetail={articleDetail}
                          setArticleDetail={setArticleDetail}
                          articleId={item.id}
                          selectedId={selectedId}
                          visibleHorizontal={visibleHorizontal}
                          date={date}
                          description={description}
                          setArticleId={setArticleId}
                          setDate={setDate}
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
