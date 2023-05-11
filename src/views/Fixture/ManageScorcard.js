import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
import ScorecardService from 'src/service/ScorecardService'
import moment from 'moment'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import ImageGallary from '../ImageGallary/ImageGallary'
const ManageScorcard = () => {
  const [fixtureDetails, setFixtureDetails] = useState({})
  const [loader, setLoader] = useState(false)
  const param = useParams()
  useEffect(() => {
    setLoader(true)
    ScorecardService.manageScorecard(param.fixtureId)
      .then((res) => {
        if (res.status === 200) {
          setLoader(false)
          setFixtureDetails(res.data)
        }
      })
      .catch((e) => {
        ToastComponent('Something went wrong. Please try again.', 'error')
        setLoader(false)
      })
    setLoader(false)
  }, [param.fixtureId])
  const [imgArray, setImgArray] = useState([])
  const formik = useFormik({
    initialValues: {
      scorcard_link_name: fixtureDetails?.scorcard_link_name,
      scorcard_link_url: fixtureDetails?.scorcard_link_url,
      fall_of_wickets: fixtureDetails?.fall_of_wickets,
      match_report: fixtureDetails?.match_report,
    },
    enableReinitialize: true,
    //validationSchema,
    onSubmit: (data) => {
      console.log(imgArray)
      var formData = new FormData()
      Array.from(imgArray).forEach((image) => {
        formData.append('player_card[]', image)
      })
      formData.append('scorcard_link_name', data.scorcard_link_name)
      formData.append('scorcard_link_url', data.scorcard_link_url)
      formData.append('fixtureId', param.fixtureId)
      formData.append('fall_of_wickets', description.htmlValue)
      formData.append('match_report', matchReport.htmlValue)
      setLoader(true)
      ScorecardService.manageUpdateScorecard(formData)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
          } else {
            setLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          console.log('Here is Error', e)
          ToastComponent('Something Went wront. Please try again.', 'error')
        })
    },
  })
  const [description, setDescription] = useState({
    htmlValue: fixtureDetails?.fall_of_wickets,
    editorState: EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(fixtureDetails?.fall_of_wickets ?? '')),
    ),
  })
  const onEditorStateChange = (editorValue) => {
    const editorStateInHtml = draftToHtml(convertToRaw(editorValue.getCurrentContent()))

    setDescription({
      htmlValue: editorStateInHtml,
      editorState: editorValue,
    })
  }

  const [matchReport, setMatchReport] = useState({
    htmlValue: fixtureDetails?.fall_of_wickets ?? '',
    editorMessageState: EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(fixtureDetails?.fall_of_wickets ?? '')),
    ),
  })
  const onEditorMatchReportStateChange = (editorValue) => {
    const editorStateInHtml = draftToHtml(convertToRaw(editorValue.getCurrentContent()))

    setMatchReport({
      htmlValue: editorStateInHtml,
      editorMatchReportState: editorValue,
    })
  }

  const [images, setImages] = useState([])

  const handleMultipleImages = (evnt) => {
    const selectedFIles = []
    const selectedUploadFIles = []
    const targetFiles = evnt.target.files
    const targetFilesObject = [...targetFiles]
    const targetFilesUploadObject = [...targetFiles]
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file))
    })
    setImages(selectedFIles)
    targetFilesUploadObject.map((file, i) => {
      return selectedUploadFIles.push(file)
    })
    setImgArray(selectedUploadFIles)
  }
  return (
    <>
      <CRow>
        <CCol xs={6} md={3} className="mb-3">
          {'Team: '} {fixtureDetails?.team_name}
        </CCol>
        <CCol xs={6} md={3} className="mb-3">
          {'Comp: '}
          {fixtureDetails?.grade}
        </CCol>
        <CCol xs={6} md={3} className="mb-3">
          {'Start Date: '}
          {moment(fixtureDetails?.start_date).format('D.MM.YYYY')}
        </CCol>
        <CCol xs={6} md={3} className="mb-3">
          {'End Date: '}
          {moment(fixtureDetails?.end_date).format('D.MM.YYYY')}
        </CCol>

        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol xs={10}>
                  <strong>Manage Scorecard</strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3" onSubmit={formik.handleSubmit}>
                <CCol md={6}>
                  <CFormLabel htmlFor="scorcard_link_name">Upload Match Scorecards</CFormLabel>{' '}
                  <CFormInput
                    type="file"
                    id="formFile"
                    name="image"
                    className={'form-control'}
                    onChange={handleMultipleImages}
                    multiple
                  />
                  <ImageGallary images={images} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="scorcard_link_name">Scorecard Source</CFormLabel>
                  <CFormInput
                    placeholder="Scorecard Source"
                    className={
                      'form-control' +
                      (formik.errors.scorcard_link_name && formik.touched.scorcard_link_name
                        ? ' is-invalid'
                        : '')
                    }
                    defaultValue={formik.values.scorcard_link_name}
                    onChange={formik.handleChange}
                    aria-label="scorcard_link_name"
                    id="scorcard_link_name"
                  />
                  {formik.errors.scorcard_link_name && formik.touched.scorcard_link_name && (
                    <CFormFeedback invalid>{formik.errors.scorcard_link_name}</CFormFeedback>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="scorcard_link_url">Scorecard Link</CFormLabel>
                  <CFormInput
                    placeholder="Scorecard Link"
                    className={
                      'form-control' +
                      (formik.errors.scorcard_link_url && formik.touched.scorcard_link_url
                        ? ' is-invalid'
                        : '')
                    }
                    defaultValue={formik.values.scorcard_link_url}
                    onChange={formik.handleChange}
                    aria-label="scorcard_link_url"
                    id="scorcard_link_url"
                  />
                  {formik.errors.scorcard_link_url && formik.touched.scorcard_link_url && (
                    <CFormFeedback invalid>{formik.errors.scorcard_link_url}</CFormFeedback>
                  )}
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="fall_of_wicket">Fall of Wickets</CFormLabel>
                  <Editor
                    toolbarHidden={false}
                    editorState={description.editorState}
                    onEditorStateChange={onEditorStateChange}
                    editorStyle={{ border: '1px solid', height: '150px' }}
                  />
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="match_report">Add Match Report</CFormLabel>
                  <Editor
                    toolbarHidden={false}
                    editorState={matchReport.editorMatchReportState}
                    onEditorStateChange={onEditorMatchReportStateChange}
                    editorStyle={{ border: '1px solid', height: '150px' }}
                  />
                  {formik.errors.match_report && formik.touched.match_report && (
                    <CFormFeedback invalid>{formik.errors.match_report}</CFormFeedback>
                  )}
                </CCol>
                <CCol md={6}>
                  <CLoadingButton
                    type="submit"
                    color="success"
                    variant="outline"
                    loading={loader}
                    id="submit"
                  >
                    Submit
                  </CLoadingButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ManageScorcard
