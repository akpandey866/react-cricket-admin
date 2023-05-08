import React from 'react'
import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSwitch,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'

const Potm = (props) => {
  const formik = useFormik({
    initialValues: {
      data: props.data,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data) => {
      data.type = 'potm'
      props.setLoadingPotm(true)
      CommonService.updateBonusPoint(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            props.setLoadingPotm(false)
          } else {
            props.setLoadingPotm(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
  })
  return (
    <CForm className="row g-3" onSubmit={formik.handleSubmit}>
      <table className="main-table table innertable">
        <thead>
          <tr>
            <th>Team</th>
            <th>Bonus Points</th>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((item, key) => (
              <tr key={key}>
                <th>{item.name}</th>
                <td>
                  <CFormInput
                    name={`data.${key}.potm_bonus`}
                    type={'number'}
                    defaultValue={item.potm_bonus}
                    onChange={formik.handleChange}
                    id="potm_bonus"
                  />
                </td>
              </tr>
            ))}
          {props.data.length === 0 && (
            <tr>
              <td colSpan={2}>No record yet available.</td>
            </tr>
          )}
        </tbody>
      </table>

      <CRow>
        <CCol md={6}>
          <CLoadingButton
            type="submit"
            color="success"
            variant="outline"
            loading={props.loadingPotm}
          >
            Save
          </CLoadingButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default Potm
