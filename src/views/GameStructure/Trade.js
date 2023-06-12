import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CFormLabel,
  CForm,
  CLoadingButton,
  CRow,
  CFormInput,
  CCol,
  CFormSwitch,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
const GameSpot = (props) => {
  const [data, setData] = useState({})
  const [tradeCheck, setTradeCheck] = useState(false)
  const [userNumber, setUserNumber] = useState()
  const [rangeValue, setRangValue] = useState(20)
  useEffect(() => {
    CommonService.powerControl()
      .then((res) => {
        if (res.status === 200) {
          setData(res.data)
          setRangValue(res.data.trades)
          setTradeCheck(res.data.trades_status)
          props.setTransfer(res.data.trades)
        }
      })
      .catch((e) => {
        ToastComponent(e.response?.data?.message, 'error')
      })
  }, [])

  const [loader, setLoader] = useState(false)
  // const validationSchema = Yup.object().shape({
  //   trades: Yup.string().required('Trades is required'),
  // })
  const formik = useFormik({
    initialValues: {
      trades: userNumber,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data, actions) => {
      data.type = 'trades_status'
      data.trades = rangeValue
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

  const handleChange = (value) => {
    setRangValue(value)
  }
  return (
    <CForm className="row g-3" onSubmit={formik.handleSubmit}>
      {/* <CRow className="">
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
    </CRow> */}

      <CCol md={12}>
        <CCol md={12} className="mb-4 mt-3">
          <InputRange
            name={`trades`}
            id="price"
            className={'form-control'}
            maxValue={100}
            minValue={0}
            step={1}
            formatLabel={(value) => value.toFixed(2)}
            value={rangeValue}
            onChange={(value) => handleChange(value)}
            // classNames={'valueLabel:fw-bold'}
          />
          {/* <CFormInput
          type="number"
          id="trades"
          defaultValue={data?.trades}
          name="trades"
          onChange={formik.handleChange}
        /> */}
        </CCol>
      </CCol>

      <CCol md={6}>
        <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
          Submit
        </CLoadingButton>
      </CCol>
    </CForm>
  )
}

export default GameSpot
