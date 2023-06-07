import {
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CLoadingButton,
} from '@coreui/react-pro'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import ToastComponent from 'src/components/common/TaostComponent'
import PlayerService from 'src/service/PlayerService'
import { useEffect } from 'react'

const PlayerStructure = (props) => {
  useEffect(() => {
    PlayerService.getPlayerStructureInfo()
      .then((res) => {
        if (res.status === 200) {
          props.setPlayerStructureDetails(res.data)
        }
      })
      .catch((e) => {
        console.log('E=> ', e)
        ToastComponent(e.response?.data?.message, 'error')
      })
  }, [])
  const [loader, setLoader] = useState(false)
  const validationSchema = Yup.object().shape({
    min_bat: Yup.number()
      .min(1, 'Minimum value of 1 is required')
      .required('Min Batsman is required'),
    max_bat: Yup.number()
      .min(1, 'Maximum cannot be less than Minimum')
      .required('Max Batsman is required'),

    min_bowl: Yup.number()
      .min(1, 'Minimum value of 1 is required')
      .required('Min Bowler is required'),
    max_bowl: Yup.number()
      .min(1, 'Maximum cannot be less than Minimum')
      .required('Max Bowler is required'),
    min_ar: Yup.number()
      .min(1, 'Minimum value of 1 is required')
      .required('Min All-Rounder is required'),
    max_ar: Yup.number()
      .min(1, 'Maximum cannot be less than Minimum')
      .required('Max All-Rounder is required'),
    min_wk: Yup.number()
      .min(1, 'Minimum value of 1 is required')
      .required('Min Wicket Keeper is required'),
    max_wk: Yup.number()
      .min(1, 'Maximum cannot be less than Minimum')
      .required('Max Wicket Keeper is required'),
  })
  const formik = useFormik({
    initialValues: {
      min_bat: props.playerStructuredetails?.min_bats,
      max_bat: props.playerStructuredetails?.max_bats,
      min_bowl: props.playerStructuredetails?.min_bowls,
      max_bowl: props.playerStructuredetails?.max_bowls,
      min_ar: props.playerStructuredetails?.min_ar,
      max_ar: props.playerStructuredetails?.max_ar,
      min_wk: props.playerStructuredetails?.min_wks,
      max_wk: props.playerStructuredetails?.max_wks,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data) => {
      setLoader(true)
      PlayerService.savePlayerStructure(data)
        .then((res) => {
          if (res.status === 200) {
            ToastComponent(res.message, 'success')
            setLoader(false)
          }
        })
        .catch((e) => {
          console.log('Here is Error', e)
          ToastComponent('Something Went wront. Please try again.', 'error')
        })
    },
  })
  return (
    <CCol xs={12}>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <p className="text-medium-emphasis small">
          You can set your own player selection limits for each position here. If no change is
          required, you can leave the default limits as currently set below.
        </p>

        <CInputGroup className="mb-3 fw-bold">
          <CInputGroupText className="fw-bold w-23" style={{ width: '170px' }}>
            Min Bat
          </CInputGroupText>
          <CFormInput
            placeholder="Min Bat"
            className={
              'form-control' +
              (formik.errors.min_bat && formik.touched.min_bat ? ' is-invalid' : '')
            }
            defaultValue={formik.values.min_bat}
            onChange={formik.handleChange}
            aria-label="min_bat"
            id="min_bat"
          />

          <CInputGroupText className="fw-bold">-</CInputGroupText>
          <CFormInput
            placeholder="Max Bat"
            className={
              'form-control' +
              (formik.errors.max_bat && formik.touched.max_bat ? ' is-invalid' : '')
            }
            defaultValue={formik.values.max_bat}
            onChange={formik.handleChange}
            aria-label="max_bat"
            id="max_bat"
          />
          <CInputGroupText className="fw-bold" style={{ width: '170px' }}>
            Max Bat
          </CInputGroupText>
          {formik.errors.max_bat && formik.touched.max_bat && (
            <CFormFeedback invalid>{formik.errors.max_bat}</CFormFeedback>
          )}
          {formik.errors.max_bat && formik.touched.max_bat && (
            <CFormFeedback invalid className="d-inline-block">
              {formik.errors.max_bat}
            </CFormFeedback>
          )}
        </CInputGroup>

        <CInputGroup className="mb-3 fw-bold">
          <CInputGroupText className="fw-bold" style={{ width: '170px' }}>
            Min Bowl
          </CInputGroupText>
          <CFormInput
            placeholder="Min Bowler"
            className={
              'form-control' +
              (formik.errors.min_bowl && formik.touched.min_bowl ? ' is-invalid' : '')
            }
            defaultValue={formik.values.min_bowl}
            onChange={formik.handleChange}
            aria-label="min_bowl"
            id="min_bowl"
          />

          <CInputGroupText className="fw-bold">-</CInputGroupText>
          <CFormInput
            placeholder="Max Bowler"
            className={
              'form-control' +
              (formik.errors.max_bowl && formik.touched.max_bowl ? ' is-invalid' : '')
            }
            defaultValue={formik.values.max_bowl}
            onChange={formik.handleChange}
            aria-label="max_bowl"
            id="max_bowl"
          />

          <CInputGroupText className="fw-bold" style={{ width: '170px' }}>
            Max Bowl
          </CInputGroupText>
          {formik.errors.min_bowl && formik.touched.min_bowl && (
            <CFormFeedback invalid>{formik.errors.min_bowl}</CFormFeedback>
          )}
          {formik.errors.max_bowl && formik.touched.max_bowl && (
            <CFormFeedback invalid>{formik.errors.max_bowl}</CFormFeedback>
          )}
        </CInputGroup>

        <CInputGroup className="mb-3 fw-bold">
          <CInputGroupText className="fw-bold w-22" style={{ width: '170px' }}>
            Min AR
          </CInputGroupText>
          <CFormInput
            placeholder="Min All-Rounder"
            className={
              'form-control' + (formik.errors.min_ar && formik.touched.min_ar ? ' is-invalid' : '')
            }
            defaultValue={formik.values.min_ar}
            onChange={formik.handleChange}
            aria-label="min_ar"
            id="min_ar"
          />

          <CInputGroupText className="fw-bold">-</CInputGroupText>
          <CFormInput
            placeholder="Max All-Rounder"
            className={
              'form-control' + (formik.errors.max_ar && formik.touched.max_ar ? ' is-invalid' : '')
            }
            defaultValue={formik.values.max_ar}
            onChange={formik.handleChange}
            aria-label="max_ar"
            id="max_ar"
          />

          <CInputGroupText className="fw-bold" style={{ width: '170px' }}>
            Max AR
          </CInputGroupText>
          {formik.errors.min_ar && formik.touched.min_ar && (
            <CFormFeedback invalid>{formik.errors.min_ar}</CFormFeedback>
          )}
          {formik.errors.max_ar && formik.touched.max_ar && (
            <CFormFeedback invalid>{formik.errors.max_ar}</CFormFeedback>
          )}
        </CInputGroup>

        <CInputGroup className="mb-3 fw-bold">
          <CInputGroupText className="fw-bold" style={{ width: '170px' }}>
            Min WK
          </CInputGroupText>
          <CFormInput
            placeholder="Min Wicket Keeper"
            className={
              'form-control' + (formik.errors.min_wk && formik.touched.min_wk ? ' is-invalid' : '')
            }
            defaultValue={formik.values.min_wk}
            onChange={formik.handleChange}
            aria-label="min_wk"
            id="min_wk"
          />

          <CInputGroupText className="fw-bold">-</CInputGroupText>
          <CFormInput
            placeholder="Max Wicket Keeper"
            className={
              'form-control' + (formik.errors.max_wk && formik.touched.max_wk ? ' is-invalid' : '')
            }
            defaultValue={formik.values.max_wk}
            onChange={formik.handleChange}
            aria-label="max_wk"
            id="max_wk"
          />

          <CInputGroupText className="fw-bold" style={{ width: '170px' }}>
            Max WK
          </CInputGroupText>
          {formik.errors.min_wk && formik.touched.min_wk && (
            <CFormFeedback invalid>{formik.errors.min_wk}</CFormFeedback>
          )}
          {formik.errors.max_wk && formik.touched.max_wk && (
            <CFormFeedback invalid>{formik.errors.max_wk}</CFormFeedback>
          )}
        </CInputGroup>
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
    </CCol>
  )
}

export default PlayerStructure
