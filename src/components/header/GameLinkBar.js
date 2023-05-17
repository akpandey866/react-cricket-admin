import React from 'react'
import { CButtonGroup, CHeaderNav } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilShareAlt } from '@coreui/icons'
import ToastComponent from '../common/TaostComponent'

const GameLinkBar = () => {
  const copyGameLink = () => {
    const userDetailShare = JSON.parse(localStorage.getItem('admin'))
    navigator.clipboard.writeText(
      `https://cricket.myclubtap.com/about-game?club_name=${userDetailShare.string_url}`,
    )
    ToastComponent('Game Link copied to clipboard.', 'success')
  }
  return (
    <CHeaderNav className="ms-auto ml-2">
      <CButtonGroup aria-label="Theme switch">
        <CIcon icon={cilShareAlt} className="my-1 mx-2 mt-3" onClick={copyGameLink} />
      </CButtonGroup>
    </CHeaderNav>
  )
}

export default GameLinkBar
