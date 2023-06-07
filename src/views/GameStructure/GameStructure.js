import {
  CCol,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CWidgetStatsC,
  CBadge,
} from '@coreui/react-pro'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import GameSpot from './GameSpot'
import Trade from './Trade'
import CViceCaptain from './CViceCaptain'
import GameStrucurePage from './GameStrucurePage'
import SalaryCapPage from './SalaryCapPage'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'
import PlayerStructure from '../Player/PlayerStructure/PlayerStructure'
import GamePrivacy from './GamePrivacy'
import CIcon from '@coreui/icons-react'
import {
  cilDollar,
  cilGroup,
  cilLockUnlocked,
  cilStar,
  cilStarHalf,
  cilTransfer,
} from '@coreui/icons'
import { useMemo } from 'react'

const GameStructure = () => {
  const [key, setKey] = useState('home')
  const [gameSpotData, setGameSpotData] = useState({})
  const [savedSalaryCap, setSavedSalaryCap] = useState('')
  const [rangeValue, setRangValue] = useState(100)

  const [gameStuctureData, setGameStructureData] = useState()
  const [playerStructuredetails, setPlayerStructureDetails] = useState({})
  const [gameprivacy, setGamePrivacy] = useState({})
  useEffect(() => {
    CommonService.gameStructureInfo()
      .then((res) => {
        if (res.status === 200) {
          setGameSpotData(res.game_spot)
          setGameStructureData(res.game_structure)
          setPlayerStructureDetails(res.multiplayer_data)
          setRangValue(res.multiplayer_data.salary)
          setSavedSalaryCap(res.multiplayer_data.salary)
          setGamePrivacy(res.game_privacy)
        }
      })
      .catch((e) => {
        console.log('E=> ', e)
        ToastComponent('Something went wron.Please try again', 'error')
      })
  }, [])
  var boxTeamSize = { 8: '6', 7: '7', 6: '8', 5: '9', 1: '10', 1002: '11' }
  console.log('salary cap is here', savedSalaryCap)
  return (
    <>
      <CRow>
        <CCol sm={6} md={2}>
          <CWidgetStatsC
            color="info-gradient"
            icon={<CIcon icon={cilGroup} height={36} />}
            value={gameStuctureData && boxTeamSize[gameStuctureData]}
            title="Team Size"
            inverse
            progress={{ value: 75 }}
            className="mb-4"
          />
        </CCol>
        <CCol sm={6} md={2}>
          <CWidgetStatsC
            color="success"
            icon={<CIcon icon={cilDollar} height={36} />}
            value={`$${playerStructuredetails.salary}m`}
            title="Salary Cap"
            inverse
            progress={{ value: 75 }}
            className="mb-4"
          />
        </CCol>
        <CCol sm={6} md={2}>
          <CWidgetStatsC
            color="warning-gradient"
            icon={<CIcon icon={cilTransfer} height={36} />}
            value="20"
            title="Transfers"
            inverse
            progress={{ value: 75 }}
            className="mb-4"
          />
        </CCol>
        <CCol sm={6} md={2}>
          <CWidgetStatsC
            color="primary-gradient"
            icon={<CIcon icon={cilLockUnlocked} height={36} />}
            value={gameprivacy?.game_visibility === 2 ? 'Private' : 'Public'}
            title="Visibility"
            inverse
            progress={{ value: 75 }}
            className="mb-4"
          />
        </CCol>
        <CCol sm={6} md={2}>
          <CWidgetStatsC
            color="danger-gradient"
            icon={<CIcon icon={cilStar} height={36} />}
            value="2x"
            title="Captain"
            inverse
            progress={{ value: 75 }}
            className="mb-4"
          />
        </CCol>
        <CCol sm={6} md={2}>
          <CWidgetStatsC
            color="info-gradient"
            icon={<CIcon icon={cilStarHalf} height={36} />}
            value="1.5x"
            title="Vice-Captain"
            inverse
            progress={{ value: 75 }}
            className="mb-4"
          />
        </CCol>
      </CRow>
      <CRow>
        <CAccordion activeItemKey={1} alwaysOpen>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              {' '}
              <strong>Team Size</strong>
            </CAccordionHeader>
            <CAccordionBody>
              <GameStrucurePage
                gameStuctureData={gameStuctureData}
                setGameStructureData={setGameStructureData}
                setPlayerStructureDetails={setPlayerStructureDetails}
              />
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
        <CAccordion activeItemKey={1}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              <strong>
                Player Limits for Team Size ({playerStructuredetails?.player_allowed})
              </strong>
            </CAccordionHeader>
            <CAccordionBody>
              <PlayerStructure
                playerStructuredetails={playerStructuredetails}
                setPlayerStructureDetails={setPlayerStructureDetails}
              />
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
        <CAccordion activeItemKey={1}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              <strong>Salary Cap ($m) </strong>
            </CAccordionHeader>
            <CAccordionBody>
              {' '}
              <SalaryCapPage
                rangeValue={rangeValue}
                setRangValue={setRangValue}
                savedSalaryCap={playerStructuredetails.salary}
              />
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
        <CAccordion activeItemKey={1}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              <strong>Transfers</strong>
            </CAccordionHeader>
            <CAccordionBody>
              <Trade />
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
        <CAccordion activeItemKey={1}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              <strong>Game Privacy </strong>
            </CAccordionHeader>
            <CAccordionBody>
              <GamePrivacy gameprivacy={gameprivacy} setGamePrivacy={setGamePrivacy} />
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>

        <CCol xs={12} className="mb-4"></CCol>
        {/* <CCol xs={12} className="mb-4">
        <CViceCaptain />
      </CCol> */}
      </CRow>
    </>
  )
}

export default GameStructure
