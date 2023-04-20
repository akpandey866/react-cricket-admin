import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CTableHeaderCell,
  CLoadingButton,
  CTableRow,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ToastComponent from 'src/components/common/TaostComponent'
import FeedbackFantasyService from 'src/service/FeedbackFantasyService'
import Loader from 'src/components/Loader'

const PointSystem = () => {
  const [pointSystemDetail, setPointSystemDetail] = useState()
  const [loader, setLoader] = useState(false)
  const param = useParams()
  useEffect(() => {
    setLoader(true)
    FeedbackFantasyService.feedbackPointSystem()
      .then((res) => {
        if (res.status === 200) {
          setLoader(false)
          setPointSystemDetail(res.data)
        }
      })
      .catch((e) => {
        console.log('error is here', e)
        setLoader(false)
      })
  }, [param.fixtureId])
  const formik = useFormik({
    initialValues: {
      data: pointSystemDetail,
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      setLoader(true)
      FeedbackFantasyService.saveFeedbackPointSystem(data)
        .then((res) => {
          if (res.status === 200) {
            setPointSystemDetail(res.data)
            setLoader(false)
            ToastComponent(res.message, 'success')
          }
        })
        .catch((e) => {
          setLoader(false)
          console.log('Error - ', e)
        })
    },
  })

  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CRow>
          <CCol xs={12}>
            <CCard className="">
              <CCardHeader>
                <strong>Feedback Point System</strong>
              </CCardHeader>
              <CCardBody>
                {loader ? (
                  <Loader />
                ) : (
                  <div className="table-responsive">
                    <table className="main-table table innertable">
                      <thead>
                        <tr>
                          <th>Rating</th>
                          <th>Rating Description</th>
                          <th>Fantasy Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pointSystemDetail &&
                          pointSystemDetail.map((item, key) => (
                            <CTableRow key={key}>
                              <CTableHeaderCell>{item.name} Star</CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  name={`data[${key}]description`}
                                  defaultValue={item.description}
                                  onChange={formik.handleChange}
                                  id="description"
                                />
                              </CTableHeaderCell>
                              <CTableHeaderCell>
                                <CFormInput
                                  name={`data[${key}]points`}
                                  defaultValue={item.points}
                                  onChange={formik.handleChange}
                                  id="points"
                                />
                              </CTableHeaderCell>
                            </CTableRow>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={6}>
            <CLoadingButton
              type="submit"
              color="success"
              variant="outline"
              loading={loader}
              className="mt-2"
            >
              Submit
            </CLoadingButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default PointSystem
