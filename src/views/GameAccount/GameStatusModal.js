import React from 'react'
import {
  CButton,
  CForm,
  CFormFeedback,
  CFormSelect,
  CLoadingButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import ToastComponent from 'src/components/common/TaostComponent'
import ClubService from 'src/service/ClubService'
const GameStatusModal = (props) => {
  const [loading, setLoading] = useState(false)
  const validationSchema = Yup.object().shape({
    game_status: Yup.string().required('Status is required'),
  })
  const formik = useFormik({
    initialValues: {
      game_status: props.gameStatus,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      data.userId = props.userId
      setLoading(true)
      ClubService.updateGameStatus(data)
        .then((res) => {
          if (res.status === 200) {
            props.setUsers(res.data)
            ToastComponent(res.message, 'success')
            setLoading(false)
          } else {
            setLoading(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          ToastComponent('Something went wrong.', 'error')
          setLoading(false)
        })
    },
  })
  const handleChange = (e) => {
    props.setGameStatus(e.target.value)
  }
  return (
    <CModal backdrop="static" visible={props.visible} onClose={() => props.setVisible(false)}>
      <CForm onSubmit={formik.handleSubmit}>
        <CModalHeader>
          <CModalTitle>Set Game Status</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormSelect
            aria-label="Select Structure"
            name="game_status"
            className={
              'mt-3 form-control' +
              (formik.errors.game_status && formik.touched.game_status ? ' is-invalid' : '')
            }
            value={props.gameStatus}
            id="game_status"
            onChange={handleChange}
          >
            <option value={''}>Select Status </option>
            <option value={1}>Active </option>
            <option value={2}>Complete </option>
            <option value={3}>Starting Soon </option>
          </CFormSelect>
          {formik.errors.game_status && formik.touched.game_status && (
            <CFormFeedback invalid>{formik.errors.game_status}</CFormFeedback>
          )}
          <CLoadingButton
            type="submit"
            className="mt-3"
            color="success"
            variant="outline"
            loading={loading}
          >
            Submit
          </CLoadingButton>
        </CModalBody>
      </CForm>
      <CModalFooter>
        <CButton color="danger" onClick={() => props.setVisible(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default GameStatusModal
