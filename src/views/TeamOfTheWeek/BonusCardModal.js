import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CFormLabel,
  CFormFeedback,
  CLoadingButton,
  CMultiSelect,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'

const BonusCardModal = (props) => {
  const onModalClose = () => {
    props.onCloseModal()
  }
  const [loader, setLoader] = useState(false)
  const formik = useFormik({
    initialValues: {
      player: '',
    },
    //validationSchema,
    onSubmit: (data) => {
      data.player = selectedValue
      data.round = props.roundNumber
      setLoader(true)
      CommonService.saveTotw(data)
        .then((res) => {
          if (res.status === 200) {
            setSelectedValue([])
            props.onCloseModal(data)
            ToastComponent(res.message, 'success')
            setLoader(false)
          } else {
            setLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          console.log('e =>', e)
          ToastComponent('Something Went Wrong,Please try again.', 'error')
          setLoader(false)
        })
    },
  })

  const [selectedValue, setSelectedValue] = useState([])
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : [])
  }
  return (
    <>
      <CModal visible={props.IsModalOpened} size="lg">
        <form className="" onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Team of The Round</strong>
              </CCardHeader>
              <CCardBody className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="players">Players</CFormLabel>
                  <CMultiSelect
                    options={props.options}
                    selectionType="tags"
                    name="player"
                    onChange={handleChange}
                    value={props.options.filter((obj) => selectedValue.includes(obj.value))}
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
