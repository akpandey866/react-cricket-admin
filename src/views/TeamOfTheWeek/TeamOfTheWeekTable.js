import React, { useEffect, useState } from 'react'
import { CBadge, CButton } from '@coreui/react-pro'
import ToastComponent from 'src/components/common/TaostComponent.js'
import CommonService from 'src/service/CommonService'
import Loader from 'src/components/Loader'
import BonusCardModal from './BonusCardModal'
import TeamOfTheWeekPlayer from './TeamOfTheWeekPlayer'
const BonusTable = (props) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [roundNumber, setRoundNumber] = useState(false)
  useEffect(() => {
    setLoading(true)
    CommonService.getTotwData().then((result) => {
      setUsers(result.data)
      setLoading(false)
    })
  }, [])
  const [modalIsOpen, setIsOpen] = useState(false)
  const [playerModalOpen, setPlayerModalOpen] = useState(false)
  const handleCloseModal = (data) => {
    console.log(JSON.stringify(data))
    setIsOpen(false)
  }

  const handlePlayerCloseModal = (data) => {
    console.log(JSON.stringify(data))
    setPlayerModalOpen(false)
  }

  const [playerData, setPlayerData] = useState([])
  function openModalForPoint(round) {
    setPlayerData([])
    CommonService.totwPlayerList(round).then((result) => {
      setPlayerData(result.data)
    })
    setPlayerModalOpen(true)
    setRoundNumber(round)
  }

  const [options, setOptions] = useState([])
  function openModalForSetUp(roundId) {
    CommonService.totwSelectedPlayer(roundId).then((result) => {
      setOptions(result.data)
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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((item, key) => (
              <tr key={key}>
                <th>{item.round}</th>
                <td>
                  <CBadge color="success">Active</CBadge>
                </td>
                <td>
                  <CButton onClick={() => openModalForSetUp(item.round)} color={'success'}>
                    Set Up
                  </CButton>
                  <CButton
                    className="mx-2"
                    color="success"
                    onClick={() => openModalForPoint(item.round)}
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
        options={options}
      />
      <TeamOfTheWeekPlayer
        IsModalOpened={playerModalOpen}
        onCloseModal={handlePlayerCloseModal}
        roundNumber={roundNumber}
        playerData={playerData}
      />
    </>
  )
}

export default BonusTable
