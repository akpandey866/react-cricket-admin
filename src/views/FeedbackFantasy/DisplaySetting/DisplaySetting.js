import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CLoadingButton,
  CFormSelect,
  CForm,
  CFormFeedback,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastComponent from 'src/components/common/TaostComponent'
import FeedbackFantasyService from 'src/service/FeedbackFantasyService'

const DisplaySetting = (props) => {
  const [selectedValue, setSelectedValue] = useState('')
  const [detail, setDetail] = useState({})
  useEffect(() => {
    FeedbackFantasyService.displaySetting().then((result) => {
      setDetail(result.data)
      setSelectedValue(result.data.view)
    })
  }, [])
  const [loading, setLoading] = useState(false)

  const validationSchema = Yup.object().shape({
    view: Yup.string().required('Please select view'),
  })
  const formik = useFormik({
    initialValues: {
      view: selectedValue,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      FeedbackFantasyService.updateDisplaySetting(data)
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
  const handleChange = (e) => {
    setSelectedValue(e.target.value)
  }
  return (
    <CAccordion activeItemKey={1}>
      <CAccordionItem itemKey={1}>
        <CAccordionHeader>
          {' '}
          <strong>Display Setting</strong>
        </CAccordionHeader>
        <CAccordionBody>
          <CForm className="row g-3" onSubmit={formik.handleSubmit}>
            <CCol md={6}>
              <CFormLabel className="fw-bold" htmlFor="display_view">
                Set Your Lobby View
              </CFormLabel>
              {!loading && (
                <CFormSelect
                  aria-label="select your view"
                  name="view"
                  className={
                    'form-control' +
                    (formik.errors.view && formik.touched.view ? ' is-invalid' : '')
                  }
                  value={formik.values.view}
                  onChange={handleChange}
                  id="view"
                >
                  <option value={0}>Select your view</option>
                  <option value={1}>Default View</option>
                  <option value={2}>Feedback View</option>
                  <option value={3}>Detailed View</option>
                </CFormSelect>
              )}
              {formik.errors.view && formik.touched.view && (
                <CFormFeedback invalid>{formik.errors.view}</CFormFeedback>
              )}
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
  )
}

export default DisplaySetting
