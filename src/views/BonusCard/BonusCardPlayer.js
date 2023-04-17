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

  const validationSchema = Yup.object({
    players: Yup.array().of(
      Yup.object().shape({
        bonus: Yup.string().required('bonus required'),
      }),
    ),
  })

  const formik = useFormik({
    initialValues: {
      'players.bonus': '',
      'players.player_id': '',
    },

    validationSchema,
    onSubmit: (data, actions) => {
      console.log('submit data is here', data)
      return false
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
  console.log('object', playerData)
  return (
    <>
      <CModal scrollable visible={props.IsModalOpened} size="lg">
        <form className="" onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Player Bonus Point</strong>
              </CCardHeader>
              <CCardBody className="row g-3">
                <table className="main-table table innertable">
                  <thead>
                    <tr>
                      <th>Player Name</th>
                      <th>Bonus Point</th>
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
                              id={`players.${key}.bonus`}
                              placeholder="Bonus"
                              defaultValue={formik.values.bonuns}
                              onChange={formik.handleChange(`players.${key}.bonus`)}
                            />

                            <input
                              type="hidden"
                              name={`players.${item.player_id}.player_id`}
                              id={`players.${key}.player_id`}
                              defaultValue={item.player_id}
                            />

                            {formik.errors + '.players' + key + '.bonus' &&
                              formik.touched + '.players.' + key + '.bonus' && (
                                <CFormFeedback invalid> hiiiii</CFormFeedback>
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
