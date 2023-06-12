import {
  CCol,
  CDatePicker,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import moment from 'moment'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import React, { useMemo, useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastComponent from 'src/components/common/TaostComponent'
import PreviewImage from '../PreviewImage'
import ArticleService from 'src/service/ArticleService'
import SponsorService from 'src/service/SponsorService'
import ReactQuill from 'react-quill'

const AddForm = (props) => {
  const [loader, setLoader] = useState(false)
  const [date, setDate] = useState('')
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').max(50, '50 Character Limit is allowed.'),
    // date: Yup.string().required('Date is required'),
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
    thumb_image: Yup.mixed()
      .nullable()
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

  const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif']
  const formik = useFormik({
    initialValues: {
      title: '',
      external_link: '',
      // date: '',
      description: '',
      image: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      var formData = new FormData()
      formData.append('title', data.title)
      // formData.append('date', date)
      formData.append('description', value)
      formData.append('external_link', data.external_link)
      formData.append('image', data.image)
      formData.append('thumb_image', data.thumb_image)
      setLoader(true)
      ArticleService.saveArticle(formData)
        .then((res) => {
          if (res.status === 200) {
            props.setUsers((current) => [...current, res.data])
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
  const handleDateChange = (event) => {
    const dateFormat = moment(event).format('YYYY-MM-DD')
    setDate(dateFormat)
  }
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
  const clearDate = () => {
    console.log('close date')
  }

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
          <CFormLabel className="fw-bold" htmlFor="grade">
            Title *
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

        <CCol md={4}>
          <CFormLabel className="fw-bold" htmlFor="external link">
            External Link
          </CFormLabel>
          <CFormInput
            placeholder="External Link"
            className={
              'form-control' +
              (formik.errors.external_link && formik.touched.external_link ? ' is-invalid' : '')
            }
            defaultValue={formik.values.external_link}
            onChange={formik.handleChange}
            aria-label="external_link"
            id="external_link"
          />
          {formik.errors.external_link && formik.touched.external_link && (
            <CFormFeedback invalid>{formik.errors.external_link}</CFormFeedback>
          )}
        </CCol>

        <CCol md={4}>
          <div className="mb-3">
            <CFormLabel className="fw-bold" htmlFor="formFile">
              Article Header
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
          </div>
          <CRow>
            <CCol md={4}>
              <CCol md={4}>
                {' '}
                {formik.values.image ? (
                  <PreviewImage
                    className={{ margin: 'auto' }}
                    width={100}
                    height={100}
                    file={formik.values.image}
                  />
                ) : null}
              </CCol>
            </CCol>
          </CRow>
        </CCol>
        <CCol md={4}>
          <div className="mb-3">
            <CFormLabel className="fw-bold" htmlFor="formFile">
              Thumb Image
            </CFormLabel>
            <CFormInput
              type="file"
              id="formFile"
              name="thumb_image"
              className={
                formik.touched.thumb_image
                  ? formik.errors.thumb_image
                    ? 'form-control input_user is-invalid'
                    : 'form-control input_user is-valid'
                  : 'form-control'
              }
              onChange={(event) => {
                formik.setTouched({
                  ...formik.touched,
                  thumb_image: true,
                })
                formik.setFieldValue('thumb_image', event.target.files[0])
              }}
            />
            {formik.touched.thumb_image && formik.errors.thumb_image ? (
              <CFormFeedback invalid>{formik.errors.thumb_image}</CFormFeedback>
            ) : null}
          </div>
          <CRow>
            <CCol md={4}>
              {formik.values.thumb_image ? (
                <PreviewImage
                  className={{ margin: 'auto' }}
                  width={100}
                  height={100}
                  file={formik.values.thumb_image}
                />
              ) : null}
            </CCol>
          </CRow>
        </CCol>

        <CCol md={4}></CCol>
        <CCol md={12}>
          <CFormLabel className="fw-bold" htmlFor="Entry Fee Info">
            Description
          </CFormLabel>
          <ReactQuill
            theme="snow"
            ref={quillRef}
            value={value}
            onChange={setValue}
            modules={modules}
            // style={{ border: '1px solid' }}
          />
        </CCol>
        <CCol md={6}></CCol>
        <CCol md={6}></CCol>
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
