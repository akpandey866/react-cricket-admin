import {
  CCol,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CWidgetStatsC,
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
  cilBasket,
  cilChartPie,
  cilDollar,
  cilGroup,
  cilLockLocked,
  cilLockUnlocked,
  cilPeople,
  cilSpeech,
  cilSpeedometer,
  cilStar,
  cilStarHalf,
  cilTransfer,
  cilUserFollow,
} from '@coreui/icons'

const GameStructure = () => {
  const [key, setKey] = useState('home')
  const [gameSpotData, setGameSpotData] = useState({})
  const [gameStuctureData, setGameStructureData] = useState('')
  const [playerStructuredetails, setPlayerStructureDetails] = useState({})
  const [gameprivacy, setGamePrivacy] = useState({})
  useEffect(() => {
    CommonService.gameStructureInfo()
      .then((res) => {
        if (res.status === 200) {
          setGameSpotData(res.game_spot)
          setGameStructureData(res.game_structure)
          setPlayerStructureDetails(res.multiplayer_data)
          setGamePrivacy(res.game_privacy)
        }
      })
      .catch((e) => {
        console.log('E=> ', e)
        ToastComponent(e.response?.data?.message, 'error')
      })
  }, [])
  return (
    <>
      <CRow>
        <CCol sm={6} md={2}>
          <CWidgetStatsC
            color="info-gradient"
            icon={<CIcon icon={cilGroup} height={36} />}
            value="11"
            title="Team Structure"
            inverse
            progress={{ value: 75 }}
            className="mb-4"
          />
        </CCol>
        <CCol sm={6} md={2}>
          <CWidgetStatsC
            color="success"
            icon={<CIcon icon={cilDollar} height={36} />}
            value="$385m"
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
            title="Trade Allowed"
            inverse
            progress={{ value: 75 }}
            className="mb-4"
          />
        </CCol>
        <CCol sm={6} md={2}>
          <CWidgetStatsC
            color="primary-gradient"
            icon={<CIcon icon={cilLockUnlocked} height={36} />}
            value="Public"
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
        <CAccordion activeItemKey={2}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              {' '}
              <strong>Team Structure</strong>
            </CAccordionHeader>
            <CAccordionBody>
              <GameStrucurePage
                gameStuctureData={gameStuctureData}
                setGameStructureData={setGameStructureData}
                setPlayerStructureDetails={setPlayerStructureDetails}
              />
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={2}>
            <CAccordionHeader>
              <strong>Player Structure</strong>
            </CAccordionHeader>
            <CAccordionBody>
              <PlayerStructure
                playerStructuredetails={playerStructuredetails}
                setPlayerStructureDetails={setPlayerStructureDetails}
              />
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={3}>
            <CAccordionHeader>
              <strong>Salary Cap ($m) </strong>
            </CAccordionHeader>
            <CAccordionBody>
              <SalaryCapPage />
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={4}>
            <CAccordionHeader>
              <strong>Trade Allowed</strong>
            </CAccordionHeader>
            <CAccordionBody>
              <Trade />
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={4}>
            <CAccordionHeader>
              <strong>Game Privacy</strong>
            </CAccordionHeader>
            <CAccordionBody>
              <GamePrivacy gameprivacy={gameprivacy} />
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
