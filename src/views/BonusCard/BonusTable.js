import React, { useEffect, useState } from 'react'
import { CBadge, CButton } from '@coreui/react-pro'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'
import CommonService from 'src/service/CommonService'
import Loader from 'src/components/Loader'
import BonusCardModal from './BonusCardModal'
import BonusCardPlayer from './BonusCardPlayer'
const BonusTable = (props) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [roundNumber, setRoundNumber] = useState(false)
  useEffect(() => {
    setLoading(true)
    CommonService.roundListing().then((result) => {
      setUsers(result.data)
      setLoading(false)
    })
  }, [])
  const [modalIsOpen, setIsOpen] = useState(false)
  const [playerModalOpen, setPlayerModalOpen] = useState(false)
  const handleCloseModal = (data) => {
    setIsOpen(false)
  }

  const handlePlayerCloseModal = (data) => {
    setPlayerModalOpen(false)
  }

  const [playerData, setPlayerData] = useState([])

  // Point Modal Box
  function openFromParentForPlayer(teamPowerId, roundId) {
    CommonService.bonusCardPlayer(teamPowerId).then((result) => {
      setPlayerData(result.data)
    })
    setPlayerModalOpen(true)
    setRoundNumber(roundId)
  }

  const [bonusCardDetail, setBonusCardDetail] = useState({})
  const [selectedPlayer, setSelectedPlayer] = useState([])
  const [options, setOptions] = useState([])

  // Set Up Modal Box
  function openFromParent(roundId) {
    CommonService.bonusCardSelectedPlayer(roundId).then((result) => {
      setOptions(result.data)
    })
    CommonService.getBonusCardDetail(roundId).then((result) => {
      setBonusCardDetail(result.data)
      setSelectedPlayer(result.selected_player)
    })

    setIsOpen(true)
    setRoundNumber(roundId)
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <table className="main-table table innertable">
        <thead>
          <tr>
            <th>Round</th>
            <th>Bonus Card Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((item, key) => (
              <tr key={key}>
                <th>{item.round}</th>
                <td>{item?.bonus_card_name}</td>
                <td>
                  <CBadge color="success">Active</CBadge>
                </td>
                <td>
                  <CButton onClick={() => openFromParent(item.round)} color={'success'}>
                    Set Up
                  </CButton>
                  &nbsp;
                  <CButton
                    className=""
                    color="success"
                    onClick={() => openFromParentForPlayer(item.team_power_id, item.round)}
                  >
                    Points
                  </CButton>
                </td>
              </tr>
            ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={4}>No record yet available.</td>
            </tr>
          )}
        </tbody>
      </table>
      <BonusCardModal
        IsModalOpened={modalIsOpen}
        onCloseModal={handleCloseModal}
        roundNumber={roundNumber}
        bonusCardDetail={bonusCardDetail}
        selectedPlayer={selectedPlayer}
        options={options}
      />
      <BonusCardPlayer
        IsModalOpened={playerModalOpen}
        onCloseModal={handlePlayerCloseModal}
        roundNumber={roundNumber}
        playerData={playerData}
      />
    </>
  )
}

export default BonusTable
