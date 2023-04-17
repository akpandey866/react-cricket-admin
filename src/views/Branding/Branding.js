import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastComponent from 'src/components/common/TaostComponent'
import CommonService from 'src/service/CommonService'

const Branding = () => {
  const [loading, setLoading] = useState()
  const [brandingDetail, setBrandingDetail] = useState({})
  useEffect(() => {
    CommonService.branding()
      .then((res) => {
        if (res.status === 200) {
          setBrandingDetail(res.data)
        }
      })
      .catch((e) => {
        ToastComponent(e.response?.data?.message, 'error')
      })
  }, [])

  const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif']
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    url: Yup.string().required('Website URL is required'),
  })
  const formik = useFormik({
    initialValues: {
      name: brandingDetail?.name,
      url: brandingDetail?.url,
      logo: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      var formData = new FormData()
      formData.append('name', data.name)
      formData.append('url', data.url)
      formData.append('logo', data.logo)
      setLoading(true)
      CommonService.editBranding(data)
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
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Game Branding</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={formik.handleSubmit}>
              <CCol md={6}>
                <CFormLabel htmlFor="name">Name *</CFormLabel>
                <CFormInput
                  className={
                    'form-control' +
                    (formik.errors.name && formik.touched.name ? ' is-invalid' : '')
                  }
                  id="name"
                  defaultValue={formik.values.name}
                  name="name"
                  onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name && (
                  <CFormFeedback invalid>{formik.errors.name}</CFormFeedback>
                )}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="youtube2">Website URL *</CFormLabel>
                <CFormInput
                  id="url"
                  className={
                    'form-control' + (formik.errors.url && formik.touched.url ? ' is-invalid' : '')
                  }
                  defaultValue={formik.values.url}
                  name="url"
                  onChange={formik.handleChange}
                />
                {formik.errors.url && formik.touched.url && (
                  <CFormFeedback invalid>{formik.errors.url}</CFormFeedback>
                )}
              </CCol>
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="image">Brand Logo (Dimesion: 90 px x 90 px)</CFormLabel>
                  <CFormInput
                    type="file"
                    id="image"
                    name="logo"
                    className={
                      formik.touched.image
                        ? formik.errors.image
                          ? 'form-control input_user is-invalid'
                          : 'form-control input_user is-valid'
                        : 'form-control'
                    }
                    onChange={(event) => {
                      formik.setTouched({
                        ...formik.touched,
                        logo: true,
                      })
                      formik.setFieldValue('logo', event.target.files[0])
                    }}
                  />
                  {formik.touched.logo && formik.errors.logo ? (
                    <CFormFeedback invalid>{formik.errors.logo}</CFormFeedback>
                  ) : null}
                </div>
              </CCol>
              <CCol md={6}></CCol>
              <CCol md={6}>
                <CLoadingButton type="submit" color="success" variant="outline" loading={loading}>
                  Submit
                </CLoadingButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Branding
