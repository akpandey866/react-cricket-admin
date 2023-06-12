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
import GamePrizeService from 'src/service/GamePrizeService'
import ToastComponent from 'src/components/common/TaostComponent'
import PreviewImage from '../PreviewImage'
import SponsorService from 'src/service/SponsorService'
import { useRef } from 'react'
import { useMemo } from 'react'
import ReactQuill from 'react-quill'
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
      about: '',
      image: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      var formData = new FormData()
      formData.append('name', data.name)
      formData.append('about', value)
      formData.append('image', data.image)
      setLoader(true)
      GamePrizeService.savePrize(formData)
        .then((res) => {
          if (res.status === 200) {
            props.setUsers(res.data)
            ToastComponent(res.message, 'success')
            setLoader(false)
          }
        })
        .catch((e) => {
          console.log('E=>', e)
          ToastComponent('Something went wrong', 'error')
          setLoader(false)
        })
    },
  })
  // Editor code here.
  const [value, setValue] = useState(props.sponsorDetail?.about)
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
        <CCol md={12}>
          <CFormLabel className="fw-bold" htmlFor="name">
            Prize Name
          </CFormLabel>
          <CFormInput
            placeholder="Prize Name"
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
        <CCol md={12}>
          <CFormLabel className="fw-bold" htmlFor="Entry Fee Info">
            Prize Description
          </CFormLabel>

          <ReactQuill
            theme="snow"
            ref={quillRef}
            value={value}
            onChange={setValue}
            modules={modules}
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

export default AddForm
