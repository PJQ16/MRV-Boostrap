import React from 'react'

export default function Table({tbSty,children}) {
  return (
    <div className="table-responsive">
          <table className={`${tbSty}`}>
            {children}
          </table>
    </div>
  )
}
