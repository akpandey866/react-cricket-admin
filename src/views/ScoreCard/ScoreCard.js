import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CTableHeaderCell,
  CLoadingButton,
  CTableRow,
  CFormSelect,
  CFormLabel,
  CMultiSelect,
  CFormTextarea,
  CPopover,
  CButton,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
import ScorecardService from 'src/service/ScorecardService'
import Loader from 'src/components/Loader'
import { cilInfo } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import CompleteMarkModal from './CompleteMarkModal'
import MarkAsCompleteModal from './MarkAsCompleteModal'

const ScoreCard = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [completMarkModalVisible, setCompletMarkModalVisible] = useState(false)
  const [scorecardDetails, setScorecardDetails] = useState()
  const [playerList, setPlayerList] = useState([])
  const [fixtureDetails, setFixtureDetails] = useState({})
  const [loader, setLoader] = useState(false)
  const [statusValue, setStatusValue] = useState()
  const param = useParams()
  useEffect(() => {
    setLoader(true)
    ScorecardService.scorecardDetail(param.fixtureId)
      .then((res) => {
        if (res.status === 200) {
          setLoader(false)
          setScorecardDetails(res.data)
          if (res.player_list.length <= 0) {
            ToastComponent(
              'Please add a minimum of 5 players to the squad list of this fixture!',
              'error',
            )
            navigate(`/manage-scores/team-players/${param.fixtureId}`)
          }
          setPlayerList(res.player_list)
          setFixtureDetails(res.fixtureDetails)
          setStatusValue(res.fixtureDetails.status)
        }
      })
      .catch((e) => {
        ToastComponent(e.response?.data?.message, 'error')
        setLoader(false)
      })
  }, [param.fixtureId, navigate])
  const formik = useFormik({
    initialValues: {
      data: scorecardDetails,
      scorcard_link_name: fixtureDetails?.scorcard_link_name,
      scorcard_link_url: fixtureDetails?.scorcard_link_url,
      fall_of_wickets: fixtureDetails?.fall_of_wickets,
      match_report: fixtureDetails?.match_report,
      potm_match_status: fixtureDetails?.potm_match_status,
    },
    enableReinitialize: true,
    onSubmit: (data, actions) => {
      data.fixtureId = param.fixtureId
      data.potm = selectedValue
      setLoader(true)
      ScorecardService.saveScorecard(data)
        .then((res) => {
          if (res.status === 200) {
            setScorecardDetails([])
            ScorecardService.scorecardDetail(param.fixtureId).then((res) => {
              if (res.status === 200) {
                setLoader(false)
                setScorecardDetails(res.data)
              }
            })
            setLoader(true)
            ToastComponent(res.message, 'success')
          } else {
            setLoader(true)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          setLoader(true)
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })
  const [selectedValue, setSelectedValue] = useState([])
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : [])
  }
  const [completeMarkModalData, setCompleteMarkModalData] = useState([])
  const handleMatchStatus = (e) => {
    setStatusValue(e.target.value)
    const data = {}
    data.fixtureId = param.fixtureId
    data.status = e.target.value
    if (e.target.value === '3') {
      ScorecardService.getSavedScorecardData(data).then((res) => {
        if (res.status === 200) {
          setCompleteMarkModalData(res.data)
          setCompletMarkModalVisible(true)
        }
      })
    } else {
      console.log('statu is 2')
    }
  }
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Scorcards</strong>
              </CCardHeader>
              <CCardBody>
                {loader ? (
                  <Loader />
                ) : (
                  <div className="table-responsive">
                    <table className="main-table table innertable">
                      <thead>
                        <tr>
                          <th width="5%">Player</th>
                          <th width="6%">RS</th>
                          <th width="6%">4S</th>
                          <th width="6%">6S</th>
                          <th width="6%">OVRS</th>
                          <th width="6%">MDNS </th>
                          <th width="6%">RG</th>
                          <th width="6%">Wks</th>
                          <th width="6%">cs</th>
                          <th width="6%">CWks</th>
                          <th width="6%">Sts</th>
                          <th width="6%">RODs</th>
                          <th width="6%">ROAs</th>
                          <th width="7%">Dks</th>
                          <th width="7%">HT</th>
                          <th width="5%">FP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scorecardDetails &&
                          scorecardDetails.map((item, key) => (
                            <CTableRow key={key}>
                              <CTableHeaderCell>{item.player_name}</CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  name={`data[${key}]rs`}
                                  type={'number'}
                                  defaultValue={item.rs}
                                  onChange={formik.handleChange}
                                  id="rs"
                                />
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  name={`data[${key}]fours`}
                                  defaultValue={item.fours}
                                  onChange={formik.handleChange}
                                  id="fours"
                                />
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  name={`data[${key}]sixes`}
                                  defaultValue={item.sixes}
                                  onChange={formik.handleChange}
                                  id="sixes"
                                />
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  name={`data[${key}]overs`}
                                  defaultValue={item.overs}
                                  onChange={formik.handleChange}
                                  id="OVRS"
                                />
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  name={`data[${key}]mdns`}
                                  defaultValue={item.mdns}
                                  onChange={formik.handleChange}
                                  id="mdns"
                                />
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  name={`data[${key}]run`}
                                  defaultValue={item.run}
                                  onChange={formik.handleChange}
                                  id="run"
                                />
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  name={`data[${key}]wks`}
                                  defaultValue={item.wks}
                                  onChange={formik.handleChange}
                                  id="wks"
                                />
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  name={`data[${key}]cs`}
                                  defaultValue={item.cs}
                                  onChange={formik.handleChange}
                                  id="cs"
                                />
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  name={`data[${key}]cwks`}
                                  defaultValue={item.cwks}
                                  onChange={formik.handleChange}
                                  id="cwks"
                                />
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  name={`data[${key}]sts`}
                                  defaultValue={item.sts}
                                  onChange={formik.handleChange}
                                  id="sts"
                                />
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  name={`data[${key}]rods`}
                                  defaultValue={item.rods}
                                  onChange={formik.handleChange}
                                  id="rods"
                                />
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  name={`data[${key}]roas`}
                                  defaultValue={item.roas}
                                  onChange={formik.handleChange}
                                  id="roas"
                                />
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormSelect id="dks" values={item.dks} name={`data[${key}]dks`}>
                                  <option defaultValue="0">No</option>
                                  <option defaultValue="1">Yes</option>
                                </CFormSelect>
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormSelect
                                  id="hattrick"
                                  values={item.hattrick}
                                  name={`data[${key}]hattrick`}
                                >
                                  <option defaultValue="0">No</option>
                                  <option defaultValue="1">Yes</option>
                                </CFormSelect>
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  defaultValue={item.fantasy_points}
                                  id="fantasy_points"
                                  disabled={true}
                                />
                              </CTableHeaderCell>
                            </CTableRow>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CCardBody>
            </CCard>
          </CCol>

          {/* <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Mobile View</strong>
              </CCardHeader>
              <CCardBody>
                {loader ? (
                  <Loader />
                ) : (
                  <CAccordion alwaysOpen activeItemKey={2}>
                    {scorecardDetails &&
                      scorecardDetails.map((item, key) => (
                        <CAccordionItem itemKey={key} key={key}>
                          <CAccordionHeader>{item.player_name}</CAccordionHeader>
                          <CAccordionBody>
                            <CRow className="mb-2">
                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Runs
                                  </CInputGroupText>
                                  <CFormInput
                                    name={`data[${key}]rs`}
                                    type={'number'}
                                    defaultValue={item.rs}
                                    onChange={formik.handleChange}
                                    className="col-sm-10"
                                    id="rs"
                                  />
                                </CInputGroup>
                              </div>
                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Fours
                                  </CInputGroupText>
                                  <CFormInput
                                    name={`data[${key}]fours`}
                                    defaultValue={item.fours}
                                    onChange={formik.handleChange}
                                    id="fours"
                                  />
                                </CInputGroup>
                              </div>
                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Sixes
                                  </CInputGroupText>
                                  <CFormInput
                                    name={`data[${key}]sixes`}
                                    defaultValue={item.sixes}
                                    onChange={formik.handleChange}
                                    id="sixes"
                                  />
                                </CInputGroup>
                              </div>
                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Overs
                                  </CInputGroupText>
                                  <CFormInput
                                    name={`data[${key}]overs`}
                                    defaultValue={item.overs}
                                    onChange={formik.handleChange}
                                    id="OVRS"
                                  />
                                </CInputGroup>
                              </div>
                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Maidens
                                  </CInputGroupText>
                                  <CFormInput
                                    name={`data[${key}]mdns`}
                                    defaultValue={item.mdns}
                                    onChange={formik.handleChange}
                                    id="mdns"
                                  />
                                </CInputGroup>
                              </div>
                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Runs Given
                                  </CInputGroupText>
                                  <CFormInput
                                    name={`data[${key}]run`}
                                    defaultValue={item.run}
                                    onChange={formik.handleChange}
                                    id="run"
                                  />
                                </CInputGroup>
                              </div>
                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Wickets
                                  </CInputGroupText>
                                  <CFormInput
                                    name={`data[${key}]wks`}
                                    defaultValue={item.wks}
                                    onChange={formik.handleChange}
                                    id="wks"
                                  />
                                </CInputGroup>
                              </div>
                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Catches
                                  </CInputGroupText>
                                  <CFormInput
                                    name={`data[${key}]cs`}
                                    defaultValue={item.cs}
                                    onChange={formik.handleChange}
                                    id="cs"
                                  />
                                </CInputGroup>
                              </div>
                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Catches-WK
                                  </CInputGroupText>
                                  <CFormInput
                                    name={`data[${key}]cwks`}
                                    defaultValue={item.cwks}
                                    onChange={formik.handleChange}
                                    id="cwks"
                                  />
                                </CInputGroup>
                              </div>
                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Stumpings
                                  </CInputGroupText>
                                  <CFormInput
                                    name={`data[${key}]sts`}
                                    defaultValue={item.sts}
                                    onChange={formik.handleChange}
                                    id="sts"
                                  />
                                </CInputGroup>
                              </div>

                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Run-Out Direct
                                  </CInputGroupText>
                                  <CFormInput
                                    name={`data[${key}]rods`}
                                    defaultValue={item.rods}
                                    onChange={formik.handleChange}
                                    id="rods"
                                  />
                                </CInputGroup>
                              </div>
                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Run-Out Assist
                                  </CInputGroupText>
                                  <CFormInput
                                    name={`data[${key}]roas`}
                                    defaultValue={item.roas}
                                    onChange={formik.handleChange}
                                    id="roas"
                                  />
                                </CInputGroup>
                              </div>
                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Duck
                                  </CInputGroupText>
                                  <CFormSelect id="dks" values={item.dks} name={`data[${key}]dks`}>
                                    <option defaultValue="0">No</option>
                                    <option defaultValue="1">Yes</option>
                                  </CFormSelect>
                                </CInputGroup>
                              </div>
                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Hat-Trick
                                  </CInputGroupText>
                                  <CFormSelect
                                    id="hattrick"
                                    values={item.hattrick}
                                    name={`data[${key}]hattrick`}
                                  >
                                    <option defaultValue="0">No</option>
                                    <option defaultValue="1">Yes</option>
                                  </CFormSelect>
                                </CInputGroup>
                              </div>
                              <div className="col-md-2 col-sm">
                                <CInputGroup className="mb-2">
                                  <CInputGroupText
                                    id="inputGroup-sizing-default"
                                    style={{ width: '135px' }}
                                  >
                                    Fantasy Points
                                  </CInputGroupText>
                                  <CFormInput
                                    defaultValue={item.fantasy_points}
                                    id="fantasy_points"
                                    disabled={true}
                                  />
                                </CInputGroup>
                              </div>
                            </CRow>
                          </CAccordionBody>
                        </CAccordionItem>
                      ))}
                  </CAccordion>
                )}
              </CCardBody>
            </CCard>
          </CCol> */}

          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Scorecard Details</strong>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol md={6}>
                    <CFormLabel htmlFor="phone">Scorecard Source</CFormLabel>
                    <input
                      type="text"
                      name="scorcard_link_name"
                      className={'form-control'}
                      id="scorcard_link_name"
                      placeholder="Scorecard Source"
                      defaultValue={formik.values.scorcard_link_name}
                      onChange={formik.handleChange}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="phone">Scorecard Link</CFormLabel>
                    <input
                      type="text"
                      name="scorcard_link_url"
                      className={'form-control'}
                      id="scorcard_link_url"
                      placeholder="Scorecard Link"
                      defaultValue={formik.values.scorcard_link_url}
                      onChange={formik.handleChange}
                    />
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="Entry Fee Info" className="mt-3">
                      Fall of Wickets
                    </CFormLabel>
                    <CFormTextarea
                      aria-label="With textarea"
                      defaultValue={formik.values.fall_of_wickets}
                      name={'fall_of_wickets'}
                      onChange={formik.handleChange}
                    ></CFormTextarea>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="Add Match Report" className="mt-3">
                      Add Match Report
                    </CFormLabel>
                    <CFormTextarea
                      aria-label="With textarea"
                      defaultValue={formik.values.match_report}
                      name={'match_report'}
                      onChange={formik.handleChange}
                    ></CFormTextarea>
                  </CCol>
                  <CCol md={6} className="mb-4">
                    <CFormLabel htmlFor="formFile" className="mt-3">
                      Upload Match Scorecard
                    </CFormLabel>
                    <CFormInput type="file" id="upload_video" />
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CompleteMarkModal visible={visible} setVisible={setVisible} />

            <MarkAsCompleteModal
              completMarkModalVisible={completMarkModalVisible}
              setCompletMarkModalVisible={setCompletMarkModalVisible}
              data={completeMarkModalData}
            />
          </CCol>
          <CCol xs={12}>
            <CCard className="mb-6">
              <CCardHeader>
                <strong>Bonus Points</strong>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol md={6}>
                    <CFormLabel htmlFor="player_of_the_match">Player Of The Match</CFormLabel>

                    <CMultiSelect
                      id="player_of_the_match"
                      options={playerList}
                      selectionType="tags"
                      name="player"
                      onChange={handleChange}
                      value={playerList.filter((obj) => selectedValue.includes(obj.value))}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="Match Result">Match Result</CFormLabel>
                    <CFormSelect
                      id="potm_match_status"
                      value={formik.values.potm_match_status}
                      onChange={formik.handleChange}
                    >
                      <option>Select Match Result</option>
                      <option value="1">Won</option>
                      <option value="2">Other</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CompleteMarkModal visible={visible} setVisible={setVisible} />

            <MarkAsCompleteModal
              completMarkModalVisible={completMarkModalVisible}
              setCompletMarkModalVisible={setCompletMarkModalVisible}
              data={completeMarkModalData}
            />
          </CCol>
          <CCol xs={12}>
            <CCard className="mb-4 mt-3">
              <CCardHeader>
                <strong>Match Status</strong>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol md={6}>
                    {' '}
                    <CFormLabel htmlFor="Add Match Report" className="mr-1 mt-3">
                      Match Status
                    </CFormLabel>
                    <CButton color="danger" size="sm" onClick={() => setVisible(!visible)}>
                      <CIcon icon={cilInfo} className="" fontSize={12} />
                    </CButton>
                    <CFormSelect
                      aria-label="Select Structure"
                      name="match_status"
                      className={
                        'mt-3 form-control' +
                        (formik.errors.match_status && formik.touched.match_status
                          ? ' is-invalid'
                          : '')
                      }
                      value={statusValue}
                      id="match_status"
                      onChange={handleMatchStatus}
                    >
                      <option value={0}>Select Match Status </option>
                      <option value={2}>In-Progress</option>
                      <option value={3}>Completed</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={6}></CCol>
                  <CCol md={6}>
                    <CLoadingButton
                      type="submit"
                      color="success"
                      variant="outline"
                      loading={loader}
                      className="mt-3"
                    >
                      Submit
                    </CLoadingButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CompleteMarkModal visible={visible} setVisible={setVisible} />

            <MarkAsCompleteModal
              completMarkModalVisible={completMarkModalVisible}
              setCompletMarkModalVisible={setCompletMarkModalVisible}
              data={completeMarkModalData}
            />
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default ScoreCard
