import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TeamService from 'src/service/TeamService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
import PreviewImage from '../PreviewImage'
const EditForm = (props) => {
  const [playerDetail, setPlayerDetail] = useState()
  const [gradeName, setGradeName] = useState()
  useEffect(() => {
    if (props.selectedTeamId === props.teamId) {
      TeamService.getTeamDetail(props.teamId)
        .then((res) => {
          if (res.status === 200) {
            setPlayerDetail(res.data)
            setGradeName(res.data.grade_name)
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
    name: Yup.string().required('Name is required'),
  })
  const formik = useFormik({
    initialValues: {
      name: playerDetail?.name,
      grade_name: playerDetail?.gradeName,
      team_category: playerDetail?.team_category,
      team_type: playerDetail?.type,
      sponsor_link: playerDetail?.sponsor_link,
      image: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      var formData = new FormData()
      formData.append('teamId', props.teamId)
      formData.append('name', data.name)
      formData.append('grade_name', gradeName)
      formData.append('team_category', data.team_category)
      formData.append('team_type', data.team_type)
      formData.append('sponsor_link', data.sponsor_link)
      formData.append('image', data.image)
      formData.append('teamId', props.teamId)
      actions.resetForm({
        values: {
          name: '',
        },
      })
      setLoader(true)
      TeamService.editTeam(formData)
        .then((res) => {
          if (res.status === 200) {
            props.setUsers(res.data)
            ToastComponent(res.message, 'success')
            setLoader(false)
          } else {
            setLoader(false)
            ToastComponent('something went wrong.', 'error')
          }
        })
        .catch((e) => {
          console.log(e)
          setLoader(false)
        })
    },
  })
  const gradeHandleChange = (e) => {
    setGradeName(e.target.value)
  }
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={3}>
          <CFormLabel htmlFor="first_name">Team Name</CFormLabel>
          <input
            type="text"
            name="name"
            className={
              'form-control' + (formik.errors.name && formik.touched.name ? ' is-invalid' : '')
            }
            id="name"
            placeholder="Name"
            defaultValue={playerDetail?.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <CFormFeedback invalid>{formik.errors.name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="grade_name">Comp This Team Plays In *</CFormLabel>
          <CFormSelect
            aria-label="Select Comp"
            name="grade_name"
            className={
              'form-control' +
              (formik.errors.grade_name && formik.touched.grade_name ? ' is-invalid' : '')
            }
            value={gradeName}
            onChange={gradeHandleChange}
            id="grade_name"
          >
            <option value={0}>Select comp</option>
            {props.gradeList &&
              props.gradeList.map((item, key) => (
                <option value={item?.id} key={key}>
                  {item?.grade}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.grade_name && formik.touched.grade_name && (
            <CFormFeedback invalid>{formik.errors.grade_name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="name">Team Type *</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            name="team_type"
            className={
              'form-control' +
              (formik.errors.team_type && formik.touched.team_type ? ' is-invalid' : '')
            }
            value={formik.values.team_type}
            onChange={formik.handleChange}
            id="team_type"
          >
            <option>Please Select Team Category</option>
            <option value="1">Senior Mens</option>
            <option value="2">Senior Womens</option>
            <option value="3">Veterans</option>
            <option value="4">Junior Boys</option>
            <option value="5">Junior Girls</option>
          </CFormSelect>
          {formik.errors.team_type && formik.touched.team_type && (
            <CFormFeedback invalid>{formik.errors.team_type}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="team_category">Team Category *</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            name="team_category"
            className={
              'form-control' +
              (formik.errors.team_category && formik.touched.team_category ? ' is-invalid' : '')
            }
            value={formik.values.team_category}
            onChange={formik.handleChange}
            id="team_category"
          >
            <option value={0}>Please select team category</option>
            {props.teamCategoryList &&
              props.teamCategoryList.map((item, key) => (
                <option value={item?.id} key={key}>
                  {item?.name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.team_category && formik.touched.team_category && (
            <CFormFeedback invalid>{formik.errors.team_category}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="name">Team Sponsor Link</CFormLabel>
          <CFormInput
            placeholder="Team Sponsor Link"
            className={
              'form-control' +
              (formik.errors.sponsor_link && formik.touched.sponsor_link ? ' is-invalid' : '')
            }
            defaultValue={formik.values.sponsor_link}
            onChange={formik.handleChange}
            aria-label="sponsor_link"
            id="sponsor_link"
          />
          {formik.errors.sponsor_link && formik.touched.sponsor_link && (
            <CFormFeedback invalid>{formik.errors.sponsor_link}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="name">Team Sponsor Logo</CFormLabel>
          <CFormInput
            type="file"
            id="formFile"
            name="image"
            className={
              formik.touched.image
                ? formik.errors.image
                  ? 'form-control input_user is-invalid'
                  : 'form-control input_user is-valid'
                : 'form-control'
            }
            onChange={(event) => {
              formik.setTouched({
                ...formik.touched,
                image: true,
              })
              formik.setFieldValue('image', event.target.files[0])
            }}
          />
          {formik.touched.image && formik.errors.image ? (
            <CFormFeedback invalid>{formik.errors.image}</CFormFeedback>
          ) : null}
          <CRow>
            <CCol md={4}>
              <CCol md={4}>
                {' '}
                {formik?.values?.image ? (
                  <PreviewImage
                    className={{ margin: 'auto' }}
                    width={100}
                    height={100}
                    file={formik.values.image}
                  />
                ) : null}
              </CCol>
            </CCol>
          </CRow>
        </CCol>
        <CCol md={6}></CCol>
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
