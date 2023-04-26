import {
  CCol,
  CDatePicker,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ArticleService from 'src/service/ArticleService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
import moment from 'moment'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
const EditForm = (props) => {
  const [description, setDescription] = useState({
    htmlValue: '',
    editorState: EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML('<p></p>')),
    ),
  })
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [date, setDate] = useState(props.date)
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  })
  const formik = useFormik({
    initialValues: {
      title: props.articleDetail?.title,
      external_link: props.articleDetail?.link,
      date: props.articleDetail?.date,
      description: props.articleDetail?.description,
      image: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      var formData = new FormData()
      formData.append('articleId', props.articleId)
      formData.append('title', data.title)
      formData.append('date', date)
      formData.append('description', description.htmlValue)
      formData.append('external_link', data.external_link)
      formData.append('image', data.image)
      formData.append('thumb_image', data.thumb_image)
      setLoader(true)
      ArticleService.editArticle(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
            navigate('/articles')
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
  const handleDateChange = (event) => {
    const dateFormat = moment(event).format('YYYY-MM-DD')
    setDate(dateFormat)
  }

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
        <CCol md={4}>
          <CFormLabel htmlFor="grade">Title *</CFormLabel>
          <CFormInput
            placeholder="Title"
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
        <CCol md={4}>
          <div className="mb-3">
            <CFormLabel htmlFor="formFile">Article Header</CFormLabel>
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
        </CCol>
        <CCol md={4}>
          <div className="mb-3">
            <CFormLabel htmlFor="formFile">Thumb Image</CFormLabel>
            <CFormInput
              type="file"
              id="formFile"
              name="thumb_image"
              className={
                formik.touched.thumb_image
                  ? formik.errors.thumb_image
                    ? 'form-control input_user is-invalid'
                    : 'form-control input_user is-valid'
                  : 'form-control'
              }
              onChange={(event) => {
                formik.setTouched({
                  ...formik.touched,
                  image: true,
                })
                formik.setFieldValue('thumb_image', event.target.files[0])
              }}
            />
            {formik.touched.thumb_image && formik.errors.thumb_image ? (
              <CFormFeedback invalid>{formik.errors.thumb_image}</CFormFeedback>
            ) : null}
          </div>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="Date">Date *</CFormLabel>
          <CDatePicker
            date={date}
            locale="en-US"
            name="date"
            placeholder={'Date'}
            onDateChange={handleDateChange}
          />

          {formik.errors.date && formik.touched.date && (
            <CFormFeedback invalid>{formik.errors.date}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="external link">External Link</CFormLabel>
          <CFormInput
            placeholder="External Link"
            className={
              'form-control' +
              (formik.errors.external_link && formik.touched.external_link ? ' is-invalid' : '')
            }
            defaultValue={formik.values.external_link}
            onChange={formik.handleChange}
            aria-label="external_link"
            id="external_link"
          />
          {formik.errors.external_link && formik.touched.external_link && (
            <CFormFeedback invalid>{formik.errors.external_link}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}></CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="Entry Fee Info">Description</CFormLabel>
          <Editor
            toolbarHidden={false}
            editorState={description.editorState}
            onEditorStateChange={onEditorStateChange}
            editorStyle={{ border: '1px solid', height: '150px' }}
          />
        </CCol>
        <CCol md={6}></CCol>

        <CCol md={4}>
          <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default EditForm
