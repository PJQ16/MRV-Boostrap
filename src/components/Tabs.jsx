import React from "react";
import Card from "./Card"; // Import Card component

export default function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="nav flex-column nav-pills p-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
          id={`v-pills-${tab.id}-tab`}
          onClick={() => setActiveTab(tab.id)}
          type="button"
          role="tab"
          aria-controls={`v-pills-${tab.id}`}
          aria-selected={activeTab === tab.id ? "true" : "false"}
        >
          <Card card="p-1 my-2 shadow">{tab.title}</Card>
        </button>
      ))}
    </div>
  );
}
