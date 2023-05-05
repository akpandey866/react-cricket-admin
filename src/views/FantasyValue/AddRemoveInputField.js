import {
  CCol,
  CForm,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import PlayerService from 'src/service/PlayerService'
import ToastComponent from 'src/components/common/TaostComponent'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
const AddRemoveInputField = (props) => {
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    value1: Yup.string().required('Value1 is required'),
  })
  const formik = useFormik({
    initialValues: {
      data: props.playerCustomValue,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data, actions) => {
      PlayerService.savePlayerPrice(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
          }
        })
        .catch((e) => {
          console.log('Error =>', e)
          ToastComponent('Something went wrong.', 'error')
          setLoader(false)
        })
    },
  })
  const handleChange = (value, id) => {
    const newState = props.playerCustomValue.map((obj) => {
      // 👇️ if id equals 2, update price property
      if (obj.id === id) {
        return { ...obj, price: value }
      }

      // 👇️ otherwise return the object as is
      return obj
    })

    props.setPlayerCustomValue(newState)
  }
  return (
    <div className="container">
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        {props.playerCustomValue &&
          props.playerCustomValue.map((item, key) => (
            <CRow className="" key={key}>
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Value {++key}
              </CFormLabel>
              <div className="col-sm-8 pt-3 mb-5">
                <InputRange
                  name={`data[${key}]price`}
                  id="price"
                  className={'form-control'}
                  maxValue={15}
                  minValue={7}
                  step={0.1}
                  formatLabel={(value) => value.toFixed(2)}
                  value={item.price}
                  onChange={(value) => handleChange(value, item.id)}
                />
              </div>
            </CRow>
          ))}

        <CRow className="pt-5">
          <CCol md={6}>
            <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
              Submit
            </CLoadingButton>
          </CCol>
        </CRow>
      </CForm>
    </div>
  )
}
export default AddRemoveInputField
