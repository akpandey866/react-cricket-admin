import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import UserService from 'src/service/UserService'
import ToastComponent from 'src/components/common/TaostComponent'
const AddForm = (props) => {
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
  })
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      actions.resetForm({
        values: {
          first_name: '',
          last_name: '',
          email: '',
        },
      })
      setLoader(true)
      UserService.saveUser(data)
        .then((res) => {
          if (res.status === 200) {
            props.setUsers(res.data)
            ToastComponent(res.message, 'success')
            setLoader(false)
          }
        })
        .catch((e) => {
          setLoader(false)
          console.log(e)
        })
    },
  })
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={6}>
          <CFormLabel htmlFor="first_name">First Name</CFormLabel>
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
        <CCol md={6}>
          <CFormLabel htmlFor="last_name">Last Name</CFormLabel>
          <CFormInput
            placeholder="Last Name"
            className={
              'form-control' +
              (formik.errors.last_name && formik.touched.last_name ? ' is-invalid' : '')
            }
            value={formik.values.last_name}
            onChange={formik.handleChange}
            aria-label="last_name"
            id="last_name"
          />
          {formik.errors.last_name && formik.touched.last_name && (
            <CFormFeedback invalid>{formik.errors.last_name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="email">Email</CFormLabel>
          <CFormInput
            placeholder="Email"
            className={
              'form-control' + (formik.errors.email && formik.touched.email ? ' is-invalid' : '')
            }
            value={formik.values.email}
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
          <CLoadingButton
            type="submit"
            color="success"
            variant="outline"
            loading={loader}
            disabled={loader}
            id="submit"
          >
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddForm
