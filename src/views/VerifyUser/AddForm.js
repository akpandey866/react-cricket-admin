import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CommonService from 'src/service/CommonService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
const AddForm = (props) => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    user_id: Yup.string().required('Please Select User.'),
    player_id: Yup.string().required('Please Select Player.'),
  })
  const formik = useFormik({
    initialValues: {
      user_id: '',
      player_id: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      actions.resetForm({
        values: {
          playe_id: '',
          user_id: '',
        },
      })
      setLoader(true)
      CommonService.saveVerifyUser(data)
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
            aria-label="Select Member"
            name="user_id"
            className={
              'form-control' +
              (formik.errors.user_id && formik.touched.user_id ? ' is-invalid' : '')
            }
            defaultValue={formik.values.user_id}
            onChange={formik.handleChange}
            id="user_id"
          >
            <option value={0}>Select User</option>
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
          <CFormSelect
            aria-label="Select Player"
            name="player_id"
            className={
              'form-control' +
              (formik.errors.player_id && formik.touched.player_id ? ' is-invalid' : '')
            }
            defaultValue={formik.values.player_id}
            onChange={formik.handleChange}
            id="player_id"
          >
            <option value={0}>Select Player</option>
            {props.playerList &&
              props.playerList.map((item, key) => (
                <option value={item?.id} key={key}>
                  {item?.full_name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.player_id && formik.touched.player_id && (
            <CFormFeedback invalid>{formik.errors.player_id}</CFormFeedback>
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
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddForm
