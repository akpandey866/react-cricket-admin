import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSwitch,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import ToastComponent from 'src/components/common/TaostComponent'
import Loader from 'src/components/Loader'
import CommonService from 'src/service/CommonService'
import TwelthMen from './TwelthMen'
import TripleCap from './TripleCap'
import Dealer from './Dealer'
import Flipper from './Flipper'

const PowerControl = () => {
  const [data, setData] = useState()
  const [twelthMenLoader, setTwelthMenLoader] = useState(false)
  const [tripleCapLoader, setTripleCapLoader] = useState(false)
  const [dealerLoader, setDealerLoader] = useState(false)
  const [flipperLoader, setFlipperLoader] = useState(false)
  const [twelthMenCheck, setTwelthMenCheck] = useState(false)
  const [flipperCheck, setFlipperCheck] = useState(false)
  const [dealerCheck, setDealerCheck] = useState(false)
  const [tripleCheck, setTripleCheck] = useState(false)
  useEffect(() => {
    CommonService.powerControl()
      .then((res) => {
        if (res.status === 200) {
          setData(res.data)
          setTwelthMenCheck(res.data.twelfth_men_cards_status)
          setTripleCheck(res.data.captain_cards_status)
          setDealerCheck(res.data.dealer_cards_status)
          setFlipperCheck(res.data.flipper_cards_status)
        }
      })
      .catch((e) => {
        ToastComponent(e.response?.data?.message, 'error')
      })
  }, [])

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Triple Captain</strong>
          </CCardHeader>
          <CCardBody>
            <TripleCap
              data={data}
              setTripleCapLoader={setTripleCapLoader}
              setData={setData}
              tripleCapLoader={tripleCapLoader}
              setTripleCheck={setTripleCheck}
              tripleCheck={tripleCheck}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>12th Man</strong>
          </CCardHeader>
          <CCardBody>
            <TwelthMen
              data={data}
              setTwelthMenLoader={setTwelthMenLoader}
              setData={setData}
              twelthMenLoader={twelthMenLoader}
              twelthMenCheck={twelthMenCheck}
              setTwelthMenCheck={setTwelthMenCheck}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Dealer</strong>
          </CCardHeader>
          <CCardBody>
            <Dealer
              data={data}
              setDealerLoader={setDealerLoader}
              setData={setData}
              dealerLoader={dealerLoader}
              setDealerCheck={setDealerCheck}
              dealerCheck={dealerCheck}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Flipper</strong>
          </CCardHeader>
          <CCardBody>
            <Flipper
              data={data}
              setFlipperLoader={setFlipperLoader}
              flipperLoader={flipperLoader}
              setData={setData}
              setFlipperCheck={setFlipperCheck}
              flipperCheck={flipperCheck}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PowerControl
