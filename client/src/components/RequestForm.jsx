import React, { useState } from "react";
import axios from "axios";
import "./style/requestform.css";

const RequestForm = ({ onAddRequest }) => {
  const [residentName, setResidentName] = useState("");
  const [residentAddress, setResidentAddress] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/requests", {
        residentName,
        residentAddress,
        content,
      });

      // Assuming the backend returns the newly created request
      onAddRequest(response.data);
      setResidentName("");
      setResidentAddress("");
      setContent("");
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  return (
    <div className='request-form-container'>
      <h2>Create a Request</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='residentName'>Resident Name:</label>
          <input
            id='residentName'
            type='text'
            value={residentName}
            onChange={(e) => setResidentName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='residentAddress'>Resident Address:</label>
          <input
            id='residentAddress'
            type='text'
            value={residentAddress}
            onChange={(e) => setResidentAddress(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Content:</label>
          <textarea
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type='submit' className='submit-button'>
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
