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

const Dealer = (props) => {
  const formik = useFormik({
    initialValues: {
      dealer_cards: props.data?.dealer_cards,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data, actions) => {
      data.type = 'dealer_cards'
      props.setDealerLoader(true)
      CommonService.editPowerControl(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            props.setDealerLoader(false)
          } else {
            props.setDealerLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          ToastComponent(e.response?.data?.message, 'error')
          props.setDealerLoader(false)
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })
  const handleDealerCheck = () => {
    props.setDealerCheck((current) => !current)
    const data = {}
    data.status = props.dealerCheck
    data.type = 'dealer_cards_status'
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
            name="dealer_cards_check"
            checked={props.dealerCheck}
            onChange={handleDealerCheck}
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
            id="dealer_cards"
            defaultValue={props.data?.dealer_cards}
            name="dealer_cards"
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
            loading={props.dealerLoader}
          >
            Save
          </CLoadingButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default Dealer
