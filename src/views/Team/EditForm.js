import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TeamService from 'src/service/TeamService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
const EditForm = (props) => {
  const [playerDetail, setPlayerDetail] = useState()
  useEffect(() => {
    if (props.selectedTeamId === props.teamId) {
      TeamService.getTeamDetail(props.teamId)
        .then((res) => {
          if (res.status === 200) {
            setPlayerDetail(res.data)
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
    name: Yup.string().required('Name is required'),
  })
  const formik = useFormik({
    initialValues: {
      name: playerDetail?.name,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      data.teamId = props.teamId
      actions.resetForm({
        values: {
          name: '',
        },
      })
      setLoader(true)
      TeamService.editTeam(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
            navigate('/teams')
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
          <CFormLabel htmlFor="first_name">Team Name</CFormLabel>
          <input
            type="text"
            name="name"
            className={
              'form-control' + (formik.errors.name && formik.touched.name ? ' is-invalid' : '')
            }
            id="name"
            placeholder="Name"
            defaultValue={playerDetail?.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <CFormFeedback invalid>{formik.errors.name}</CFormFeedback>
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
