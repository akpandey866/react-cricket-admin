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
import PreviewImage from '../PreviewImage'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useRef } from 'react'
import { useMemo } from 'react'

const AddForm = (props) => {
  const [loader, setLoader] = useState(false)
  const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif']
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').max(50, '50 Character Limit is allowed.'),
    image: Yup.mixed()
      .nullable()
      .required('Required Field')
      .test(
        'size',
        'File size too large, max file size is 5 Mb',
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
      formData.append('about', value)
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
          console.log('error', e)
          setLoader(false)
        })
    },
  })

  // Editor code here.
  const [value, setValue] = useState()
  const quillRef = useRef()
  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor()
    console.log(editor)
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files[0]
      if (/^image\//.test(file.type)) {
        const formData = new FormData()
        formData.append('image', file)
        const res = await SponsorService.imageUplaod(formData) // upload data into server or aws or cloudinary
        const url = res?.url
        editor.insertEmbed(editor.getSelection(), 'image', url)
      } else {
        ToastComponent('You could only upload images.', 'error')
      }
    }
  }
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['image', 'link'],
          [
            {
              color: [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#ffffff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
              ],
            },
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  )
  // Finish here
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={4}>
          <CFormLabel className="fw-bold" htmlFor="name">
            Name
          </CFormLabel>
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
          <CFormLabel className="fw-bold" htmlFor="website">
            Website
          </CFormLabel>
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
          <small>
            <i> (Ex: https://www.myclubtap.com)</i>
          </small>
          {formik.errors.website && formik.touched.website && (
            <CFormFeedback invalid>{formik.errors.website}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel className="fw-bold" htmlFor="facebook">
            Facebook URL
          </CFormLabel>
          <CFormInput
            placeholder="Facebook URL"
            classfacebook={
              'form-control' +
              (formik.errors.facebook && formik.touched.facebook ? ' is-invalid' : '')
            }
            value={formik.values.facebook}
            onChange={formik.handleChange}
            aria-label="facebook"
            id="facebook"
          />
          <small>
            <i> (Ex: https://www.facebook.com/myclubtap)</i>
          </small>
          {formik.errors.facebook && formik.touched.facebook && (
            <CFormFeedback invalid>{formik.errors.facebook}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel className="fw-bold" htmlFor="facebook">
            Twitter URL
          </CFormLabel>
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
          <small>
            <i> (Ex: https://www.twitter.com/myclubtap)</i>
          </small>
          {formik.errors.twitter && formik.touched.twitter && (
            <CFormFeedback invalid>{formik.errors.twitter}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}>
          <CFormLabel className="fw-bold" htmlFor="facebook">
            Instagram URL
          </CFormLabel>
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
          <small>
            <i> (Ex: https://www.instagram.com/myclubtap)</i>
          </small>
          {formik.errors.instagram && formik.touched.instagram && (
            <CFormFeedback invalid>{formik.errors.instagram}</CFormFeedback>
          )}
        </CCol>
        <CCol md={4}></CCol>
        <CCol md={4}>
          <CFormLabel className="fw-bold" htmlFor="formFile">
            Sponsor Logo
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
        <CCol md={12}>
          <CFormLabel className="fw-bold" htmlFor="Entry Fee Info">
            About
          </CFormLabel>
          <ReactQuill
            theme="snow"
            ref={quillRef}
            value={value}
            onChange={setValue}
            modules={modules}
            style={{ border: '1px solid' }}
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
