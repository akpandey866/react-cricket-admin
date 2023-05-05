import {
  CCol,
  CDatePicker,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
  CMultiSelect,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import moment from 'moment'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import PlayerAvailabilityService from 'src/service/PlayerAvailabilityService'
import ToastComponent from 'src/components/common/TaostComponent'
const AddForm = (props) => {
  const [loader, setLoader] = useState(false)
  const [selectedValue, setSelectedValue] = useState([])
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : [])
    console.log('selected value', selectedValue)
  }
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
      data.player = selectedValue
      setLoader(true)
      PlayerAvailabilityService.saveAvailability(data)
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
          console.log(e)
        })
    },
  })
  const [dateFrom, setDateFrom] = useState()
  const [dateTill, setDateTill] = useState()
  const handleDateFromChange = (event) => {
    const dateFormat = moment(event).format('YYYY-MM-DD')
    setDateFrom(dateFormat)
  }
  const handleDateTillChange = (event) => {
    const dateFormat = moment(event).format('YYYY-MM-DD')
    setDateTill(dateFormat)
  }
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={6}>
          <CFormLabel htmlFor="grade">Player*</CFormLabel>
          <CMultiSelect
            options={props.multiOption}
            selectionType="tags"
            name="player"
            className={formik.errors.player && formik.touched.player ? 'is-invalid' : ''}
            onChange={(e) => {
              handleChange(e)
              formik.setTouched({
                ...formik.touched,
                player: true,
              })
              formik.setFieldValue('player', selectedValue)
            }}
            value={props.multiOption.filter((obj) => selectedValue.includes(obj.value))}
          />
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
          <CFormLabel htmlFor="unavailabletill">Unavailable Till*</CFormLabel>
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

export default AddForm
