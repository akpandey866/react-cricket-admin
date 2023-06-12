import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import SponsorService from 'src/service/SponsorService'
import ToastComponent from 'src/components/common/TaostComponent'
import PreviewImage from '../PreviewImage'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
const EditForm = (props) => {
  const [sponsorDetail, setSponsorDetail] = useState({})
  const [value, setValue] = useState()
  useEffect(() => {
    if (props.selectedId === props.sponsorId) {
      SponsorService.getSponsorDetail(props.sponsorId)
        .then((res) => {
          if (res.status === 200) {
            setSponsorDetail(res.data)
            setValue(res.data.about)
          }
        })
        .catch((e) => {
          console.log('Catch Block', e)
        })
    }
  }, [props])

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
      name: sponsorDetail?.name,
      website: sponsorDetail?.website,
      facebook: sponsorDetail?.facebook,
      twitter: sponsorDetail?.twitter,
      instagram: sponsorDetail?.instagram,
      about: sponsorDetail?.about,
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
      formData.append('about', value)
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
        <CCol md={12}>
          <CFormLabel htmlFor="Entry Fee Info">About</CFormLabel>
          <ReactQuill
            theme="snow"
            ref={quillRef}
            value={value}
            onChange={setValue}
            modules={modules}
            style={{ border: '1px solid' }}
          />
        </CCol>
        <CCol md={6} className="mt-3">
          <CLoadingButton type="submit" color="success" variant="outline" loading={loader}>
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default EditForm
