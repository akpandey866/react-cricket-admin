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
import SponsorService from 'src/service/SponsorService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
import PreviewImage from '../PreviewImage'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
const EditForm = (props) => {
  console.log('calling', props.sponsorId)
  const aboutText = props.sponsorDetail.about ?? '<p>asdasad</p>'
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
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  })
  const formik = useFormik({
    initialValues: {
      name: props.sponsorDetail?.name,
      website: props.sponsorDetail?.website,
      facebook: props.sponsorDetail?.facebook,
      twitter: props.sponsorDetail?.twitter,
      instagram: props.sponsorDetail?.instagram,
      about: props.sponsorDetail?.about,
      image: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      data.sponsorId = props.sponsorId
      var formData = new FormData()
      formData.append('sponsorId', props.sponsorId)
      formData.append('name', data.name)
      formData.append('website', data.website)
      formData.append('facebook', data.facebook)
      formData.append('twitter', data.twitter)
      formData.append('instagram', data.instagram)
      formData.append('about', description.htmlValue)
      formData.append('image', data.image)
      setLoader(true)
      SponsorService.editSponsor(formData)
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
        <CCol md={4}>
          <CFormLabel htmlFor="name">Name</CFormLabel>
          <input
            type="text"
            name="name"
            className={
              'form-control' + (formik.errors.name && formik.touched.name ? ' is-invalid' : '')
            }
            id="validationServer01"
            placeholder="name"
            defaultValue={props.sponsorDetail?.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <CFormFeedback invalid>{formik.errors.name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="website">Website</CFormLabel>
          <input
            type="text"
            name="website"
            className={
              'form-control' +
              (formik.errors.website && formik.touched.website ? ' is-invalid' : '')
            }
            id="website"
            placeholder="Website"
            defaultValue={props.sponsorDetail?.website}
            onChange={formik.handleChange}
          />
          {formik.errors.website && formik.touched.website && (
            <CFormFeedback invalid>{formik.errors.website}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="facebook">Facebook URL</CFormLabel>
          <input
            type="text"
            name="facebook"
            className={
              'form-control' +
              (formik.errors.facebook && formik.touched.facebook ? ' is-invalid' : '')
            }
            id="facebook"
            placeholder="Facebook"
            defaultValue={props.sponsorDetail?.facebook}
            onChange={formik.handleChange}
          />
          {formik.errors.facebook && formik.touched.facebook && (
            <CFormFeedback invalid>{formik.errors.facebook}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="twitter">Twitter URL</CFormLabel>
          <input
            type="text"
            name="twitter"
            className={
              'form-control' +
              (formik.errors.twitter && formik.touched.twitter ? ' is-invalid' : '')
            }
            id="twitter"
            placeholder="Twitter"
            defaultValue={props.sponsorDetail?.twitter}
            onChange={formik.handleChange}
          />
          {formik.errors.twitter && formik.touched.twitter && (
            <CFormFeedback invalid>{formik.errors.twitter}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="instagram">Instagram URL</CFormLabel>
          <input
            type="text"
            name="instagram"
            className={
              'form-control' +
              (formik.errors.instagram && formik.touched.instagram ? ' is-invalid' : '')
            }
            id="instagram"
            placeholder="Instagram"
            defaultValue={props.sponsorDetail?.instagram}
            onChange={formik.handleChange}
          />
          {formik.errors.instagram && formik.touched.instagram && (
            <CFormFeedback invalid>{formik.errors.instagram}</CFormFeedback>
          )}
        </CCol>
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
        <CCol md={8}>
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

export default EditForm
