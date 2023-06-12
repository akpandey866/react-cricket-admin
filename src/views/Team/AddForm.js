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
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TeamService from 'src/service/TeamService'
import ToastComponent from 'src/components/common/TaostComponent'
import { useEffect } from 'react'
import PreviewImage from '../PreviewImage'
const AddForm = (props) => {
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Team name is required').max(50, '50 Character Limit is allowed.'),
    team_type: Yup.string().required('Team Type is required'),
    team_category: Yup.string().required('Team Category is required'),
    grade_name: Yup.string().required('Comp is required'),
  })
  const formik = useFormik({
    initialValues: {
      name: '',
      grade_name: '',
      team_category: '',
      team_type: '',
      sponsor_link: '',
      image: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      var formData = new FormData()
      formData.append('name', data.name)
      formData.append('grade_name', data.grade_name)
      formData.append('team_category', data.team_category)
      formData.append('team_type', data.team_type)
      formData.append('sponsor_link', data.sponsor_link)
      formData.append('image', data.image)

      actions.resetForm()
      setLoader(true)
      TeamService.saveTeam(formData)
        .then((res) => {
          if (res.status === 200) {
            props.setUsers(res.data)
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
          <CFormLabel className="fw-bold" htmlFor="name">
            Team Name *
          </CFormLabel>
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
          <CFormLabel className="fw-bold" htmlFor="grade_name">
            Comp This Team Plays In *
          </CFormLabel>
          <CFormSelect
            aria-label="Select Comp"
            name="grade_name"
            className={
              'form-control' +
              (formik.errors.grade_name && formik.touched.grade_name ? ' is-invalid' : '')
            }
            value={formik.values.grade_name}
            onChange={formik.handleChange}
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
          <CFormLabel className="fw-bold" htmlFor="name">
            Team Type *
          </CFormLabel>
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
          <CFormLabel className="fw-bold" htmlFor="team_category">
            Team Category *
          </CFormLabel>
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
          <CFormLabel className="fw-bold" htmlFor="name">
            Team Sponsor Link
          </CFormLabel>
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
          <CFormLabel className="fw-bold" htmlFor="name">
            Team Sponsor Logo
          </CFormLabel>
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
                {formik.values.image ? (
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

export default AddForm
