import { CCol, CForm, CFormFeedback, CFormSelect, CLoadingButton } from '@coreui/react-pro'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastComponent from 'src/components/common/TaostComponent'
import FixtureService from 'src/service/FixtureService'
const AddForm = (props) => {
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    user_id: Yup.string().required('Please Select User.'),
  })
  const formik = useFormik({
    initialValues: {
      user_id: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      actions.resetForm({
        values: {
          user_id: '',
        },
      })
      setLoader(true)
      data.fixtureId = props.fixtureId
      FixtureService.saveAssignedFeedbackManager(data)
        .then((res) => {
          if (res.status === 200) {
            props.setCoachListing(res.coach_listing)
            ToastComponent(res.message, 'success')
            setLoader(false)
          } else {
            setLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          console.log('erropr', e)
          setLoader(false)
          ToastComponent('Something went wrong.Please try again.', 'error')
        })
    },
  })
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={6}>
          <CFormSelect
            aria-label="Select Manager"
            name="user_id"
            className={
              'form-control' +
              (formik.errors.user_id && formik.touched.user_id ? ' is-invalid' : '')
            }
            defaultValue={formik.values.user_id}
            onChange={formik.handleChange}
            id="user_id"
          >
            <option value={0}>Select Member</option>
            {props.userList &&
              props.userList.map((item, key) => (
                <option value={item?.user_id} key={key}>
                  {item?.full_name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.user_id && formik.touched.user_id && (
            <CFormFeedback invalid>{formik.errors.user_id}</CFormFeedback>
          )}
        </CCol>

        <CCol md={6}>
          <CLoadingButton
            type="submit"
            color="success"
            variant="outline"
            loading={loader}
            id="submit"
          >
            Add Feedback Manager
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddForm
