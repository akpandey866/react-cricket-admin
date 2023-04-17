import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import PlayerService from 'src/service/PlayerService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
const AddForm = () => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)

  const [position, setPosition] = useState()
  const [team, setTeam] = useState()
  const [playerValue, setPlayerValue] = useState()
  const [batStyle, setBatStyle] = useState()
  const [bowlStyle, setBowlStyle] = useState()

  useEffect(() => {
    PlayerService.getTeamPositionValueBatBowlStyle().then((result) => {
      setPosition(result.position)
      setTeam(result.teamList)
      setPlayerValue(result.value)
      setBatStyle(result.batStyle)
      setBowlStyle(result.bowlStyle)
    })
  }, [])
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First is required'),
    last_name: Yup.string().required('Last Name is required'),
    position: Yup.string().required('Position is required'),
    value: Yup.string().required('Value is required'),
  })
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      position: '',
      value: '',
      team: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      actions.resetForm({
        values: {
          grade: '',
        },
      })
      setLoader(true)
      PlayerService.savePlayer(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
            navigate('/players')
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
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={3}>
          <CFormLabel htmlFor="grade">First Name *</CFormLabel>
          <CFormInput
            placeholder="First Name"
            className={
              'form-control' +
              (formik.errors.first_name && formik.touched.first_name ? ' is-invalid' : '')
            }
            value={formik.values.first_name}
            onChange={formik.handleChange}
            aria-label="first_name"
            id="first_name"
          />
          {formik.errors.first_name && formik.touched.first_name && (
            <CFormFeedback invalid>{formik.errors.first_name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="last_name">Last Name *</CFormLabel>
          <CFormInput
            placeholder="Last Name"
            className={
              'form-control' +
              (formik.errors.last_name && formik.touched.last_name ? ' is-invalid' : '')
            }
            defaultValue={formik.values.last_name}
            onChange={formik.handleChange}
            aria-label="last_name"
            id="last_name"
          />
          {formik.errors.last_name && formik.touched.last_name && (
            <CFormFeedback invalid>{formik.errors.last_name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="position">Position *</CFormLabel>
          <CFormSelect
            aria-label="select position"
            name="position"
            className={
              'form-control' +
              (formik.errors.position && formik.touched.position ? ' is-invalid' : '')
            }
            defaultValue={formik.values.position}
            onChange={formik.handleChange}
            id="position"
          >
            <option value={0}>Select Position</option>
            {position &&
              position.map((item, key) => (
                <option value={item?.id} key={key}>
                  {item?.name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.position && formik.touched.position && (
            <CFormFeedback invalid>{formik.errors.position}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="Value">Value *</CFormLabel>
          <CFormSelect
            aria-label="Select Team"
            name="value"
            className={
              'form-control' + (formik.errors.value && formik.touched.value ? ' is-invalid' : '')
            }
            value={formik.values.value}
            onChange={formik.handleChange}
            id="value"
          >
            <option value={0}>Select value</option>
            {playerValue &&
              playerValue.map((item, key) => (
                <option value={item?.id} key={key}>
                  {item?.price_name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.value && formik.touched.value && (
            <CFormFeedback invalid>{formik.errors.value}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="Team">Team</CFormLabel>
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
            <option value={0}>Select Team</option>
            {team &&
              team.map((item, key) => (
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
          <CFormLabel htmlFor="bat Style">Bat Style</CFormLabel>
          <CFormSelect
            aria-label="Select Bat Style"
            name="bat_style"
            className={
              'form-control' +
              (formik.errors.bat_style && formik.touched.bat_style ? ' is-invalid' : '')
            }
            value={formik.values.bat_style}
            onChange={formik.handleChange}
            id="bat_style"
          >
            <option value={0}>Select Bat Style</option>
            {batStyle &&
              batStyle.map((item, key) => (
                <option value={item?.id} key={key}>
                  {item?.name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.bat_style && formik.touched.bat_style && (
            <CFormFeedback invalid>{formik.errors.bat_style}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="Bowl Style">Bowl Style</CFormLabel>
          <CFormSelect
            aria-label="Select Bowl Style"
            name="bowl_style"
            className={
              'form-control' +
              (formik.errors.bowl_style && formik.touched.bowl_style ? ' is-invalid' : '')
            }
            value={formik.values.bowl_style}
            onChange={formik.handleChange}
            id="bowl_style"
          >
            <option value={0}>Select bowl Style</option>
            {bowlStyle &&
              bowlStyle.map((item, key) => (
                <option value={item?.id} key={key}>
                  {item?.name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.bowl_style && formik.touched.bowl_style && (
            <CFormFeedback invalid>{formik.errors.bowl_style}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="image">Image</CFormLabel>
          <CFormInput type="file" id="playerImage" />
          {formik.errors.position && formik.touched.position && (
            <CFormFeedback invalid>{formik.errors.position}</CFormFeedback>
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
