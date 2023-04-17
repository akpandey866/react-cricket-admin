import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CLoadingButton,
  CModalHeader,
  CModalTitle,
  CForm,
  CRow,
  CFormInput,
  CFormFeedback,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastComponent from 'src/components/common/TaostComponent'
import { useNavigate } from 'react-router-dom'
import GradeService from 'src/service/GradeService'

const MultiplierModal = (props) => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    point: Yup.string().required('Point is required'),
  })
  const formik = useFormik({
    initialValues: {
      point: '',
    },
    validationSchema,
    onSubmit: (data, actions) => {
      data.gradeId = props.gradeId
      actions.resetForm({
        values: {
          point: '',
        },
      })
      setLoader(true)
      GradeService.mulitplyGrade(data)
        .then((res) => {
          if (res.status === 200) {
            props.setVisible(false)
            props.toggleDetails(props.gradeId)
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
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })

  return (
    <>
      <CModal visible={props.visible} onClose={() => props.setVisible(false)}>
        <CForm className="" onSubmit={formik.handleSubmit}>
          <CModalHeader>
            <CModalTitle>Set Your Multiplier</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow className="">
              <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                {'Point'}
              </CFormLabel>
              <div className="col-sm-8 mb-3 pt-2">
                <CFormInput
                  type="number"
                  id="point"
                  className={
                    'form-control' +
                    (formik.errors.point && formik.touched.point ? ' is-invalid' : '')
                  }
                  defaultValue={formik.values.point}
                  name="point"
                  onChange={formik.handleChange}
                />
                {formik.errors.point && formik.touched.point && (
                  <CFormFeedback invalid>{formik.errors.point}</CFormFeedback>
                )}
              </div>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
              Apply
            </CLoadingButton>
            <CButton color="danger" onClick={() => props.setVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default MultiplierModal
