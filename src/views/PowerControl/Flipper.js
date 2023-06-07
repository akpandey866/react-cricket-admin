import React from 'react'
import {
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSwitch,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'

const Flipper = (props) => {
  const formik = useFormik({
    initialValues: {
      flipper_cards: props.data?.flipper_cards,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data, actions) => {
      data.type = 'flipper_cards'
      props.setFlipperLoader(true)
      CommonService.editPowerControl(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            props.setFlipperLoader(false)
          } else {
            props.setFlipperLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          ToastComponent(e.response?.data?.message, 'error')
          props.setFlipperLoader(false)
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })
  const handleFlipperCheck = () => {
    props.setFlipperCheck((current) => !current)
    const data = {}
    data.status = props.flipperCheck
    data.type = 'flipper_cards_status'
    CommonService.changePowerControlStatus(data).then((res) => {
      if (res.status === 200) {
        // props.setData(res.data)
        ToastComponent(res.message, 'success')
      }
    })
  }
  return (
    <CForm className="row g-3" onSubmit={formik.handleSubmit}>
      <CRow className="">
        <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label fw-bold">
          Status
        </CFormLabel>
        <div className="col-sm-10 mb-3 pt-2">
          <CFormSwitch
            label=""
            id="triple_captain"
            name="flipper_cards_check"
            checked={props.flipperCheck}
            onChange={handleFlipperCheck}
          />
        </div>
      </CRow>
      <CRow className="">
        <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label fw-bold">
          Use Limit
        </CFormLabel>
        <div className="col-sm-10 mb-3 pt-2">
          <CFormInput
            type="number"
            id="flipper_cards"
            defaultValue={props.data?.flipper_cards}
            name="flipper_cards"
            onChange={formik.handleChange}
          />
        </div>
      </CRow>
      <CRow>
        <CCol md={6}>
          <CLoadingButton
            type="submit"
            color="success"
            variant="outline"
            loading={props.flipperLoader}
          >
            Save
          </CLoadingButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default Flipper
