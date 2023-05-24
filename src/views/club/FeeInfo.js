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
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import ToastComponent from 'src/components/common/TaostComponent'
import ClubService from 'src/service/ClubService'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
const FeeInfo = (props) => {
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      entry_price: props.userDetail.entry_price,
      entry_fee_info: props.userDetail.entry_fee_info,
      message: props.userDetail.message,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (data) => {
      data.entry_fee_info = description.htmlValue
      data.message = message.htmlValue
      setLoading(true)
      ClubService.updateFeeInfo(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
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
  const [description, setDescription] = useState({
    htmlValue: props.userDetail?.entry_fee_info,
    editorState: EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(props.userDetail?.entry_fee_info)),
    ),
  })

  const [message, setMessage] = useState({
    htmlValue: props.userDetail?.message,
    editorMessageState: EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(props.userDetail?.message)),
    ),
  })

  const onEditorStateChange = (editorValue) => {
    const editorStateInHtml = draftToHtml(convertToRaw(editorValue.getCurrentContent()))

    setDescription({
      htmlValue: editorStateInHtml,
      editorState: editorValue,
    })
  }

  const onEditorMessageStateChange = (editorValue) => {
    const editorStateInHtml = draftToHtml(convertToRaw(editorValue.getCurrentContent()))

    setMessage({
      htmlValue: editorStateInHtml,
      editorMessageState: editorValue,
    })
  }

  return (
    <CForm className="row g-3" onSubmit={formik.handleSubmit}>
      <CCol md={12}>
        <CFormLabel htmlFor="Entry Fee">Entry Fee</CFormLabel>
        <CFormInput
          placeholder="Entry Price"
          className={
            'form-control' +
            (formik.errors.entry_price && formik.touched.entry_price ? ' is-invalid' : '')
          }
          defaultValue={formik.values.entry_price}
          onChange={formik.handleChange}
          aria-label="entry_price"
          id="entry_price"
        />
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="Entry Fee Info">Entry Fee Information</CFormLabel>
        <Editor
          toolbarHidden={false}
          editorState={description.editorState}
          onEditorStateChange={onEditorStateChange}
          editorStyle={{ border: '1px solid', height: '150px' }}
        />
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="About Game">Welcome Message For Members</CFormLabel>
        <Editor
          toolbarHidden={false}
          editorState={message.editorMessageState}
          onEditorStateChange={onEditorMessageStateChange}
          editorStyle={{ border: '1px solid', height: '150px' }}
        />
      </CCol>

      <CCol md={6}>
        <CLoadingButton type="submit" color="success" variant="outline" loading={loading}>
          Submit
        </CLoadingButton>
      </CCol>
    </CForm>
  )
}

export default FeeInfo
