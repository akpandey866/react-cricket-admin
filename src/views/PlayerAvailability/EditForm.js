import { CCol, CForm, CFormFeedback, CFormLabel, CLoadingButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import PlayerAvailabilityService from 'src/service/PlayerAvailabilityService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
const EditForm = (props) => {
  const [avDetail, setAvDetail] = useState()
  useEffect(() => {
    if (props.selectedId === props.avId) {
      PlayerAvailabilityService.getAvDetail(props.avId)
        .then((res) => {
          if (res.status === 200) {
            setAvDetail(res.data)
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
    grade: Yup.string().required('Grade is required'),
  })
  const formik = useFormik({
    initialValues: {
      player: '',
      date_from: avDetail?.date_from,
      date_till: avDetail?.date_till,
      reason: avDetail?.reason,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      data.avId = props.avId
      actions.resetForm({
        values: {
          grade: '',
        },
      })
      setLoader(true)
      PlayerAvailabilityService.editGrade(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
            navigate('/grades')
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
        <CCol md={6}>
          <CFormLabel htmlFor="grade">Grade</CFormLabel>
          <input
            type="text"
            name="grade"
            className={
              'form-control' + (formik.errors.grade && formik.touched.grade ? ' is-invalid' : '')
            }
            id="validationServer01"
            placeholder="Grade"
            defaultValue={avDetail?.grade}
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
