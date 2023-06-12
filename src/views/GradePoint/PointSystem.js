import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CButton, CCol, CForm, CFormInput, CLoadingButton, CRow } from '@coreui/react-pro'
import ToastComponent from 'src/components/common/TaostComponent'
import GradeService from 'src/service/GradeService'
import Notify from '../Notify'
import MultiplierModal from './MultiplierModal'
import CopyGradeModal from './CopyGradeModal'
const PointSystem = (props) => {
  const [loader, setLoader] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [handleNo, setHandleNo] = useState(false)
  const [handleYes, setHandleYes] = useState(false)
  const formik = useFormik({
    initialValues: {
      data: props.gradePointData,
    },
    enableReinitialize: true,
    onSubmit: (data, values, { resetForm }) => {
      data.fixtureId = props.gradeId
      setLoader(true)
      resetForm({ values: '' })
      GradeService.updateGradePointSystem(data)
        .then((res) => {
          if (res.status === 200) {
            GradeService.gradePointSystem(props.gradeId).then((res) => {
              props.setGradePointData(res.data)
            })
            setLoader(false)
            ToastComponent(res.message, 'success')
          }
        })
        .catch((e) => {
          setLoader(false)
          ToastComponent(e.response?.data?.message, 'error')
        })
    },
  })
  const handleConfirm = () => {
    setLoader(true)
    GradeService.resetToDefault(props.gradeId)
      .then((res) => {
        if (res.status === 200) {
          GradeService.gradePointSystem(props.gradeId).then((res) => {
            props.setGradePointData(res.data)
            setLoader(false)
          })
          ToastComponent(res.message, 'success')
        }
      })
      .catch((e) => {
        ToastComponent(e.response?.data?.message, 'error')
      })
    return setShowConfirm(false)
  }

  const handleCancel = () => {
    console.log('You clicked No!')
    return setShowConfirm(false)
  }

  const handleReset = (resetForm) => {
    console.log('asdasdasd', resetForm)
    if (window.confirm('Reset?')) {
      resetForm()
    }
  }
  const [visible, setVisible] = useState(false)
  const [copyVisible, setCopyVisible] = useState(false)
  const [gradeList, setGradeList] = useState()
  const handleCopyVisible = () => {
    setCopyVisible(true)
    GradeService.gradeData()
      .then((res) => {
        if (res.status === 200) {
          setLoader(false)
          setGradeList(res.data)
        }
      })
      .catch((e) => {
        ToastComponent(e.response?.data?.message, 'error')
        setLoader(false)
        ToastComponent(e.response?.data?.message, 'error')
      })
  }
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <table className="main-table table innertable">
          <thead>
            <tr>
              <th>Category</th>
              <th>Bowler</th>
              <th>Batsman</th>
              <th>Wicket Keeper</th>
              <th>All Rounder</th>
            </tr>
          </thead>
          <tbody>
            {props.gradePointData &&
              props.gradePointData.map((item, key) => (
                <tr key={key}>
                  <td>{item.attribute_name}</td>
                  <td>
                    <CFormInput
                      name={`data.${key}.bowler`}
                      type={'number'}
                      value={item.bowler}
                      onChange={formik.handleChange}
                      id="bowler"
                      step="any"
                    />
                  </td>
                  <td>
                    <CFormInput
                      name={`data.${key}.bats`}
                      type={'number'}
                      value={item.bats}
                      onChange={formik.handleChange}
                      id="bats"
                    />
                  </td>
                  <td>
                    <CFormInput
                      name={`data.${key}.wk`}
                      type={'number'}
                      value={item.wk}
                      onChange={formik.handleChange}
                      id="wk"
                    />
                  </td>
                  <td>
                    <CFormInput
                      name={`data.${key}.ar`}
                      type={'number'}
                      value={item.ar}
                      onChange={formik.handleChange}
                      id="ar"
                    />
                  </td>
                </tr>
              ))}
            {props.gradePointData.length === 0 && (
              <tr>
                <td colSpan={4}>No record yet available.</td>
              </tr>
            )}
          </tbody>
        </table>
        <CRow>
          <CCol xs={12}>
            <CButton
              type="button"
              className="mb-3 mx-1"
              color={'light'}
              onClick={() => {
                props.toggleDetails(props.gradeId)
              }}
            >
              {'Cancel'}
            </CButton>
            <CButton
              type="button"
              className="mb-3 mx-1"
              color={'danger'}
              onClick={() => setShowConfirm(true)}
            >
              {'Reset to Default'}
            </CButton>
            <CButton
              type="button"
              className="mb-3 mx-1"
              color={'warning'}
              onClick={handleReset.bind(null, formik.resetForm)}
            >
              {'Clear'}
            </CButton>
            <CButton
              type="button"
              className="mb-3 mx-1"
              color={'info'}
              onClick={() => setVisible(!visible)}
            >
              {'Multiplier'}
            </CButton>
            <CButton type="button" className="mb-3 mx-1" color={'dark'} onClick={handleCopyVisible}>
              {'Copy'}
            </CButton>

            <CLoadingButton
              className="mb-3 mx-1"
              type="submit"
              color="success"
              // variant="outline"
              loading={loader}
            >
              Save & Confirm
            </CLoadingButton>
          </CCol>
        </CRow>
      </CForm>
      <Notify
        setShowConfirm={setShowConfirm}
        showConfirm={showConfirm}
        setHandleNo={setHandleNo}
        handleNo={handleNo}
        handleYes={handleYes}
        setHandleYes={setHandleYes}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        text="Are You Sure Want to Reset Default"
      />
      <MultiplierModal
        visible={visible}
        setVisible={setVisible}
        gradeId={props.gradeId}
        toggleDetails={props.toggleDetails}
      />
      <CopyGradeModal
        copyVisible={copyVisible}
        setCopyVisible={setCopyVisible}
        gradeId={props.gradeId}
        gradeList={gradeList}
        toggleDetails={props.toggleDetails}
      />
    </>
  )
}

export default PointSystem
