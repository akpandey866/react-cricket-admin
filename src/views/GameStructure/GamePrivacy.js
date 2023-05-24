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
  return (
    <>
      <br></br>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CRow className="mb-3">
          <CFormLabel htmlFor="staticEmail" className="col-sm-6 col-form-label">
            Make this private or public
          </CFormLabel>
          <div className="col-sm-6">
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
              }}
            >
              <option value="1">Public </option>
              <option value="2">Private </option>
            </CFormSelect>
          </div>
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
