import { CircularProgress } from '@mui/material'
import React from 'react'

function MyLoading() {
  return (
    <>
         <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EAEAEA" />
            <stop offset="100%" stopColor="#8B8B8B"/>
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </React.Fragment>
    </>
  )
}

export default MyLoading    