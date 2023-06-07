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
const EditForm = (props) => {
  const [fixtureDetail, setFixtureDetail] = useState()
  const [matchTypeList, setMatchTypeList] = useState()
  const [teamList, setTeamList] = useState([])
  const [gradeList, setGradeList] = useState()
  useEffect(() => {
    if (props.selectedId === props.fixtureId) {
      FixtureService.getFixtureDetail(props.fixtureId)
        .then((res) => {
          if (res.status === 200) {
            setFixtureDetail(res.data)
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
      match_type: fixtureDetail?.match_type,
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

  const handleChange = (e) => {
    const gradeId = e.target.value

    TeamService.getTeamListByGrade(gradeId).then((res) => {
      if (res.status === 200) {
        setTeamList(res.data)
      }
    })
  }

  const handleStartDate = (e) => {
    console.log('on change i scalling is here', e)
    console.log(e)
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
            locale="en-US"
            name="start_time"
            seconds={false}
            placeholder={'Start Time'}
            defaultValue={formik.values.start_time}
            onChange={formik.handleChange}
            time={formik.values.start_time}
            id="start_time"
          />

          {formik.errors.star_time && formik.touched.star_time && (
            <CFormFeedback invalid>{formik.errors.star_time}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="End Date">
            End Time *
          </CFormLabel>
          <CTimePicker
            locale="en-US"
            value="02:17:35 PM"
            name="end_time"
            seconds={false}
            placeholder={'End Time'}
            defaultValue={formik.values.end_time}
            time={formik.values.end_time}
            onChange={formik.handleChange}
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
