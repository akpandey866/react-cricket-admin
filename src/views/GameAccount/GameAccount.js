import {
  cilBell,
  cilExternalLink,
  cilInfo,
  cilMoon,
  cilPlus,
  cilSettings,
  cilUser,
} from '@coreui/icons'
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
  CAvatar,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CBadge,
  CSmartTable,
  CContainer,
  CHeaderNav,
  CButtonGroup,
} from '@coreui/react-pro'
import { cilPeople } from '@coreui/icons'
import React, { useEffect, useState } from 'react'
import CommonService from 'src/service/CommonService'
import GameStatusModal from './GameStatusModal'
import TransferAdminModal from './TransferAdminModal'
import ToastComponent from 'src/components/common/TaostComponent'
import { useNavigate } from 'react-router-dom'
const GameAccount = (props) => {
  const [visible, setVisible] = useState(false)
  const [defaultActive, setDefaultActive] = useState(true)
  const [runningActive, setRunningActive] = useState(false)
  const [completedActive, setCompletedActive] = useState(false)
  const [activePage, setActivePage] = useState(1)
  const [columnFilter, setColumnFilter] = useState([])
  const [columnSorter, setColumnSorter] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [users, setUsers] = useState()
  const [dashboardData, setDashboardData] = useState()

  const columns = [
    {
      label: <CIcon icon={cilPeople} />,
      key: 'logo',
      filter: false,
      sorter: false,
      _style: { width: '25%' },
    },
    { label: 'Game', key: 'game_details', _style: { width: '25%' } },
    { label: 'Admin', key: 'admin', filter: false, sorter: false, _style: { width: '25%' } },
    {
      key: 'show_details',
      label: 'Actions',
      _style: { width: '25%' },
      filter: false,
      sorter: false,
    },
  ]
  const getBadge = (status) => {
    switch (status) {
      case 1:
        return 'success'
      case 2:
        return 'warning'
      case 3:
        return 'danger'
      default:
        return 'primary'
    }
  }

  const handleDefaultActive = () => {
    // getUsers()
    setDefaultActive(true)
    setCompletedActive(false)
    setRunningActive(false)
  }
  const handleCompleteActive = () => {
    // getUsers()
    setCompletedActive(true)
    setRunningActive(false)
    setDefaultActive(false)
  }

  const handleRunningActive = () => {
    // getUsers()
    setRunningActive(true)
    setCompletedActive(false)
    setDefaultActive(false)
  }
  const [loading, setLoading] = useState()
  const [gameStatus, setGameStatus] = useState()
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
    const gameType = {}
    gameType.running = runningActive
    gameType.completed = completedActive
    CommonService.gameAccount(
      offset,
      itemsPerPage,
      activePage,
      params,
      runningActive,
      completedActive,
    ).then((result) => {
      setUsers(result.data)
      setDashboardData(result.new_data)
      setLoading(false)
    })
  }, [activePage, columnFilter, columnSorter, itemsPerPage, runningActive, completedActive])

  const [userId, setUserId] = useState()
  const handleGameStatus = (status, userId) => {
    setVisible(true)
    setGameStatus(status)
    setUserId(userId)
  }

  const [transferVisible, setTransferVisible] = useState(false)
  const handleTransferAdmin = (userId) => {
    setTransferVisible(true)
    setUserId(userId)
  }

  const navigate = useNavigate()
  const gameLogin = (userId) => {
    const data = {}
    data.userId = userId
    CommonService.gameLogin(data)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('admin', JSON.stringify(res.user))
          localStorage.setItem('token', JSON.stringify(res.token))
          navigate('/dashboard')
        }
      })
      .catch((e) => {
        ToastComponent(e.response?.data?.message, 'error')
      })
  }

  const clubRegister = () => {
    navigate('/club-register')
  }
  return (
    <>
      <div className="bg-light min-vh-200 d-flex flex-row align-items-center pt-5">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilSettings} size="xl" />}
                title="All Games"
                value={dashboardData?.all_games}
                color="primary-gradient"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilUser} size="xl" />}
                title="Completed Games"
                value={dashboardData?.complete_games}
                color="info-gradient"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilMoon} size="xl" />}
                title="All Players"
                value={dashboardData?.all_players}
                color="warning-gradient"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilBell} size="xl" />}
                title="All Members"
                value={dashboardData?.all_members}
                color="danger-gradient"
              />
            </CCol>
            <CCol xs={12} sm={12} lg={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>Club Games</strong>
                  {/* &nbsp;
                  <CButton
                    color={'success'}
                    active={false}
                    className="float-end ml-2"
                    onClick={clubRegister}
                  >
                    <CIcon icon={cilPlus} className="me-2" />
                    New
                  </CButton>{' '}
                  &nbsp;
                  <CButton color={'primary'} active={true} className="float-end text-center">
                    <CIcon icon={cilInfo} className="me-2" />
                  </CButton> */}
                  <CHeaderNav className="float-end">
                    <CButtonGroup aria-label="Theme switch">
                      {/*  'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string */}

                      <CButton color={'warning'}>
                        <CIcon icon={cilInfo} />
                      </CButton>
                      <CButton color={'success'}>
                        <CIcon icon={cilPlus} />
                      </CButton>
                    </CButtonGroup>
                  </CHeaderNav>
                </CCardHeader>
                <CCardBody>
                  <CNav component="nav" variant="pills" className="flex-column flex-sm-row">
                    <CNavLink href="#" active={defaultActive} onClick={handleDefaultActive}>
                      All
                    </CNavLink>
                    <CNavLink href="#" active={runningActive} onClick={handleRunningActive}>
                      Active
                    </CNavLink>
                    <CNavLink href="#" active={completedActive} onClick={handleCompleteActive}>
                      Completed
                    </CNavLink>
                  </CNav>

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
                            src={`${process.env.REACT_APP_API_URL}uploads/club/${item.club_logo}`}
                          />
                        </td>
                      ),
                      game_details: (item) => (
                        <td>
                          <div>{item.game_name}</div>
                          <div className="small text-medium-emphasis text-nowrap">
                            <span>
                              <CBadge color={getBadge(item.is_completed)}>
                                {item.is_completed === 1
                                  ? 'Running'
                                  : item.is_completed === 2
                                  ? 'Completed'
                                  : 'Not Yet Started'}
                              </CBadge>
                            </span>{' '}
                          </div>
                        </td>
                      ),
                      admin: (item) => (
                        <td>
                          <CButton color={'danger'} onClick={() => gameLogin(item.id)}>
                            <CIcon icon={cilSettings} />
                          </CButton>
                        </td>
                      ),
                      show_details: (item) => {
                        return (
                          <>
                            <td className="py-2">
                              {' '}
                              <CDropdown variant="btn-group">
                                <CButton color={'success'}>{'Actions'}</CButton>
                                <CDropdownToggle color={'success'} split />
                                <CDropdownMenu>
                                  <CDropdownItem href={'/activate-game'}>
                                    Game Activation
                                  </CDropdownItem>
                                  <CDropdownItem
                                    onClick={() => handleGameStatus(item.is_completed, item.id)}
                                  >
                                    Game Status
                                  </CDropdownItem>
                                  <CDropdownItem onClick={() => handleTransferAdmin(item.id)}>
                                    Transfer Admin
                                  </CDropdownItem>
                                  {/* <CDropdownItem href="#">Copy Content</CDropdownItem> */}
                                  <CDropdownDivider />
                                  <CDropdownItem href="#">Lobby Login</CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
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
          <GameStatusModal
            visible={visible}
            setVisible={setVisible}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            userId={userId}
            setUsers={setUsers}
          />
          <TransferAdminModal
            transferVisible={transferVisible}
            setTransferVisible={setTransferVisible}
            userId={userId}
          />
        </CContainer>
      </div>
    </>
  )
}

export default GameAccount
