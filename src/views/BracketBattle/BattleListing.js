import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BracketBattleService from 'src/service/BracketBattleService'

const BattleListing = () => {
  console.log('sdfsdfsdfsdsdf')
  const param = useParams()
  const [loading, setLoading] = useState(false)
  const [bracketListing, setBracketListing] = useState([])
  useEffect(() => {
    setLoading(true)
    BracketBattleService.battleListing(param.id).then((result) => {
      setBracketListing(result.getBattles)
      setLoading(false)
    })
  }, [param.id])
  console.log('asdasd', bracketListing)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Bracket Rounds</strong>
          </CCardHeader>
          <CCardBody>asdasdasdasd</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BattleListing
