import React, { useEffect } from 'react'
import Bootbox from 'bootbox-react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import BracketBattleService from 'src/service/BracketBattleService'
import ToastComponent from 'src/components/common/TaostComponent'
const MatchResult = () => {
  const [loader, setLoader] = useState(false)
  const [tieData, setTieData] = useState([])
  const [combinationMatch, setCombinationMatch] = useState([])
  const [winnerResult, setWinnerResult] = useState([])
  const [bracketData, setBracketData] = useState({})
  const [bracketRoundData, setBracketRoundData] = useState({})
  const param = useParams()

  useEffect(() => {
    setLoader(true)
    BracketBattleService.getMatchResultData(param.id).then((result) => {
      setBracketData(result.bracket_result)
      setTieData(result.tie_data)
      setCombinationMatch(result.combination_matches)
      setWinnerResult(result.winner_data)
      setBracketRoundData(result.bracket_round_data)
      setLoader(false)
    })
  }, [param.id])

  const validationSchema = Yup.object().shape({
    status: Yup.string().required('Please select status.'),
  })
  console.log('combination battle', combinationMatch)
  const formik = useFormik({
    initialValues: {
      status: '',
      roundId: param.id,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      setLoader(true)
      BracketBattleService.matchCompletion(data)
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
  const [showConfirm, setShowConfirm] = useState(false)
  const [winnerData, setWinnerData] = useState({})
  const handleConfirm = () => {
    setLoader(true)
    BracketBattleService.declarWinner(winnerData)
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
    return setShowConfirm(false)
  }

  const handleDeclareWinner = (userId, tableId) => {
    const data = {}
    setShowConfirm(true)
    data.user_id = userId
    data.table_id = tableId
    setWinnerData(data)
  }
  const handleCancel = () => {
    return setShowConfirm(false)
  }
  return (
    <CRow>
      <Bootbox
        show={showConfirm}
        type={'confirm'}
        message={'Are you sure you want to declare this user as the winner?'}
        onSuccess={handleConfirm}
        onCancel={handleCancel}
        onClose={handleCancel}
      />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Finalise Round {bracketData.battle} Result</strong>
          </CCardHeader>
          {bracketRoundData.status === 0 ? (
            <form className="" onSubmit={formik.handleSubmit}>
              <CCardBody>
                <CCol md={6} className="">
                  <CFormLabel htmlFor="status">Select Status for mark as complete</CFormLabel>
                  <CFormSelect
                    aria-label="Select status"
                    name="status"
                    className={
                      'form-control ' +
                      (formik.errors.status && formik.touched.status ? ' is-invalid' : '')
                    }
                    defaultValue={formik.values.status}
                    onChange={formik.handleChange}
                    id="status"
                  >
                    <option value="0">Please select status</option>
                    <option value="1">Completed</option>
                  </CFormSelect>

                  {formik.errors.status && formik.touched.status && (
                    <CFormFeedback invalid>{formik.errors.status}</CFormFeedback>
                  )}
                </CCol>
                <CCol md={6} className="mt-2">
                  <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
                    Submit
                  </CLoadingButton>
                </CCol>
              </CCardBody>
            </form>
          ) : (
            <CCol md={6} className="mt-2 mb-2">
              <h4>
                <span className="badge rounded-pill bg-success">Completed</span>
              </h4>
            </CCol>
          )}
        </CCard>
      </CCol>

      {tieData.length > 0 && (
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Round {bracketData.battle} Tied Match</strong>
            </CCardHeader>
            <CCardBody>
              <table className="main-table table innertable">
                <thead>
                  <tr>
                    <th>Battle </th>
                    <th>Username</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tieData &&
                    tieData.map((item, key) => (
                      <tr key={key}>
                        <th>{item.battle}</th>
                        <td>
                          {item?.fo_full_name} - {item?.so_full_name}
                        </td>
                        <td>
                          <CFormSelect
                            aria-label="Select status"
                            name="status"
                            className={
                              'form-control ' +
                              (formik.errors.status && formik.touched.status ? ' is-invalid' : '')
                            }
                            defaultValue={formik.values.status}
                            onChange={(e) => handleDeclareWinner(e.target.value, item.id)}
                            id="status"
                          >
                            <option value="0">Select Winner</option>
                            <option value={item?.first_opponent}>{item?.fo_full_name}</option>
                            <option value={item?.second_opponent}>{item?.so_full_name}</option>
                          </CFormSelect>

                          {formik.errors.status && formik.touched.status && (
                            <CFormFeedback invalid>{formik.errors.status}</CFormFeedback>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      )}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Round {bracketData.battle} Winners</strong>
          </CCardHeader>
          <CCardBody>
            <table className="main-table table innertable">
              <thead>
                <tr>
                  <th>Battle </th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {winnerResult &&
                  winnerResult.map((item, key) => (
                    <tr key={key}>
                      <th>{item.battle}</th>
                      <td>{item.full_name ? <span>{item.full_name}</span> : <span>Tie</span>}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MatchResult
