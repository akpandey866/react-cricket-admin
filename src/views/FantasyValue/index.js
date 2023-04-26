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
  CForm,
  CFormFeedback,
} from '@coreui/react-pro'

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import AddRemoveInputField from './AddRemoveInputField'
import { useEffect } from 'react'
import PlayerService from 'src/service/PlayerService'
import ToastComponent from 'src/components/common/TaostComponent'
import { useFormik } from 'formik'
import * as Yup from 'yup'
const Index = () => {
  const [playerCustomValue, setPlayerCustomValue] = useState([])
  const [playerDefaultValue, setPlayerDefaultValue] = useState([])
  const [defaultPlayerPrice, setDefaultPlayerPrice] = useState(0)

  const [key, setKey] = useState('home')
  useEffect(() => {
    PlayerService.getPlayerFantasyValue().then((result) => {
      setPlayerCustomValue(result.custom_value)
      setPlayerDefaultValue(result.default_value)
      setDefaultPlayerPrice(result.default_player_price)
    })
  }, [])

  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    salary_structure: Yup.string().required('Please select price structure.'),
  })
  const formik = useFormik({
    initialValues: {
      salary_structure: defaultPlayerPrice,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      PlayerService.saveDefaultPriceStructure(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
          }
        })
        .catch((e) => {
          console.log('Error =>', e)
          ToastComponent('Something went wrong.', 'error')
          setLoader(false)
        })
    },
  })
  const handlePrice = (e) => {
    setDefaultPlayerPrice(e.target.value)
  }
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Fantasy</strong> <small>Values</small>
            </CCardHeader>

            <CCardBody>
              {/* <InputRange maxValue={20} minValue={0} value={inputValue} onChange={getValue} /> */}

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
                  <br></br>
                  <AddRemoveInputField
                    playerCustomValue={playerCustomValue}
                    setPlayerCustomValue={setPlayerCustomValue}
                  />
                </Tab>
              </Tabs>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Select Fantasy Value System</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3" onSubmit={formik.handleSubmit}>
                <CCol md={6} className="">
                  <CFormLabel htmlFor="salary_structure">Default or Custom *</CFormLabel>
                  <CFormSelect
                    aria-label="Select Structure"
                    name="salary_structure"
                    className={
                      'form-control' +
                      (formik.errors.salary_structure && formik.touched.salary_structure
                        ? ' is-invalid'
                        : '')
                    }
                    value={defaultPlayerPrice}
                    onChange={handlePrice}
                    id="salary_structure"
                  >
                    <option value="1">Use Default Fantasy Values</option>
                    <option value="2">Use Custom Fantasy Values</option>
                  </CFormSelect>
                  {formik.errors.salary_structure && formik.touched.salary_structure && (
                    <CFormFeedback invalid>{formik.errors.salary_structure}</CFormFeedback>
                  )}
                </CCol>
                <CCol md={6}></CCol>
                <CCol md={6}>
                  <CLoadingButton type="submit" color="success" variant="outline" loading={false}>
                    Submit
                  </CLoadingButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Index
