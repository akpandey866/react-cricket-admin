import { CCol, CForm, CFormCheck, CFormInput, CFormLabel, CLoadingButton } from '@coreui/react-pro'
import React from 'react'
import { useFormik } from 'formik'
import CommonService from 'src/service/CommonService'
import { useState } from 'react'
import ToastComponent from 'src/components/common/TaostComponent'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
const SalaryCapPage = (props) => {
  const [loader, setLoader] = useState(false)

  const formik = useFormik({
    initialValues: {
      salary_type: '',
      salary: '',
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data) => {
      data.salary = props.rangeValue
      data.type = 2
      setLoader(true)
      CommonService.editGameStructure(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
          }
        })
        .catch((e) => {
          ToastComponent('Something went wrong. Please try again.', 'error')
          setLoader(false)
        })
    },
  })
  const handleChange = (value) => {
    props.setRangValue(value)
  }
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        {/* <CCol md={6}>
          <CFormCheck
            inline
            type="radio"
            name="salary_type"
            id="default"
            defaultValue={1}
            label="Default (Salary Cap: $91m)"
            onChange={(event) => {
              formik.setTouched({
                ...formik.touched,
                salary_type: true,
              })
              formik.setFieldValue('salary_type', event.target.value)
              handleValue(event)
            }}
            checked={salaryType === '1'}
            // onChange={handleMaleChange}
          />
        </CCol> */}
        {/* <CCol md={6}>
          <CFormCheck
            inline
            type="radio"
            name="salary_type"
            id="custom"
            defaultValue={2}
            label="Custom"
            checked={salaryType === '2'}
            onChange={(event) => {
              formik.setTouched({
                ...formik.touched,
                salary_type: true,
              })
              formik.setFieldValue('salary_type', event.target.value)
              handleCustomChange(event)
            }}
          />
        </CCol> */}
        <CCol md={12}>
          <CCol md={12} className="mb-4 mt-3">
            <InputRange
              name={`salary`}
              id="price"
              className={'form-control'}
              maxValue={150}
              minValue={50}
              step={1}
              // formatLabel={(value) => value}
              value={props.rangeValue}
              onChange={(value) => handleChange(value)}
              // classNames={'valueLabel:fw-bold'}
            />
          </CCol>
          {/* <CFormInput
            className={
              'form-control' + (formik.errors.salary && formik.touched.salary ? ' is-invalid' : '')
            }
            id="salary"
            placeholder="Select Salary Cap"
            onChange={formik.handleChange}
            value={formik.values.salary}
          /> */}
        </CCol>

        <div className="mb-3">
          <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
            Submit
          </CLoadingButton>
        </div>
      </CForm>
    </>
  )
}

export default SalaryCapPage
