import React, { useState } from 'react'
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
import * as Yup from 'yup'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'

const TwelthMen = (props) => {
  // const validationSchema = Yup.object().shape({
  //   twelfth_men_cards: Yup.string().required('Grade is required'),
  // })
  const formik = useFormik({
    initialValues: {
      twelfth_men_cards: props.data?.twelfth_men_cards,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data, actions) => {
      data.type = 'twelfth_men_cards'
      props.setTwelthMenLoader(true)
      CommonService.editPowerControl(data)
        .then((res) => {
          if (res.status === 200) {
            props.setData(res.data)
            ToastComponent(res.message, 'success')
            props.setTwelthMenLoader(false)
          } else {
            props.setTwelthMenLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          ToastComponent(e.response?.data?.message, 'error')
          props.setTwelthMenLoader(false)
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })
  const handleTwelthMenCheck = () => {
    props.setTwelthMenCheck((current) => !current)
    const data = {}
    data.status = props.twelthMenCheck
    data.type = 'twelfth_men_cards_status'
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
        <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
          Status
        </CFormLabel>
        <div className="col-sm-10 mb-3 pt-2">
          <CFormSwitch
            label=""
            id="triple_captain"
            name="twelfth_men_cards_check"
            checked={props.twelthMenCheck}
            onChange={handleTwelthMenCheck}
          />
        </div>
      </CRow>
      <CRow className="">
        <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
          Use Limit
        </CFormLabel>
        <div className="col-sm-10 mb-3 pt-2">
          <CFormInput
            type="number"
            id="twelfth_men_cards"
            defaultValue={props.data?.twelfth_men_cards}
            name="twelfth_men_cards"
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
            loading={props.twelthMenLoader}
          >
            Submit
          </CLoadingButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default TwelthMen
