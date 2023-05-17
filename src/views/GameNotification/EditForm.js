import { CCol, CForm, CFormFeedback, CFormLabel, CLoadingButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import GameNotificationService from 'src/service/GameNotificationService'
import ToastComponent from 'src/components/common/TaostComponent'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
const EditForm = (props) => {
  const [notificationDetail, setNotificationDetail] = useState()
  useEffect(() => {
    if (props.selectedId === props.notificationId) {
      GameNotificationService.getNotificationDetail(props.notificationId)
        .then((res) => {
          if (res.status === 200) {
            setNotificationDetail(res.data)
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
    title: Yup.string().required('Title is required'),
  })
  const formik = useFormik({
    initialValues: {
      title: notificationDetail?.title,
      message: notificationDetail?.message,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      data.notificationId = props.notificationId
      data.message = description.htmlValue
      setLoader(true)
      GameNotificationService.editNotification(data)
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
          <CFormLabel htmlFor="title">Title</CFormLabel>
          <input
            type="text"
            name="title"
            className={
              'form-control' + (formik.errors.title && formik.touched.title ? ' is-invalid' : '')
            }
            id="title"
            placeholder="title"
            defaultValue={notificationDetail?.title}
            onChange={formik.handleChange}
          />
          {formik.errors.title && formik.touched.title && (
            <CFormFeedback invalid>{formik.errors.title}</CFormFeedback>
          )}
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="Entry Fee Info">Message</CFormLabel>
          <Editor
            toolbarHidden={false}
            editorState={description.editorState}
            onEditorStateChange={onEditorStateChange}
            editorStyle={{ border: '1px solid', height: '150px' }}
          />
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
