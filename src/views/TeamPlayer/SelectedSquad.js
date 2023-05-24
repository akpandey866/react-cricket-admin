import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import TeamPlayerService from 'src/service/TeamPlayerService'

const SelectedSquad = (props) => {
  const [pickedPlayer, setPickedPlayer] = useState([])
  const urlParams = useParams()
  useEffect(() => {
    TeamPlayerService.getTeamPlayer(urlParams.fixtureId).then((result) => {
      console.log('picker player', result.picked_player)
      setPickedPlayer(result.picked_player)
    })
  }, [urlParams.fixtureId])

  return (
    <CTable striped responsive={true}>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Player Name</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {pickedPlayer &&
          pickedPlayer.map((item, key) => (
            <CTableRow key={key}>
              <CTableHeaderCell scope="row">{item.player_name}</CTableHeaderCell>
            </CTableRow>
          ))}
      </CTableBody>
    </CTable>
  )
}

export default SelectedSquad
