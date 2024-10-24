import React from 'react'

export default function Modal({id,size,title,children,motion}) {
  return (
<div className={`modal ${motion}`} id={id}  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className={`modal-dialog ${size}`}>
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
        <button type="button" className="btn-close"  id="modalClose" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {children}
      </div>
    </div>
  </div>
</div>
  )
}
