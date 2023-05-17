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

const TripleCap = (props) => {
  const formik = useFormik({
    initialValues: {
      captain_cards: props.data?.captain_cards,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data, actions) => {
      data.type = 'captain_cards'
      props.setTripleCapLoader(true)
      CommonService.editPowerControl(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            props.setTripleCapLoader(false)
          } else {
            props.setTripleCapLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          ToastComponent(e.response?.data?.message, 'error')
          props.setTripleCapLoader(false)
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })
  const handleTripleCheck = () => {
    props.setTripleCheck((current) => !current)
    const data = {}
    data.status = props.tripleCheck
    data.type = 'captain_cards_status'
    CommonService.changePowerControlStatus(data).then((res) => {
      if (res.status === 200) {
        props.setData(res.data)
        ToastComponent(res.message, 'success')
      }
    })
  }
  return (
    <CForm className="row g-3" onSubmit={formik.handleSubmit}>
      <CRow className="">
        <CFormLabel htmlFor="staticEmail" className="col-sm-3 col-form-label">
          Status
        </CFormLabel>
        <div className="col-sm-9 mb-3 pt-2">
          <CFormSwitch
            label=""
            id="triple_captain"
            name="captain_cards_check"
            checked={props.tripleCheck}
            onChange={handleTripleCheck}
          />
        </div>
      </CRow>
      <CRow className="">
        <CFormLabel htmlFor="staticEmail" className="col-sm-3 col-form-label">
          Use Limit
        </CFormLabel>
        <div className="col-sm-9 mb-3 pt-2">
          <CFormInput
            type="number"
            id="captain_cards"
            defaultValue={props.data?.captain_cards}
            name="captain_cards"
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
            loading={props.tripleCapLoader}
          >
            Save
          </CLoadingButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default TripleCap
