import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CLoadingButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import PlayerService from 'src/service/PlayerService'
import { useNavigate } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
import PreviewImage from '../PreviewImage'
import ReactQuill from 'react-quill'
import { useMemo } from 'react'
import SponsorService from 'src/service/SponsorService'
import { useRef } from 'react'
const EditForm = (props) => {
  const [position, setPosition] = useState()
  const [team, setTeam] = useState()
  const [playerValue, setPlayerValue] = useState()
  const [batStyle, setBatStyle] = useState()
  const [bowlStyle, setBowlStyle] = useState()
  const [playerDetail, setPlayerDetail] = useState()
  useEffect(() => {
    if (props.selectedPlayerId === props.playerId) {
      PlayerService.getPlayerDetail(props.playerId).then((res) => {
        if (res.status === 200) {
          setPlayerDetail(res.player_data)
          setPosition(res.position)
          setTeam(res.teamList)
          setPlayerValue(res.value)
          setBatStyle(res.batStyle)
          setBowlStyle(res.bowlStyle)
          setValue(res.player_data.description)
        }
      })
    }
  }, [props])

  const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif']
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required('First Name is required')
      .max(50, '50 Character Limit is allowed.'),
    last_name: Yup.string()
      .required('Last Name is required')
      .max(50, '50 Character Limit is allowed.'),
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
    sponsor_image: Yup.mixed()
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
      first_name: playerDetail?.first_name,
      last_name: playerDetail?.last_name,
      position: playerDetail?.position,
      svalue: playerDetail?.svalue,
      team: playerDetail?.team_id,
      bowl_style: playerDetail?.bowl_style,
      bat_style: playerDetail?.bat_style,
      sponsor_link: playerDetail?.sponsor_link,
      external_profile_label: playerDetail?.external_profile_label,
      external_profile_link: playerDetail?.external_profile_link,
      description: playerDetail?.description,
      image: null,
      sponsor_image: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      // data.playerId = props.playerId
      var formData = new FormData()
      formData.append('playerId', props.playerId)
      formData.append('bat_style', data.bat_style)
      formData.append('bowl_style', data.bowl_style)
      formData.append('first_name', data.first_name)
      formData.append('last_name', data.last_name)
      formData.append('position', data.position)
      formData.append('team', data.team)
      formData.append('value', data.svalue)
      formData.append('image', data.image)
      formData.append('sponsor_image', data.sponsor_image)
      formData.append('sponsor_link', data.sponsor_link)
      formData.append('description', value)
      formData.append('external_profile_label', data.external_profile_label)
      formData.append('external_profile_link', data.external_profile_link)
      setLoader(true)
      PlayerService.editPlayer(formData)
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

  // Editor code here.
  const [value, setValue] = useState(props.sponsorDetail?.about)
  const quillRef = useRef()
  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor()
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
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="grade">
            First Name *
          </CFormLabel>
          <CFormInput
            placeholder="First Name"
            className={
              'form-control' +
              (formik.errors.first_name && formik.touched.first_name ? ' is-invalid' : '')
            }
            defaultValue={formik.values.first_name}
            onChange={formik.handleChange}
            aria-label="first_name"
            id="first_name"
          />
          {formik.errors.first_name && formik.touched.first_name && (
            <CFormFeedback invalid>{formik.errors.first_name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="last_name">
            Last Name *
          </CFormLabel>
          <CFormInput
            placeholder="Last Name"
            className={
              'form-control' +
              (formik.errors.last_name && formik.touched.last_name ? ' is-invalid' : '')
            }
            defaultValue={formik.values.last_name}
            onChange={formik.handleChange}
            aria-label="last_name"
            id="last_name"
          />
          {formik.errors.last_name && formik.touched.last_name && (
            <CFormFeedback invalid>{formik.errors.last_name}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="position">
            Position *
          </CFormLabel>
          <CFormSelect
            aria-label="select position"
            name="position"
            className={
              'form-control' +
              (formik.errors.position && formik.touched.position ? ' is-invalid' : '')
            }
            value={formik.values.position}
            onChange={formik.handleChange}
            id="position"
          >
            <option value={0}>Select Position</option>
            {position &&
              position.map((item, key) => (
                <option value={item?.id} key={key}>
                  {item?.name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.position && formik.touched.position && (
            <CFormFeedback invalid>{formik.errors.position}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="Value">
            Value *
          </CFormLabel>
          <CFormSelect
            aria-label="Select Team"
            name="value"
            className={
              'form-control' + (formik.errors.value && formik.touched.value ? ' is-invalid' : '')
            }
            value={formik.values.svalue}
            onChange={formik.handleChange}
            id="value"
          >
            <option value={0}>Select value</option>
            {playerValue &&
              playerValue.map((item, key) => (
                <option value={item?.id} key={key}>
                  {item?.price_name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.value && formik.touched.value && (
            <CFormFeedback invalid>{formik.errors.value}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="Team">
            Team
          </CFormLabel>
          <CFormSelect
            aria-label="Select Team"
            name="team"
            className={
              'form-control' + (formik.errors.team && formik.touched.team ? ' is-invalid' : '')
            }
            value={formik.values.team}
            onChange={formik.handleChange}
            id="team"
          >
            <option value={0}>Select Team</option>
            {team &&
              team.map((item, key) => (
                <option value={item?.id} key={key}>
                  {item?.name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.team && formik.touched.team && (
            <CFormFeedback invalid>{formik.errors.team}</CFormFeedback>
          )}
        </CCol>

        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="bat Style">
            Bat Style
          </CFormLabel>
          <CFormSelect
            aria-label="Select Bat Style"
            name="bat_style"
            className={
              'form-control' +
              (formik.errors.bat_style && formik.touched.bat_style ? ' is-invalid' : '')
            }
            value={formik.values.bat_style}
            onChange={formik.handleChange}
            id="bat_style"
          >
            <option value={0}>Select Bat Style</option>
            {batStyle &&
              batStyle.map((item, key) => (
                <option value={item?.id} key={key}>
                  {item?.name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.bat_style && formik.touched.bat_style && (
            <CFormFeedback invalid>{formik.errors.bat_style}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="Bowl Style">
            Bowl Style
          </CFormLabel>
          <CFormSelect
            aria-label="Select Bowl Style"
            name="bowl_style"
            className={
              'form-control' +
              (formik.errors.bowl_style && formik.touched.bowl_style ? ' is-invalid' : '')
            }
            value={formik.values.bowl_style}
            onChange={formik.handleChange}
            id="bowl_style"
          >
            <option value={0}>Select bowl Style</option>
            {bowlStyle &&
              bowlStyle.map((item, key) => (
                <option value={item?.id} key={key}>
                  {item?.name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.bowl_style && formik.touched.bowl_style && (
            <CFormFeedback invalid>{formik.errors.bowl_style}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="grade">
            Player Sponsor Link
          </CFormLabel>
          <CFormInput
            placeholder="Sponsor Link"
            className={
              'form-control' +
              (formik.errors.sponsor_link && formik.touched.sponsor_link ? ' is-invalid' : '')
            }
            defaultValue={formik.values.sponsor_link}
            onChange={formik.handleChange}
            aria-label="sponsor_link"
            id="sponsor_link"
          />
          {formik.errors.sponsor_link && formik.touched.sponsor_link && (
            <CFormFeedback invalid>{formik.errors.sponsor_link}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="logo">
            Player Sponsor Logo{' '}
          </CFormLabel>
          <CFormInput
            type="file"
            id="formFile"
            name="sponsor_image"
            className={
              formik.touched.sponsor_image
                ? formik.errors.sponsor_image
                  ? 'form-control input_user is-invalid'
                  : 'form-control input_user is-valid'
                : 'form-control'
            }
            onChange={(event) => {
              formik.setTouched({
                ...formik.touched,
                sponsor_image: true,
              })
              formik.setFieldValue('sponsor_image', event.target.files[0])
            }}
          />
          <br></br>
          {formik.values.sponsor_image ? (
            <PreviewImage
              className={{ margin: 'auto' }}
              width={100}
              height={100}
              file={formik.values.sponsor_image}
            />
          ) : null}
          {formik.touched.sponsor_image && formik.errors.sponsor_image ? (
            <CFormFeedback invalid>{formik.errors.sponsor_image}</CFormFeedback>
          ) : null}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="image">
            Player Photo
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
          <br></br>
          {formik.values.image ? (
            <PreviewImage
              className={{ margin: 'auto' }}
              width={100}
              height={100}
              file={formik.values.image}
            />
          ) : null}
          {formik.touched.image && formik.errors.image ? (
            <CFormFeedback invalid>{formik.errors.image}</CFormFeedback>
          ) : null}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="grade">
            External Profile Label
          </CFormLabel>
          <CFormInput
            placeholder="External Profile Label"
            className={
              'form-control' +
              (formik.errors.external_profile_label && formik.touched.external_profile_label
                ? ' is-invalid'
                : '')
            }
            defaultValue={formik.values.external_profile_label}
            onChange={formik.handleChange}
            aria-label="external_profile_label"
            id="external_profile_label"
          />
          {formik.errors.external_profile_label && formik.touched.external_profile_label && (
            <CFormFeedback invalid>{formik.errors.external_profile_label}</CFormFeedback>
          )}
        </CCol>
        <CCol md={3}>
          <CFormLabel className="fw-bold" htmlFor="grade">
            External Profile Link
          </CFormLabel>
          <CFormInput
            placeholder="External Profile Link
"
            className={
              'form-control' +
              (formik.errors.external_profile_link && formik.touched.external_profile_link
                ? ' is-invalid'
                : '')
            }
            defaultValue={formik.values.external_profile_link}
            onChange={formik.handleChange}
            aria-label="external_profile_link"
            id="external_profile_link"
          />
          {formik.errors.external_profile_label && formik.touched.external_profile_label && (
            <CFormFeedback invalid>{formik.errors.external_profile_label}</CFormFeedback>
          )}
        </CCol>
        <CCol md={12}>
          <CFormLabel className="fw-bold" htmlFor="description">
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
