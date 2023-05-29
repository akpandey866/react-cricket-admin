import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TimezoneSelect from 'react-timezone-select'
import ToastComponent from 'src/components/common/TaostComponent'
import ClubService from 'src/service/ClubService'
import { useNavigate } from 'react-router-dom'

const ClubRegister = () => {
  const [country, setCountry] = useState()
  const [state, setState] = useState()
  const [countryList, setCountryList] = useState([])
  const [stateList, setStateList] = useState([])

  useEffect(() => {
    ClubService.getClubDetails().then((res) => {
      if (res.status === 200) {
        setCountryList(res.country_list)
        setStateList(res.state_list)
        setLoading(false)
      } else {
        setLoading(false)
      }
    })
  }, [])
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  )
  const [loading, setLoading] = useState(false)

  const [structure, setStructure] = useState()
  const validationSchema = Yup.object().shape({
    club_name: Yup.string().required('Club name is required'),
    game_name: Yup.string().required('Game Name is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    structure: Yup.string().required('Game Structure is required'),
  })
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      club_name: '',
      game_name: '',
      country: country,
      structure: structure,
      state: state,
      city: '',
      post_code: '',
      timezone: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      actions.resetForm({
        values: {
          club_name: '',
          game_name: '',
          country: '',
          state: '',
          structure: '',
        },
      })
      data.timezone = selectedTimezone.value
      data.country = country
      data.state = state
      setLoading(true)
      ClubService.createNewClub(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            navigate('/account')
            setLoading(false)
          } else {
            setLoading(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          ToastComponent('Something went wrong.', 'error')
          setLoading(false)
        })
    },
  })
  const handleCountryChange = (e) => {
    setCountry(e.target.value)
    // ClubService.getStateByCountryId(e.target.value).then((result) => {
    //   setStateList(result.data)
    // })
  }
  const handleStateChange = (e) => {
    setState(e.target.value)
  }
  const handleGameStructure = (e) => {
    setStructure(e.target.value)
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4 ">
              <CCardBody className="p-4">
                <CForm className="row g-3" onSubmit={formik.handleSubmit}>
                  <h1>Start New Club Game</h1>
                  <p className="text-medium-emphasis">Create your game</p>
                  <CCol md={12}>
                    <CFormLabel htmlFor="club_name">Club Name *</CFormLabel>
                    <CFormInput
                      placeholder="Club Name"
                      className={
                        'form-control' +
                        (formik.errors.club_name && formik.touched.club_name ? ' is-invalid' : '')
                      }
                      defaultValue={formik.values.club_name}
                      onChange={formik.handleChange}
                      aria-label="club_name"
                      id="club_name"
                    />

                    {formik.errors.club_name && formik.touched.club_name && (
                      <CFormFeedback invalid>{formik.errors.club_name}</CFormFeedback>
                    )}
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel htmlFor="game_name">Fantasy Game Name *</CFormLabel>
                    <CFormInput
                      id="game_name"
                      className={
                        'form-control' +
                        (formik.errors.game_name && formik.touched.game_name ? ' is-invalid' : '')
                      }
                      defaultValue={formik.values.game_name}
                      name="game_name"
                      placeholder="Fantasy Game Name"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.game_name && formik.touched.game_name && (
                      <CFormFeedback invalid>{formik.errors.game_name}</CFormFeedback>
                    )}
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel htmlFor="Timezone">Timezone *</CFormLabel>
                    <TimezoneSelect
                      value={selectedTimezone}
                      onChange={setSelectedTimezone}
                      name="timezone"
                    />
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel htmlFor="Country">Country *</CFormLabel>
                    <CFormSelect
                      aria-label="select country"
                      name="country"
                      className={
                        'form-control' +
                        (formik.errors.country && formik.touched.country ? ' is-invalid' : '')
                      }
                      value={country}
                      onChange={handleCountryChange}
                      id="country"
                    >
                      <option value={0}>Select Country</option>
                      {countryList &&
                        countryList.map((item, key) => (
                          <option value={item?.id} key={key}>
                            {item?.name}
                          </option>
                        ))}
                    </CFormSelect>
                    {formik.errors.country && formik.touched.country && (
                      <CFormFeedback invalid>{formik.errors.country}</CFormFeedback>
                    )}
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel htmlFor="state">State *</CFormLabel>
                    <CFormSelect
                      aria-label="select state"
                      name="state"
                      className={
                        'form-control' +
                        (formik.errors.state && formik.touched.state ? ' is-invalid' : '')
                      }
                      defaultValue={state}
                      onChange={handleStateChange}
                      id="state"
                    >
                      <option value={0}>Select State</option>
                      {stateList &&
                        stateList.map((item, key) => (
                          <option value={item?.id} key={key}>
                            {item?.name}
                          </option>
                        ))}
                    </CFormSelect>
                    {formik.errors.state && formik.touched.state && (
                      <CFormFeedback invalid>{formik.errors.state}</CFormFeedback>
                    )}
                  </CCol>
                  <div className="mb-3">
                    <CFormLabel htmlFor="state">Game Structure *</CFormLabel>
                    <CFormSelect
                      aria-label="Select Structure"
                      name="structure"
                      className={
                        'form-control' +
                        (formik.errors.structure && formik.touched.structure ? ' is-invalid' : '')
                      }
                      defaultValue={structure}
                      onChange={handleGameStructure}
                      id="structure"
                    >
                      <option value="">Select Team Structure </option>
                      <option value="8">6 Players </option>
                      <option value="7">7 Players </option>
                      <option value="6">8 Players </option>
                      <option value="5">9 Players </option>
                      <option value="1">10 Players </option>
                      <option value="1002">11 Players</option>
                    </CFormSelect>
                    {formik.errors.structure && formik.touched.structure && (
                      <CFormFeedback invalid>{formik.errors.structure}</CFormFeedback>
                    )}
                  </div>

                  <div className="d-grid">
                    <CLoadingButton
                      type="submit"
                      color="success"
                      variant="outline"
                      loading={loading}
                    >
                      Create Game Account
                    </CLoadingButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ClubRegister
