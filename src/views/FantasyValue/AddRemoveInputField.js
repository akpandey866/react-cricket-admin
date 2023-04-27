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
  // const [inputFields, setInputFields] = useState({
  //   price1: 9,
  //   price2: 9,
  //   price3: 9,
  //   price4: 9,
  //   price5: 9,
  //   price6: 9,
  //   price7: 9,
  //   price8: 9,
  //   price9: 9,
  //   price10: 9,
  //   price11: 9,
  //   price12: 9,
  //   price13: 9,
  //   price14: 9,
  //   price15: 9,
  //   price16: 9,
  //   price17: 9,
  //   price18: 9,
  //   price19: 9,
  //   price20: 9,
  // })

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
      // data.value1 = inputFields.price1.toFixed(2)
      // data.value2 = inputFields.price2.toFixed(2)
      // data.value3 = inputFields.price3.toFixed(2)
      // data.value4 = inputFields.price4.toFixed(2)
      // data.value5 = inputFields.price5.toFixed(2)
      // data.value6 = inputFields.price6.toFixed(2)
      // data.value7 = inputFields.price7.toFixed(2)
      // data.value8 = inputFields.price8.toFixed(2)
      // data.value9 = inputFields.price9.toFixed(2)
      // data.value10 = inputFields.price10.toFixed(2)
      // data.value11 = inputFields.price11.toFixed(2)
      // data.value12 = inputFields.price12.toFixed(2)
      // data.value13 = inputFields.price13.toFixed(2)
      // data.value14 = inputFields.price14.toFixed(2)
      // data.value15 = inputFields.price15.toFixed(2)
      // data.value16 = inputFields.price16.toFixed(2)
      // data.value17 = inputFields.price17.toFixed(2)
      // data.value18 = inputFields.price18.toFixed(2)
      // data.value19 = inputFields.price19.toFixed(2)
      // data.value20 = inputFields.price20.toFixed(2)
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
              <div className="col-sm-8 pt-3">
                <InputRange
                  name={`data[${key}]price`}
                  id="price"
                  className={'form-control'}
                  maxValue={20}
                  minValue={0}
                  step={0.1}
                  formatLabel={(value) => value.toFixed(2)}
                  value={item.price}
                  onChange={(value) => handleChange(value, item.id)}

                  // onChange={
                  //   ((value) =>
                  //     setInputFields((prevState) => {
                  //       return {
                  //         ...prevState,
                  //         price: value,
                  //       }
                  //     }),
                  //   props.setPlayerCustomValue((current) => {
                  //     current.filter((fruit) => fruit.id === item.id)
                  //   }))
                  // }
                  // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
                />
              </div>
            </CRow>
          ))}

        {/* <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 2
          </CFormLabel>
          <div className="col-sm-8 pt-3">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price2}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price2: value,
                  }
                })
              }
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 3
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price3}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price3: value,
                  }
                })
              }
            />
          </div>
        </CRow>

        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 4
          </CFormLabel>

          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price4}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price4: value,
                  }
                })
              }
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 5
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price5}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price5: value,
                  }
                })
              }
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 6
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price6}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price6: value,
                  }
                })
              }
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 7
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price7}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price7: value,
                  }
                })
              }
              // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 8
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price8}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price8: value,
                  }
                })
              }
              // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 9
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price9}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price9: value,
                  }
                })
              }
              // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 10
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price10}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price10: value,
                  }
                })
              }
              // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 11
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              className={'form-control'}
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price11}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price11: value,
                  }
                })
              }
              // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 12
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price12}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price12: value,
                  }
                })
              }
              // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 13
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price13}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price13: value,
                  }
                })
              }
              // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 14
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price14}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price14: value,
                  }
                })
              }
              // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 15
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price15}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price15: value,
                  }
                })
              }
              // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 16
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price16}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price16: value,
                  }
                })
              }
              // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 17
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price17}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price17: value,
                  }
                })
              }
              // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 18
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price18}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price18: value,
                  }
                })
              }
              // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 19
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price19}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price19: value,
                  }
                })
              }
              // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
            />
          </div>
        </CRow>
        <CRow className="pt-5">
          <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Value 20
          </CFormLabel>
          <div className="col-sm-8">
            <InputRange
              maxValue={20}
              minValue={1}
              step={0.1}
              formatLabel={(value) => value.toFixed(2)}
              value={inputFields.price20}
              onChange={(value) =>
                setInputFields((prevState) => {
                  return {
                    ...prevState,
                    price20: value,
                  }
                })
              }
              // onChangeComplete={(value) => console.log('sdfsdsdf', value)}
            />
          </div>
        </CRow>
         */}
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
