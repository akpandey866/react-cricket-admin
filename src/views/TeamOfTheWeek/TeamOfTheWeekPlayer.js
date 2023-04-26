import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CCard,
  CCardHeader,
  CCardBody,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'

const TeamOfTheWeekPlayer = (props) => {
  const onModalClose = () => {
    // let data = { name: 'example', type: 'closed from child' }
    props.onCloseModal()
  }
  const [loader, setLoader] = useState(false)
  const formik = useFormik({
    initialValues: {
      data: props.playerData,
    },
    enableReinitialize: true,
    //validationSchema,
    onSubmit: (data) => {
      setLoader(true)
      CommonService.updateTotwPlayerPoint(data)
        .then((res) => {
          if (res.status === 200) {
            setLoader(false)
            props.onCloseModal(data)
            ToastComponent(res.message, 'success')
          }
        })
        .catch((e) => {
          console.log('e=> ', e)
          ToastComponent('Something Went Worng, Please try again', 'error')
          setLoader(false)
        })
    },
  })
  return (
    <>
      <CModal visible={props.IsModalOpened} size="lg">
        <form className="" onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Player Point</strong>
              </CCardHeader>
              <CCardBody className="row g-3">
                <table className="main-table table innertable">
                  <thead>
                    <tr>
                      <th>Player Name</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.playerData &&
                      props.playerData?.map((item, key) => (
                        <tr key={key}>
                          <th>{item.player_name}</th>
                          <td>
                            <input
                              type="text"
                              name={`data[${key}]bonus`}
                              className={
                                'form-control' +
                                (formik.errors.bonus && formik.touched.bonus ? ' is-invalid' : '')
                              }
                              id={`data[${key}]bonus`}
                              placeholder="Bonus"
                              defaultValue={item.bonus}
                              onChange={formik.handleChange}
                            />
                          </td>
                        </tr>
                      ))}
                    {props.playerData.length === 0 && (
                      <tr>
                        <td colSpan={4}>No record yet available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CModalBody>

          <CModalFooter>
            <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
              Submit
            </CLoadingButton>
            <CButton color="primary" onClick={(e) => onModalClose()}>
              Cancel
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  )
}

export default TeamOfTheWeekPlayer
