import { CForm, CFormFeedback, CFormLabel, CFormSelect, CLoadingButton } from '@coreui/react-pro'
import React from 'react'
import ToastComponent from 'src/components/common/TaostComponent'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import CommonService from 'src/service/CommonService'
const GameStrucurePage = (props) => {
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    structure: Yup.string().required('Team Structure is required'),
  })
  const formik = useFormik({
    initialValues: {
      //structure: props.game_structure,
      structure: props.gameStuctureData,
    },
    enableReinitialize: true,
    validationSchema,
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
  console.log('Asdasasd', props.gameStuctureData)
  const handleChange = (e) => {
    props.setGameStructureData(e.target.value)
  }
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <CFormSelect
            aria-label="Select Structure"
            name="structure"
            className={
              'mt-3 form-control' +
              (formik.errors.structure && formik.touched.structure ? ' is-invalid' : '')
            }
            value={props.gameStuctureData}
            onChange={handleChange}
            id="structure"
            // onChange={formik.handleChange}
            // onChange={(event) => {
            //   formik.setTouched({
            //     ...formik.touched,
            //     structure: true,
            //   })
            //   formik.setFieldValue('structure', event.target.value)
            // }}
          >
            <option value="">Select Team Structure </option>
            <option value="8">6 Players </option>
            <option value="7">7 Players </option>
            <option value="6">8 Players </option>
            <option value="5">9 Players </option>
            <option value="1">10 Players </option>
            <option value="1002">11 Players</option>
          </CFormSelect>
          {formik.errors.structure && formik.touched.structure && (
            <CFormFeedback invalid>{formik.errors.structure}</CFormFeedback>
          )}
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
