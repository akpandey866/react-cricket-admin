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
  const formik = useFormik({
    initialValues: {
      country: country,
      state: props.userDetail.state,
      city: props.userDetail.city,
      post_code: props.userDetail.post_code,
      timezone: props.userDetail.timezone,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data) => {
      data.timezone = selectedTimezone.value
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
          ToastComponent(e.response?.data?.message, 'error')
          setLoading(false)
          ToastComponent(e.response?.data?.message, 'error')
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
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Location & Timezone</strong>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={formik.handleSubmit}>
          <CCol md={6}>
            <CFormLabel htmlFor="Country">Country</CFormLabel>
            <CFormSelect
              aria-label="select country"
              name="country"
              className={
                'form-control' +
                (formik.errors.country && formik.touched.country ? ' is-invalid' : '')
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
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="state">State</CFormLabel>
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
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="city">City</CFormLabel>
            <CFormInput
              id="city"
              defaultValue={formik.values.city}
              name="city"
              onChange={formik.handleChange}
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="Post Code">Post Code</CFormLabel>
            <CFormInput
              id="post_code"
              defaultValue={formik.values.post_code}
              name="post_code"
              onChange={formik.handleChange}
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="Timezone">Timezone *</CFormLabel>
            <TimezoneSelect
              value={selectedTimezone}
              onChange={setSelectedTimezone}
              name="timezone"
            />
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
  )
}

export default AboutGame
