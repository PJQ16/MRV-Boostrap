import React from 'react'

export default function Card({card,cardBody,children,cardSty}) {
  return (
    <div className={`card ${card}`} style={cardSty}>
                <div className={`card-body ${cardBody}`}>
                  {children}
        </div>
    </div>
  )
}
