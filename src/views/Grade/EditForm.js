import { CCol, CForm, CFormFeedback, CFormLabel, CLoadingButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import GradeService from 'src/service/GradeService'
import ToastComponent from 'src/components/common/TaostComponent'
const EditForm = (props) => {
  const [gradeDetail, setGradeDetail] = useState()
  useEffect(() => {
    if (props.selectedId === props.gradeId) {
      GradeService.getGradeDetail(props.gradeId)
        .then((res) => {
          if (res.status === 200) {
            setGradeDetail(res.data)
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
    grade: Yup.string().required('Grade is required').max(50, '50 Character Limit is allowed.'),
  })
  const formik = useFormik({
    initialValues: {
      grade: gradeDetail?.grade,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      data.gradeId = props.gradeId
      actions.resetForm()
      setLoader(true)
      GradeService.editGrade(data)
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
          ToastComponent(e.response?.data?.message, 'error')
          setLoader(false)
        })
    },
  })
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={6}>
          <CFormLabel className="fw-bold" htmlFor="grade">
            Grade
          </CFormLabel>
          <input
            type="text"
            name="grade"
            className={
              'form-control' + (formik.errors.grade && formik.touched.grade ? ' is-invalid' : '')
            }
            id="validationServer01"
            placeholder="Grade"
            defaultValue={formik.values.grade}
            onChange={formik.handleChange}
          />
          {formik.errors.grade && formik.touched.grade && (
            <CFormFeedback invalid>{formik.errors.grade}</CFormFeedback>
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
