import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import ToastComponent from 'src/components/common/TaostComponent'
import CommonService from 'src/service/CommonService'
import Potm from './Potm'
import ResultBonus from './ResultBonus'

const BonusPoint = () => {
  const [loadingResultBonus, setLoadingResultBonus] = useState(false)
  const [loadingPotm, setLoadingPotm] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    CommonService.getBonusPoint()
      .then((res) => {
        if (res.status === 200) {
          setData(res.data)
        }
      })
      .catch((e) => {
        console.log('Error =>', e)
        ToastComponent('Something went wrong. Please try again.', 'error')
      })
  }, [])

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Player of The Match</strong>
          </CCardHeader>
          <CCardBody>
            <Potm
              data={data}
              setData={setData}
              loadingPotm={loadingPotm}
              setLoadingPotm={setLoadingPotm}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Result Bonus</strong>
          </CCardHeader>
          <CCardBody>
            <ResultBonus
              data={data}
              setData={setData}
              setLoadingResultBonus={setLoadingResultBonus}
              loadingResultBonus={loadingResultBonus}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BonusPoint
