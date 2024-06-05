import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const EditStaffPage = ({ staff, onSave, onCancel }) => {
  const [name, setName] = useState(staff.name);
  const [email, setEmail] = useState(staff.email);
  const [address, setAddress] = useState(staff.address);
  const [dob, setDob] = useState(staff.dob);
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    // Perform validation
    const validationErrors = {}; // errors stored in object
    console.log(validationErrors);
    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!address.trim()) {
      validationErrors.address = "Address is required";
    }

    if (!dob.trim()) {
      validationErrors.dob = "Date of Birth is required";
    } else if (new Date(dob) > new Date()) {
      validationErrors.dob = "Date of Birth cannot be a future date";
    }

    if (Object.keys(validationErrors).length === 0) {
      // If no validation errors, save the edited staff
      onSave({ ...staff, name, email, address, dob });
      onCancel(); // Close the modal
    } else {
      // If there are validation errors, update the errors state
      setErrors(validationErrors);
    }
  };

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>
              Name: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label>
              Email:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label>
              Address: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && (
              <div className="text-danger">{errors.address}</div>
            )}
          </div>
          <div className="form-group">
            <label>
              Date of Birth: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              className="form-control"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              max={new Date().toISOString().split("T")[0]} //max limit for calender
            />
            {errors.dob && <div className="text-danger">{errors.dob}</div>}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditStaffPage;
