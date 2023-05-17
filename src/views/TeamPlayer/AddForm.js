import {
  CCol,
  CForm,
  CFormFeedback,
  CFormLabel,
  CLoadingButton,
  CMultiSelect,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
import TeamPlayerService from 'src/service/TeamPlayerService'
const AddForm = (props) => {
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    //player: Yup.string().required('Player is required'),
  })
  const urlParams = useParams()
  const formik = useFormik({
    initialValues: {
      player: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      actions.resetForm({
        values: {
          player: '',
        },
      })
      data.playerId = selectedValue
      data.fixtureId = urlParams.fixtureId
      setLoader(true)
      TeamPlayerService.saveMultiPlayer(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
            props.setPickedPlayer(data.picked_player)
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
  const [options, setOptions] = useState([])
  useEffect(() => {
    TeamPlayerService.teamPlayerListing().then((result) => {
      setOptions(result.data)
    })
  }, [])
  const [selectedValue, setSelectedValue] = useState([])
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : [])
  }
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={12}>
          <CMultiSelect
            id="inputGroupSelect01"
            options={options}
            selectionType="tags"
            name="player"
            onChange={handleChange}
            value={options.filter((obj) => selectedValue.includes(obj.value))}
          />

          {formik.errors.player && formik.touched.player && (
            <CFormFeedback invalid>{formik.errors.title}</CFormFeedback>
          )}
        </CCol>
        <CCol md={6}>
          <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddForm
