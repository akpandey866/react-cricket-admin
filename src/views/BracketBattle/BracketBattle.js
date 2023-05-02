import React from 'react'
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
  CFormTextarea,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import { useEffect } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import BracketBattleService from 'src/service/BracketBattleService'
import ToastComponent from 'src/components/common/TaostComponent'
import { Link } from 'react-router-dom'
const BracketBattle = () => {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [bracketDetails, setBracketDetails] = useState([])
  const [structureValue, setStructureValue] = useState()
  useEffect(() => {
    setLoading(true)
    BracketBattleService.listing().then((result) => {
      setUsers(result.data)
      setBracketDetails(result.bracket_details)
      setStructureValue(result.bracket_details.structure)
      setLoading(false)
    })
  }, [])
  const [loader, setLoader] = useState(false)

  const validationSchema = Yup.object().shape({
    structure: Yup.string().required('Please select Structure.'),
    bracket_name: Yup.string().required('Please enter bracket name.'),
    about: Yup.string().required('Please write about bracket battle.'),
  })
  const formik = useFormik({
    initialValues: {
      structure: bracketDetails?.structure,
      bracket_name: bracketDetails?.bracket_name,
      about: bracketDetails?.about,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      data.structure = structureValue
      setLoader(true)
      BracketBattleService.saveOrUpdateBracketBattle(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
          } else {
            setLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          console.log('Here is Error', e)
          ToastComponent('Something Went wront. Please try again.', 'error')
        })
    },
  })
  const handleChange = (e) => {
    setStructureValue(e.target.value)
  }
  let structures = [
    {
      id: 8,
      value: 8,
    },
    {
      id: 16,
      value: 16,
    },
    {
      id: 32,
      value: 32,
    },
    {
      id: 64,
      value: 64,
    },
    {
      id: 128,
      value: 128,
    },
  ]
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
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
                <strong>Add</strong> <small> Bracket Setting</small>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={formik.handleSubmit}>
              <CCol md={6}>
                <CFormLabel htmlFor="structure">Select Your Bracket Battle Stucture</CFormLabel>
                <CFormSelect
                  aria-label="Select Structure"
                  name="structure"
                  className={
                    'form-control' +
                    (formik.errors.structure && formik.touched.structure ? ' is-invalid' : '')
                  }
                  value={structureValue}
                  onChange={handleChange}
                  id="structure"
                >
                  <option value="0">Select Your Bracket Battle Structure</option>
                  {structures.map((index, key) => (
                    <option value={index.value} key={key}>
                      {index.value}
                    </option>
                  ))}
                </CFormSelect>

                {formik.errors.structure && formik.touched.structure && (
                  <CFormFeedback invalid>{formik.errors.structure}</CFormFeedback>
                )}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="structure">Bracket Name</CFormLabel>
                <CFormInput
                  className={
                    'form-control' +
                    (formik.errors.bracket_name && formik.touched.bracket_name ? ' is-invalid' : '')
                  }
                  defaultValue={formik.values.bracket_name}
                  onChange={formik.handleChange}
                  aria-label="bracket_name"
                  id="bracket_name"
                />
                {formik.errors.bracket_name && formik.touched.bracket_name && (
                  <CFormFeedback invalid>{formik.errors.bracket_name}</CFormFeedback>
                )}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="structure">About Your Bracket Battle</CFormLabel>
                <CFormTextarea
                  aria-label="about"
                  className={
                    'form-control' +
                    (formik.errors.about && formik.touched.about ? ' is-invalid' : '')
                  }
                  defaultValue={formik.values.about}
                  onChange={formik.handleChange}
                  id="about"
                ></CFormTextarea>
                {formik.errors.about && formik.touched.about && (
                  <CFormFeedback invalid>{formik.errors.about}</CFormFeedback>
                )}
              </CCol>
              <CCol md={6}></CCol>
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
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Bracket Rounds</strong>
          </CCardHeader>
          <CCardBody>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BracketBattle
