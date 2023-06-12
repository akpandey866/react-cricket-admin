import {
  CCol,
  CDatePicker,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CLoadingButton,
  CTimePicker,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FixtureService from 'src/service/FixtureService'
import TeamService from 'src/service/TeamService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
import GradeService from 'src/service/GradeService'
import moment from 'moment'
const EditForm = (props) => {
  const [fixtureDetail, setFixtureDetail] = useState()
  const [matchTypeList, setMatchTypeList] = useState()
  const [teamList, setTeamList] = useState([])
  const [lockoutStartTime, setLockoutStartTime] = useState('')
  const [lockoutEndTime, setLockoutEndTime] = useState('')
  useEffect(() => {
    if (props.selectedId === props.fixtureId) {
      FixtureService.getFixtureDetail(props.fixtureId)
        .then((res) => {
          if (res.status === 200) {
            setFixtureDetail(res.data)
            setLockoutStartTime(res.data?.start_time)
            setLockoutEndTime(res.data?.end_time)
          }
          TeamService.getTeamListByGrade(res.data.grade).then((res) => {
            if (res.status === 200) {
              setTeamList(res.data)
              setMatchTypeList(res.matchTypeList)
            }
          })
        })
        .catch((e) => {
          ToastComponent(e.response?.data?.message, 'error')
          setLoader(false)
        })
    }
  }, [props])
  const [loader, setLoader] = useState(false)

  const validationSchema = Yup.object().shape({
    team: Yup.string().required('Team is required'),
  })
  const formik = useFormik({
    initialValues: {
      team: fixtureDetail?.team,
      match_type: fixtureDetail?.match_code,
      start_date: fixtureDetail?.start_date,
      end_date: fixtureDetail?.end_date,
      start_time: fixtureDetail?.start_time,
      end_time: fixtureDetail?.end_time,
      opposition_club: fixtureDetail?.opposition_club,
      vanue: fixtureDetail?.vanue,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      data.fixtureId = fixtureDetail.id
      // actions.resetForm({
      //   values: {
      //     grade: '',
      //   },
      // })
      setLoader(true)
      data.start_time = lockoutStartTime
      data.end_time = lockoutEndTime
      FixtureService.editFixture(data)
        .then((res) => {
          if (res.status === 200) {
            // props.hideEditDiv()
            // props.toggleDetails(fixtureDetail.id)
            ToastComponent(res.message, 'success')
            setLoader(false)
            // navigate('/fixtures')
          } else {
            setLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          ToastComponent(e.response?.data?.message, 'error')
          setLoader(false)
        })
    },
  })
  const handleStartDate = (e) => {
    console.log('on change i scalling is here', e)
    console.log(e)
  }

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
            value={formik.values.team}
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
          {formik.errors.grade && formik.touched.grade && (
            <CFormFeedback invalid>{formik.errors.grade}</CFormFeedback>
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
            value={formik.values.match_type}
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
            date={formik.values.start_date}
            id="start_date"
            value={formik.values.start_date}
            onChange={(value) => handleStartDate(value)}
            format={'dd/MM/yyyy'}
            cleaner={false}
            required
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
            date={formik.values.end_date}
            value={formik.values.end_date}
            onChange={formik.handleChange}
            cleaner={false}
            format={'dd/MM/yyyy'}
          />

          {formik.errors.end_date && formik.touched.end_date && (
            <CFormFeedback invalid>{formik.errors.end_date}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="End Date">
            Start Time *
          </CFormLabel>

          <CTimePicker
            // locale="en-US"
            value={lockoutStartTime}
            time={lockoutStartTime}
            seconds={false}
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
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="End Date">
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
            placeholder="Vanue"
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

export default EditForm
