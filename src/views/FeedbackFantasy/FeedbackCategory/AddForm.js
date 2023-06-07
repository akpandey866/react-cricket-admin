import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastComponent from 'src/components/common/TaostComponent'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import FeedbackFantasyService from 'src/service/FeedbackFantasyService'
const AddForm = (props) => {
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Name is required'),
    message: Yup.string()
      .required('Message is required')
      .max(30, 'Description should not be more then 30 characters.'),
  })
  const formik = useFormik({
    initialValues: {
      title: '',
      message: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      setLoader(true)
      FeedbackFantasyService.saveCategory(data)
        .then((res) => {
          if (res.status === 200) {
            props.setUsers(res.data)
            ToastComponent(res.message, 'success')
            setLoader(false)
          } else {
            setLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          setLoader(false)
          console.log('Here is Error', e)
          ToastComponent('Something Went wront. Please try again.', 'error')
        })
    },
  })
  const [description, setDescription] = useState({
    htmlValue: '',
    editorState: EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML('<p></p>')),
    ),
  })
  const onEditorStateChange = (editorValue) => {
    const editorStateInHtml = draftToHtml(convertToRaw(editorValue.getCurrentContent()))

    setDescription({
      htmlValue: editorStateInHtml,
      editorState: editorValue,
    })
  }
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={12}>
          <CFormLabel className="fw-bold" htmlFor="title">
            Category Name
          </CFormLabel>
          <CFormInput
            placeholder="Category Name"
            className={
              'form-control' + (formik.errors.title && formik.touched.title ? ' is-invalid' : '')
            }
            defaultValue={formik.values.title}
            onChange={formik.handleChange}
            aria-label="title"
            id="title"
          />
          {formik.errors.title && formik.touched.title && (
            <CFormFeedback invalid>{formik.errors.title}</CFormFeedback>
          )}
        </CCol>
        <CCol md={12}>
          <CFormLabel className="fw-bold" htmlFor="message">
            Category Description
          </CFormLabel>
          <CFormTextarea
            rows="2"
            placeholder="Category Description"
            className={
              'form-control' +
              (formik.errors.message && formik.touched.message ? ' is-invalid' : '')
            }
            defaultValue={formik.values.message}
            onChange={formik.handleChange}
            aria-label="message"
            id="message"
          ></CFormTextarea>
          {formik.errors.message && formik.touched.message && (
            <CFormFeedback invalid>{formik.errors.message}</CFormFeedback>
          )}
        </CCol>
        <CCol md={6}>
          <CLoadingButton
            type="submit"
            color="success"
            variant="outline"
            loading={loader}
            disabled={loader}
            id="submit"
          >
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddForm
