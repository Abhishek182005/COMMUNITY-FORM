import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestForm from "./RequestForm";
import "./style/RequestList.css";

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleLike = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/requests/${id}/like`);
      fetchRequests();
    } catch (error) {
      console.error("Error liking request:", error);
    }
  };



  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return { color: "gray" };
      case "seen":
        return { color: "blue" };
      case "no response":
        return { color: "red" };
      case "action taken":
        return { color: "green" };
      default:
        return {};
    }
  };

  const getLikesStyle = (likes) => {
    if (likes > 100) return { color: "red" };
    if (likes > 50) return { color: "blue" };
    if (likes > 25) return { color: "green" };
    if (likes > 10) return { color: "gray" };
    return { color: "black" };
  };

  return (
    <div className='request-list-container'>
      <RequestForm
        onAddRequest={(newRequest) => setRequests([newRequest, ...requests])}
      />
      <ul className='request-list'>
        {requests.map((request) => (
          <div key={request._id} className='request-item'>
            <h3>
              <p className='resident-name'>
                Resident name:- {request.residentName}
              </p>
            </h3>
            <p className='resident-address'>
              <b>Resident Area</b> :-{request.residentAddress}
            </p>
            <p className='request-content'>
              <b>Problem/Suggestions</b>:- {request.content}
            </p>
            <p>
              <b>Likes:-</b>{" "}
              <span className='likes' style={getLikesStyle(request.likes)}>
                {request.likes}
              </span>
            </p>
            <p>
              <b>Status</b>:-{" "}
              <span className='status' style={getStatusStyle(request.status)}>
                {request.status}
              </span>
            </p>
            <p className='timestamp'>
              <b>Created At</b>:- {new Date(request.createdAt).toLocaleString()}
            </p>
            <button
              className='like-button'
              onClick={() => handleLike(request._id)}
            >
              Like
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default RequestList;
