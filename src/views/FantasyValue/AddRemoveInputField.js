import {
  CCol,
  CForm,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useFormik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import PlayerService from 'src/service/PlayerService'
import ToastComponent from 'src/components/common/TaostComponent'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
const AddRemoveInputField = (props) => {
  const [loader, setLoader] = useState(false)
  // const validationSchema = Yup.object().shape({
  //   data: Yup.array().of(
  //     Yup.object().shape({
  //       price: Yup.number().required('Price required'),
  //     }),
  //   ),
  // })

  const validationSchema = Yup.object({
    users: Yup.array().of(
      Yup.object().shape({
        price: Yup.number().required('Name required'),
      }),
    ),
  })

  const formik = useFormik({
    initialValues: {
      users: props.playerCustomValue,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      console.log('selecty value', data)
      return false
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
  console.log('eroro will show here', formik.errors)

  // const handleChange = (value, id) => {
  //   const newState = props.playerCustomValue.map((obj) => {
  //     // 👇️ if id equals 2, update price property
  //     if (obj.id === id) {
  //       return { ...obj, price: value }
  //     }
  //     // 👇️ otherwise return the object as is
  //     return obj
  //   })

  //   props.setPlayerCustomValue(newState)
  // }

  const [selectedValue, setSelectedValue] = useState([])
  const handleChange = (event, index, id) => {
    setSelectedValue((prevState) => {
      return {
        ...prevState,
        value: event.target.value,
        key: id,
      }
    })
  }

  const handleChangenew = (e, i) => {
    const { value, name } = e.target
    const newState = [...selectedValue]
    newState[i] = {
      ...newState[i],
      [name]: value,
    }

    setSelectedValue(newState)
    console.log('newState', selectedValue)
  }

  return (
    <>
      <div className="container">
        <CForm className="row g-3" onSubmit={formik.handleSubmit}>
          {props.playerCustomValue &&
            props.playerCustomValue.map((item, key) => (
              <CRow className="" key={key}>
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Value {key}
                </CFormLabel>
                <div className="col-sm-8 pt-3 mb-5">
                  {/* <InputRange
                  name={`users.${key}.price`}

                  className={'form-control'}
                  maxValue={15}
                  minValue={7}
                  step={0.1}
                  formatLabel={(value) => value.toFixed(2)}
                  value={item.price}
                  onChange={(value) => handleChange(value, item.id)}
                /> */}
                  {key === 0 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        // name={`users.${key}.price`}
                        // name={`users.${key}.price`}
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors?.users &&
                          formik.errors?.users[key] &&
                          formik.touched?.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        defaultValue={item[key]}
                        // onChange={
                        //   ((e) => handleChangenew(e, key),

                        // }
                        onChange={(e) => {
                          const newUsers = [e.target.value]
                          handleChangenew(e, key)
                          formik.setFieldValue(`users.${key}.price`, 16)
                        }}
                        id={`users.${key}.price`}
                      >
                        <option value={0}>Select Fantasy Value {key}</option>
                        <option value="15.00">$15.00m</option>
                        <option value="14.90">$14.90m</option>
                        <option value="14.80">$14.80m</option>
                        <option value="14.70">$14.70m</option>
                        <option value="14.60">$14.60m</option>
                      </CFormSelect>

                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}

                  {key === 1 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors?.users &&
                          formik.errors?.users[key] &&
                          formik.touched?.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => {
                          handleChangenew(e, key)
                          formik.setFieldValue(`users.${key}.price`, 17)
                        }}
                      >
                        <option value={0}>Select Fantasy Value {key}</option>
                        <option value="14.50">$14.50m</option>
                        <option value="14.40">$14.40m</option>
                        <option value="14.30">$14.30m</option>
                        <option value="14.20">$14.20m</option>
                        <option value="14.10">$14.10m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
                  {key === 2 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors.users &&
                          formik.errors.users[key] &&
                          formik.touched.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => handleChangenew(e, key)}
                      >
                        <option value={0}>Select Fantasy Value {key}</option>
                        <option value="14.00">$14.00m</option>
                        <option value="13.90">$13.90m</option>
                        <option value="13.80">$13.80m</option>
                        <option value="13.70">$13.70m</option>
                        <option value="13.60">$13.60m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
                  {key === 3 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors.users &&
                          formik.errors.users[key] &&
                          formik.touched.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => handleChangenew(e, key)}
                      >
                        <option value={'0'}>Select Fantasy Value {key}</option>
                        <option value="13.50">$13.50m</option>
                        <option value="13.40">$13.40m</option>
                        <option value="13.30">$13.30m</option>
                        <option value="13.20">$13.20m</option>
                        <option value="13.10">$13.10m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
                  {key === 4 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors.users &&
                          formik.errors.users[key] &&
                          formik.touched.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => handleChangenew(e, key)}
                      >
                        <option value={0}>Select Fantasy Value {key}</option>
                        <option value="13.00">$13.00m</option>
                        <option value="12.90">$12.90m</option>
                        <option value="12.80">$12.80m</option>
                        <option value="12.70">$12.70m</option>
                        <option value="12.60">$12.60m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
                  {key === 5 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors.users &&
                          formik.errors.users[key] &&
                          formik.touched.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => handleChangenew(e, key)}
                      >
                        <option value={0}>Select Fantasy Value {key}</option>
                        <option value="12.50">$12.50m</option>
                        <option value="12.40">$12.40m</option>
                        <option value="12.30">$12.30m</option>
                        <option value="12.20">$12.20m</option>
                        <option value="12.10">$12.10m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
                  {key === 6 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors.users &&
                          formik.errors.users[key] &&
                          formik.touched.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => handleChangenew(e, key)}
                      >
                        <option value={0}>Select Fantasy Value {key}</option>
                        <option value="12.00">$12.00m</option>
                        <option value="11.90">$11.90m</option>
                        <option value="11.80">$11.80m</option>
                        <option value="11.70">$11.70m</option>
                        <option value="11.60">$11.60m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
                  {key === 7 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors.users &&
                          formik.errors.users[key] &&
                          formik.touched.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => handleChangenew(e, key)}
                      >
                        <option value={'0'}>Select Fantasy Value {key}</option>
                        <option value="11.50">$11.50m</option>
                        <option value="11.40">$11.40m</option>
                        <option value="11.30">$11.30m</option>
                        <option value="11.20">$11.20m</option>
                        <option value="11.10">$11.10m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
                  {key === 8 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors.users &&
                          formik.errors.users[key] &&
                          formik.touched.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => handleChangenew(e, key)}
                      >
                        <option value={0}>Select Fantasy Value {key}</option>
                        <option value="11.00">$11.00m</option>
                        <option value="10.90">$10.90m</option>
                        <option value="10.80">$10.80m</option>
                        <option value="10.70">$10.70m</option>
                        <option value="10.60">$10.60m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
                  {key === 9 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors.users &&
                          formik.errors.users[key] &&
                          formik.touched.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => handleChangenew(e, key)}
                      >
                        <option value={0}>Select Fantasy Value {key}</option>
                        <option value="10.50">$10.50m</option>
                        <option value="10.40">$10.40m</option>
                        <option value="10.30">$10.30m</option>
                        <option value="10.20">$10.20m</option>
                        <option value="10.10">$10.10m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
                  {key === 10 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors.users &&
                          formik.errors.users[key] &&
                          formik.touched.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => handleChangenew(e, key)}
                      >
                        <option value={0}>Select Fantasy Value {key}</option>
                        <option value="10.00">$10.00m</option>
                        <option value="9.90">$9.90m</option>
                        <option value="9.80">$9.80m</option>
                        <option value="9.70">$9.70m</option>
                        <option value="9.60">9.60m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
                  {key === 11 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors.users &&
                          formik.errors.users[key] &&
                          formik.touched.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => handleChangenew(e, key)}
                      >
                        <option value={0}>Select Fantasy Value {key}</option>
                        <option value="9.50">$9.50m</option>
                        <option value="9.40">$9.40m</option>
                        <option value="9.30">$9.300m</option>
                        <option value="9.20">$9.20m</option>
                        <option value="9.10">$9.10m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
                  {key === 12 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors.users &&
                          formik.errors.users[key] &&
                          formik.touched.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => handleChangenew(e, key)}
                      >
                        <option value={0}>Select Fantasy Value {key}</option>
                        <option value="9.00">$9.00m</option>
                        <option value="8.90">$8.90m</option>
                        <option value="8.80">$8.80m</option>
                        <option value="8.70">$8.70m</option>
                        <option value="8.60">$8.60m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
                  {key === 13 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors.users &&
                          formik.errors.users[key] &&
                          formik.touched.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => handleChangenew(e, key)}
                      >
                        <option value={0}>Select Fantasy Value {key}</option>
                        <option value="8.50">$8.50m</option>
                        <option value="8.40">$8.40m</option>
                        <option value="8.30">$8.30m</option>
                        <option value="8.20">$8.20m</option>
                        <option value="8.10">$8.10m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
                  {key === 14 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors.users &&
                          formik.errors.users[key] &&
                          formik.touched.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => handleChangenew(e, key)}
                      >
                        <option value={0}>Select Fantasy Value {key}</option>
                        <option value="8.00">$8.00m</option>
                        <option value="7.90">$7.90m</option>
                        <option value="7.80">$7.80m</option>
                        <option value="7.70">$7.70m</option>
                        <option value="7.60">$7.60m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
                  {key === 15 && (
                    <>
                      <CFormSelect
                        aria-label="Select Structure"
                        name={`users.${key}.price`}
                        className={
                          'form-control' +
                          (formik.errors.users &&
                          formik.errors.users[key] &&
                          formik.touched.users[key].price
                            ? ' is-invalid'
                            : '')
                        }
                        id={`users.${key}.price`}
                        defaultValue={0}
                        onChange={(e) => handleChangenew(e, key)}
                      >
                        <option value={0}>Select Fantasy Value {key}</option>
                        <option value="7.50">$7.50m</option>
                        <option value="7.40">$7.40m</option>
                        <option value="7.30">$7.30m</option>
                        <option value="7.20">$7.20m</option>
                        <option value="7.10">$7.10m</option>
                        <option value="7.00">$7.00m</option>
                      </CFormSelect>
                      {formik.errors.users && formik.errors.users[key] && (
                        <CFormFeedback invalid>{formik.errors.users[key].price}</CFormFeedback>
                      )}
                    </>
                  )}
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
    </>
  )
}
export default AddRemoveInputField
