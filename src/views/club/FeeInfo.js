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
import SponsorService from 'src/service/SponsorService'
import { useMemo } from 'react'
import ReactQuill from 'react-quill'
import { useRef } from 'react'
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
      data.entry_fee_info = value
      data.message = messageValue
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

  // Editor code here.
  const [value, setValue] = useState(props.userDetail.entry_fee_info)
  const [messageValue, setMessageValue] = useState(props.userDetail.message)
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
    <CForm className="row g-3" onSubmit={formik.handleSubmit}>
      <CCol md={12}>
        <CFormLabel className="fw-bold" htmlFor="Entry Fee">
          Entry Fee
        </CFormLabel>
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
        <CFormLabel className="fw-bold" htmlFor="Entry Fee Info">
          Entry Fee Information
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
      <CCol md={12}>
        <CFormLabel className="fw-bold" htmlFor="About Game">
          Welcome Message For Members
        </CFormLabel>
        <ReactQuill
          theme="snow"
          ref={quillRef}
          value={messageValue}
          onChange={setMessageValue}
          modules={modules}
          // style={{ border: '1px solid' }}
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
