import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import GamePrizeService from 'src/service/GamePrizeService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
import PreviewImage from '../PreviewImage'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
const EditForm = (props) => {
  const aboutText = props.prizeDetail.description ?? '<p>asdasad</p>'
  console.log('asdasd', aboutText)
  const [description, setDescription] = useState({
    htmlValue: aboutText,
    editorState: EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(aboutText)),
    ),
  })

  const onEditorStateChange = (editorValue) => {
    const editorStateInHtml = draftToHtml(convertToRaw(editorValue.getCurrentContent()))

    setDescription({
      htmlValue: editorStateInHtml,
      editorState: editorValue,
    })
  }
  const [loader, setLoader] = useState(false)
  const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif']
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').max(50, '50 Character Limit is allowed.'),
    image: Yup.mixed()
      .nullable(true)
      .test('fileSize', 'File size too large, max file size is 5 Mb', (file) => {
        if (file) {
          return file.size <= 5500000
        } else {
          return true
        }
      })
      .test(
        'type',
        'Invalid file format selection',
        (value) =>
          // console.log(value);
          !value || (value && SUPPORTED_FORMATS.includes(value?.type)),
      ),
  })
  const formik = useFormik({
    initialValues: {
      name: props.prizeDetail?.title,
      about: props.prizeDetail?.description,
      image: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      data.prizeId = props.prizeId
      var formData = new FormData()
      formData.append('prizeId', props.prizeId)
      formData.append('name', data.name)
      formData.append('about', description.htmlValue)
      formData.append('image', data.image)
      setLoader(true)
      GamePrizeService.editPrize(formData)
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
          console.log(e)
        })
    },
  })
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={12}>
          <CFormLabel className="fw-bold" htmlFor="title">
            Prize Name
          </CFormLabel>
          <input
            type="text"
            name="name"
            className={
              'form-control' + (formik.errors.name && formik.touched.name ? ' is-invalid' : '')
            }
            id="title"
            placeholder="Prize Name"
            defaultValue={props.prizeDetail?.title}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <CFormFeedback invalid>{formik.errors.name}</CFormFeedback>
          )}
        </CCol>

        <CCol md={12}>
          <CFormLabel className="fw-bold" htmlFor="Entry Fee Info">
            Prize Description
          </CFormLabel>
          <Editor
            toolbarHidden={false}
            editorState={description.editorState}
            onEditorStateChange={onEditorStateChange}
            editorStyle={{ border: '1px solid', height: '150px' }}
          />
        </CCol>
        <CCol md={12}>
          <CFormLabel className="fw-bold" htmlFor="formFile">
            Prize Image
          </CFormLabel>
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
          <br></br>
          {formik.values.image ? (
            <PreviewImage
              className={{ margin: 'auto' }}
              width={100}
              height={100}
              file={formik.values.image}
            />
          ) : null}
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
