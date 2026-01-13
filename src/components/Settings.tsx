import React from "react";
import useRetirementStore from "../stores/useRetirementStore";
import "./Dashboard.css";

const Settings: React.FC = () => {
  const {
    annualInflation,
    annualInterest,
    updateAnnualInflation,
    updateAnnualInterest,
    reset,
  } = useRetirementStore();

  const handleInflationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAnnualInflation(Number(e.target.value));
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAnnualInterest(Number(e.target.value));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Settings</h1>
        <p>Adjust inflation and investment return rates</p>
      </header>

      <div className="dashboard-section">
        <h2>Inflation Rate (annual)</h2>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="0.1"
            step="0.001"
            value={annualInflation}
            onChange={handleInflationChange}
            className="slider"
          />
          <span>{(annualInflation * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Investment Return Rate (annual)</h2>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="0.2"
            step="0.001"
            value={annualInterest}
            onChange={handleInterestChange}
            className="slider"
          />
          <span>{(annualInterest * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="dashboard-section">
        <button onClick={reset} className="reset-button">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default Settings;
