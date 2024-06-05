import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import AddStaffModal from "../AddStaffModal/Addpage";
import EditStaffPage from "../EditStaffModal/EditStaffPage";
import "./StaffManagement.css";
const StaffManagement = () => {
  // State for staff data
  const [staffList, setStaffList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    // Load staff data from local storage on component mount
    const savedStaffList = JSON.parse(localStorage.getItem("staffList")) || [];
    setStaffList(savedStaffList);
  }, []);

  // Function to add staff
  const addStaff = (newStaff) => {
    setStaffList([...staffList, { id: Date.now(), ...newStaff }]);
    setShowAddModal(false);
    // Save updated staff list to local storage spreading existing data after addaing new staff data
    localStorage.setItem(
      "staffList",
      JSON.stringify([...staffList, { id: Date.now(), ...newStaff }])
    );
  };

  // Function to handle editing staff
  const editStaff = (staff) => {
    setSelectedStaff(staff);
    setShowEditModal(true); // setting true should make visible of edit module
  };

  // Function to save edited staff
  const saveEditedStaff = (updatedStaff) => {
    const updatedStaffList = staffList.map((staff) =>
      staff.id === updatedStaff.id ? updatedStaff : staff
    );
    setStaffList(updatedStaffList);
    setShowEditModal(false);
    localStorage.setItem("staffList", JSON.stringify(updatedStaffList));
  };

  // Function to delete staff
  const deleteStaff = (id) => {
    const updatedStaffList = staffList.filter((staff) => staff.id !== id);
    setStaffList(updatedStaffList);
    localStorage.setItem("staffList", JSON.stringify(updatedStaffList));
  };

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const ageDiffMs = Date.now() - dobDate.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          {/* Add Staff Button */}
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Add Staff
          </Button>
          <hr />
          {/* Staff Table */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Date of Birth</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff.id}>
                  <td>{staff.name}</td>
                  <td>{staff.email}</td>
                  <td>{staff.address}</td>
                  <td>{staff.dob}</td>
                  <td>{calculateAge(staff.dob)}</td>
                  <td>
                    <Button variant="primary" onClick={() => editStaff(staff)}>
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteStaff(staff.id)}
                      style={{ marginLeft: "9%" }}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Add Staff Modal */}
          <AddStaffModal
            show={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSave={addStaff}
          />
          {/* Edit Staff Modal */}
          {showEditModal && (
            <EditStaffPage
              staff={selectedStaff}
              onSave={saveEditedStaff}
              onCancel={() => setShowEditModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
