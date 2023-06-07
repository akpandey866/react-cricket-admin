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
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [matchTypeList, setMatchTypeList] = useState()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startTime, setStartTime] = useState('23:45')
  const [endTime, setEndTime] = useState()
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
            navigate('/create-fixtures')
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
    const dateFormat = moment(event).format('YYYY-MM-DD')
    setStartDate(dateFormat)
  }
  const handleEndDate = (event) => {
    const dateFormat = moment(event).format('YYYY-MM-DD')
    setEndDate(dateFormat)
  }
  const handleStartTime = (event) => {
    const dateFormat = moment(event, 'hh:mm A').format('HH:mm')
    setStartTime(dateFormat)
  }
  const handleEndTime = (event) => {
    const dateFormat = moment(event, 'hh:mm A').format('HH:mm')
    setEndTime(dateFormat)
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
            locale="en-US"
            name="start_date"
            placeholder={'Start Date'}
            defaultValue={formik.values.start_date}
            date={startDate}
            onDateChange={handleStartDate}
            popper={false}
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
            locale="en-US"
            name="end_date"
            placeholder={'End Date'}
            defaultValue={formik.values.end_date}
            date={endDate}
            onDateChange={handleEndDate}
            popper={false}
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
            locale="en-US"
            ampm={false}
            time={startTime}
            name="start_time"
            seconds={false}
            defaultValue={formik.values.start_time}
            placeholder={'Start Time'}
            onTimeChange={handleStartTime}
            id="start_time"
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
            locale="en-US"
            time={endTime}
            ampm={false}
            name="end_time"
            seconds={false}
            placeholder={'End Time'}
            defaultValue={formik.values.end_time}
            onTimeChange={handleEndTime}
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
