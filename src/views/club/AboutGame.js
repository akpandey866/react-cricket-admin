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
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TimezoneSelect from 'react-timezone-select'
import ToastComponent from 'src/components/common/TaostComponent'
import ClubService from 'src/service/ClubService'

const AboutGame = (props) => {
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  )
  // useEffect(() => {
  //   ClubService.getStateByCountryId(props.userDetail.country).then((result) => {
  //     setStateList(result.data)
  //   })
  // }, [props.userDetail])
  const [loading, setLoading] = useState(false)
  const [country, setCountry] = useState(props.userDetail.country)
  const validationSchema = Yup.object().shape({
    country: Yup.string().required('Country is required'),
    post_code: Yup.number().required('Post Code is required'),
  })
  const formik = useFormik({
    initialValues: {
      country: country,
      state: props.userDetail.state,
      city: props.userDetail.city,
      post_code: props.userDetail.post_code,
      timezone: props.userDetail.timezone,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      data.timezone = selectedTimezone.value
      data.country = country
      setLoading(true)
      ClubService.updateAboutGame(data)
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
          ToastComponent('Something went wrong.', 'error')
          setLoading(false)
        })
    },
  })
  const handleCountryChange = (e) => {
    setCountry(e.target.value)
    ClubService.getStateByCountryId(e.target.value).then((result) => {
      props.setStateList(result.data)
    })
  }
  return (
    <CForm className="row g-3" onSubmit={formik.handleSubmit}>
      <CCol md={6}>
        <CFormLabel className="fw-bold" htmlFor="Timezone">
          Timezone *
        </CFormLabel>
        <TimezoneSelect value={selectedTimezone} onChange={setSelectedTimezone} name="timezone" />
      </CCol>
      <CCol md={6}>
        <CFormLabel className="fw-bold" htmlFor="Country">
          Country*
        </CFormLabel>
        <CFormSelect
          aria-label="select country"
          name="country"
          className={
            'form-control' + (formik.errors.country && formik.touched.country ? ' is-invalid' : '')
          }
          defaultValue={country}
          onChange={handleCountryChange}
          id="country"
        >
          <option value={0}>Select Country</option>
          {props.countryList &&
            props.countryList.map((item, key) => (
              <option value={item?.id} key={key}>
                {item?.name}
              </option>
            ))}
        </CFormSelect>
        {formik.errors.country && formik.touched.country && (
          <CFormFeedback invalid>{formik.errors.country}</CFormFeedback>
        )}
      </CCol>

      <CCol md={6}>
        <CFormLabel className="fw-bold" htmlFor="state">
          State *
        </CFormLabel>
        <CFormSelect
          aria-label="select state"
          name="state"
          className={
            'form-control' + (formik.errors.state && formik.touched.state ? ' is-invalid' : '')
          }
          defaultValue={formik.values.state}
          onChange={formik.handleChange}
          id="state"
        >
          <option value={0}>Select State</option>
          {props.stateList &&
            props.stateList.map((item, key) => (
              <option value={item?.id} key={key}>
                {item?.name}
              </option>
            ))}
        </CFormSelect>
        {formik.errors.state && formik.touched.state && (
          <CFormFeedback invalid>{formik.errors.state}</CFormFeedback>
        )}
      </CCol>
      <CCol md={6}>
        <CFormLabel className="fw-bold" htmlFor="city">
          City *
        </CFormLabel>
        <CFormInput
          id="city"
          className={
            'form-control' + (formik.errors.city && formik.touched.city ? ' is-invalid' : '')
          }
          defaultValue={formik.values.city}
          name="city"
          onChange={formik.handleChange}
        />
        {formik.errors.city && formik.touched.city && (
          <CFormFeedback invalid>{formik.errors.city}</CFormFeedback>
        )}
      </CCol>
      <CCol md={6}>
        <CFormLabel className="fw-bold" htmlFor="Post Code">
          Post Code *
        </CFormLabel>
        <CFormInput
          id="post_code"
          className={
            'form-control' +
            (formik.errors.post_code && formik.touched.post_code ? ' is-invalid' : '')
          }
          defaultValue={formik.values.post_code}
          name="post_code"
          onChange={formik.handleChange}
        />
        {formik.errors.post_code && formik.touched.post_code && (
          <CFormFeedback invalid>{formik.errors.post_code}</CFormFeedback>
        )}
      </CCol>

      <CCol md={6}></CCol>
      <CCol md={6}>
        <CLoadingButton type="submit" color="success" variant="outline" loading={loading}>
          Submit
        </CLoadingButton>
      </CCol>
    </CForm>
  )
}

export default AboutGame
