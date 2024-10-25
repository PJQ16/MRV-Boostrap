import React from "react";

export default function Accordion({ items }) {
  return (
    <div className="accordion" id="accordionExample">
      {items.map((item, index) => {
        // Create a safe version of the title for use in the ID (replace spaces with dashes)
        const safeTitle = item.title.replace(/\s+/g, '-');
        
        return (
          <div className="accordion-item" key={`${index}-${safeTitle}`}>
            <span className="accordion-header h2" id={`heading-${index}`}>
              <button
                className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${index}-${safeTitle}`}
                aria-expanded={index === 0 ? 'true' : 'false'}
                aria-controls={`collapse-${index}-${safeTitle}`}
                style={{
                  background: "linear-gradient(to left, #ee8311, #ffb366)", // Gradient from light to dark orange
                  color: "#fff", // White text color
                  fontSize: '18px',
                }}
              >
                {item.title}
              </button>
            </span>
            <div
              id={`collapse-${index}-${safeTitle}`}
              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
              aria-labelledby={`heading-${index}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body" style={{ backgroundColor: "#fcf1e8" }}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
