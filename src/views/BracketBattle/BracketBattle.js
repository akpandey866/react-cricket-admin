import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CLoadingButton,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react-pro'
import { useEffect } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import BracketBattleService from 'src/service/BracketBattleService'
import ToastComponent from 'src/components/common/TaostComponent'
import { Link } from 'react-router-dom'
const BracketBattle = () => {
  const [loading, setLoading] = useState(false)
  const [bracketDetails, setBracketDetails] = useState([])
  const [structureValue, setStructureValue] = useState(0)
  useEffect(() => {
    setLoading(true)
    BracketBattleService.listing().then((result) => {
      setBracketDetails(result.bracket_details)
      setStructureValue(result.bracket_details?.structure)
      setLoading(false)
    })
  }, [])
  console.log('sasdasd', structureValue)
  const [loader, setLoader] = useState(false)

  const validationSchema = Yup.object().shape({
    structure: Yup.string().required('Please select Structure.'),
    bracket_name: Yup.string().required('Please enter bracket name.'),
    about: Yup.string().required('Please write about bracket battle.'),
  })
  const formik = useFormik({
    initialValues: {
      structure: bracketDetails?.structure,
      bracket_name: bracketDetails?.bracket_name,
      about: bracketDetails?.about,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      // data.structure = structureValue
      setLoader(true)
      BracketBattleService.saveOrUpdateBracketBattle(data)
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
  const handleChange = (e) => {
    setStructureValue(e.target.value)
  }
  let structures = [
    {
      id: 8,
      value: 8,
    },
    {
      id: 16,
      value: 16,
    },
    {
      id: 32,
      value: 32,
    },
    {
      id: 64,
      value: 64,
    },
    {
      id: 128,
      value: 128,
    },
  ]
  return (
    <CRow>
      <CAccordion activeItemKey={1}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            {' '}
            <strong>Create Bracket Battle</strong>
          </CAccordionHeader>
          <CAccordionBody>
            <CForm className="row g-3" onSubmit={formik.handleSubmit}>
              <CCol md={6}>
                <CFormLabel htmlFor="structure">Select Your Bracket Battle Stucture</CFormLabel>
                <CFormSelect
                  aria-label="Select Structure"
                  name="structure"
                  className={
                    'form-control' +
                    (formik.errors.structure && formik.touched.structure ? ' is-invalid' : '')
                  }
                  // value={structureValue}
                  // onChange={handleChange}
                  value={formik.values.structure}
                  onChange={formik.handleChange}
                  id="structure"
                >
                  <option value="">Select Your Bracket Battle Structure</option>
                  {structures.map((index, key) => (
                    <option value={index.value} key={key}>
                      {index.value}
                    </option>
                  ))}
                </CFormSelect>

                {formik.errors.structure && formik.touched.structure && (
                  <CFormFeedback invalid>{formik.errors.structure}</CFormFeedback>
                )}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="structure">Bracket Name</CFormLabel>
                <CFormInput
                  className={
                    'form-control' +
                    (formik.errors.bracket_name && formik.touched.bracket_name ? ' is-invalid' : '')
                  }
                  defaultValue={formik.values.bracket_name}
                  onChange={formik.handleChange}
                  aria-label="bracket_name"
                  id="bracket_name"
                />
                {formik.errors.bracket_name && formik.touched.bracket_name && (
                  <CFormFeedback invalid>{formik.errors.bracket_name}</CFormFeedback>
                )}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="structure">About Your Bracket Battle</CFormLabel>
                <CFormTextarea
                  aria-label="about"
                  className={
                    'form-control' +
                    (formik.errors.about && formik.touched.about ? ' is-invalid' : '')
                  }
                  defaultValue={formik.values.about}
                  onChange={formik.handleChange}
                  id="about"
                ></CFormTextarea>
                {formik.errors.about && formik.touched.about && (
                  <CFormFeedback invalid>{formik.errors.about}</CFormFeedback>
                )}
              </CCol>
              <CCol md={6}></CCol>
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
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

export default BracketBattle
