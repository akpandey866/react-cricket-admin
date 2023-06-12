import {
  CCol,
  CDatePicker,
  CForm,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CLoadingButton,
  CTimePicker,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FixtureService from 'src/service/FixtureService'
import TeamService from 'src/service/TeamService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
const AddForm = (props) => {
  const [loader, setLoader] = useState(false)
  const [matchTypeList, setMatchTypeList] = useState()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [teamList, setTeamList] = useState([])

  const validationSchema = Yup.object().shape({
    team: Yup.string().required('Team is required'),
    //start_date: Yup.string().nullable().required('Start Date is required'),
    //end_date: Yup.string().required('End Date is required'),
  })

  useEffect(() => {
    setLoader(true)
    TeamService.getTeamListByGrade()
      .then((res) => {
        if (res.status === 200) {
          setLoader(false)
          setTeamList(res.data)
          setMatchTypeList(res.matchTypeList)
        }
      })
      .catch((e) => {
        ToastComponent('Something went wrong. Please try again.', 'error')
        setLoader(false)
      })
  }, [props.visibleHorizontal])
  const formik = useFormik({
    initialValues: {
      team: '',
      match_type: '',
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      opposition_club: '',
      vanue: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      data.start_date = startDate
      data.end_date = endDate
      data.start_time = lockoutStartTime
      data.end_time = lockoutEndTime
      // actions.resetForm({
      //   values: {
      //     grade: '',
      //   },
      // })
      setLoader(true)
      FixtureService.saveFixture(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
            // props.setUsers(res.data)

            props.setUsers((prevState) => {
              return {
                ...prevState.data,
                data: res.data,
              }
            })
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

  const [minEndDate, setMinEndDate] = useState(new Date())
  const todayDate = new Date()
  const lastDate = minEndDate
  const minDate = todayDate.setDate(todayDate.getDate() - 1)
  const minasdasDate = lastDate.setDate(lastDate.getDate())

  const [lockoutStartTime, setLockoutStartTime] = useState('')
  const [lockoutEndTime, setLockoutEndTime] = useState('')
  const handleLockoutStartTime = (event) => {
    const dateFormat = moment(event, ['h:mm A']).format('HH:mm')
    setLockoutStartTime(dateFormat)
  }
  const handleLockoutEndTime = (event) => {
    const dateFormat = moment(event, ['h:mm A']).format('HH:mm')
    setLockoutEndTime(dateFormat)
  }
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="team">
            Team *
          </CFormLabel>
          <CFormSelect
            aria-label="Select Team"
            name="team"
            className={
              'form-control' + (formik.errors.team && formik.touched.team ? ' is-invalid' : '')
            }
            defaultValue={formik.values.team}
            onChange={formik.handleChange}
            id="team"
          >
            <option value={0}>Select team</option>
            {teamList &&
              teamList.map((item, key) => (
                <option value={item?.id} key={key}>
                  {item?.name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.team && formik.touched.team && (
            <CFormFeedback invalid>{formik.errors.team}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="team">
            Match Type *
          </CFormLabel>
          <CFormSelect
            aria-label="Select Match Type"
            name="match_type"
            className={
              'form-control' +
              (formik.errors.match_type && formik.touched.match_type ? ' is-invalid' : '')
            }
            defaultValue={formik.values.match_type}
            onChange={formik.handleChange}
            id="match_type"
          >
            <option value={0}>Select Match Type</option>
            {matchTypeList &&
              matchTypeList.map((item, key) => (
                <option value={item?.id} key={key}>
                  {item?.name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.grade && formik.touched.grade && (
            <CFormFeedback invalid>{formik.errors.grade}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="Start Date">
            Start Date *
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
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="End Date">
            End Date *
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
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="start_time">
            Start Time *
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

          {formik.errors.star_time && formik.touched.star_time && (
            <CFormFeedback invalid>{formik.errors.star_time}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="endTime">
            End Time *
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
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="alast_name">
            Venue
          </CFormLabel>
          <input
            type="text"
            name="vanue"
            className={
              'form-control' + (formik.errors.vanue && formik.touched.vanue ? ' is-invalid' : '')
            }
            id="vanue"
            placeholder="Venue"
            defaultValue={formik.values.vanue}
            onChange={formik.handleChange}
          />
          {formik.errors.vanue && formik.touched.vanue && (
            <CFormFeedback invalid>{formik.errors.vanue}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="alast_name">
            Opponent
          </CFormLabel>
          <input
            type="text"
            name="opposition_club"
            className={
              'form-control' +
              (formik.errors.opposition_club && formik.touched.opposition_club ? ' is-invalid' : '')
            }
            id="opposition_club"
            placeholder="Opponent"
            defaultValue={formik.values.opposition_club}
            onChange={formik.handleChange}
          />
          {formik.errors.opposition_club && formik.touched.opposition_club && (
            <CFormFeedback invalid>{formik.errors.opposition_club}</CFormFeedback>
          )}
        </CCol>

        <CCol md={6}>
          <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddForm
