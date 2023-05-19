import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
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

const GameStructure = () => {
  const [key, setKey] = useState('home')
  const [gameSpotData, setGameSpotData] = useState({})
  const [gameStuctureData, setGameStructureData] = useState(0)
  const [salaryCapData, setSalaryCapData] = useState({})
  useEffect(() => {
    CommonService.gameStructureInfo()
      .then((res) => {
        if (res.status === 200) {
          setGameSpotData(res.game_spot)
          setGameStructureData(res.game_structure)
          setSalaryCapData(res.game_structure)
        }
      })
      .catch((e) => {
        console.log('E=> ', e)
        ToastComponent(e.response?.data?.message, 'error')
      })
  }, [])
  return (
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
            />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>
            <strong>Salary Cap ($m) </strong>
          </CAccordionHeader>
          <CAccordionBody>
            <SalaryCapPage />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>
            <strong>Salary Cap ($m) </strong>
          </CAccordionHeader>
          <CAccordionBody>
            <SalaryCapPage />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>

      <PlayerStructure />
      <CCol xs={12} className="mb-4">
        <Trade />
      </CCol>
      {/* <CCol xs={12} className="mb-4">
        <CViceCaptain />
      </CCol> */}
    </CRow>
  )
}

export default GameStructure
