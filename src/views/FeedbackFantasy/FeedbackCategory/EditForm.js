import {
  CCol,
  CForm,
  CFormFeedback,
  CFormLabel,
  CFormTextarea,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FeedbackFantasyService from 'src/service/FeedbackFantasyService'
import ToastComponent from 'src/components/common/TaostComponent'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
const EditForm = (props) => {
  const [categoryDetail, setCategoryDetail] = useState()
  useEffect(() => {
    if (props.selectedId === props.categoryId) {
      FeedbackFantasyService.getCategoryDetail(props.categoryId)
        .then((res) => {
          if (res.status === 200) {
            setCategoryDetail(res.data)
          }
        })
        .catch((e) => {
          ToastComponent(e.response?.data?.message, 'error')
          setLoader(false)
        })
    }
  }, [props])

  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Name is required'),
  })
  const formik = useFormik({
    initialValues: {
      title: categoryDetail?.name,
      message: categoryDetail?.description,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      data.categoryId = props.categoryId
      setLoader(true)
      FeedbackFantasyService.editCategory(data)
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
          ToastComponent('Something went wrong. Please try again.', 'error')
          setLoader(false)
        })
    },
  })
  const [description, setDescription] = useState({
    htmlValue: props.message,
    editorState: EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(props.message)),
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
          <CFormLabel htmlFor="title">Name</CFormLabel>
          <input
            type="text"
            name="title"
            className={
              'form-control' + (formik.errors.title && formik.touched.title ? ' is-invalid' : '')
            }
            id="title"
            placeholder="Name
            "
            defaultValue={categoryDetail?.name}
            onChange={formik.handleChange}
          />
          {formik.errors.title && formik.touched.title && (
            <CFormFeedback invalid>{formik.errors.title}</CFormFeedback>
          )}
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="Category Description">Category Description</CFormLabel>
          <CFormTextarea
            rows="2"
            placeholder="Category Description"
            className={
              'form-control' +
              (formik.errors.message && formik.touched.message ? ' is-invalid' : '')
            }
            defaultValue={categoryDetail?.description}
            onChange={formik.handleChange}
            aria-label="message"
            id="message"
          ></CFormTextarea>
        </CCol>
        <CCol md={6}>
          <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default EditForm
