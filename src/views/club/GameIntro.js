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
  CFormFeedback,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastComponent from 'src/components/common/TaostComponent'
import ClubService from 'src/service/ClubService'
const GameIntro = (props) => {
  const [loading, setLoading] = useState(false)
  const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif']
  const VIDEO__SUPPORTED__FORMATS = ['video/mp4', 'video/x-m4v', 'video/*']
  const validationSchema = Yup.object().shape({
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
    video: Yup.mixed()
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
          !value || (value && VIDEO__SUPPORTED__FORMATS.includes(value?.type)),
      ),
  })
  const formik = useFormik({
    initialValues: {
      youtube_video1: props.userFile.youtube_video1,
      youtube_video2: props.userFile.youtube_video2,
      youtube_video3: props.userFile.youtube_video3,
      youtube_video4: props.userFile.youtube_video4,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      var formData = new FormData()
      formData.append('youtube_video1', data.youtube_video1)
      formData.append('youtube_video2', data.youtube_video2)
      formData.append('youtube_video3', data.youtube_video3)
      formData.append('youtube_video4', data.youtube_video4)
      formData.append('intro_image', data.image)
      formData.append('video', data.video)

      setLoading(true)
      ClubService.updateGameIntro(formData)
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
          ToastComponent(e.response?.data?.message, 'error')
          setLoading(false)
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })
  return (
    <CForm className="row g-3" onSubmit={formik.handleSubmit}>
      <CCol md={6}>
        <CFormLabel className="fw-bold" htmlFor="youtube_video1">
          Insert Youtube Embed Code (Video 1)
        </CFormLabel>
        <CFormInput
          id="youtube_video1"
          defaultValue={formik.values.youtube_video1}
          name="youtube_video1"
          onChange={formik.handleChange}
        />
      </CCol>
      <CCol md={6}>
        <CFormLabel className="fw-bold" htmlFor="youtube2">
          Insert Youtube Embed Code (Video 2)
        </CFormLabel>
        <CFormInput
          id="youtube_video2"
          defaultValue={formik.values.youtube_video2}
          name="youtube_video2"
          onChange={formik.handleChange}
        />
      </CCol>

      <CCol md={6}>
        <CFormLabel className="fw-bold" htmlFor="youtube_video3">
          Insert Youtube Embed Code (Video 3)
        </CFormLabel>
        <CFormInput
          id="youtube_video3"
          defaultValue={formik.values.youtube_video3}
          name="youtube_video3"
          onChange={formik.handleChange}
        />
      </CCol>
      <CCol md={6}>
        <CFormLabel className="fw-bold" htmlFor="youtube4">
          Insert Youtube Embed Code (Video 4)
        </CFormLabel>
        <CFormInput
          id="youtube_video4"
          defaultValue={formik.values.youtube_video4}
          name="youtube_video4"
          onChange={formik.handleChange}
        />
      </CCol>
      <CCol md={6}>
        <div className="mb-3">
          <CFormLabel className="fw-bold" htmlFor="video">
            Uplaod a Video (Max File Size Allowed = 5MB)
          </CFormLabel>
          <CFormInput
            type="file"
            id="video"
            name="video"
            className={
              formik.touched.video
                ? formik.errors.video
                  ? 'form-control input_user is-invalid'
                  : 'form-control input_user is-valid'
                : 'form-control'
            }
            onChange={(event) => {
              formik.setTouched({
                ...formik.touched,
                video: true,
              })
              formik.setFieldValue('video', event.target.files[0])
            }}
          />
          {formik.touched.video && formik.errors.video ? (
            <CFormFeedback invalid>{formik.errors.video}</CFormFeedback>
          ) : null}
        </div>
      </CCol>
      <CCol md={6}>
        <div className="mb-3">
          <CFormLabel className="fw-bold" htmlFor="image">
            Image (Dimesion: 540 px x 310 px)
          </CFormLabel>
          <CFormInput
            type="file"
            id="image"
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
      <CCol md={6}>
        <CLoadingButton type="submit" color="success" variant="outline" loading={loading}>
          Submit
        </CLoadingButton>
      </CCol>
    </CForm>
  )
}

export default GameIntro
