import React from 'react'
import { CRow, CCol, CWidgetStatsC } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cilAppsSettings,
  cilBasket,
  cilChartPie,
  cilListRich,
  cilPeople,
  cilUserFollow,
} from '@coreui/icons'

const WidgetsDropdown = () => {
  return (
    <CRow>
      <CCol sm={6} md={3}>
        <CWidgetStatsC
          color="info-gradient"
          icon={<CIcon icon={cilPeople} height={36} />}
          value="87.500"
          title="Members"
          inverse
          progress={{ value: 75 }}
          className="mb-4"
        />
      </CCol>
      <CCol sm={6} md={3}>
        <CWidgetStatsC
          color="success"
          icon={<CIcon icon={cilUserFollow} height={36} />}
          value="385"
          title="Players"
          inverse
          progress={{ value: 75 }}
          className="mb-4"
        />
      </CCol>
      <CCol sm={6} md={3}>
        <CWidgetStatsC
          color="warning-gradient"
          icon={<CIcon icon={cilListRich} height={36} />}
          value="1238"
          title="Fixtures"
          inverse
          progress={{ value: 75 }}
          className="mb-4"
        />
      </CCol>
      <CCol sm={6} md={3}>
        <CWidgetStatsC
          color="primary-gradient"
          icon={<CIcon icon={cilAppsSettings} height={36} />}
          value="28%"
          title="Fantasy Teams"
          inverse
          progress={{ value: 75 }}
          className="mb-4"
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
