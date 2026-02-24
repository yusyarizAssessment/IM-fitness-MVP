import { useState, useEffect } from 'react';

function MemberModal({ isOpen, onClose, onSubmit, member }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: 'Male',
    membership_type: 'Basic',
    membership_status: 'Active',
  });

  useEffect(() => {
    if (member) {
      setFormData({
        full_name: member.full_name || '',
        email: member.email || '',
        phone: member.phone || '',
        date_of_birth: member.date_of_birth ? member.date_of_birth.split('T')[0] : '',
        gender: member.gender || 'Male',
        membership_type: member.membership_type || 'Basic',
        membership_status: member.membership_status || 'Active',
      });
    } else {
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        gender: 'Male',
        membership_type: 'Basic',
        membership_status: 'Active',
      });
    }
  }, [member, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>
            {member ? 'Edit Member' : 'Add New Member'}
          </h2>
          <button onClick={onClose} style={styles.closeButton}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name *</label>
              <input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter full name"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter email"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter phone number"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Date of Birth</label>
              <input
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Membership Type</label>
              <select
                name="membership_type"
                value={formData.membership_type}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Membership Status</label>
              <select
                name="membership_status"
                value={formData.membership_status}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div style={styles.footer}>
            <button type="button" onClick={onClose} style={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" style={styles.submitButton}>
              {member ? 'Update Member' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    borderRadius: '16px',
    padding: '32px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0f3460',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#666',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    fontSize: '14px',
    outline: 'none',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '8px',
  },
  cancelButton: {
    padding: '10px 24px',
    background: 'transparent',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#666',
  },
  submitButton: {
    padding: '10px 24px',
    background: '#0f3460',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default MemberModal;
