import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/useAuth';
import Navbar from '../components/Navbar';
import MemberModal from '../components/MemberModal';

function Dashboard() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [search, setSearch] = useState('');
  const { token } = useAuth();

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/members', axiosConfig);
      setMembers(response.data);
    } catch {
      alert('Failed to fetch members.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAdd = () => {
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`, axiosConfig);
      fetchMembers();
    } catch {
      alert('Failed to delete member.');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedMember) {
        await axios.put(`http://localhost:5000/api/members/${selectedMember.id}`, formData, axiosConfig);
      } else {
        await axios.post('http://localhost:5000/api/members', formData, axiosConfig);
      }
      setIsModalOpen(false);
      fetchMembers();
    } catch {
      alert('Failed to save member.');
    }
  };

  const filteredMembers = members.filter((m) =>
    m.full_name.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase()) ||
    m.membership_type.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status) => {
    const base = { padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' };
    if (status === 'Active') return { ...base, background: '#d1fae5', color: '#065f46' };
    if (status === 'Inactive') return { ...base, background: '#fee2e2', color: '#991b1b' };
    return { ...base, background: '#fef3c7', color: '#92400e' };
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.topBar}>
          <div>
            <h2 style={styles.heading}>Members</h2>
            <p style={styles.subheading}>{members.length} total members</p>
          </div>
          <button onClick={handleAdd} style={styles.addButton}>
            + Add Member
          </button>
        </div>

        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by name, email or membership type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {loading ? (
          <div style={styles.centered}>Loading members...</div>
        ) : filteredMembers.length === 0 ? (
          <div style={styles.centered}>No members found.</div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thead}>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Gender</th>
                  <th style={styles.th}>Membership</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Join Date</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} style={styles.tr}>
                    <td style={styles.td}>{member.full_name}</td>
                    <td style={styles.td}>{member.email || '-'}</td>
                    <td style={styles.td}>{member.phone || '-'}</td>
                    <td style={styles.td}>{member.gender || '-'}</td>
                    <td style={styles.td}>{member.membership_type}</td>
                    <td style={styles.td}>
                      <span style={getStatusStyle(member.membership_status)}>
                        {member.membership_status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {member.join_date ? new Date(member.join_date).toLocaleDateString() : '-'}
                    </td>
                    <td style={styles.td}>
                      <button onClick={() => handleEdit(member)} style={styles.editButton}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(member.id)} style={styles.deleteButton}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <MemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        member={selectedMember}
      />
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f3f4f6',
  },
  container: {
    padding: '16px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0f3460',
    margin: 0,
  },
  subheading: {
    color: '#666',
    fontSize: '14px',
    margin: '4px 0 0 0',
  },
  addButton: {
    padding: '10px 24px',
    background: '#0f3460',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  searchBar: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'white',
  },
  thead: {
    background: '#0f3460',
  },
  th: {
    padding: '14px 16px',
    textAlign: 'left',
    color: 'white',
    fontSize: '13px',
    fontWeight: '600',
  },
  tr: {
    borderBottom: '1px solid #f3f4f6',
  },
  td: {
    padding: '14px 16px',
    fontSize: '14px',
    color: '#333',
  },
  editButton: {
    padding: '6px 14px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    marginRight: '6px',
  },
  deleteButton: {
    padding: '6px 14px',
    background: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  centered: {
    textAlign: 'center',
    padding: '60px',
    color: '#666',
    fontSize: '16px',
  },
};

export default Dashboard;
