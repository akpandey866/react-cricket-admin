import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CSmartTable,
  CWidgetStatsB,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilPeople,
  cilDollar,
  cibInstagram,
  cilUserPlus,
  cilSpeak,
  cilNewspaper,
  cilHome,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'
import moment from 'moment'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState()

  const [activePage, setActivePage] = useState(1)
  const [columnFilter, setColumnFilter] = useState([])
  const [columnSorter, setColumnSorter] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [users, setUsers] = useState()
  const columns = [
    {
      label: <CIcon icon={cilPeople} />,
      key: 'logo',
      filter: false,
      sorter: false,
      _style: { width: '25%' },
    },
    { label: 'Members', key: 'game_details', _style: { width: '25%' } },
    { label: 'Trades', key: 'admin', filter: false, sorter: false, _style: { width: '25%' } },
    { label: 'Fees', key: 'fees', filter: false, sorter: false, _style: { width: '25%' } },
    {
      key: 'show_details',
      label: 'Activity',
      _style: { width: '25%' },
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

  const [loading, setLoading] = useState()
  const [dashboardUser, setDashboardUser] = useState([])
  const getUsers = useEffect(() => {
    CommonService.dashboardData()
      .then((res) => {
        if (res.status === 200) {
          setDashboardData(res.data)
        }
      })
      .catch((e) => {
        console.log(e)
        ToastComponent('Something went wrong. Please try again', 'error')
      })

    setLoading(true)
    const offset = itemsPerPage * activePage - itemsPerPage
    let params = new URLSearchParams()
    Object.keys(columnFilter).forEach((key) => {
      params.append(key, columnFilter[key])
    })
    columnSorter &&
      columnSorter.column !== undefined &&
      params.append('sort', `${columnSorter.column}%${columnSorter.state}`)

    CommonService.dashboardUser(offset, itemsPerPage, activePage, params).then((result) => {
      setUsers(result.data)
      setDashboardData(result.new_data)
      setLoading(false)
    })
  }, [activePage, columnFilter, columnSorter, itemsPerPage])

  return (
    <>
      <WidgetsDropdown />
      {/* <CRow>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsB
            className="mb-4"
            progress={{ color: 'success-gradient', value: 89.9 }}
            text="Lorem ipsum dolor sit amet enim."
            title="Total Visits"
            value="89.9%"
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsB
            className="mb-4"
            value="12.124"
            title="Unique Visits"
            progress={{ color: 'info-gradient', value: 89.9 }}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsB
            className="mb-4"
            value="$98.111,00"
            title="Pageviews"
            progress={{ color: 'warning-gradient', value: 89.9 }}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsB
            className="mb-4"
            value="2 TB"
            title="Player Profile Views"
            progress={{ color: 'primary-gradient', value: 89.9 }}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
      </CRow> */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Fixtures</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Total Fixtures</div>
                        <div className="fs-5 fw-semibold">{dashboardData?.totalFixture}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Not Started</div>
                        <div className="fs-5 fw-semibold">{dashboardData?.notStartedFixture}</div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">In-Progress</div>
                        <div className="fs-5 fw-semibold">{dashboardData?.inProgressFixture}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Completed</div>
                        <div className="fs-5 fw-semibold">{dashboardData?.completedFixture}</div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Refer</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  {/* Google */}
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon className="me-2" icon={'cibGoogle'} size="lg" />
                      <span>{'Google'}</span>
                      <span className="ms-auto fw-semibold">
                        {dashboardData?.googDetails}
                        <span className="text-medium-emphasis small">
                          ({dashboardData?.googlePercentage}%)
                        </span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        thin
                        color="success-gradient"
                        value={dashboardData?.googlePercentage}
                      />
                    </div>
                  </div>
                  {/* Facebook */}
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon className="me-2" icon={'cibFacebook'} size="lg" />
                      <span>{'Facebook'}</span>
                      <span className="ms-auto fw-semibold">
                        {dashboardData?.fbDetails}
                        <span className="text-medium-emphasis small">
                          ({dashboardData?.fbPercentage}%)
                        </span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        thin
                        color="success-gradient"
                        value={dashboardData?.fbPercentage}
                      />
                    </div>
                  </div>
                  {/* twitter */}
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon className="me-2" icon={'cibTwitter'} size="lg" />
                      <span>{'Twitter'}</span>
                      <span className="ms-auto fw-semibold">
                        {dashboardData?.twitDetails}
                        <span className="text-medium-emphasis small">
                          ({dashboardData?.twitterPercentage}%)
                        </span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        thin
                        color="success-gradient"
                        value={dashboardData?.twitterPercentage}
                      />
                    </div>
                  </div>
                  {/* Instagram */}
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon className="me-2" icon={'cibInstagram'} size="lg" />
                      <span>{'Instagram'}</span>
                      <span className="ms-auto fw-semibold">
                        {dashboardData?.instaDetails}
                        <span className="text-medium-emphasis small">
                          ({dashboardData?.instPercentage}%)
                        </span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        thin
                        color="success-gradient"
                        value={dashboardData?.instPercentage}
                      />
                    </div>
                  </div>
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  {/* Word of mouth */}
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon className="me-2" icon={'cilSpeak'} size="lg" />
                      <span>{'Word of Mouth'}</span>
                      <span className="ms-auto fw-semibold">
                        {dashboardData?.womDetails}
                        <span className="text-medium-emphasis small">
                          ({dashboardData?.womPercentage}%)
                        </span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        thin
                        color="success-gradient"
                        value={dashboardData?.womPercentage}
                      />
                    </div>
                  </div>
                  {/* Advertisement */}
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon className="me-2" icon={'cilNewspaper'} size="lg" />
                      <span>{'Advertisement'}</span>
                      <span className="ms-auto fw-semibold">
                        {dashboardData?.adDetails}
                        <span className="text-medium-emphasis small">
                          ({dashboardData?.adPercentag}%)
                        </span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="success-gradient" value={dashboardData?.adPercentag} />
                    </div>
                  </div>
                  {/* Referred by Club */}
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon className="me-2" icon={'cilHome'} size="lg" />
                      <span>{'Referred by Club'}</span>
                      <span className="ms-auto fw-semibold">
                        {dashboardData?.refClubDetails}
                        <span className="text-medium-emphasis small">
                          ({dashboardData?.refClubPercentage}%)
                        </span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        thin
                        color="success-gradient"
                        value={dashboardData?.refClubPercentage}
                      />
                    </div>
                  </div>
                  {/* Referred by Friend */}
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon className="me-2" icon={'cilUserPlus'} size="lg" />
                      <span>{'Referred by Friend'}</span>
                      <span className="ms-auto fw-semibold">
                        {dashboardData?.refFriendDetails}
                        <span className="text-medium-emphasis small">
                          ({dashboardData?.reFriendPercentage}%)
                        </span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        thin
                        color="success-gradient"
                        value={dashboardData?.reFriendPercentage}
                      />
                    </div>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Demographics</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} sm={6} lg={4}>
                  <CWidgetStatsB
                    className="mb-4"
                    progress={{
                      color: 'success-gradient',
                      value: dashboardData?.mPercentageUsers,
                    }}
                    title="Male"
                    value={`${dashboardData?.mPercentageUsers}%`}
                  />
                </CCol>
                <CCol xs={12} sm={6} lg={4}>
                  <CWidgetStatsB
                    className="mb-4"
                    value={`${dashboardData?.fPercentageUsers}%`}
                    title="Female"
                    progress={{ color: 'info-gradient', value: dashboardData?.fPercentageUsers }}
                  />
                </CCol>
                <CCol xs={12} sm={6} lg={4}>
                  <CWidgetStatsB
                    className="mb-4"
                    value={`${dashboardData?.dnwtsPercentageUsers}%`}
                    title="Not Specified"
                    progress={{
                      color: 'warning-gradient',
                      value: dashboardData?.dnwtsPercentageUsers,
                    }}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} sm={12} lg={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Games</strong>
            </CCardHeader>
            <CCardBody>
              <CSmartTable
                className={'mb-0 border mt-3'}
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
                      <CAvatar
                        size="md"
                        src={`${process.env.REACT_APP_API_URL}uploads/user_profile/${item.club_logo}`}
                      />
                    </td>
                  ),
                  game_details: (item) => (
                    <td>
                      <div>{item.full_name}</div>
                      <div className="small text-medium-emphasis text-nowrap">
                        Registered: {moment(item.created_at).format('D.MM.YYYY')}
                      </div>
                    </td>
                  ),
                  admin: (item) => (
                    <td>
                      {' '}
                      <div className="d-flex justify-content-between">
                        <div className="float-start">
                          <strong>{22}%</strong>
                        </div>
                        <div className="float-end ms-1 text-nowrap">
                          <small className="text-medium-emphasis">{22}</small>
                        </div>
                      </div>
                      <CProgress thin color={`success-gradient`} value={22} />
                    </td>
                  ),
                  fees: (item) => (
                    <td>
                      {item.is_fund_paid === 1 ? (
                        <CBadge color={'success'} title="Paid">
                          {/* <CIcon icon={cilDollar} /> */}
                          Paid
                        </CBadge>
                      ) : (
                        <CBadge color={'danger'} title="Unpaid">
                          {/* <CIcon icon={cilDollar} /> */} Unpaid
                        </CBadge>
                      )}
                    </td>
                  ),
                  show_details: (item) => {
                    return (
                      <>
                        <td className="py-2">
                          <div className="small text-medium-emphasis">Last login</div>
                          <div className="fw-semibold text-nowrap">5 Minuts ago</div>
                        </td>
                      </>
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

export default Dashboard
