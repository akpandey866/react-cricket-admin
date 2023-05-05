import {
  CCol,
  CDatePicker,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CLoadingButton,
  CMultiSelect,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import PlayerAvailabilityService from 'src/service/PlayerAvailabilityService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
import moment from 'moment'
const EditForm = (props) => {
  const [availabilityData, setAvailabilityData] = useState()
  useEffect(() => {
    if (props.selectedId === props.avId) {
      PlayerAvailabilityService.getAvailabilityDetail(props.avId)
        .then((res) => {
          if (res.status === 200) {
            setAvailabilityData(res.data)
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
    player: Yup.array().required('Player is required'),
    date_from: Yup.date().required('Date from is required'),
    date_till: Yup.date().required('Date to is required'),
  })
  const formik = useFormik({
    initialValues: {
      player: '',
      date_from: '',
      date_till: '',
      reason: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      data.avId = props.avId
      setLoader(true)
      PlayerAvailabilityService.editAvailability(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
          } else {
            setLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          ToastComponent('Something went wrong.', 'error')
          setLoader(false)
        })
    },
  })
  const [dateFrom, setDateFrom] = useState(availabilityData?.date_from)
  const [dateTill, setDateTill] = useState()
  const handleDateFromChange = (event) => {
    const dateFormat = moment(event).format('YYYY-MM-DD')
    setDateFrom(dateFormat)
  }
  const handleDateTillChange = (event) => {
    const dateFormat = moment(event).format('YYYY-MM-DD')
    setDateTill(dateFormat)
  }
  const [selectedValue, setSelectedValue] = useState(availabilityData?.player)
  const handleChange = (e) => {
    setSelectedValue(e.target.value)
  }
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={6}>
          <CFormLabel htmlFor="grade">Player*</CFormLabel>
          <CFormSelect
            aria-label="Select Player"
            name="player"
            className={
              'form-control' + (formik.errors.player && formik.touched.player ? ' is-invalid' : '')
            }
            value={selectedValue}
            onChange={handleChange}
            id="player"
          >
            <option value="0">Select Player</option>
            {props.multiOption.map((index, key) => (
              <option value={index.value} key={key}>
                {index.text}
              </option>
            ))}
          </CFormSelect>
          {formik.errors.player && formik.touched.player && (
            <CFormFeedback invalid>{formik.errors.player}</CFormFeedback>
          )}
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="grade">Unavailable From*</CFormLabel>
          <CDatePicker
            date={dateFrom}
            defaultValue={dateFrom}
            locale="en-US"
            name="date_from"
            placeholder={'Date From'}
            className={formik.errors.date_from && formik.touched.date_from ? 'is-invalid' : ''}
            onDateChange={(e) => {
              handleDateFromChange(e)
              formik.setTouched({
                ...formik.touched,
                date_from: true,
              })
              formik.setFieldValue('date_from', moment(e).format('YYYY-MM-DD'))
            }}
            popper={false}
            inputReadOnly={true}
          />
          {formik.errors.date_from && formik.touched.date_from && (
            <CFormFeedback invalid>{formik.errors.date_from}</CFormFeedback>
          )}
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="grade">Unavailable Till*</CFormLabel>
          <CDatePicker
            date={dateTill}
            locale="en-US"
            name="date_till"
            value={dateTill}
            placeholder={'Date Till'}
            className={formik.errors.date_till && formik.touched.date_till ? 'is-invalid' : ''}
            // onDateChange={handleDateTillChange}
            popper={false}
            inputReadOnly={true}
            onDateChange={(e) => {
              handleDateTillChange(e)
              formik.setTouched({
                ...formik.touched,
                date_till: true,
              })

              formik.setFieldValue('date_till', moment(e).format('YYYY-MM-DD'))
            }}
          />
          {formik.errors.date_till && formik.touched.date_till && (
            <CFormFeedback invalid>{formik.errors.date_till}</CFormFeedback>
          )}
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="Reason">Reason</CFormLabel>
          <CFormInput
            placeholder="Reason"
            className={
              'form-control' + (formik.errors.reason && formik.touched.reason ? ' is-invalid' : '')
            }
            defaultValue={formik.values.reason}
            onChange={formik.handleChange}
            aria-label="reason"
            id="reason"
          />
          {formik.errors.reason && formik.touched.reason && (
            <CFormFeedback invalid>{formik.errors.reason}</CFormFeedback>
          )}
        </CCol>
        <CCol md={6}>
          <CLoadingButton
            type="submit"
            color="success"
            variant="outline"
            loading={loader}
            disabled={loader}
            id="submit"
          >
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default EditForm
