import React from "react";

export const EditorTabs = () => {
  return (
    <nav className="tabs">
      <div className="container">
        <ul>
          <li className="is-active">
            <a>Terrain</a>
          </li>
          <li>
            <a>Resource</a>
          </li>
          <li>
            <a>Building</a>
          </li>
          <li>
            <a>Units</a>
          </li>
          <li>
            <a>Continents</a>
          </li>
          <li>
            <a>Owner</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
