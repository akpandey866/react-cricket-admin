import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import BracketBattleService from 'src/service/BracketBattleService'
import ToastComponent from 'src/components/common/TaostComponent'
const MatchResult = () => {
  const [loader, setLoader] = useState(false)
  const param = useParams()
  const validationSchema = Yup.object().shape({
    status: Yup.string().required('Please select status.'),
  })
  const formik = useFormik({
    initialValues: {
      status: '',
      roundId: param.id,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      console.log(data)
      return false
      setLoader(true)
      BracketBattleService.matchCompletion(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
          }
        })
        .catch((e) => {
          console.log('e=>', e)
          ToastComponent('Something Went wrong.Please try again', 'error')
          setLoader(false)
        })
    },
  })
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Finalise Round 1 Result</strong>
          </CCardHeader>
          <form className="" onSubmit={formik.handleSubmit}>
            <CCardBody>
              <CCol md={6} className="">
                <CFormLabel htmlFor="status">Select Your Bracket Battle Stucture</CFormLabel>
                <CFormSelect
                  aria-label="Select status"
                  name="status"
                  className={
                    'form-control ' +
                    (formik.errors.status && formik.touched.status ? ' is-invalid' : '')
                  }
                  defaultValue={formik.values.status}
                  onChange={formik.handleChange}
                  id="status"
                >
                  <option value="0">Please select status</option>
                  <option value="1">Completed</option>
                </CFormSelect>

                {formik.errors.status && formik.touched.status && (
                  <CFormFeedback invalid>{formik.errors.status}</CFormFeedback>
                )}
              </CCol>
              <CCol md={6} className="mt-2">
                <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
                  Submit
                </CLoadingButton>
              </CCol>
            </CCardBody>
          </form>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MatchResult
