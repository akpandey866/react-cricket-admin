import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CFormSwitch,
} from '@coreui/react-pro'
import Table from './Table'
import AddForm from './AddForm'
import { useEffect } from 'react'
import FixtureService from 'src/service/FixtureService'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import TeamPlayerService from 'src/service/TeamPlayerService'
import { toast } from 'react-toastify'
import ToastComponent from 'src/components/common/TaostComponent'
import Notify from '../Notify'
const TeamPlayer = () => {
  const urlParams = useParams()
  const fixtureId = urlParams.fixtureId
  const [pickedPlayer, setPickedPlayer] = useState([])
  const [fixtureDetails, setFixtureDetails] = useState({})
  useEffect(() => {
    FixtureService.getFixtureDetail(fixtureId).then((res) => {
      if (res.status === 200) {
        setFixtureDetails(res.data)
      }
    })
  }, [fixtureId])
  const [dealerCheck, setDealerCheck] = useState(false)
  const [multiplePlayerDisplay, setMultiplePlayerDisplay] = useState('')
  const [individualPlayerDisplay, setIndividualPlayerDisplay] = useState('d-none')

  const [btnName, setBtnName] = useState('Add Individual Players (List View)')

  const handleDealerCheck = (e) => {
    setDealerCheck((current) => !current)
    if (dealerCheck) {
      setBtnName('Add Individual Players (List View)')
      setMultiplePlayerDisplay('')
      setIndividualPlayerDisplay('d-none')
    }
    if (!dealerCheck) {
      setBtnName('Add Multiple Players (Filter View)')
      setIndividualPlayerDisplay('')
      setMultiplePlayerDisplay('d-none')
    }
  }

  const [handleYes, setHandleYes] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [handleNo, setHandleNo] = useState(false)
  const [tableId, setTableId] = useState(false)

  const handleCancel = () => {
    console.log('You clicked No!')
    return setShowConfirm(false)
  }

  const handleConfirm = () => {
    deleteSquad(tableId)
    return setShowConfirm(false)
  }
  const areYouSureModal = (id) => {
    setShowConfirm(true)
    setTableId(id)
  }
  const deleteSquad = (fixtureId) => {
    TeamPlayerService.deleteSquad(fixtureId).then((res) => {
      if (res.status === 200) {
        setPickedPlayer([])
        toast.dismiss()
        ToastComponent(res.message, 'success')
      }
    })
  }
  return (
    <CRow>
      <CCol xs={12} md={3}>
        <span>
          <b> Team</b>: {fixtureDetails?.team_name}
        </span>
      </CCol>
      <CCol xs={12} md={3}>
        <span>
          <b> Start Date</b>: {moment(fixtureDetails.start_date).format('D.MM.YYYY')}
        </span>
      </CCol>
      <CCol xs={12} md={3}>
        <span>
          <b> End Date</b>: {moment(fixtureDetails.end_date).format('D.MM.YYYY')}
        </span>
      </CCol>
      <CCol xs={12} className="mt-3">
        <Link color="danger" className="btn btn-success btn-md ms-1" to={`/scorecard/${fixtureId}`}>
          Scorecard
        </Link>{' '}
        &nbsp;
        <CButton color={'danger'} onClick={() => areYouSureModal(fixtureId)}>
          Delete Squad
        </CButton>
      </CCol>

      <CCol xs={12}></CCol>
      <CCol xs={12} className="mb-3 mt-3">
        <CFormSwitch
          // size={'xl'}
          id="checkuncheck"
          value={1}
          name="dealer_cards_check"
          onChange={handleDealerCheck}
          label={btnName}
        />
      </CCol>

      <CAccordion activeItemKey={1} className={`${multiplePlayerDisplay}`}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Add Multiple Players</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <AddForm setPickedPlayer={setPickedPlayer} />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
      <CCol xs={12}>
        {' '}
        <Table
          pickedPlayer={pickedPlayer}
          setIndividualPlayerDisplay={setIndividualPlayerDisplay}
          individualPlayerDisplay={individualPlayerDisplay}
        />
      </CCol>
      <Notify
        setShowConfirm={setShowConfirm}
        showConfirm={showConfirm}
        setHandleNo={setHandleNo}
        handleNo={handleNo}
        handleYes={handleYes}
        setHandleYes={setHandleYes}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        text="Are you sure you want to delete this?"
      />
    </CRow>
  )
}

export default TeamPlayer
