import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CRow,
  CFormLabel,
  CFormSelect,
  CForm,
  CFormInput,
  CLoadingButton,
  CFormCheck,
} from '@coreui/react-pro'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import GameSpot from './GameSpot'
import Trade from './Trade'
import CViceCaptain from './CViceCaptain'
import GameStrucurePage from './GameStrucurePage'
import SalaryCapPage from './SalaryCapPage'

const GameStructure = () => {
  const [key, setKey] = useState('home')

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-10 h-100">
          <CCardHeader>
            <strong>Game Structure & Salary Cap</strong>
          </CCardHeader>
          <CCardBody>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="home" title="Game Structure">
                <GameStrucurePage />
              </Tab>
              <Tab eventKey="profile" title="Salary Cap">
                <SalaryCapPage />
              </Tab>
            </Tabs>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <GameSpot />
      </CCol>
      <CCol xs={6}>
        <Trade />
      </CCol>
      <CCol xs={6}>
        <CViceCaptain />
      </CCol>
    </CRow>
  )
}

export default GameStructure
