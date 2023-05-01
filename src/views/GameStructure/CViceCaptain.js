import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CFormLabel,
  CFormSelect,
  CForm,
  CLoadingButton,
  CFormInput,
  CRow,
  CCol,
  CFormFeedback,
  CFormSwitch,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'
const CViceCaptain = () => {
  const [data, setData] = useState({})
  const [userNumber, setUserNumber] = useState()
  const [capCheck, setCapCheck] = useState()
  const [vCapCheck, setVCapCheck] = useState()
  // useEffect(() => {
  //   CommonService.gameSpot()
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setData(res.data)
  //         setUserNumber(res.data.user_number)
  //       }
  //     })
  //     .catch((e) => {
  //       ToastComponent(e.response?.data?.message, 'error')
  //     })
  // }, [])

  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    cap_point: Yup.string().required('User Number is required'),
  })
  const formik = useFormik({
    initialValues: {
      cap_point: 40,
      vcap_point: 50,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      actions.resetForm({
        values: {
          cap_point: '',
        },
      })
      setLoader(true)
      CommonService.updateGameSpot(data)
        .then((res) => {
          if (res.status === 200) {
            setUserNumber(res.data.cap_point)
            ToastComponent(res.message, 'success')
            setLoader(false)
          } else {
            setLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          ToastComponent(e.response?.data?.message, 'error')
          setLoader(false)
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })
  const handleVCapCheck = () => {
    setVCapCheck((current) => !current)
    const data = {}
    data.status = capCheck
    data.type = 'captype'
    // CommonService.changePowerControlStatus(data).then((res) => {
    //   if (res.status === 200) {
    //     setData(res.data)
    //     ToastComponent(res.message, 'success')
    //   }
    // })
  }
  const handleCapCheck = () => {
    setCapCheck((current) => !current)
    const data = {}
    data.status = capCheck
    data.type = 'captype'
    // CommonService.changePowerControlStatus(data).then((res) => {
    //   if (res.status === 200) {
    //     setData(res.data)
    //     ToastComponent(res.message, 'success')
    //   }
    // })
  }
  return (
    <CCard className="mt-4">
      <CCardHeader>
        <strong>Captain / Vice-Captain</strong>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={formik.handleSubmit}>
          <CRow className="">
            <CFormLabel htmlFor="staticEmail" className="col-sm-3 col-form-label">
              Captain
            </CFormLabel>
            <div className="col-sm-3 mb-3 pt-2">
              <CFormInput
                type="number"
                className={
                  'form-control' +
                  (formik.errors.cap_point && formik.touched.cap_point ? ' is-invalid' : '')
                }
                id="cap_point"
                defaultValue={40}
                onChange={formik.handleChange}
                name="cap_point"
              />
              {formik.errors.cap_point && formik.touched.cap_point && (
                <CFormFeedback invalid>{formik.errors.cap_point}</CFormFeedback>
              )}
            </div>
            <CFormLabel htmlFor="staticEmail" className="col-sm-3 col-form-label">
              Default/Custom
            </CFormLabel>
            <div className="col-sm-3 mb-3 pt-2">
              <CFormSwitch
                label=""
                id="captain"
                name="captain_check"
                // checked={props.twelthMenCheck}
                onChange={handleCapCheck}
              />
              {formik.errors.cap_point && formik.touched.cap_point && (
                <CFormFeedback invalid>{formik.errors.cap_point}</CFormFeedback>
              )}
            </div>
          </CRow>
          <CRow className="">
            <CFormLabel htmlFor="staticEmail" className="col-sm-3 col-form-label">
              V-Captain
            </CFormLabel>
            <div className="col-sm-3 mb-3 pt-2">
              <CFormInput
                type="number"
                className={
                  'form-control' +
                  (formik.errors.vcap_point && formik.touched.vcap_point ? ' is-invalid' : '')
                }
                id="vcap_point"
                defaultValue={50}
                onChange={handleCapCheck}
                name="vcap_point"
              />
              {formik.errors.vcap_point && formik.touched.vcap_point && (
                <CFormFeedback invalid>{formik.errors.vcap_point}</CFormFeedback>
              )}
            </div>
            <CFormLabel htmlFor="staticEmail" className="col-sm-3 col-form-label">
              Default/Custom
            </CFormLabel>
            <div className="col-sm-3 mb-3 pt-2">
              <CFormSwitch
                label=""
                id="vCaptain"
                name="vCaptain_check"
                // checked={props.twelthMenCheck}
                onChange={handleVCapCheck}
              />
              {formik.errors.vCaptain_check && formik.touched.vCaptain_check && (
                <CFormFeedback invalid>{formik.errors.vCaptain_check}</CFormFeedback>
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

export default CViceCaptain
