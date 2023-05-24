import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CLoadingButton,
  CMultiSelect,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BracketBattleService from 'src/service/BracketBattleService'
import ToastComponent from 'src/components/common/TaostComponent'

const BracketRound = () => {
  const [users, setUsers] = useState([])
  const [roundListing, setRoundListing] = useState([])
  const [gwData, setGwData] = useState([])
  const [loading, setLoading] = useState(false)
  const [bracketDetails, setbracketDetails] = useState({})
  const validationSchema = Yup.object().shape({
    round: Yup.string().required('Please select Round.'),
    gw_round: Yup.array().required('GW Round is required'),
  })
  const [loader, setLoader] = useState(false)
  const formik = useFormik({
    initialValues: {
      round: '',
      gw_round: '',
      structure: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      data.gameweeks = selectedValue
      data.structure = bracketDetails.structure
      setLoader(true)
      BracketBattleService.saveBracketRound(data)
        .then((res) => {
          if (res.status === 200) {
            setUsers(res.data)
            ToastComponent(res.message, 'success')
            setLoader(false)
          }
        })
        .catch((e) => {
          console.log('Here is Error', e)
          ToastComponent('Something Went wront. Please try again.', 'error')
        })
    },
  })
  useEffect(() => {
    setLoading(true)
    BracketBattleService.listing().then((result) => {
      setUsers(result.data)
      setRoundListing(result.round_list)
      setGwData(result.gw_data)
      setbracketDetails(result.bracket_details)
      setLoading(false)
    })
  }, [])
  const getBadge = (status) => {
    switch (status) {
      case 1:
        return 'success'
      case 2:
        return 'warning'
      default:
        return 'danger'
    }
  }
  const [roundValue, setRoundValue] = useState()
  const [selectedValue, setSelectedValue] = useState([])
  const handleMultoOptionChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : [])
    console.log('selected value', selectedValue)
  }
  const handleChange = (e) => {
    setRoundValue(e.target.value)
  }
  return (
    <>
      <CAccordion activeItemKey={2}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Create Bracket Round</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <CForm className="row g-3" onSubmit={formik.handleSubmit}>
              <CCol md={6}>
                <CFormLabel htmlFor="round">Select Round</CFormLabel>

                <CFormSelect
                  aria-label="select round"
                  name="round"
                  className={
                    'form-control' +
                    (formik.errors.round && formik.touched.round ? ' is-invalid' : '')
                  }
                  defaultValue={formik.values.round}
                  onChange={formik.handleChange}
                  id="round"
                >
                  <option value={0}>Select Round</option>
                  {roundListing &&
                    roundListing.map((item, key) => (
                      <option value={item?.id} key={key}>
                        {item?.name}
                      </option>
                    ))}
                </CFormSelect>
                {formik.errors.round && formik.touched.round && (
                  <CFormFeedback invalid>{formik.errors.round}</CFormFeedback>
                )}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="grade">Select Gameweeks For The Round*</CFormLabel>
                <CMultiSelect
                  options={gwData}
                  selectionType="tags"
                  name="gw_round"
                  className={formik.errors.gw_round && formik.touched.gw_round ? 'is-invalid' : ''}
                  onChange={(e) => {
                    handleMultoOptionChange(e)
                    formik.setTouched({
                      ...formik.touched,
                      gw_round: true,
                    })
                    formik.setFieldValue('gw_round', selectedValue)
                  }}
                  value={gwData.filter((obj) => selectedValue.includes(obj.value))}
                  popper={false}
                />
                {formik.errors.gw_round && formik.touched.gw_round && (
                  <CFormFeedback invalid>{formik.errors.gw_round}</CFormFeedback>
                )}
              </CCol>
              <CCol md={6}>
                <CLoadingButton
                  type="submit"
                  color="success"
                  variant="outline"
                  loading={loader}
                  id="submit"
                >
                  Submit
                </CLoadingButton>
              </CCol>
            </CForm>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>
            {' '}
            <strong>Manage Bracket Rounds</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <table className="main-table table innertable">
              <thead>
                <tr>
                  <th>Rounds </th>
                  <th>Fantasy Rounds</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((item, key) => (
                    <tr key={key}>
                      <th>{item.round}</th>
                      <td>{item?.gameweeks}</td>
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status === 1
                            ? 'In-Process'
                            : item.status === 2
                            ? 'Completed'
                            : 'Not started Yet'}
                        </CBadge>
                      </td>
                      <td>
                        <Link
                          size="sm"
                          className="btn btn-success btn-sm ms-1"
                          to={`/bracket-battle/battle-listing/${item.id}`}
                        >
                          Create Round Battles
                        </Link>
                        <Link
                          size="sm"
                          className="btn btn-info btn-sm ms-1"
                          to={`/bracket-battle/match-result/${item.id}`}
                        >
                          Results
                        </Link>
                        {/* <CButton
                      className="mx-2"
                      color="success"
                      onClick={() => openFromParentForPlayer(item.team_power_id, item.round)}
                    >
                      Points
                    </CButton> */}
                      </td>
                    </tr>
                  ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4}>No record yet available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </>
  )
}

export default BracketRound
