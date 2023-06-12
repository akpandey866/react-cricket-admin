import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useMemo, useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastComponent from 'src/components/common/TaostComponent'
import GameNotificationservice from 'src/service/GameNotificationService'
import ReactQuill from 'react-quill'
import SponsorService from 'src/service/SponsorService'
const AddForm = (props) => {
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').max(50, '50 Character Limit is allowed.'),
    // message: Yup.string().required('Message is required'),
  })
  const formik = useFormik({
    initialValues: {
      title: '',
      message: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      data.message = value
      setLoader(true)
      GameNotificationservice.saveNotification(data)
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
          setLoader(false)
          console.log('Here is Error', e)
          ToastComponent('Something Went wront. Please try again.', 'error')
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

  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={12}>
          <CFormLabel className="fw-bold" htmlFor="title">
            Title
          </CFormLabel>
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
        <CCol md={12}>
          <CFormLabel className="fw-bold" htmlFor="message">
            Message
          </CFormLabel>
          <ReactQuill
            theme="snow"
            ref={quillRef}
            value={value}
            onChange={setValue}
            modules={modules}
            // style={{ border: '1px solid' }}
          />
          {formik.errors.title && formik.touched.title && (
            <CFormFeedback invalid>{formik.errors.title}</CFormFeedback>
          )}
        </CCol>
        <CCol md={6}>
          <CLoadingButton
            type="submit"
            color="success"
            variant="outline"
            loading={loader}
            disabled={loader}
            id="submit"
          >
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddForm
