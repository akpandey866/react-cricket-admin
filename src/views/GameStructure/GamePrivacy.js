import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CFormLabel,
  CForm,
  CLoadingButton,
  CRow,
  CFormInput,
  CCol,
  CFormSwitch,
  CFormSelect,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
const GamePrivacy = (props) => {
  const [loader, setLoader] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const formik = useFormik({
    initialValues: {
      privacy: props.gameprivacy.game_visibility,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data, actions) => {
      setLoader(true)
      CommonService.updateGamePrivacy(data)
        .then((res) => {
          if (res.status === 200) {
            props.setGamePrivacy(res.data)
            ToastComponent(res.message, 'success')
            setLoader(false)
          } else {
            setLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          ToastComponent('Something went wrong. Please try again.', 'error')
          setLoader(false)
        })
    },
  })
  const handleChange = (event) => {
    setShowCode(event.target.value)
  }
  return (
    <>
      <br></br>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CRow className="mb-10">
          <CCol md={12} xs={12}>
            <CFormLabel className="" htmlFor="name">
              {
                "Default visibility of the game is set as 'Public'. You can make the game 'Private' below. If privacy is set as 'Private', all members will be required to enter the unique game code to join the game."
              }
            </CFormLabel>
            <CFormSelect
              aria-label="Select Structure"
              name="structure"
              className={
                'mt-3 form-control' +
                (formik.errors.structure && formik.touched.structure ? ' is-invalid' : '')
              }
              value={formik.values.privacy}
              id="privacy"
              // onChange={formik.handleChange}
              onChange={(event) => {
                formik.setTouched({
                  ...formik.touched,
                  privacy: true,
                })
                formik.setFieldValue('privacy', event.target.value)
                handleChange(event)
              }}
            >
              <option value="1">Public </option>
              <option value="2">Private </option>
            </CFormSelect>
          </CCol>
          <CCol md={12} xs={12} className="mt-3">
            {props.gameprivacy.game_visibility == 2 && (
              <span className="mt-3"> Code: {props.gameprivacy.game_accept_code}</span>
            )}
          </CCol>
        </CRow>

        <CCol md={6}>
          <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default GamePrivacy
