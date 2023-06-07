import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CFormLabel,
  CForm,
  CLoadingButton,
  CRow,
  CFormInput,
  CFormFeedback,
  CCol,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'
import { useEffect } from 'react'
import { Col } from 'react-bootstrap'
const GameSpot = (props) => {
  const [gameSpotData, setGameSpotData] = useState({})
  useEffect(() => {
    CommonService.gameStructureInfo()
      .then((res) => {
        if (res.status === 200) {
          setGameSpotData(res.game_spot)
        }
      })
      .catch((e) => {
        console.log('E=> ', e)
        ToastComponent(e.response?.data?.message, 'error')
      })
  }, [])
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    user_number: Yup.string().required('User Number is required'),
  })
  const formik = useFormik({
    initialValues: {
      user_number: gameSpotData.user_number,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      setLoader(true)
      CommonService.updateGameSpot(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
          }
        })
        .catch((e) => {
          console.log('Error=> ', e)
          setLoader(false)
          ToastComponent('Something Went wrong.', 'error')
        })
    },
  })
  return (
    <CCard className="mb-3 h-100">
      <CCardHeader>
        <strong>Game Spots Allowed</strong>
      </CCardHeader>
      <CCardBody>
        <CForm className="row" onSubmit={formik.handleSubmit}>
          <CRow className="">
            <CCol md={12}>
              <CFormLabel htmlFor="name" className="fw-bold">
                Spots *
              </CFormLabel>
              <CFormInput
                type="number"
                className={
                  'form-control' +
                  (formik.errors.user_number && formik.touched.user_number ? ' is-invalid' : '')
                }
                id="user_number"
                defaultValue={gameSpotData.user_number}
                onChange={formik.handleChange}
                name="user_number"
              />
              {formik.errors.user_number && formik.touched.user_number && (
                <CFormFeedback invalid>{formik.errors.user_number}</CFormFeedback>
              )}
            </CCol>
            <CCol md={6} className="mt-3">
              <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
                Submit
              </CLoadingButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default GameSpot
