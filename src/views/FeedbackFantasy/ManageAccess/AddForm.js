import {
  CCol,
  CForm,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CLoadingButton,
  CMultiSelect,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastComponent from 'src/components/common/TaostComponent'
import FeedbackFantasyService from 'src/service/FeedbackFantasyService'
const AddForm = (props) => {
  const [loader, setLoader] = useState(false)
  const [userId, setUserId] = useState(false)
  const validationSchema = Yup.object().shape({
    user: Yup.string().required('Please select user.'),
  })
  const formik = useFormik({
    initialValues: {
      user: '',
      team: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      data.team = selectedValue
      actions.resetForm({
        values: {
          grade: '',
        },
      })
      setLoader(true)
      FeedbackFantasyService.saveManageAccessByTeam(data)
        .then((res) => {
          if (res.status === 200) {
            props.setUsers(res.data)
            props.setUserList(res.user_list)
            props.setManagerDropdown(res.coach_listing)
            ToastComponent(res.message, 'success')
            setLoader(false)
          } else {
            setLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          setLoader(false)
          console.log('Here is Error', e)
          ToastComponent('Something Went wront. Please try again.', 'error')
        })
    },
  })
  const [selectedValue, setSelectedValue] = useState([])
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : [])
    console.log('value is here', selectedValue)
  }
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={6}>
          <CFormLabel htmlFor="manager">Manager</CFormLabel>
          <CFormSelect
            aria-label="manager"
            name="user"
            className={
              'form-control' + (formik.errors.user && formik.touched.user ? ' is-invalid' : '')
            }
            // defaultValue={props.managerDropdown}
            onChange={(event) => {
              formik.setTouched({
                ...formik.touched,
                user: true,
              })
              formik.setFieldValue('user', event.target.value)
            }}
            id="user"
          >
            <option value={0}>Select Member</option>
            {props.userList &&
              props.userList.map((item, key) => (
                <option value={item?.user_id} key={key}>
                  {item?.full_name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.user && formik.touched.user && (
            <CFormFeedback invalid>{formik.errors.user}</CFormFeedback>
          )}
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="description">Teams</CFormLabel>
          <CMultiSelect
            options={props.options}
            selectionType="tags"
            name="team"
            onChange={handleChange}
            value={props.options.filter((obj) => selectedValue.includes(obj.value))}
          />
          {formik.errors.team && formik.touched.team && (
            <CFormFeedback invalid>{formik.errors.title}</CFormFeedback>
          )}
        </CCol>
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
