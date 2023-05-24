import { cilBell, cilMoon, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CNav,
  CNavLink,
  CRow,
  CWidgetStatsF,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAvatar,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CBadge,
} from '@coreui/react-pro'
import { cibCcMastercard, cibCcStripe, cibCcVisa, cifBr, cifIn, cilPeople } from '@coreui/icons'
import React, { useEffect, useState } from 'react'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import CommonService from 'src/service/CommonService'
const GameAccount = () => {
  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Deakin Fantasy 2023/24',
        new: true,
        registered: 'Jan 1, 2021',
        status: 'In-Progress',
      },
      country: { name: 'USA', flag: 'asdasd' },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Deakin Fantasy 2022/23',
        new: false,
        registered: 'Jan 1, 2021',
        status: 'In-Active',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: {
        name: 'Deakin Fantasy 2021/22',
        new: true,
        registered: 'Jan 1, 2021',
        status: 'Completed',
      },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
        status: 'Completed',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
  ]

  const [activePage, setActivePage] = useState(1)
  const [columnFilter, setColumnFilter] = useState([])
  const [columnSorter, setColumnSorter] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedId, setSelectedId] = useState(0)
  const [users, setUsers] = useState()
  const [details, setDetails] = useState([])
  const columns = [
    {
      label: 'Comp Code',
      key: 'sn',
      _style: { width: '20%' },
    },
    { label: 'Comp Name', key: 'grade', _style: { width: '20%' } },
    { label: 'Created On', key: 'created_at', _style: { width: '20%' } },
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

  const [loading, setLoading] = useState()

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

    CommonService.gameAccount(offset, itemsPerPage, activePage, params).then((result) => {
      setUsers(result.data)
      setLoading(false)
    })
  }, [activePage, columnFilter, columnSorter, itemsPerPage])
  return (
    <>
      <CRow>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            icon={<CIcon width={24} icon={cilSettings} size="xl" />}
            title="All Games"
            value="$1.999,50"
            color="primary-gradient"
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            icon={<CIcon width={24} icon={cilUser} size="xl" />}
            title="Completed Games"
            value="$1.999,50"
            color="info-gradient"
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            icon={<CIcon width={24} icon={cilMoon} size="xl" />}
            title="All Players"
            value="$1.999,50"
            color="warning-gradient"
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            icon={<CIcon width={24} icon={cilBell} size="xl" />}
            title="All Members"
            value="$1.999,50"
            color="danger-gradient"
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} sm={12} lg={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Club Games</strong>
              <CButton color={'primary'} active={'active'} className="float-end">
                <CIcon icon={cilBell} className="me-2" />
                Info
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CNav component="nav" variant="pills" className="flex-column flex-sm-row">
                <CNavLink href="#" active>
                  Active
                </CNavLink>
                <CNavLink href="#">Completed</CNavLink>
              </CNav>

              <CTable align="middle" className="mb-0 border mt-3" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Game</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Admin</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis text-nowrap">
                          <span>
                            <CBadge color={'success'}>{item.user.status}</CBadge>
                          </span>{' '}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton color={'danger'}>
                          <CIcon icon={cilSettings} />
                        </CButton>
                      </CTableDataCell>

                      <CTableDataCell>
                        <CDropdown variant="btn-group">
                          <CButton color={'success'}>{'Actions'}</CButton>
                          <CDropdownToggle color={'success'} split />
                          <CDropdownMenu>
                            <CDropdownItem href="#">Game Activation</CDropdownItem>
                            <CDropdownItem href="#">Game Status</CDropdownItem>
                            <CDropdownItem href="#">Transfer Admin</CDropdownItem>
                            {/* <CDropdownItem href="#">Copy Content</CDropdownItem> */}
                            <CDropdownDivider />
                            <CDropdownItem href="#">Lobby Login</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default GameAccount
