import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CLoadingButton,
  CForm,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastComponent from 'src/components/common/TaostComponent'
import ClubService from 'src/service/ClubService'
const GameSocial = (props) => {
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      facebook: props.userDetail.facebook,
      twitter: props.userDetail.twitter,
      instagram: props.userDetail.instagram,
      website: props.userDetail.website,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data) => {
      setLoading(true)
      ClubService.updateGameSocial(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoading(false)
          } else {
            setLoading(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          ToastComponent(e.response?.data?.message, 'error')
          setLoading(false)
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Game Social</strong>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={formik.handleSubmit}>
          <CCol md={6}>
            <CFormLabel htmlFor="Facebook">Facebook</CFormLabel>
            <CFormInput
              id="facebook"
              defaultValue={formik.values.facebook}
              name="facebook"
              onChange={formik.handleChange}
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="Twitter">Twitter</CFormLabel>
            <CFormInput
              id="twitter"
              defaultValue={formik.values.twitter}
              name="twitter"
              onChange={formik.handleChange}
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Instagram">Instagram</CFormLabel>
            <CFormInput
              id="instagram"
              defaultValue={formik.values.instagram}
              name="instagram"
              onChange={formik.handleChange}
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="Website">Website</CFormLabel>
            <CFormInput
              id="website"
              defaultValue={formik.values.website}
              name="website"
              onChange={formik.handleChange}
            />
          </CCol>

          <CCol md={6}>
            <CLoadingButton type="submit" color="success" variant="outline" loading={loading}>
              Submit
            </CLoadingButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default GameSocial
