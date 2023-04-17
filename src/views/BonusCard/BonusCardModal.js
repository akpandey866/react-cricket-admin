import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CCol,
  CFormLabel,
  CFormFeedback,
  CLoadingButton,
  CMultiSelect,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'
import { useNavigate } from 'react-router-dom'

const BonusCardModal = (props) => {
  const navigate = useNavigate()
  const onModalClose = () => {
    let data = { name: 'example', type: 'closed from child' }
    props.onCloseModal(data)
  }
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  })
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      player: '',
    },
    validationSchema,
    onSubmit: (data, actions) => {
      data.player = selectedValue
      data.round = props.roundNumber
      actions.resetForm({
        values: {
          title: '',
          description: '',
        },
      })
      setLoader(true)
      CommonService.saveBonusCard(data)
        .then((res) => {
          if (res.status === 200) {
            setSelectedValue([])
            props.onCloseModal(data)
            ToastComponent(res.message, 'success')
            setLoader(false)
            navigate('/bonus-cards')
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
    CommonService.clubPlayers().then((result) => {
      setOptions(result.data)
    })
  }, [])
  const [selectedValue, setSelectedValue] = useState([])
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : [])
  }
  return (
    <>
      <CModal scrollable visible={props.IsModalOpened} size="lg">
        <form className="" onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Bonus Card</strong>
              </CCardHeader>
              <CCardBody className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="title">Bonus Card Name</CFormLabel>
                  <input
                    type="text"
                    name="title"
                    className={
                      'form-control' +
                      (formik.errors.title && formik.touched.title ? ' is-invalid' : '')
                    }
                    id="title"
                    placeholder="Bonus Card Name"
                    defaultValue={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.title && formik.touched.title && (
                    <CFormFeedback invalid>{formik.errors.title}</CFormFeedback>
                  )}
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="description">Description</CFormLabel>
                  <textarea
                    name="description"
                    id="description"
                    className={
                      'form-control' +
                      (formik.errors.description && formik.touched.description ? ' is-invalid' : '')
                    }
                    placeholder="Description"
                    defaultValue={formik.values.description}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.description && formik.touched.description && (
                    <CFormFeedback invalid>{formik.errors.description}</CFormFeedback>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="description">Players</CFormLabel>
                  <CMultiSelect
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
              </CCardBody>
            </CCard>
          </CModalBody>

          <CModalFooter>
            <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
              Submit
            </CLoadingButton>
            <CButton color="primary" onClick={(e) => onModalClose()}>
              Cancel
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  )
}

export default BonusCardModal
