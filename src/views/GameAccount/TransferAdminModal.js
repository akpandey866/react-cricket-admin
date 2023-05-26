import React from 'react'
import {
  CButton,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import ToastComponent from 'src/components/common/TaostComponent'
import ClubService from 'src/service/ClubService'
const TransferAdminModal = (props) => {
  const [loading, setLoading] = useState(false)
  const validationSchema = Yup.object().shape({
    admin_name: Yup.string().required('New Admin Name is required'),
    admin_email: Yup.string().required('New Email is required'),
  })
  const formik = useFormik({
    initialValues: {
      admin_name: '',
      admin_email: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      data.userId = props.userId
      setLoading(true)
      ClubService.transferAdminRight(data)
        .then((res) => {
          if (res.status === 200) {
            props.setTransferVisible(false)
            ToastComponent(res.message, 'success')
            setLoading(false)
          } else {
            setLoading(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          console.log(e)
          ToastComponent('Something went wrong.', 'error')
          setLoading(false)
        })
    },
  })
  return (
    <CModal
      visible={props.transferVisible}
      onClose={() => props.setTransferVisible(false)}
      size="lg"
    >
      <CForm onSubmit={formik.handleSubmit}>
        <CModalHeader>
          <CModalTitle>Transfer Admin Access</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <b>Note:</b>
          <ul>
            <li>
              Once you have entered the details of the new game admin and press `Submit`, an email
              is sent to the new game admin with login details.
            </li>
            <li>Your access to the admin portal of the game will be closed permanently.</li>
            <li>
              If you have multiple games running through this account, you will continue to have
              access to their admin portal.
            </li>
            <li>
              If you do not have another game running through this account, you would not have any
              further acmin/user access through this acocunt.
            </li>
            <li>To continue using this emai, you can signup as a new member / game if required.</li>
          </ul>
          <div className="mb-3">
            <CFormLabel htmlFor="new_admin_name">New Game Admin Name</CFormLabel>
            <CFormInput
              className={
                'form-control' +
                (formik.errors.admin_name && formik.touched.admin_name ? ' is-invalid' : '')
              }
              value={formik.values.admin_name}
              onChange={formik.handleChange}
              aria-label="admin_name"
              id="admin_name"
            />
            {formik.errors.admin_name && formik.touched.admin_name && (
              <CFormFeedback invalid>{formik.errors.admin_name}</CFormFeedback>
            )}
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="new_admin_email">New Game Admin Email</CFormLabel>
            <CFormInput
              className={
                'form-control' +
                (formik.errors.admin_email && formik.touched.admin_email ? ' is-invalid' : '')
              }
              value={formik.values.admin_email}
              onChange={formik.handleChange}
              aria-label="admin_email"
              id="admin_email"
            />
            {formik.errors.admin_email && formik.touched.admin_email && (
              <CFormFeedback invalid>{formik.errors.admin_email}</CFormFeedback>
            )}
          </div>
          <CLoadingButton
            type="submit"
            className="mt-3"
            color="success"
            variant="outline"
            loading={loading}
          >
            Submit
          </CLoadingButton>
        </CModalBody>
      </CForm>
      <CModalFooter>
        <CButton color="danger" onClick={() => props.setTransferVisible(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default TransferAdminModal
