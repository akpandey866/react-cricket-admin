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
import React, { useRef, useState } from 'react'
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
    start_date: Yup.date().required('Start Date is required'),
    end_date: Yup.date().required('End Date to is required'),
    start_time: Yup.string().required('Start Time to is required'),
    end_time: Yup.string().required('End Time to is required'),
  })
  const logoRef = useRef()

  const handleReset = (values, formikBag) => {
    logoRef.current.value = null //THIS RESETS THE FILE FIELD
  }
  const formik = useFormik({
    initialValues: {
      round: props.roundNumber,
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
    },
    enableReinitialize: true,
    validationSchema,
    handleReset: handleReset,
    onSubmit: (data, actions) => {
      actions.resetForm({
        values: {
          round: '',
        },
      })
      data.start_date = startDate
      data.end_date = endDate
      data.start_time = lockoutStartTime
      data.end_time = lockoutEndTime
      setLoader(true)
      RoundService.saveRound(data)
        .then((res) => {
          if (res.status === 200) {
            props.setUsers(res.data)
            ToastComponent(res.message, 'success')
            setLoader(false)
            formik.resetForm()
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
  const [formValues, setformValues] = useState(formik.initialValues)
  const [startDate, setStartDate] = useState('')
  const [minEndDate, setMinEndDate] = useState(new Date())
  const [endDate, setEndDate] = useState('')
  const [lockoutStartTime, setLockoutStartTime] = useState('')
  const [lockoutEndTime, setLockoutEndTime] = useState('')
  const handleStartDate = (event) => {
    setMinEndDate(event)
    const dateFormat = moment(event).format('YYYY-MM-DD')
    setStartDate(dateFormat)
    setEndDate('')
  }
  const handleEndDate = (event) => {
    const dateFormat = moment(event).format('YYYY-MM-DD')
    setEndDate(dateFormat)
  }
  const handleLockoutStartTime = (event) => {
    const dateFormat = moment(event, ['h:mm A']).format('HH:mm')
    setLockoutStartTime(dateFormat)
  }
  const handleLockoutEndTime = (event) => {
    const dateFormat = moment(event, ['h:mm A']).format('HH:mm')
    setLockoutEndTime(dateFormat)
  }
  const todayDate = new Date()
  const lastDate = minEndDate
  const minDate = todayDate.setDate(todayDate.getDate() - 1)
  const minasdasDate = lastDate.setDate(lastDate.getDate())
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={4}>
          <CFormLabel className="fw-bold" htmlFor="grade">
            Round{' '}
          </CFormLabel>
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
          <CFormLabel className="fw-bold" htmlFor="grade">
            Start Date
          </CFormLabel>
          <CDatePicker
            date={startDate}
            defaultValue={startDate}
            className={formik.errors.start_date && formik.touched.start_date ? 'is-invalid' : ''}
            locale="en-US"
            name="start_date"
            placeholder={'Start Date'}
            onDateChange={(e) => {
              handleStartDate(e)
              formik.setTouched({
                ...formik.touched,
                start_date: true,
              })
              formik.setFieldValue('start_date', moment(e).format('YYYY-MM-DD'))
            }}
            format={'dd/MM/yyyy'}
            minDate={todayDate}
            cleaner={false}
          />
          {formik.errors.start_date && formik.touched.start_date && (
            <CFormFeedback invalid>{formik.errors.start_date}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel className="fw-bold" htmlFor="grade">
            End Date
          </CFormLabel>
          <CDatePicker
            date={endDate}
            defaultValue={endDate}
            className={formik.errors.end_date && formik.touched.end_date ? 'is-invalid' : ''}
            locale="en-US"
            name="end_date"
            placeholder={'End Date'}
            // onDateChange={handleEndDate}
            onDateChange={(e) => {
              handleEndDate(e)
              formik.setTouched({
                ...formik.touched,
                end_date: true,
              })
              formik.setFieldValue('end_date', moment(e).format('YYYY-MM-DD'))
            }}
            format={'dd/MM/yyyy'}
            cleaner={false}
            minDate={minEndDate}
          />
          {formik.errors.end_date && formik.touched.end_date && (
            <CFormFeedback invalid>{formik.errors.end_date}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel className="fw-bold" htmlFor="grade">
            Start Time
          </CFormLabel>
          <CTimePicker
            // locale="en-US"
            value={lockoutEndTime}
            seconds={false}
            // onTimeChange={handleLockoutStartTime}
            className={formik.errors.start_time && formik.touched.start_time ? 'is-invalid' : ''}
            onTimeChange={(e) => {
              handleLockoutStartTime(e)
              formik.setTouched({
                ...formik.touched,
                start_time: true,
              })
              formik.setFieldValue('start_time', moment(e).format('YYYY-MM-DD'))
            }}
            // ampm={false}
          />

          {formik.errors.start_time && formik.touched.start_time && (
            <CFormFeedback invalid>{formik.errors.start_time}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel className="fw-bold" htmlFor="grade">
            End Time
          </CFormLabel>
          <CTimePicker
            className={formik.errors.end_time && formik.touched.end_time ? 'is-invalid' : ''}
            locale="en-US"
            value={lockoutEndTime}
            seconds={false}
            onTimeChange={(e) => {
              handleLockoutEndTime(e)
              formik.setTouched({
                ...formik.touched,
                end_time: true,
              })
              formik.setFieldValue('end_time', moment(e).format('YYYY-MM-DD'))
            }}
            // ampm={false}
          />
          {formik.errors.end_time && formik.touched.end_time && (
            <CFormFeedback invalid>{formik.errors.end_time}</CFormFeedback>
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
