import React from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({ status = false, user = false, children }) => {

  // 
  if (status !== 'ok' || user !== 'true') {
    return <Navigate to="/login" />
  }
  return (
    <div>{children}</div>
  )
}

export default Protected