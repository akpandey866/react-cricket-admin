import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CFormLabel,
  CFormSelect,
  CForm,
  CLoadingButton,
  CRow,
  CFormInput,
  CFormFeedback,
  CCol,
  CFormSwitch,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'
const GameSpot = () => {
  const [data, setData] = useState({})
  const [userNumber, setUserNumber] = useState()
  useEffect(() => {
    CommonService.powerControl()
      .then((res) => {
        if (res.status === 200) {
          setData(res.data)
          setTradeCheck(res.data.trades_status)
        }
      })
      .catch((e) => {
        ToastComponent(e.response?.data?.message, 'error')
      })
  }, [])

  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    trades: Yup.string().required('Trades is required'),
  })
  const formik = useFormik({
    initialValues: {
      trades: userNumber,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      data.type = 'trades_status'
      actions.resetForm({
        values: {
          trades: '',
        },
      })
      setLoader(true)
      CommonService.editPowerControl(data)
        .then((res) => {
          if (res.status === 200) {
            setUserNumber(res.data.trades)
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
  const [tradeCheck, setTradeCheck] = useState(false)
  const handleTradeCheck = () => {
    setTradeCheck((current) => !current)
    const data = {}
    data.status = tradeCheck
    data.type = 'trades_status'
    CommonService.changePowerControlStatus(data).then((res) => {
      if (res.status === 200) {
        setData(res.data)
        ToastComponent(res.message, 'success')
      }
    })
  }
  return (
    <CCard className="mt-4 h-100">
      <CCardHeader>
        <strong>Trade</strong>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={formik.handleSubmit}>
          <CRow className="">
            <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
              Status
            </CFormLabel>
            <div className="col-sm-10 mb-3 pt-2">
              <CFormSwitch
                label=""
                id="triple_captain"
                name="trade_check"
                checked={tradeCheck}
                onChange={handleTradeCheck}
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
                id="trades"
                defaultValue={data?.trades}
                name="trades"
                onChange={formik.handleChange}
              />
            </div>
          </CRow>
          <CRow>
            <CCol md={6}>
              <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
                Submit
              </CLoadingButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default GameSpot
