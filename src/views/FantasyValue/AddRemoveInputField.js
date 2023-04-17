import { CCol, CForm, CInputGroup, CInputGroupText, CLoadingButton } from '@coreui/react-pro'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import PlayerService from 'src/service/PlayerService'
import ToastComponent from 'src/components/common/TaostComponent'
const AddRemoveInputField = (props) => {
  const [inputFields, setInputFields] = useState([
    {
      price: [''],
    },
  ])

  const addInputField = (index) => {
    setInputFields([
      ...inputFields,
      {
        price: [''],
      },
    ])
  }
  const removeInputFields = (index) => {
    const rows = [...inputFields]
    rows.splice(index, 1)
    setInputFields(rows)
  }
  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target
    const list = [...inputFields]
    list[index][name] = value
    setInputFields(list)
  }

  const resultsError = []
  const [loader, setLoader] = useState(false)
  const [errorResult, setErrorResult] = useState({})
  const formik = useFormik({
    initialValues: {
      price: [''],
    },
    enableReinitialize: true,
    onSubmit: (data, actions) => {
      setLoader(true)
      PlayerService.updatePlayerFantasyValue(data)
        .then((res) => {
          if (res.status === 200 && res.success === true) {
            ToastComponent(res.message, 'success')
            setLoader(false)
          } else {
            setLoader(false)
            res.errors.forEach((index, product) => {
              resultsError.push(<li>{product}</li>)
            })
            console.log(res.errors)
            ToastComponent(res.errors, 'error')
          }
        })
        .catch((e) => {
          console.log('object 2', e)

          ToastComponent(e.response?.data?.message, 'error')
          setLoader(false)
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })
  return (
    <div className="container">
      <div>{resultsError} error will shjow here</div>
      <div className="row">
        <div className="col-sm-12">
          <button className="btn btn-outline-success " onClick={addInputField}>
            Add New
          </button>
        </div>
      </div>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-sm-8">
            {inputFields.map((data, index) => {
              const { value } = data
              return (
                <div className="row my-3" key={index}>
                  <div className="col">
                    <CInputGroup>
                      <CInputGroupText>$</CInputGroupText>
                      <input
                        type="text"
                        className={
                          'form-control' +
                          (formik.errors.price && formik.touched.price ? ' is-invalid' : '')
                        }
                        onChange={formik.handleChange}
                        value={value}
                        name={`price[${index}]`}
                        placeholder="Value"
                      />
                      <CInputGroupText>m</CInputGroupText>
                    </CInputGroup>
                  </div>

                  <div className="col">
                    {inputFields.length !== 1 ? (
                      <button className="btn btn-outline-danger" onClick={removeInputFields}>
                        x
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <CCol md={6}>
          <CLoadingButton
            type="submit"
            color="success"
            variant="outline"
            loading={loader}
            id="submit"
          >
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </div>
  )
}
export default AddRemoveInputField
