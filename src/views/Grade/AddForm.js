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
import GradeService from 'src/service/GradeService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
const AddForm = (props) => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    grade: Yup.string().required('Comp is required').max(50, '50 Character Limit is allowed.'),
  })
  const formik = useFormik({
    initialValues: {
      grade: '',
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
      GradeService.saveGrade(data)
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
          console.log('Here is Error', e)
          ToastComponent('Something Went wront. Please try again.', 'error')
        })
    },
  })
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={6}>
          <CFormLabel htmlFor="name" className="fw-bold">
            Comp Name *
          </CFormLabel>
          <CFormInput
            placeholder="Comp Name"
            className={
              'form-control' + (formik.errors.grade && formik.touched.grade ? ' is-invalid' : '')
            }
            value={formik.values.grade}
            onChange={formik.handleChange}
            aria-label="grade"
            id="grade"
          />
          {formik.errors.grade && formik.touched.grade && (
            <CFormFeedback invalid>{formik.errors.grade}</CFormFeedback>
          )}
        </CCol>
        <CCol md={6}></CCol>
        <CCol md={6}>
          <CLoadingButton
            type="submit"
            color="success"
            variant="outline"
            loading={loader}
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
