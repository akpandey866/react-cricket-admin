import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import UserService from 'src/service/UserService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
const EditForm = (props) => {
  const [userDetail, setUserDetail] = useState()
  useEffect(() => {
    if (props.selectedId === props.userId) {
      UserService.getUserDetail(props.userId)
        .then((res) => {
          if (res.status === 200) {
            setUserDetail(res.data)
          }
        })
        .catch((e) => {
          ToastComponent(e.response?.data?.message, 'error')
          setLoader(false)
        })
    }
  }, [props])

  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
  })
  const formik = useFormik({
    initialValues: {
      first_name: userDetail?.first_name,
      last_name: userDetail?.last_name,
      email: userDetail?.email,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      data.userId = props.userId
      setLoader(true)
      UserService.editUser(data)
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
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={6}>
          <CFormLabel className="fw-bold" htmlFor="first_name">
            First Name
          </CFormLabel>
          <input
            type="text"
            name="first_name"
            className={
              'form-control' +
              (formik.errors.first_name && formik.touched.first_name ? ' is-invalid' : '')
            }
            id="first_name"
            placeholder="First Name"
            defaultValue={userDetail?.first_name}
            onChange={formik.handleChange}
          />
          {formik.errors.first_name && formik.touched.first_name && (
            <CFormFeedback invalid>{formik.errors.first_name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={6}>
          <CFormLabel className="fw-bold" htmlFor="last_name">
            Last Name
          </CFormLabel>
          <input
            type="text"
            name="last_name"
            className={
              'form-control' +
              (formik.errors.last_name && formik.touched.last_name ? ' is-invalid' : '')
            }
            id="last_name"
            placeholder="Last Name"
            defaultValue={userDetail?.last_name}
            onChange={formik.handleChange}
          />
          {formik.errors.last_name && formik.touched.last_name && (
            <CFormFeedback invalid>{formik.errors.last_name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={6}>
          <CFormLabel className="fw-bold" htmlFor="email">
            Email
          </CFormLabel>
          <CFormInput
            placeholder="Email"
            className={
              'form-control' + (formik.errors.email && formik.touched.email ? ' is-invalid' : '')
            }
            defaultValue={formik.values.email}
            onChange={formik.handleChange}
            aria-label="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email && (
            <CFormFeedback invalid>{formik.errors.email}</CFormFeedback>
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

export default EditForm
