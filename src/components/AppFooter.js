import React from 'react'
import { CFooter } from '@coreui/react-pro'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">&copy; MyClubtap2023.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
