import React from 'react'

function ProtectRoutes(props) {
    const { el, allows } = props

    const role = "USER"
    // const role = "ADMIN"

    if (allows[0] !== role) {
        return <h1>Unauthorized!!!</h1>
    }
  return (
    <>
    { el }
    
    </>
  )
}

export default ProtectRoutes