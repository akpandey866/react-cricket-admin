import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CRow,
  CFormLabel,
  CFormSelect,
  CLoadingButton,
  CListGroup,
  CListGroupItem,
} from '@coreui/react-pro'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import AddRemoveInputField from './AddRemoveInputField'
import { useEffect } from 'react'
import PlayerService from 'src/service/PlayerService'
const Index = () => {
  const [playerCustomValue, setCustomValue] = useState([])
  const [playerDefaultValue, setPlayerDefaultValue] = useState([])
  const [key, setKey] = useState('home')
  useEffect(() => {
    PlayerService.getPlayerFantasyValue().then((result) => {
      setCustomValue(result.custom_value)
      setPlayerDefaultValue(result.default_value)
    })
  }, [])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Fantasy</strong> <small>Values</small>
            </CCardHeader>

            <CCardBody>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="home" title="Default">
                  <p className="text-medium-emphasis small">
                    This is the default game structure for your game. If you do not wish to select
                    custom game strcuture
                  </p>
                  <CCard>
                    <CCardHeader>Player Default Values</CCardHeader>
                    <CListGroup>
                      {playerDefaultValue &&
                        playerDefaultValue.map((item, key) => (
                          <CListGroupItem key={key}>{item.name}</CListGroupItem>
                        ))}
                    </CListGroup>
                  </CCard>
                </Tab>
                <Tab eventKey="profile" title="Custom">
                  <p className="text-medium-emphasis small">
                    Fill below form for custom player Value
                  </p>
                  <AddRemoveInputField playerCustomValue={playerCustomValue} />
                </Tab>
              </Tabs>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Select Fantasy Value System</strong>
            </CCardHeader>
            <CCardBody>
              <CCol md={4} className="mb-4">
                <CFormLabel htmlFor="grade">Default or Custom *</CFormLabel>
                <CFormSelect
                  aria-label="Select Grade"
                  name="grade"
                  defaultValue={480}
                  // onChange={formik.handleChange}
                  id="grade"
                >
                  <option value="0">Select</option>

                  <option>Use Default Fantasy Values</option>
                  <option>Use Custom Fantasy Values</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}></CCol>

              <CCol md={4} className="mb-4">
                <CLoadingButton type="submit" color="success" variant="outline" loading={false}>
                  Submit
                </CLoadingButton>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Index
