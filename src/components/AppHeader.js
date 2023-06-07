import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButtonGroup,
  CFormCheck,
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CButton,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cilApplicationsSettings,
  cilApps,
  cilExternalLink,
  cilInfo,
  cilMenu,
  cilMoon,
  cilShareAlt,
  cilSun,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'

import { AppHeaderDropdown, AppHeaderDropdownNotif, AppHeaderDropdownTasks } from './header/index'

import { logo } from 'src/assets/brand/logo'
import GameLinkBar from './header/GameLinkBar'
import PageInfoModal from './PageInfoModal'

const AppHeader = () => {
  const navigate = useNavigate()
  const authenticated = localStorage.getItem('authenticated')
  useEffect(() => {
    if (!authenticated) {
      navigate('/login')
    }
  }, [])
  const dispatch = useDispatch()
  const handleAccountPage = () => {
    navigate('/account')
  }
  const theme = useSelector((state) => state.theme)

  theme === 'dark'
    ? document.body.classList.add('dark-theme')
    : document.body.classList.remove('dark-theme')

  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [infoPageModal, setInfoPageModal] = useState(false)
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>

        <CHeaderNav className="ms-auto me-4">
          <CButtonGroup aria-label="Theme switch">
            <CFormCheck
              type="radio"
              button={{ color: 'primary' }}
              name="theme-switch"
              id="btn-light-theme"
              autoComplete="off"
              label={<CIcon icon={cilSun} />}
              checked={theme === 'default'}
              onChange={() => dispatch({ type: 'set', theme: 'light' })}
            />
            <CFormCheck
              type="radio"
              button={{ color: 'primary' }}
              name="theme-switch"
              id="btn-dark-theme"
              autoComplete="off"
              label={<CIcon icon={cilMoon} />}
              checked={theme === 'dark'}
              onChange={() => dispatch({ type: 'set', theme: 'dark' })}
            />
          </CButtonGroup>
        </CHeaderNav>
        <CHeaderNav>
          <CHeaderNav className="ms-auto ml-2">
            <CButtonGroup aria-label="Account" onClick={handleAccountPage}>
              <CIcon icon={cilApps} className="my-1 mx-2 mt-3" size="lg" />
            </CButtonGroup>
          </CHeaderNav>
          <AppHeaderDropdownNotif />

          <GameLinkBar />
          {/* <AppHeaderDropdownMssg /> */}
        </CHeaderNav>
        <CHeaderNav className="ms-3 me-4">
          <AppHeaderDropdown />
        </CHeaderNav>
        {/* <CHeaderToggler
          className="px-md-0 me-md-3"
          onClick={() => dispatch({ type: 'set', asideShow: !asideShow })}
        >
          <CIcon icon={cilApplicationsSettings} size="lg" />
        </CHeaderToggler> */}
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
        <CHeaderNav className="ms-auto">
          <CButtonGroup aria-label="Theme switch">
            {/*  'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string */}

            <CButton color={'warning'} onClick={() => setInfoPageModal(!infoPageModal)}>
              <CIcon icon={cilInfo} />
            </CButton>
            <CButton color={'primary'}>
              <CIcon icon={cilExternalLink} />
            </CButton>
          </CButtonGroup>
        </CHeaderNav>
        <span></span>
        <span></span>
      </CContainer>
      <PageInfoModal infoPageModal={infoPageModal} setInfoPageModal={setInfoPageModal} />
    </CHeader>
  )
}

export default AppHeader
