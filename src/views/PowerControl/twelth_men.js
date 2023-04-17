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

const twelth_men = (props) => {
  const formik = useFormik({
    initialValues: {
      captain_cards: data?.captain_cards,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data, actions) => {
      // data.gradeId = props.gradeId
      setLoader(true)
      CommonService.editPowerControl(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
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
    <CForm>
      <CRow className="">
        <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
          Status
        </CFormLabel>
        <div className="col-sm-10 mb-3 pt-2">
          <CFormSwitch label="" id="triple_captain" name="tripleCaptain" defaultChecked />
        </div>
      </CRow>
      <CRow className="">
        <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
          Use Limit
        </CFormLabel>
        <div className="col-sm-10 mb-3 pt-2">
          <CFormInput
            type="number"
            id="triple"
            defaultValue={data?.captain_cards}
            name="captain_cards"
            onChange={formik.handleChange}
          />
        </div>
      </CRow>
      <CRow>
        <CCol md={6}>
          <CLoadingButton type="submit" color="success" variant="outline">
            Save
          </CLoadingButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default twelth_men
