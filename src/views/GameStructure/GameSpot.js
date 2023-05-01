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
const GameSpot = (props) => {
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    user_number: Yup.string().required('User Number is required'),
  })
  const formik = useFormik({
    initialValues: {
      user_number: props.gameSpotData.user_number,
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
    <CCard className="mb-10 h-100">
      <CCardHeader>
        <strong>Game Spots Allowed</strong>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={formik.handleSubmit}>
          <CRow className="">
            <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
              Use Limit
            </CFormLabel>
            <div className="col-sm-10 mb-3 pt-2">
              <CFormInput
                type="number"
                className={
                  'form-control' +
                  (formik.errors.user_number && formik.touched.user_number ? ' is-invalid' : '')
                }
                id="user_number"
                defaultValue={props.gameSpotData.user_number}
                onChange={formik.handleChange}
                name="user_number"
              />
              {formik.errors.user_number && formik.touched.user_number && (
                <CFormFeedback invalid>{formik.errors.user_number}</CFormFeedback>
              )}
            </div>
          </CRow>
          <CRow>
            <CCol md={6}>
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
