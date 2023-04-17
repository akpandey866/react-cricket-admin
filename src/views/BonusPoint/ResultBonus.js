import React from 'react'
import { CCol, CForm, CFormInput, CLoadingButton, CRow } from '@coreui/react-pro'
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
      data.type = 'result_bonus'
      props.setLoadingResultBonus(true)
      CommonService.updateBonusPoint(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            props.setLoadingResultBonus(false)
          } else {
            props.setLoadingResultBonus(false)
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
            <th>Bonus Fantasy Point</th>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((item, key) => (
              <tr key={key}>
                <th>{item.name}</th>
                <td>
                  <CFormInput
                    name={`data.${key}.match_bonus`}
                    type={'number'}
                    defaultValue={item.match_bonus}
                    onChange={formik.handleChange}
                    id="match_bonus"
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
            loading={props.loadingResultBonus}
          >
            Save
          </CLoadingButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default Potm
