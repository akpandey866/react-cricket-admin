import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CLoadingButton,
  CForm,
  CFormFeedback,
  CInputGroup,
  CInputGroupText,
  CButton,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import ToastComponent from 'src/components/common/TaostComponent'
import ClubService from 'src/service/ClubService'
import { useEffect } from 'react'
import PreviewImage from '../PreviewImage'
const BasicSetting = (props) => {
  const [loader, setLoader] = useState(false)
  const [userDetail, setUserDetail] = useState({})
  useEffect(() => {
    ClubService.getClubDetails()
      .then((res) => {
        if (res.status === 200) {
          setUserDetail(res.user_details)
        } else {
          setLoader(false)
        }
      })
      .catch((e) => {
        setLoader(false)
      })
  }, [])
  const formik = useFormik({
    initialValues: {
      club_name: userDetail?.club_name,
      game_name: userDetail?.game_name,
      username: userDetail?.username,
      image: null,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data) => {
      setLoader(true)
      ClubService.updateBasicSetting(data)
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
          ToastComponent(e.response?.data?.message, 'error')
          setLoader(false)
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })
  const copyShareUrl = () => {
    ToastComponent('Copied to clipboard', 'success')
    navigator.clipboard.writeText(
      `https://cricket.myclubtap.com/about-game?club_name=${userDetail.string_url}`,
    )
  }
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Basic Setting</strong>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={formik.handleSubmit}>
          <CCol md={6}>
            <CFormLabel htmlFor="Facebook">Game Mode</CFormLabel>
            <CFormInput id="game_mode" defaultValue={'Club Mode'} name="game_mode" disabled />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="Twitter">Username</CFormLabel>
            <CFormInput
              id="username"
              defaultValue={formik.values.username}
              name="username"
              onChange={formik.handleChange}
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="club_name">Club/League Name*</CFormLabel>
            <CFormInput
              id="club_name"
              defaultValue={formik.values.club_name}
              name="club_name"
              onChange={formik.handleChange}
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="game_name">Game Name</CFormLabel>
            <CFormInput
              id="game_name"
              defaultValue={formik.values.game_name}
              name="game_name"
              onChange={formik.handleChange}
            />
          </CCol>

          <CCol md={12}>
            <CFormLabel htmlFor="game_name">Game Share Link</CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText id="shareUrl">
                https://cricket.myclubtap.com/about-game?club_name={userDetail.string_url}
              </CInputGroupText>
              <CInputGroupText id="basic-addon2" onClick={copyShareUrl}>
                <CButton color={'success'}>Copy</CButton>
              </CInputGroupText>
            </CInputGroup>
          </CCol>
          <CCol md={6}>
            <div className="mb-3">
              <CFormLabel htmlFor="formFile">Club Logo</CFormLabel>
              <CFormInput
                type="file"
                id="formFile"
                name="image"
                className={
                  formik.touched.image
                    ? formik.errors.image
                      ? 'form-control input_user is-invalid'
                      : 'form-control input_user is-valid'
                    : 'form-control'
                }
                onChange={(event) => {
                  formik.setTouched({
                    ...formik.touched,
                    image: true,
                  })
                  formik.setFieldValue('image', event.target.files[0])
                }}
              />
              {formik.touched.image && formik.errors.image ? (
                <CFormFeedback invalid>{formik.errors.image}</CFormFeedback>
              ) : null}
            </div>
            <br></br>
            {formik.values.image ? (
              <PreviewImage
                className={{ margin: 'auto' }}
                width={150}
                height={150}
                file={formik.values.image}
              />
            ) : null}
          </CCol>
          <CCol md={6}></CCol>
          <CCol md={6}>
            <CLoadingButton
              type="submit"
              color="success"
              variant="outline"
              loading={loader}
              disabled={loader}
            >
              Submit
            </CLoadingButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default BasicSetting
