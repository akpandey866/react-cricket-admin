import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import { DocsExample } from 'src/components'

import SmartTableBasixExample from './SmartTableBasixExample'

const SmartTable = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>CoreUI Smart Table</strong> <small>React Table Component</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/smart-table/">
              <SmartTableBasixExample />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SmartTable
