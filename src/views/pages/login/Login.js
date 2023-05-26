import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthService from 'src/service/AuthService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormFeedback,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
const Login = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useState()
  const [authenticated, setauthenticated] = useState(localStorage.getItem('authenticated') || false)

  useEffect(() => {
    if (authenticated === 'true') {
      navigate('/account')
    }
  }, [authenticated, navigate])

  const [loader, setLoader] = useState(false)

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
  })
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (data) => {
      setLoader(true)
      const res = AuthService.login(data)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('admin', JSON.stringify(res.user))
            localStorage.setItem('token', JSON.stringify(res.token))
            localStorage.setItem('authenticated', true)
            setauthenticated(true)
            setLoader(false)
            navigate('/account')
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

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <form className="row g-3" onSubmit={formik.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <input
                          type="text"
                          name="email"
                          className={
                            'form-control' +
                            (formik.errors.email && formik.touched.email ? ' is-invalid' : '')
                          }
                          id="validationServer01"
                          placeholder="Email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email && (
                          <CFormFeedback invalid>{formik.errors.email}</CFormFeedback>
                        )}
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <input
                          type="password"
                          name="password"
                          className={
                            'form-control' +
                            (formik.errors.password && formik.touched.email ? ' is-invalid' : '')
                          }
                          id="password"
                          placeholder="Password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password && (
                          <CFormFeedback invalid>{formik.errors.password}</CFormFeedback>
                        )}
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CLoadingButton
                            type="submit"
                            color="success"
                            variant="outline"
                            loading={loader}
                          >
                            Submit
                          </CLoadingButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </form>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login
