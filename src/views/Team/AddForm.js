import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TeamService from 'src/service/TeamService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
const AddForm = () => {
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Team name is required'),
    team_type: Yup.string().required('Team Type is required'),
    team_category: Yup.string().required('Team Category is required'),
    grade_name: Yup.string().required('Grade is required'),
  })
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      actions.resetForm({
        values: {
          name: '',
          team_type: '',
          team_category: '',
          grade_name: '',
          sponsor_link: '',
        },
      })
      setLoader(true)
      TeamService.saveTeam(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
          }
        })
        .catch((e) => {
          ToastComponent('Something went wrong.Please try again.', 'error')
          setLoader(false)
        })
    },
  })
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={3}>
          <CFormLabel htmlFor="name">Team Name *</CFormLabel>
          <CFormInput
            placeholder="Team Name"
            className={
              'form-control' + (formik.errors.name && formik.touched.name ? ' is-invalid' : '')
            }
            value={formik.values.name}
            onChange={formik.handleChange}
            aria-label="name"
            id="name"
          />
          {formik.errors.name && formik.touched.name && (
            <CFormFeedback invalid>{formik.errors.name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="team_type">Team Type *</CFormLabel>
          <CFormSelect
            aria-label="team_type"
            name="team_type"
            className={
              'form-control' +
              (formik.errors.team_type && formik.touched.team_type ? ' is-invalid' : '')
            }
            defaultValue={formik.values.team_type}
            // onChange={formik.handleChange}
            onChange={(event) => {
              formik.setTouched({
                ...formik.touched,
                team_type: true,
              })
              formik.setFieldValue('team_type', event.target.value)
            }}
            id="team_type"
          >
            <option value="">Please select team type</option>
            <option value="1">Senior Mens</option>
            <option value="2">Senior Womens</option>
            <option value="3">Veterans</option>
            <option value="4">Junior Boys</option>
            <option value="5">Junior Girls</option>
          </CFormSelect>
          {formik.errors.team_type && formik.touched.team_type && (
            <CFormFeedback invalid>{formik.errors.team_type}</CFormFeedback>
          )}
          {formik.errors.team_type && <p>{formik.errors.team_type.message}</p>}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="name">Team Category *</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            name="team_category"
            className={
              'form-control' +
              (formik.errors.team_category && formik.touched.team_category ? ' is-invalid' : '')
            }
            defaultValue={formik.values.team_category}
            onChange={formik.handleChange}
            id="team_category"
          >
            <option>Please Select Team Category</option>
            <option value="1">Senior Mens</option>
            <option value="2">Senior Womens</option>
            <option value="3">Veterans</option>
            <option value="4">Junior Boys</option>
            <option value="5">Junior Girls</option>
          </CFormSelect>
          {formik.errors.team_category && formik.touched.team_category && (
            <CFormFeedback invalid>{formik.errors.team_category}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="name">Grade This Team Plays In *</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            name="grade_name"
            className={
              'form-control' +
              (formik.errors.grade_name && formik.touched.grade_name ? ' is-invalid' : '')
            }
            defaultValue={formik.values.grade_name}
            onChange={formik.handleChange}
            id="grade_name"
          >
            <option>Please Select Grade Name</option>
            <option value="1">Senior Mens</option>
            <option value="2">Senior Womens</option>
            <option value="3">Veterans</option>
            <option value="4">Junior Boys</option>
            <option value="5">Junior Girls</option>
          </CFormSelect>
          {formik.errors.grade_name && formik.touched.grade_name && (
            <CFormFeedback invalid>{formik.errors.grade_name}</CFormFeedback>
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
            value={formik.values.sponsor_link}
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
          <CFormInput type="file" id="inputGroupFile01" />
          {formik.errors.name && formik.touched.name && (
            <CFormFeedback invalid>{formik.errors.name}</CFormFeedback>
          )}
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

export default AddForm
