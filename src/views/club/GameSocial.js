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
    <CForm className="row g-3" onSubmit={formik.handleSubmit}>
      <CCol md={6}>
        <CFormLabel className="fw-bold" htmlFor="Facebook">
          Facebook
        </CFormLabel>
        <CFormInput
          id="facebook"
          defaultValue={formik.values.facebook}
          name="facebook"
          onChange={formik.handleChange}
        />

        <small>
          <i> (Ex: https://www.facebook.com/myclubtap)</i>
        </small>
      </CCol>
      <CCol md={6}>
        <CFormLabel className="fw-bold" htmlFor="Twitter">
          Twitter
        </CFormLabel>
        <CFormInput
          id="twitter"
          defaultValue={formik.values.twitter}
          name="twitter"
          onChange={formik.handleChange}
        />
        <small>
          <i> (Ex: https://www.twitter.com/myclubtap)</i>
        </small>
      </CCol>

      <CCol md={6}>
        <CFormLabel className="fw-bold" htmlFor="Instagram">
          Instagram
        </CFormLabel>
        <CFormInput
          id="instagram"
          defaultValue={formik.values.instagram}
          name="instagram"
          onChange={formik.handleChange}
        />
        <small>
          <i> (Ex: https://www.instagram.com/myclubtap)</i>
        </small>
      </CCol>
      <CCol md={6}>
        <CFormLabel className="fw-bold" htmlFor="Website">
          Website
        </CFormLabel>
        <CFormInput
          id="website"
          defaultValue={formik.values.website}
          name="website"
          onChange={formik.handleChange}
        />
        <small>
          <i> (Ex: https://www.myclubtap.com)</i>
        </small>
      </CCol>

      <CCol md={6}>
        <CLoadingButton type="submit" color="success" variant="outline" loading={loading}>
          Submit
        </CLoadingButton>
      </CCol>
    </CForm>
  )
}

export default GameSocial
