import React from "react";

export default function Accordion({ items }) {
  return (
    <div className="accordion" id="accordionExample">
      {items.map((item, index) => (
        <div className="accordion-item" key={index}>
          <span className="accordion-header h2" id={`heading${index}`}>
            <button
              className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded={index === 0 ? 'true' : 'false'}
              aria-controls={`collapse${index}`}
              style={{
                background: "linear-gradient(to left, #ee8311, #ffb366)", // gradient จากสีส้มอ่อนถึงสีส้มเข้ม
                color: "#fff", // สีตัวอักษรขาว
                fontSize:'18px'
              }}
            >
              {item.title}
            </button>
          </span>
          <div
            id={`collapse${index}`}
            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
            aria-labelledby={`heading${index}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={{ backgroundColor: "#fcf1e8" }}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
