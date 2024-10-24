import React from "react";

export default function TabContent({ tabs, activeTab }) {
  return (
    <div className="tab-content" id="v-pills-tabContent">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab-pane fade ${activeTab === tab.id ? "show active" : ""}`}
          id={`v-pills-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`v-pills-${tab.id}-tab`}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
