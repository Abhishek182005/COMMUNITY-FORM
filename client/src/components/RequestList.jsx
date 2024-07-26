import React, { useState, useEffect } from "react";
import axios from "axios";
import RequestForm from "./RequestForm";
import "./style/RequestList.css";
import { Row, Col, Table, Button } from "react-bootstrap";

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

  const statusCounts = requests.reduce((acc, request) => {
    acc[request.status] = (acc[request.status] || 0) + 1;
    return acc;
  }, {});

  // Sort requests by likes in descending order
  const sortedRequests = [...requests].sort((a, b) => b.likes - a.likes);

  return (
    <div className='request-list-container'>
      <Row>
        <Col md={4}>
          <RequestForm
            onAddRequest={(newRequest) =>
              setRequests([newRequest, ...requests])
            }
          />
        </Col>
        <Col md={4}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Status</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {["pending", "seen", "no response", "action taken"].map(
                (status) => (
                  <tr key={status}>
                    <td>{status}</td>
                    <td>{statusCounts[status] || 0}</td>
                  </tr>
                )
              )}
              <tr>
                <td>
                  <b>Total Requests</b>
                </td>
                <td>
                  <b>{requests.length}</b>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <center>
        <h3>REQUESTS</h3>
      </center>
      {requests.length === 0 ? (
        <div className='no-requests-message'>
          <h4>No requests exist</h4>
        </div>
      ) : (
        <Row className='request-cards'>
          {sortedRequests.map((request) => (
            <Col md={3} key={request._id}>
              <div className='request-item'>
                <h3>
                  <p className='resident-name'>
                    Resident name: {request.residentName}
                  </p>
                </h3>
                <p className='resident-address'>
                  <b>Resident Area:</b> {request.residentAddress}
                </p>
                <p className='request-content'>
                  <b>Problem/Suggestions:</b> {request.content}
                </p>
                <p>
                  <b>Likes:</b>{" "}
                  <span className='likes' style={getLikesStyle(request.likes)}>
                    {request.likes}
                  </span>
                </p>
                <p>
                  <b>Authority Status:</b>{" "}
                  <span
                    className='status'
                    style={getStatusStyle(request.status)}
                  >
                    {request.status}
                  </span>
                </p>
                <p className='timestamp'>
                  <b>Created At:</b>{" "}
                  {new Date(request.createdAt).toLocaleString()}
                </p>
                <Button
                  className='like-button'
                  onClick={() => handleLike(request._id)}
                >
                  Like
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default RequestList;
