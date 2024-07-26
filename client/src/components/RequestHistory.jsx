import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/RequestList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Form, Button } from "react-bootstrap";

const History = () => {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/requests/${id}`);
      setRequests(requests.filter((request) => request._id !== id));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/requests/${id}/status`,
        { status: newStatus }
      );
      setRequests(
        requests.map((req) => (req._id === id ? response.data : req))
      );
    } catch (error) {
      console.error("Error updating status:", error);
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
    return {};
  };

  return (
    <div className='request-list-container'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Resident Name</th>
            <th>Address</th>
            <th>Content</th>
            <th>Likes</th>
            <th>Authority Status</th>
            <th>Created At</th>
            <th>Update Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={request._id}>
              <td>{index + 1}</td>
              <td>{request.residentName}</td>
              <td>{request.residentAddress}</td>
              <td>{request.content}</td>
              <td style={getLikesStyle(request.likes)}>{request.likes}</td>
              <td style={getStatusStyle(request.status)}>{request.status}</td>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
              <td>{new Date(request.updatedAt).toLocaleString()}</td>
              <td>
                <div className='d-flex align-items-center'>
                  <Form.Select
                    value={request.status}
                    onChange={(e) =>
                      handleStatusUpdate(request._id, e.target.value)
                    }
                    className='w-auto'
                  >
                    <option value='pending'>Pending</option>
                    <option value='seen'>Seen</option>
                    <option value='action taken'>Action Taken</option>
                    <option value='no response'>No Response</option>
                  </Form.Select>
                  <Button
                    variant='danger'
                    onClick={() => handleDelete(request._id)}
                    className='ms-2'
                    disabled={request.status !== "action taken"}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default History;
