import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormFeedback,
  CFormSelect,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BracketBattleService from 'src/service/BracketBattleService'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastComponent from 'src/components/common/TaostComponent'

const BattleListing = () => {
  const [loader, setLoader] = useState(false)
  const param = useParams()
  const [bracketListing, setBracketListing] = useState([])
  const [userList, setUserList] = useState([])

  useEffect(() => {
    setLoader(true)
    BracketBattleService.battleListing(param.id).then((result) => {
      setBracketListing(result.getBattles)
      setUserList(result.user_list)
      setLoader(false)
    })
  }, [param.id])
  // const validationSchema = Yup.object({
  //   data: Yup.array().of(
  //     Yup.object().shape({
  //       first_opponent: Yup.number().required('Please selct first opponent'),
  //       second_opponent: Yup.number().required('Please selct second opponent'),
  //     }),
  //   ),
  // })

  // })
  // const validationSchema = object().shape({
  //   data: array()
  //     .of(
  //       object().shape({
  //         first_opponent: string().ensure().required('Please selct first opponent'),
  //         second_opponent: string().ensure().required('Please selct second opponent'),
  //       }),
  //     )
  //     .required('Please select opponent.'),
  // })

  const validationSchema = Yup.object({
    data: Yup.array().of(
      Yup.object({
        first_opponent: Yup.string().required('Required'),
        second_opponent: Yup.string().required('Required'),
      }),
    ),
  })

  const formik = useFormik({
    initialValues: {
      data: bracketListing,
      roundId: param.id,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      setLoader(true)
      BracketBattleService.updateRoundBattle(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
          }
        })
        .catch((e) => {
          console.log('e=>', e)
          ToastComponent('Something Went wrong.Please try again', 'error')
          setLoader(false)
        })
    },
  })

  const [selectOptions, setSelectOptions] = useState({
    first_opponent: '',
    second_opponent: '',
  })
  const handleChange = (e) => {
    const id = e.target.value
    console.log('id', id)
    setUserList((current) => current.filter((fruit) => fruit.user_id !== id))
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Round 1 Bracket Battles</strong>
          </CCardHeader>
          <form className="" onSubmit={formik.handleSubmit}>
            <CCardBody>
              <table className="main-table table innertable">
                <thead>
                  <tr>
                    <th>Matches</th>
                    <th>First Opponent</th>
                    <th>Second Opponent</th>
                  </tr>
                </thead>
                <tbody>
                  {bracketListing &&
                    bracketListing?.map((item, key) => (
                      <tr key={key}>
                        <th>{item.battle}</th>
                        <td>
                          <CFormSelect
                            id="first_opponent"
                            defaultValue={item.first_opponent}
                            name={`data[${key}]first_opponent`}
                            // onChange={formik.handleChange}
                            onChange={(event) => {
                              formik.setTouched({
                                ...formik.touched,
                                first_opponent: true,
                              })
                              formik.setFieldValue(
                                `data[${key}].first_opponent`,
                                event.target.value,
                              )
                              handleChange(event)
                            }}
                          >
                            <option value={0}>Please select opponent</option>
                            {userList.map((index, key) => (
                              <option value={index.user_id} key={key}>
                                {index.username}
                              </option>
                            ))}
                          </CFormSelect>

                          {/* {formik.errors?.data[key]?.first_opponent &&
                            formik.touched?.data[key]?.first_opponent && (
                              <CFormFeedback invalid>
                                {formik.errors?.data[key]?.first_opponent}
                              </CFormFeedback>
                            )} */}
                        </td>
                        <td>
                          <CFormSelect
                            id="second_opponent"
                            defaultValue={item.second_opponent}
                            name={`data[${key}]second_opponent`}
                            onChange={formik.handleChange}
                          >
                            <option value={0}>Please select opponent</option>
                            {userList.map((index, key) => (
                              <option value={index.user_id} key={key}>
                                {index.username}
                              </option>
                            ))}
                          </CFormSelect>
                          {/* {formik.errors?.data[key]?.second_opponent &&
                            formik.touched?.data[key]?.second_opponent && (
                              <CFormFeedback invalid>
                                {formik.errors?.data[key]?.second_opponent}
                              </CFormFeedback>
                            )} */}
                        </td>
                      </tr>
                    ))}
                  {bracketListing.length === 0 && (
                    <tr>
                      <td colSpan={2}>No record yet available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
                Submit
              </CLoadingButton>
            </CCardBody>
          </form>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BattleListing
