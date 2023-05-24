import React, { useEffect, useState } from 'react'
import {
  CFormLabel,
  CForm,
  CLoadingButton,
  CRow,
  CCol,
  CFormSelect,
  CListGroup,
  CListGroupItem,
  CBadge,
  CAccordion,
  CAccordionItem,
  CAccordionBody,
  CAccordionHeader,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CommonService from 'src/service/CommonService'
import ToastComponent from 'src/components/common/TaostComponent'
import 'react-input-range/lib/css/index.css'
import CIcon from '@coreui/icons-react'
import { cilCheck, cilX } from '@coreui/icons'
const ActivateGame = (props) => {
  const [loader, setLoader] = useState(false)
  const [disabledBtn, setdisabledBtn] = useState(true)
  const [gameInfo, setGameInfo] = useState({})
  const [roundInfo, setRoundInfo] = useState({})

  useEffect(() => {
    CommonService.getGameActivateInfo()
      .then((res) => {
        if (res.status === 200) {
          setGameInfo(res.game_info)
          setRoundInfo(res.round_info)
          if (
            res.game_info.club_name &&
            res.game_info.game_name &&
            res.game_info.timezone &&
            res.game_info.country &&
            res.game_info.state &&
            res.round_info
          ) {
            setdisabledBtn(false)
          }
        }
      })
      .catch((e) => {
        console.log('E=> ', e)
        ToastComponent('Something went wrong. Please try again.', 'error')
      })
  }, [])
  const activateGame = () => {
    setLoader(true)
    const data = {}
    data.gameStatus = 1
    CommonService.activateGame(data)
      .then((res) => {
        if (res.status === 200) {
          setLoader(false)
          ToastComponent(res.message, 'success')
        }
      })
      .catch((e) => {
        console.log('E=> ', e)
        ToastComponent('Something went wrong. Please try again.', 'error')
      })
  }
  console.log('game info', gameInfo)
  console.log('round info', roundInfo)
  return (
    <>
      <CRow>
        <CCol xs={12} sm={12}>
          <CAccordion activeItemKey={1}>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>
                {' '}
                <strong>Game Activation</strong>
              </CAccordionHeader>
              <CAccordionBody>
                <CListGroup>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    Create Club/League Name
                    {gameInfo.club_name ? (
                      <CBadge color="success" shape="rounded-pill" size={'sm'}>
                        <CIcon icon={cilCheck} />
                      </CBadge>
                    ) : (
                      <CBadge color="danger" shape="rounded-pill" size={'sm'}>
                        <CIcon icon={cilX} />
                      </CBadge>
                    )}
                  </CListGroupItem>

                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    Create Game Name
                    {gameInfo.game_name ? (
                      <CBadge color="success" shape="rounded-pill" size={'sm'}>
                        <CIcon icon={cilCheck} />
                      </CBadge>
                    ) : (
                      <CBadge color="danger" shape="rounded-pill" size={'sm'}>
                        <CIcon icon={cilX} />
                      </CBadge>
                    )}
                  </CListGroupItem>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    Select Timezone
                    {gameInfo.timezone ? (
                      <CBadge color="success" shape="rounded-pill" size={'sm'}>
                        <CIcon icon={cilCheck} />
                      </CBadge>
                    ) : (
                      <CBadge color="danger" shape="rounded-pill" size={'sm'}>
                        <CIcon icon={cilX} />
                      </CBadge>
                    )}
                  </CListGroupItem>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    Select Country
                    {gameInfo.country ? (
                      <CBadge color="success" shape="rounded-pill" size={'sm'}>
                        <CIcon icon={cilCheck} />
                      </CBadge>
                    ) : (
                      <CBadge color="danger" shape="rounded-pill" size={'sm'}>
                        <CIcon icon={cilX} />
                      </CBadge>
                    )}
                  </CListGroupItem>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    Select State
                    {gameInfo.state ? (
                      <CBadge color="success" shape="rounded-pill" size={'sm'}>
                        <CIcon icon={cilCheck} />
                      </CBadge>
                    ) : (
                      <CBadge color="danger" shape="rounded-pill" size={'sm'}>
                        <CIcon icon={cilX} />
                      </CBadge>
                    )}
                  </CListGroupItem>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    Create 1 Round
                    {roundInfo ? (
                      <CBadge color="success" shape="rounded-pill" size={'sm'}>
                        <CIcon icon={cilCheck} />
                      </CBadge>
                    ) : (
                      <CBadge color="danger" shape="rounded-pill" size={'sm'}>
                        <CIcon icon={cilX} />
                      </CBadge>
                    )}
                  </CListGroupItem>
                </CListGroup>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCol>

        {gameInfo.is_completed !== 1 && (
          <CCol sm={6} xs={12}>
            <CLoadingButton
              type="submit"
              color="success"
              className="mt-3 mb-3"
              variant="outline"
              loading={loader}
              disabled={disabledBtn}
              onClick={activateGame}
            >
              Activate Game
            </CLoadingButton>
          </CCol>
        )}
      </CRow>
    </>
  )
}

export default ActivateGame
