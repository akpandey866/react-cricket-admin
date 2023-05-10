import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CLoadingButton,
  CInputGroupText,
  CFormCheck,
  CRow,
  CFormFeedback,
  CDatePicker,
} from '@coreui/react-pro'
import { DocsExample } from 'src/components'
import ClubService from 'src/service/ClubService'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
import Loader from 'src/components/Loader'
import GameSocial from './GameSocial'
import GameIntro from './GameIntro'
import AboutGame from './AboutGame'
import FeeInfo from './FeeInfo'
import BasicSetting from './BasicSetting'

const ClubAboutGame = () => {
  const [isLoading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [userDetail, setUserDetail] = useState()
  const [userFile, setUserFile] = useState()
  const [countryList, setCountryList] = useState([])
  const [stateList, setStateList] = useState([])
  useEffect(() => {
    ClubService.getClubDetails()
      .then((res) => {
        if (res.status === 200) {
          setUserDetail(res.user_details)
          setUserFile(res.user_files)
          setCountryList(res.country_list)
          setStateList(res.state_list)
          if (res.user_details.show_email === 1) {
            setShowEmail(true)
          }
          if (res.user_details.show_name === 1) {
            setShowName(true)
          }
          if (res.user_details.gender === 'male') {
            setShowMale('male')
          }
          if (res.user_details.gender === 'female') {
            setShowFemale('female')
          }
          if (res.user_details.gender === 'Do not wish to ') {
            setShowOtherGender('Do not wish to ')
          }
          setLoading(false)
          setLoader(false)
        } else {
          setLoading(false)
          setLoader(false)
        }
      })
      .catch((e) => {
        console.log('error', e)
        if (e.message === 'Token has expired') {
          localStorage.removeItem('admin')
          localStorage.removeItem('authenticated')
          localStorage.removeItem('token')
        }
        setLoader(false)
      })
  }, [])
  const FILE_SIZE = 160 * 1024
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    dob: Yup.string().required('DOB is required'),
    phone: Yup.string().required('Phone is required'),
    // image: Yup.mixed()
    //   .required('A file is required')
    //   .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
    //   .test(
    //     'fileFormat',
    //     'Unsupported Format',
    //     (value) => value && SUPPORTED_FORMATS.includes(value.type),
    //   ),
  })

  const formik = useFormik({
    initialValues: {
      first_name: userDetail?.first_name,
      last_name: userDetail?.last_name,
      email: userDetail?.email,
      dob: userDetail?.dob,
      phone: userDetail?.phone,
      gender: userDetail?.gender,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      setLoader(true)
      data['user_id'] = userDetail?.id
      ClubService.updateGameAdmin(data)
        .then((res) => {
          if (res.status === 200) {
            setLoader(false)
            navigate('/club-about-game')
          } else {
            setLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          setLoader(false)
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })

  const [loader, setLoader] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const [showName, setShowName] = useState(false)

  const [showMale, setShowMale] = useState('male')
  const [showFemale, setShowFemale] = useState('female')
  const [showOtherGender, setShowOtherGender] = useState('Do not wish to ')

  const handleEmailChange = () => {
    setShowEmail((current) => !current)
  }
  const handleNameChange = () => {
    setShowName((current) => !current)
  }

  const handleMaleChange = (event) => {
    setShowMale(event.target.value)
  }

  const handleFemaleChange = (event) => {
    setShowFemale(event.target.value)
  }
  const handleOtherChange = (event) => {
    setShowOtherGender(event.target.value)
  }
  return isLoading ? (
    <Loader />
  ) : (
    <CRow>
      <CCol xs={12}>
        <BasicSetting />
      </CCol>
      <CCol xs={12}>
        <AboutGame
          userDetail={userDetail}
          countryList={countryList}
          stateList={stateList}
          setStateList={setStateList}
        />
      </CCol>
      {/* About Fee Information start here */}
      <CCol xs={12}>
        <FeeInfo userDetail={userDetail} />
      </CCol>
      {/* Game admin section  */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Game Admin</strong>
          </CCardHeader>
          <CCardBody>
            <form className="row g-3" onSubmit={formik.handleSubmit}>
              <CCol md={6}>
                <CFormLabel htmlFor="first_name">First Name *</CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <input
                      type="checkbox"
                      checked={showName}
                      name="show_name"
                      defaultValue={1}
                      onChange={handleNameChange}
                    />
                  </CInputGroupText>
                  <input
                    type="text"
                    name="first_name"
                    className={
                      'form-control' +
                      (formik.errors.first_name && formik.touched.first_name ? ' is-invalid' : '')
                    }
                    id="first_name"
                    placeholder="First Name"
                    defaultValue={userDetail?.first_name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.first_name && formik.touched.first_name && (
                    <CFormFeedback invalid>{formik.errors.first_name}</CFormFeedback>
                  )}
                </CInputGroup>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="alast_name">Last Name *</CFormLabel>
                <input
                  type="text"
                  name="last_name"
                  className={
                    'form-control' +
                    (formik.errors.last_name && formik.touched.last_name ? ' is-invalid' : '')
                  }
                  id="validationServer01"
                  placeholder="Last Name"
                  defaultValue={userDetail?.last_name}
                  onChange={formik.handleChange}
                />
                {formik.errors.last_name && formik.touched.last_name && (
                  <CFormFeedback invalid>{formik.errors.last_name}</CFormFeedback>
                )}
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="phone">Email *</CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <input
                      type="checkbox"
                      checked={showEmail}
                      defaultValue={1}
                      name="show_email"
                      onChange={handleEmailChange}
                    />
                  </CInputGroupText>
                  <input
                    type="text"
                    name="email"
                    className={
                      'form-control' +
                      (formik.errors.email && formik.touched.email ? ' is-invalid' : '')
                    }
                    id="email"
                    placeholder="Email"
                    defaultValue={userDetail?.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <CFormFeedback invalid>{formik.errors.email}</CFormFeedback>
                  )}
                </CInputGroup>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="phone">Phone *</CFormLabel>
                <input
                  type="text"
                  name="phone"
                  className={
                    'form-control' +
                    (formik.errors.phone && formik.touched.phone ? ' is-invalid' : '')
                  }
                  id="phone"
                  placeholder="Phone"
                  defaultValue={userDetail?.phone}
                  onChange={formik.handleChange}
                />
                {formik.errors.phone && formik.touched.phone && (
                  <CFormFeedback invalid>{formik.errors.phone}</CFormFeedback>
                )}
              </CCol>

              {/* <CCol md={6}>
                <CFormLabel htmlFor="new_password">New Password</CFormLabel>
                <CFormInput
                  type="password"
                  name="password"
                  placeholder="New password"
                  aria-label="New password"
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="confirm password">Confirm Password</CFormLabel>
                <CFormInput
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm password"
                  aria-label="Confirm password"
                />
              </CCol> */}

              <CCol md={6}>
                <CFormLabel htmlFor="Date of Birth">Date of Birth *</CFormLabel>
                <CDatePicker
                  date={userDetail?.dob}
                  locale="en-US"
                  name="dob"
                  placeholder={'Date of Birth'}
                />

                {formik.errors.dob && formik.touched.dob && (
                  <CFormFeedback invalid>{formik.errors.dob}</CFormFeedback>
                )}
              </CCol>
              <CCol md={6} xs={12}>
                <CFormLabel htmlFor="Date of Birth">Gender *</CFormLabel> <br />
                <CFormCheck
                  inline
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineCheckbox1"
                  defaultValue="male"
                  label="Male"
                  checked={showMale === 'male'}
                  onChange={handleMaleChange}
                />
                <CFormCheck
                  inline
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineCheckbox2"
                  defaultValue="female"
                  label="Female"
                  checked={showFemale === 'female'}
                  onChange={handleFemaleChange}
                />
                <CFormCheck
                  inline
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineCheckbox3"
                  defaultValue="Do not wish to "
                  label="Not Specified"
                  checked={showOtherGender === 'Do not wish to '}
                  onChange={handleOtherChange}
                />
              </CCol>
              {/*
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="formFile">Profile Image</CFormLabel>
                  <CFormInput type="file" id="formFile" name="image" />
                  {formik.errors.image && formik.touched.image && (
                    <CFormFeedback invalid>{formik.errors.image}</CFormFeedback>
                  )}
                </div>
              </CCol> */}

              <CCol md={6}>
                <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
                  Submit
                </CLoadingButton>
              </CCol>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
      {/* Game Social Sectin start here */}
      <CCol xs={12}>
        <GameSocial userDetail={userDetail} />
      </CCol>
      {/* Game Intro Sectin start here */}
      <CCol xs={12}>
        <GameIntro userFile={userFile} />
      </CCol>
      {/* About Game Sectin start here */}
    </CRow>
  )
}

export default ClubAboutGame
