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
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastComponent from 'src/components/common/TaostComponent'
import CommonService from 'src/service/CommonService'
import PreviewImage from '../PreviewImage'
import Helper from '../Helper'

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
    name: Yup.string().required('name is required').max(50, '50 Character Limit is allowed.'),
    url: Yup.string().required('Website URL is required'),
    image: Yup.mixed()
      .nullable(true)
      .test(
        'fileSize',
        'File size too large, max file size is 5 Mb or resolution is not 90 px x 90 px',
        (file) => {
          if (file) {
            return file.size <= 90 * 90
          } else {
            return true
          }
        },
      )
      .test(
        'type',
        'Invalid file format selection',
        (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type)),
      ),
  })
  const formik = useFormik({
    initialValues: {
      name: brandingDetail?.name,
      url: brandingDetail?.url,
      image: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      var formData = new FormData()
      formData.append('name', data.name)
      formData.append('url', data.url)
      formData.append('image', data.image)
      setLoading(true)
      CommonService.editBranding(formData)
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
          ToastComponent('Something went wrong. Please try again.', 'error')
          setLoading(false)
        })
    },
  })
  return (
    <CRow>
      <CAccordion activeItemKey={1}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Manage Branding</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <CForm className="row g-3" onSubmit={formik.handleSubmit}>
              <CCol md={6}>
                <CFormLabel className="fw-bold" htmlFor="name">
                  Name *
                </CFormLabel>
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
                <CFormLabel className="fw-bold" htmlFor="youtube2">
                  Website URL *
                </CFormLabel>
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
                <CFormLabel className="fw-bold" htmlFor="image">
                  Brand Logo (Dimesion: 90 px x 90 px)
                </CFormLabel>
                <CFormInput
                  type="file"
                  id="formFile"
                  name="image"
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
                      image: true,
                    })
                    formik.setFieldValue('image', event.target.files[0])
                  }}
                />
                {formik.touched.image && formik.errors.image ? (
                  <CFormFeedback invalid>{formik.errors.image}</CFormFeedback>
                ) : null}
                <CRow>
                  <CCol md={4}>
                    <CCol md={4}>
                      {brandingDetail.logo &&
                        Helper.checkIfImageExists(
                          `${process.env.REACT_APP_API_URL}uploads/branding/${brandingDetail.logo}`,
                        )}

                      {formik.values.image ? (
                        <PreviewImage
                          className={{ margin: 'auto' }}
                          width={300}
                          height={450}
                          file={formik.values.image}
                        />
                      ) : null}
                    </CCol>
                  </CCol>
                </CRow>
              </CCol>
              <CCol md={6}></CCol>
              <CCol md={6}>
                <CLoadingButton type="submit" color="success" variant="outline" loading={loading}>
                  Submit
                </CLoadingButton>
              </CCol>
            </CForm>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default Branding
