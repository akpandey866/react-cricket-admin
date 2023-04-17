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
  CCard,
  CCardHeader,
  CCardBody,
  CFormSelect,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastComponent from 'src/components/common/TaostComponent'
import { useNavigate } from 'react-router-dom'
import GradeService from 'src/service/GradeService'

const CopyGradeModal = (props) => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    grade: Yup.string().required('Grade is required'),
  })
  const formik = useFormik({
    initialValues: {
      grade: '',
    },
    validationSchema,
    onSubmit: (data, actions) => {
      data.gradeId = props.gradeId

      setLoader(true)
      GradeService.copyGrade(data).then((res) => {
        console.log(res)
        if (res.status === 200) {
          props.setCopyVisible(false)
          props.toggleDetails(props.gradeId)
          ToastComponent(res.message, 'success')
          setLoader(false)
        }
      })
      actions.resetForm({
        values: {
          grade: '',
        },
      })
    },
  })

  return (
    <>
      <CModal visible={props.copyVisible} onClose={() => props.setCopyVisible(false)}>
        <CForm className="" onSubmit={formik.handleSubmit}>
          <CModalHeader>
            <CModalTitle>Copy Grade</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>List of Grade</strong>
              </CCardHeader>
              <CCardBody>
                <CRow className="">
                  <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                    {'Point'}
                  </CFormLabel>
                  <div className="col-sm-8 mb-3 pt-2">
                    <CFormSelect
                      aria-label="Select Grade"
                      name="grade"
                      className={
                        'form-control' +
                        (formik.errors.grade && formik.touched.grade ? ' is-invalid' : '')
                      }
                      onChange={(e) => {
                        formik.handleChange(e)
                      }}
                      // onChange={formik.handleChange}
                      id="grade"
                      value={formik.values.grade}
                    >
                      <option value="0">Select Grade</option>
                      {props.gradeList &&
                        props.gradeList.map((item, key) => (
                          <option value={item?.id} key={key}>
                            {item?.grade}
                          </option>
                        ))}
                    </CFormSelect>
                    {formik.errors.grade && formik.touched.grade && (
                      <CFormFeedback invalid>{formik.errors.grade}</CFormFeedback>
                    )}
                  </div>
                </CRow>
              </CCardBody>
            </CCard>
          </CModalBody>
          <CModalFooter>
            <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
              Apply
            </CLoadingButton>
            <CButton color="danger" onClick={() => props.setCopyVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default CopyGradeModal
