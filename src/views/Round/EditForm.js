import {
  CCol,
  CDatePicker,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
} from '@coreui/react-pro'

import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import RoundService from 'src/service/RoundService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
const EditForm = (props) => {
  const [roundDetail, setRoundDetail] = useState()
  useEffect(() => {
    if (props.selectedId === props.roundId) {
      RoundService.getRoundDetail(props.roundId)
        .then((res) => {
          if (res.status === 200) {
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
      lockout_start_time: roundDetail?.lockout_start_time,
      lockout_end_time: roundDetail?.lockout_end_time,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      data.round_id = props.roundId
      data.start_date = startDate
      data.end_date = endDate
      data.lockout_start_time = lockoutStartTime
      data.lockout_end_time = lockoutEndTime
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
          ToastComponent(e.response?.data?.message, 'error')
          setLoader(false)
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [lockoutStartTime, setLockoutStartTime] = useState('')
  const [lockoutEndTime, setLockoutEndTime] = useState('')
  const handleStartDate = (event) => {
    const dateFormat = moment(event).format('YYYY-MM-DD')
    setStartDate(dateFormat)
  }
  const handleEndDate = (event) => {
    const dateFormat = moment(event).format('YYYY-MM-DD')
    setEndDate(dateFormat)
  }
  const handleLockoutStartTime = (event) => {
    const dateFormat = moment(event).format('YYYY-MM-DD hh:mm')
    setLockoutStartTime(dateFormat)
  }
  const handleLockoutEndTime = (event) => {
    const dateFormat = moment(event).format('YYYY-MM-DD hh:mm')
    setLockoutEndTime(dateFormat)
  }
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={4}>
          <CFormLabel htmlFor="round">Round</CFormLabel>
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
          />
          {formik.errors.start_date && formik.touched.start_date && (
            <CFormFeedback invalid>{formik.errors.start_date}</CFormFeedback>
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
          <CFormLabel htmlFor="grade">Lockout Start Time</CFormLabel>
          <CDatePicker
            date={lockoutStartTime}
            locale="en-US"
            name="lockout_start_time"
            placeholder={'Lockout Start Time'}
            onDateChange={handleLockoutStartTime}
            timepicker
            seconds="false"
          />
          {formik.errors.lockout_start_time && formik.touched.lockout_start_time && (
            <CFormFeedback invalid>{formik.errors.lockout_start_time}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="grade">Lockout End Time</CFormLabel>
          <CDatePicker
            date={lockoutEndTime}
            locale="en-US"
            name="lockout_end_time"
            placeholder={'Lockout End Time'}
            onDateChange={handleLockoutEndTime}
            seconds="false"
            timepicker
          />
          {formik.errors.lockout_end_time && formik.touched.lockout_end_time && (
            <CFormFeedback invalid>{formik.errors.lockout_end_time}</CFormFeedback>
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
