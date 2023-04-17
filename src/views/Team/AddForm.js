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
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
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
        },
      })
      setLoader(true)
      TeamService.saveTeam(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
            navigate('/names')
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
          <CFormLabel htmlFor="name">Team Name</CFormLabel>
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
          <CFormLabel htmlFor="name">Team Type *</CFormLabel>
          <CFormSelect aria-label="Default select example">
            <option>Please select team type</option>
            <option value="1">Senior Mens</option>
            <option value="2">Senior Womens</option>
            <option value="3">Veterans</option>
            <option value="4">Junior Boys</option>
            <option value="5">Junior Girls</option>
          </CFormSelect>
          {formik.errors.name && formik.touched.name && (
            <CFormFeedback invalid>{formik.errors.name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="name">Team Category *</CFormLabel>
          <CFormSelect aria-label="Default select example">
            <option>Please select team category</option>
            <option value="1">Senior Mens</option>
            <option value="2">Senior Womens</option>
            <option value="3">Veterans</option>
            <option value="4">Junior Boys</option>
            <option value="5">Junior Girls</option>
          </CFormSelect>
          {formik.errors.name && formik.touched.name && (
            <CFormFeedback invalid>{formik.errors.name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="name">Grade Name *</CFormLabel>
          <CFormSelect aria-label="Default select example">
            <option>Please select grade name</option>
            <option value="1">Senior Mens</option>
            <option value="2">Senior Womens</option>
            <option value="3">Veterans</option>
            <option value="4">Junior Boys</option>
            <option value="5">Junior Girls</option>
          </CFormSelect>
          {formik.errors.name && formik.touched.name && (
            <CFormFeedback invalid>{formik.errors.name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel htmlFor="name">Team Sponsor Link</CFormLabel>
          <CFormInput
            placeholder="Sponsor Link"
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
