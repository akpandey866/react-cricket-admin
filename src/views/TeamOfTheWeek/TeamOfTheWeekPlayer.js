import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CCol,
  CFormLabel,
  CFormFeedback,
  CLoadingButton,
  CMultiSelect,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'
import { useNavigate } from 'react-router-dom'

const BonusCardPlayer = (props) => {
  const navigate = useNavigate()
  const onModalClose = () => {
    let data = { name: 'example', type: 'closed from child' }
    props.onCloseModal(data)
  }
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    players: Yup.array().of(
      Yup.object().shape({
        bonus: Yup.string().required('Point is required required'),
        // email: Yup.string().required('email required').email('Enter valid email'),
      }),
    ),
  })
  const formik = useFormik({
    initialValues: {
      players: [
        {
          bonus: '',
        },
      ],
    },
    validationSchema,
    onSubmit: (data, actions) => {
      data.round = props.roundNumber
      actions.resetForm({
        values: {
          bonus: '',
        },
      })
      setLoader(true)
      // CommonService.saveBonusCardPlayerPoint(data)
      //   .then((res) => {
      //     if (res.status === 200) {
      //       setSelectedValue([])
      //       props.onCloseModal(data)
      //       ToastComponent(res.message, 'success')
      //       setLoader(false)
      //       navigate('/bonus-cards')
      //     } else {
      //       setLoader(false)
      //       ToastComponent(res.message, 'error')
      //     }
      //   })
      //   .catch((e) => {
      //     ToastComponent(e.response?.data?.message, 'error')
      //     setLoader(false)
      //     ToastComponent(e.response?.data?.message, 'error')
      //   })
    },
  })

  const [playerData, setPlayerData] = useState([])
  useEffect(() => {
    if (props.roundNumber) {
      CommonService.bonusCardPlayer(props.roundNumber).then((result) => {
        setPlayerData(result.data)
      })
    }
  }, [props])

  const [selectedValue, setSelectedValue] = useState([])
  return (
    <>
      <CModal scrollable visible={props.IsModalOpened} size="lg">
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
                      <th>Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playerData &&
                      playerData?.map((item, key) => (
                        <tr key={key}>
                          <th>{item.player_name}</th>
                          <td>
                            <input
                              type="text"
                              name={`players.${item.player_id}.bonus`}
                              className={
                                'form-control' +
                                (formik.errors.bonus && formik.touched.bonus ? ' is-invalid' : '')
                              }
                              id="bonus"
                              placeholder="Point"
                              // defaultValue={`${formik.values}players.${item.player_id}.bonus`}
                              onChange={formik.handleChange(`players.${item.player_id}.bonus`)}
                            />

                            {`${formik.errors}players.${item.player_id}.bonus` &&
                              `${formik.touched}players.${item.player_id}.bonus` && (
                                <CFormFeedback
                                  invalid
                                >{`${formik.errors}players.${item.player_id}.bonus`}</CFormFeedback>
                              )}
                          </td>
                        </tr>
                      ))}
                    {playerData.length === 0 && (
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

export default BonusCardPlayer
