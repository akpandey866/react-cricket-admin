import { CForm, CFormLabel, CFormSelect, CLoadingButton } from '@coreui/react-pro'
import React from 'react'
import ToastComponent from 'src/components/common/TaostComponent'
import { useFormik } from 'formik'
import { useState } from 'react'
import CommonService from 'src/service/CommonService'
const GameStrucurePage = (props) => {
  const [loader, setLoader] = useState(false)
  console.log('Asdasdasd', props.game_structure)
  const [defaultStr, setDefaultStr] = useState(props.game_structure)
  const formik = useFormik({
    initialValues: {
      structure: props.game_structure,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data) => {
      data.type = 1
      setLoader(true)
      CommonService.editGameStructure(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
          }
        })
        .catch((e) => {
          ToastComponent(e.response?.data?.message, 'error')
          setLoader(false)
        })
    },
  })
  // const handleChange = (e) => {
  //   setDefaultStructure(e.target.value)
  // }
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Game Structure</CFormLabel>
          <CFormSelect
            aria-label="Select Structure"
            name="structure"
            className={
              'form-control' +
              (formik.errors.structure && formik.touched.structure ? ' is-invalid' : '')
            }
            defaultValue={formik.values.structure}
            // onChange={handleChange}
            id="structure"
            onChange={formik.handleChange}
            // onChange={(event) => {
            //   formik.setTouched({
            //     ...formik.touched,
            //     structure: true,
            //   })
            //   formik.setFieldValue('structure', event.target.value)
            // }}
          >
            <option value="8">6 Players (Salary Cap: $55m)</option>
            <option value="7">7 Players (Salary Cap: $64m)</option>
            <option value="6">8 Players (Salary Cap: $73m)</option>
            <option value="5">9 Players (Salary Cap: $82m)</option>
            <option value="1">10 Players (Salary Cap: $91m)</option>
            <option value="1002">11 Players (Salary Cap: $100m)</option>
          </CFormSelect>
        </div>

        <div className="mb-3">
          <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
            Submit
          </CLoadingButton>
        </div>
      </CForm>
    </>
  )
}

export default GameStrucurePage
