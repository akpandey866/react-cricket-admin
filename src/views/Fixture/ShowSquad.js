import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormLabel,
  CRow,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from 'src/components/Loader'
import ToastComponent from 'src/components/common/TaostComponent'
import ScorecardService from 'src/service/ScorecardService'

const ShowSquaD = () => {
  const [PlayerData, setPlayerData] = useState()
  const [fixtureDetails, setFixtureDetails] = useState({})
  const [loader, setLoader] = useState(false)
  const param = useParams()
  useEffect(() => {
    setLoader(true)
    ScorecardService.showSquad(param.fixtureId)
      .then((res) => {
        if (res.status === 200) {
          setLoader(false)
          setPlayerData(res.data)
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
        <CCol xs={6} md={3} className="mb-3">
          {'Team: '} {fixtureDetails?.team_name}
        </CCol>
        <CCol xs={6} md={3} className="mb-3">
          {'Grade: '}
          {fixtureDetails?.grade}
        </CCol>
        <CCol xs={6} md={3} className="mb-3">
          {'Start Date: '}
          {moment(fixtureDetails?.start_date).format('D.MM.YYYY')}
        </CCol>
        <CCol xs={6} md={3} className="mb-3">
          {'End Date: '}
          {moment(fixtureDetails?.end_date).format('D.MM.YYYY')}
        </CCol>

        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Squads</strong>
            </CCardHeader>
            <CCardBody>
              {loader ? (
                <Loader />
              ) : (
                <div className="table-responsive">
                  <table className="main-table table innertable">
                    <thead>
                      <tr>
                        <th>SN</th>
                        <th>Player Name</th>
                        <th>Created On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PlayerData &&
                        PlayerData.map((item, key) => (
                          <CTableRow key={key}>
                            <CTableHeaderCell>{++key}</CTableHeaderCell>
                            <CTableHeaderCell>{item.player_name}</CTableHeaderCell>
                            <CTableHeaderCell>
                              {moment(item.created_at).format('D.MM.YYYY')}
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
      </CRow>
    </>
  )
}

export default ShowSquaD
