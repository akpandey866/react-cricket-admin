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
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import RoundService from 'src/service/RoundService'
import ToastComponent from 'src/components/common/TaostComponent'
const EditForm = (props) => {
  const [roundDetail, setRoundDetail] = useState()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [lockoutStartTime, setLockoutStartTime] = useState('')
  const [lockoutEndTime, setLockoutEndTime] = useState('')
  useEffect(() => {
    if (props.selectedId === props.roundId) {
      RoundService.getRoundDetail(props.roundId)
        .then((res) => {
          if (res.status === 200) {
            setStartDate(res.data.start_date)
            setEndDate(res.data.end_date)
            setEndDate(res.data.end_date)
            setLockoutStartTime(res.data.lockout_start_time)
            setLockoutEndTime(res.data.lockout_end_time)
            setRoundDetail(res.data)
          }
        })
        .catch((e) => {
          ToastComponent(e.response?.data?.message, 'error')
          setLoader(false)
        })
    }
  }, [props])

  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    round: Yup.string().required('Round is required'),
  })
  const formik = useFormik({
    initialValues: {
      round: roundDetail?.round,
      start_date: roundDetail?.start_date,
      end_date: roundDetail?.end_date,
      start_time: roundDetail?.lockout_start_time,
      end_time: roundDetail?.lockout_end_time,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      data.round_id = props.roundId
      data.start_date = startDate
      data.end_date = endDate
      data.start_time = lockoutStartTime
      data.end_time = lockoutEndTime
      setLoader(true)
      RoundService.editRound(data)
        .then((res) => {
          if (res.status === 200) {
            props.setUsers(res.data)
            ToastComponent(res.message, 'success')
            setLoader(false)
          } else {
            setLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          ToastComponent('Something Went Wrong. Please try again', 'error')
          setLoader(false)
        })
    },
  })

  const handleStartDate = (event) => {
    const dateFormat = moment(event).format('YYYY-MM-DD')
    setStartDate(dateFormat)
  }
  const handleEndDate = (event) => {
    const dateFormat = moment(event).format('YYYY-MM-DD')
    setEndDate(dateFormat)
  }

  const handleLockoutStartTime = (event) => {
    const dateFormat = moment(event, ['h:mm A']).format('HH:mm')
    console.log(dateFormat)
    setLockoutStartTime(dateFormat)
  }
  const handleLockoutEndTime = (event) => {
    const dateFormat = moment(event, ['h:mm A']).format('HH:mm')
    console.log('after sleect', dateFormat)
    setLockoutEndTime(dateFormat)
  }

  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={4}>
          <CFormLabel className="fw-bold" htmlFor="round">
            Round *
          </CFormLabel>
          <input
            type="text"
            name="round"
            className={
              'form-control' + (formik.errors.round && formik.touched.round ? ' is-invalid' : '')
            }
            id="validationServer01"
            placeholder="round"
            defaultValue={roundDetail?.round}
            onChange={formik.handleChange}
            disabled={true}
          />
          {formik.errors.round && formik.touched.round && (
            <CFormFeedback invalid>{formik.errors.round}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel className="fw-bold" htmlFor="grade">
            Start Date *
          </CFormLabel>
          <CDatePicker
            date={startDate}
            locale="en-US"
            name="start_date"
            placeholder={'Start Date'}
            onDateChange={handleStartDate}
            format={'dd/MM/yyyy'}
            cleaner={false}
          />
          {formik.errors.start_date && formik.touched.start_date && (
            <CFormFeedback invalid>{formik.errors.start_date}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel className="fw-bold" htmlFor="grade">
            End Date *
          </CFormLabel>
          <CDatePicker
            date={endDate}
            locale="en-US"
            name="end_date"
            placeholder={'End Date'}
            onDateChange={handleEndDate}
            format={'dd/MM/yyyy'}
            cleaner={false}
          />
          {formik.errors.end_date && formik.touched.end_date && (
            <CFormFeedback invalid>{formik.errors.end_date}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel className="fw-bold" htmlFor="grade">
            Start Time *
          </CFormLabel>
          <CTimePicker
            // locale="en-US"
            value={lockoutStartTime}
            time={lockoutStartTime}
            seconds={false}
            // onTimeChange={handleLockoutStartTime}
            cleaner={false}
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
            End Time *
          </CFormLabel>
          <CTimePicker
            // locale="en-US"
            cleaner={false}
            time={lockoutEndTime}
            value={lockoutEndTime}
            // seconds={false}
            // onTimeChange={handleLockoutStartTime}
            className={formik.errors.end_time && formik.touched.end_time ? 'is-invalid' : ''}
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
          <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default EditForm
