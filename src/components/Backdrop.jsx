import React from 'react'

const Backdrop = ({ data }) => {
  return (
    <div
    className={`fixed inset-0 bg-amber-500/30 transition-opacity ${data ? "top-16" : "top-0"} left-0`}>

    </div>
  )
}

export default Backdrop