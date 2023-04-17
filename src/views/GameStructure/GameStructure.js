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

const GameStructure = () => {
  const [key, setKey] = useState('home')
  const [loader, setLoader] = useState(false)

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
  })
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (data) => {
      setLoader(true)
    },
  })
  return (
    <CRow>
      {/* <CCol lg={6}>
        <CCard color={'info'} textColor={'white'} className="mb-3" style={{ height: '18rem' }}>
          <CCardHeader>Salary Cap Details</CCardHeader>
          <CCardBody>
            <ul>
              <li key={1}>Want your fantasy game to allow 11 players per team? </li>
              <li key={2}>
                You can also now choose your own game structure of allowing eithger 6, 7, 8, 9 or 10
                players per team!{' '}
              </li>
              <li key={3}>
                Simply select your choice and save it while setting up your game (before activating
                your game)!
              </li>
              <li key={4}>
                The team salary cap for the game structure will change itself based on your game
                structure.
              </li>
              <li key={5}> NOTE: DO NOT CHANGE THIS ONCE YOU HAVE ACTIVATED YOUR GAME!</li>
            </ul>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg={6}>
        <CCard color={'success'} textColor={'white'} className="mb-3" style={{ height: '18rem' }}>
          <CCardHeader>Salary Cap for each Game Structure</CCardHeader>
          <CCardBody>
            <ul>
              <li key={6}>11 Players Per Game = $100m</li>
              <li key={7}>10 Players Per Game = $91m</li>
              <li key={8}>9 Players Per Game = $82m</li>
              <li key={9}>8 Players Per Game = $73m</li>
              <li key={10}>7 Players Per Game = $64m</li>
              <li key={11}>6 Players Per Game = $55m</li>
            </ul>
          </CCardBody>
        </CCard>
      </CCol> */}
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
                <CForm>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Game Structure</CFormLabel>
                    <CFormSelect id="autoSizingSelect211" defaultValue={11}>
                      <option defaultValue="6">6 Players (Salary Cap: $55m)</option>
                      <option defaultValue="7">7 Players (Salary Cap: $64m)</option>
                      <option defaultValue="8">8 Players (Salary Cap: $73m)</option>
                      <option defaultValue="9">9 Players (Salary Cap: $82m)</option>
                      <option defaultValue="10">10 Players (Salary Cap: $91m)</option>
                      <option defaultValue="11">11 Players (Salary Cap: $100m)</option>
                    </CFormSelect>
                  </div>

                  <div className="mb-3">
                    <CLoadingButton type="submit" color="success" variant="outline" loading={false}>
                      Submit
                    </CLoadingButton>
                  </div>
                </CForm>
              </Tab>
              <Tab eventKey="profile" title="Salary Cap">
                <CForm>
                  <CCol md={6}>
                    <CFormCheck
                      inline
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineCheckbox1"
                      defaultValue="male"
                      label="Default (Salary Cap: $91m)"
                      defaultChecked
                      // checked={showMale === 'male'}
                      // onChange={handleMaleChange}
                    />
                    <CFormCheck
                      inline
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineCheckbox2"
                      defaultValue="female"
                      label="Custom"
                      // checked={showFemale === 'female'}
                      // onChange={handleFemaleChange}
                    />
                  </CCol>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">Salary</CFormLabel>
                    <CFormInput type="email" id="salary" placeholder="Select Salary Cap" />
                  </div>
                  <div className="mb-3">
                    <CLoadingButton type="submit" color="success" variant="outline" loading={false}>
                      Submit
                    </CLoadingButton>
                  </div>
                </CForm>
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
