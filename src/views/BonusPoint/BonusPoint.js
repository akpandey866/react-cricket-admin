import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react-pro'
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
      <CAccordion activeItemKey={2}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Bonus for Player of the Match</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <Potm
              data={data}
              setData={setData}
              loadingPotm={loadingPotm}
              setLoadingPotm={setLoadingPotm}
            />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>
            {' '}
            <strong>Bonus for Match Winners</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <ResultBonus
              data={data}
              setData={setData}
              setLoadingResultBonus={setLoadingResultBonus}
              loadingResultBonus={loadingResultBonus}
            />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default BonusPoint
