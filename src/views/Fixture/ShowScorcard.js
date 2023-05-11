import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CTableHeaderCell,
  CTableRow,
  CFormLabel,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
import ScorecardService from 'src/service/ScorecardService'
import Loader from 'src/components/Loader'

const ShowScorecard = () => {
  const [scorecardDetails, setScorecardDetails] = useState()
  const [fixtureDetails, setFixtureDetails] = useState({})
  const [loader, setLoader] = useState(false)
  const param = useParams()
  useEffect(() => {
    setLoader(true)
    ScorecardService.showScorecard(param.fixtureId)
      .then((res) => {
        if (res.status === 200) {
          setLoader(false)
          setScorecardDetails(res.data)
          setFixtureDetails(res.fixture_data)
        }
      })
      .catch((e) => {
        ToastComponent('Something went wrong. Please try again.', 'error')
        setLoader(false)
      })
  }, [param.fixtureId])
  return (
    <>
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
                        <th width="6%">CS</th>
                        <th width="6%">CWks</th>
                        <th width="6%">STS</th>
                        <th width="6%">RODS</th>
                        <th width="6%">ROAS</th>
                        <th width="7%">DKS</th>
                        <th width="7%">HT</th>
                        <th width="5%">FP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scorecardDetails &&
                        scorecardDetails.map((item, key) => (
                          <CTableRow key={key}>
                            <CTableHeaderCell>{item.player_name}</CTableHeaderCell>
                            <CTableHeaderCell>{item.rs}</CTableHeaderCell>
                            <CTableHeaderCell>{item.fours}</CTableHeaderCell>
                            <CTableHeaderCell>{item.sixes}</CTableHeaderCell>
                            <CTableHeaderCell>{item.overs}</CTableHeaderCell>
                            <CTableHeaderCell>{item.mdns}</CTableHeaderCell>
                            <CTableHeaderCell>{item.run}</CTableHeaderCell>
                            <CTableHeaderCell>{item.wks}</CTableHeaderCell>
                            <CTableHeaderCell>{item.cs}</CTableHeaderCell>
                            <CTableHeaderCell>{item.cwks}</CTableHeaderCell>
                            <CTableHeaderCell>{item.sts}</CTableHeaderCell>
                            <CTableHeaderCell>{item.rods}</CTableHeaderCell>
                            <CTableHeaderCell>{item.roas}</CTableHeaderCell>
                            <CTableHeaderCell>
                              {item.dks === 0 ? <span>No</span> : <span>Yes</span>}
                            </CTableHeaderCell>
                            <CTableHeaderCell>
                              {item.hattrick === 0 ? <span>No</span> : <span>Yes</span>}
                            </CTableHeaderCell>
                            <CTableHeaderCell>{item.fantasy_points}</CTableHeaderCell>
                          </CTableRow>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Scorecard Details</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                {/* <CCol md={4} className="mb-4">
                  <CFormLabel htmlFor="formFile">Upload Match Scorecard</CFormLabel>
                  <CFormInput type="file" id="upload_video" />
                </CCol> */}
                {fixtureDetails.scorcard_link_name !== 0 && (
                  <CCol md={4}>
                    <CFormLabel htmlFor="phone">Scorecard Source: &nbsp;</CFormLabel>
                    {fixtureDetails.scorcard_link_name}
                  </CCol>
                )}
                {fixtureDetails.scorcard_link_url !== 0 && (
                  <CCol md={4}>
                    <CFormLabel htmlFor="phone">Scorecard Link: &nbsp;</CFormLabel>
                    {fixtureDetails.scorcard_link_url}
                  </CCol>
                )}
                {fixtureDetails.potm_match_status !== 0 && (
                  <CCol md={4}>
                    <CFormLabel htmlFor="Match Result">Match Result: &nbsp;</CFormLabel>
                    {fixtureDetails.potm_match_status === 1 ? <span>Won</span> : <span>Other</span>}
                  </CCol>
                )}
                {fixtureDetails.fall_of_wicket && (
                  <CCol md={4}>
                    <CFormLabel htmlFor="Entry Fee Info">Fall of Wickets: &nbsp;</CFormLabel>
                    {fixtureDetails.fall_of_wickets}
                  </CCol>
                )}
                {fixtureDetails.match_report && (
                  <CCol md={4}>
                    <CFormLabel htmlFor="Add Match Report">Match Report: &nbsp;</CFormLabel>
                    {fixtureDetails.match_report}
                  </CCol>
                )}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ShowScorecard
