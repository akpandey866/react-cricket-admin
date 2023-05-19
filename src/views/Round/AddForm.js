import {
  CCol,
  CDatePicker,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
  CTimePicker,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import RoundService from 'src/service/RoundService'
import ToastComponent from 'src/components/common/TaostComponent'
import { useNavigate } from 'react-router-dom'
const AddForm = (props) => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    round: Yup.number().required('round is required'),
  })
  const formik = useFormik({
    initialValues: {
      round: props.roundNumber,
      start_date: '',
      end_date: '',
      lockout_start_time: '',
      lockout_end_time: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      actions.resetForm({
        values: {
          round: '',
        },
      })
      data.start_date = startDate
      data.end_date = endDate
      data.lockout_start_time = lockoutStartTime
      data.lockout_end_time = lockoutEndTime

      setLoader(true)
      RoundService.saveRound(data)
        .then((res) => {
          if (res.status === 200) {
            props.setUsers(res.data)
            ToastComponent(res.message, 'success')
            setLoader(false)
            navigate('/rounds')
          } else {
            setLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          console.log('Error: ', e)
          ToastComponent('Something went wrong. Please try again.', 'error')
          setLoader(false)
        })
    },
  })
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [lockoutStartTime, setLockoutStartTime] = useState('')
  const [lockoutEndTime, setLockoutEndTime] = useState('')
  const handleStartDate = (event) => {
    const dateFormat = moment(event).format('DD.MM.YYYY')
    setStartDate(dateFormat)
  }
  const handleEndDate = (event) => {
    const dateFormat = moment(event).format('DD.MM.YYYY')
    setEndDate(dateFormat)
  }
  const handleLockoutStartTime = (event) => {
    const dateFormat = moment(event).format('hh:mm')
    setLockoutStartTime(dateFormat)
  }
  const handleLockoutEndTime = (event) => {
    const dateFormat = moment(event).format('hh:mm')
    setLockoutEndTime(dateFormat)
  }

  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={4}>
          <CFormLabel htmlFor="grade">Round </CFormLabel>
          <CFormInput
            placeholder="Round"
            className={
              'form-control' + (formik.errors.round && formik.touched.round ? ' is-invalid' : '')
            }
            defaultValue={props.roundNumber}
            // onChange={formik.handleChange}
            aria-label="round"
            id="round"
            name="round"
            disabled
          />
          {formik.errors.round && formik.touched.round && (
            <CFormFeedback invalid>{formik.errors.round}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="grade">Start Date</CFormLabel>
          <CDatePicker
            date={startDate}
            locale="en-US"
            name="start_date"
            placeholder={'Start Date'}
            onDateChange={handleStartDate}
            format={'dd.mm.yyyy'}
          />
          {formik.errors.start_date && formik.touched.start_date && (
            <CFormFeedback invalid>{formik.errors.start_date}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="grade">Start Time</CFormLabel>
          <CTimePicker
            locale="en-US"
            value={lockoutStartTime}
            placeholder="Start Time"
            seconds={false}
            onTimeChange={handleLockoutEndTime}
          />

          {formik.errors.lockout_start_time && formik.touched.lockout_start_time && (
            <CFormFeedback invalid>{formik.errors.lockout_start_time}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="grade">End Date</CFormLabel>
          <CDatePicker
            date={endDate}
            locale="en-US"
            name="end_date"
            placeholder={'End Date'}
            onDateChange={handleEndDate}
          />
          {formik.errors.end_date && formik.touched.end_date && (
            <CFormFeedback invalid>{formik.errors.end_date}</CFormFeedback>
          )}
        </CCol>

        <CCol md={4}>
          <CFormLabel htmlFor="grade">End Time</CFormLabel>
          <CTimePicker
            locale="en-US"
            value={lockoutEndTime}
            seconds={false}
            placeholder="End Time"
            onTimeChange={handleLockoutEndTime}
          />
          {formik.errors.lockout_end_time && formik.touched.lockout_end_time && (
            <CFormFeedback invalid>{formik.errors.lockout_end_time}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}></CCol>
        <CCol md={4}>
          <CLoadingButton
            type="submit"
            color="success"
            variant="outline"
            loading={loader}
            id="submit"
          >
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddForm
