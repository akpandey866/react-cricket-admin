import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import SponsorService from 'src/service/SponsorService'
import ToastComponent from 'src/components/common/TaostComponent'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import PreviewImage from '../PreviewImage'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
const AddForm = (props) => {
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
  const [loader, setLoader] = useState(false)
  const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif']
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Grade is required'),
    image: Yup.mixed()
      .nullable()
      .required('Required Field')
      .test(
        'size',
        'File size is too big',
        (value) => value && value.size <= 1024 * 1024, // 5MB
      )
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
      name: '',
      website: '',
      facebook: '',
      twitter: '',
      instagram: '',
      about: '',
      image: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      var formData = new FormData()
      formData.append('name', data.name)
      formData.append('website', data.website)
      formData.append('facebook', data.facebook)
      formData.append('twitter', data.twitter)
      formData.append('instagram', data.instagram)
      formData.append('about', description.htmlValue)
      formData.append('image', data.image)
      setLoader(true)
      SponsorService.saveSponsor(formData)
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
          ToastComponent(e.response?.data?.message, 'error')
          setLoader(false)
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={4}>
          <CFormLabel htmlFor="name">Name</CFormLabel>
          <CFormInput
            placeholder="Name"
            className={
              'form-control' + (formik.errors.name && formik.touched.name ? ' is-invalid' : '')
            }
            value={formik.values.name}
            onChange={formik.handleChange}
            aria-label="name"
            id="name"
          />
          {formik.errors.name && formik.touched.name && (
            <CFormFeedback invalid>{formik.errors.name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="website">Website</CFormLabel>
          <CFormInput
            placeholder="Website"
            classwebsite={
              'form-control' +
              (formik.errors.website && formik.touched.website ? ' is-invalid' : '')
            }
            value={formik.values.website}
            onChange={formik.handleChange}
            aria-label="website"
            id="website"
          />
          {formik.errors.website && formik.touched.website && (
            <CFormFeedback invalid>{formik.errors.website}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="facebook">Facebook URL</CFormLabel>
          <CFormInput
            placeholder="facebook URL"
            classfacebook={
              'form-control' +
              (formik.errors.facebook && formik.touched.facebook ? ' is-invalid' : '')
            }
            value={formik.values.facebook}
            onChange={formik.handleChange}
            aria-label="facebook"
            id="facebook"
          />
          {formik.errors.facebook && formik.touched.facebook && (
            <CFormFeedback invalid>{formik.errors.facebook}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="facebook">Twitter URL</CFormLabel>
          <CFormInput
            placeholder="Twitter URL"
            classtwitter={
              'form-control' +
              (formik.errors.twitter && formik.touched.twitter ? ' is-invalid' : '')
            }
            value={formik.values.twitter}
            onChange={formik.handleChange}
            aria-label="twitter"
            id="twitter"
          />
          {formik.errors.twitter && formik.touched.twitter && (
            <CFormFeedback invalid>{formik.errors.twitter}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="facebook">Instagram URL</CFormLabel>
          <CFormInput
            placeholder="Instagram URL"
            classinstagram={
              'form-control' +
              (formik.errors.instagram && formik.touched.instagram ? ' is-invalid' : '')
            }
            value={formik.values.instagram}
            onChange={formik.handleChange}
            aria-label="instagram"
            id="instagram"
          />
          {formik.errors.instagram && formik.touched.instagram && (
            <CFormFeedback invalid>{formik.errors.instagram}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}></CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="formFile">Sponsor Logo</CFormLabel>
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
        <CCol md={12}>
          <CFormLabel htmlFor="Entry Fee Info">About</CFormLabel>
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

export default AddForm
