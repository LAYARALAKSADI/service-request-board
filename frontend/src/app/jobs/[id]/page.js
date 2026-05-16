'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editMode = searchParams.get('edit') === 'true';
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModeActive, setEditModeActive] = useState(editMode);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [status, setStatus] = useState('');
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    contactName: '',
    contactEmail: ''
  });

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await fetch(`${API_URL}/api/jobs/${id}`);
      if (!res.ok) throw new Error('Job not found');
      const data = await res.json();
      setJob(data);
      setStatus(data.status);
      setEditFormData({
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        contactName: data.contactName,
        contactEmail: data.contactEmail
      });
    } catch (err) {
      setAlert({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/jobs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!res.ok) throw new Error('Status update failed');
      
      const updatedJob = await res.json();
      setJob(updatedJob);
      setStatus(updatedJob.status);
      showAlert(`Status updated to ${newStatus}`, 'success');
    } catch (err) {
      showAlert('Failed to update status', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    
    try {
      const res = await fetch(`${API_URL}/api/jobs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      
      router.push('/');
    } catch (err) {
      showAlert('Failed to delete job', 'error');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${API_URL}/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editFormData, status })
      });
      
      if (!res.ok) throw new Error('Update failed');
      
      const updatedJob = await res.json();
      setJob(updatedJob);
      setEditModeActive(false);
      showAlert('Job updated successfully', 'success');
      router.push(`/jobs/${id}`);
    } catch (err) {
      showAlert('Failed to update job', 'error');
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p style={{ marginTop: '1rem' }}>Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="empty-state">
        <div className="empty-icon">😕</div>
        <div className="empty-title">Job not found</div>
        <button onClick={() => router.push('/')} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  const getStatusClass = (status) => {
    if (status === 'Open') return 'status-Open';
    if (status === 'In Progress') return 'status-In Progress';
    return 'status-Closed';
  };

  const categories = ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'Other'];

  return (
    <>
      {alert.message && (
        <div className={`alert alert-${alert.type}`}>
          <span>{alert.message}</span>
          <button className="alert-close" onClick={() => setAlert({ message: '', type: '' })}>×</button>
        </div>
      )}

      {editModeActive ? (
        <div className="form-container">
          <h2 className="form-title">✏️ Edit Job</h2>
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleEditChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                className="form-textarea"
                rows="4"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                name="category"
                value={editFormData.category}
                onChange={handleEditChange}
                className="form-select"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={editFormData.location}
                onChange={handleEditChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Name</label>
              <input
                type="text"
                name="contactName"
                value={editFormData.contactName}
                onChange={handleEditChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={editFormData.contactEmail}
                onChange={handleEditChange}
                className="form-input"
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
              <button
                type="button"
                onClick={() => {
                  setEditModeActive(false);
                  router.push(`/jobs/${id}`);
                }}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="details-container">
          <div className="details-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <h1 className="details-title">{job.title}</h1>
              <span className={`status-badge ${getStatusClass(job.status)}`} style={{ fontSize: '1rem', padding: '0.5rem 1.2rem' }}>
                {job.status}
              </span>
            </div>
          </div>
          
          <div className="details-body">
            <div className="details-section">
              <div className="details-label">📝 Description</div>
              <div className="details-value">{job.description}</div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <div className="details-label">📁 Category</div>
                <div className="details-value">{job.category}</div>
              </div>
              <div>
                <div className="details-label">📍 Location</div>
                <div className="details-value">{job.location}</div>
              </div>
              <div>
                <div className="details-label">👤 Contact Name</div>
                <div className="details-value">{job.contactName}</div>
              </div>
              <div>
                <div className="details-label">📧 Contact Email</div>
                <div className="details-value">{job.contactEmail}</div>
              </div>
              <div>
                <div className="details-label">📅 Posted</div>
                <div className="details-value">{new Date(job.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            
            <div className="details-section">
              <div className="details-label">🔄 Update Status</div>
              <div className="status-buttons">
                <button onClick={() => handleStatusChange('Open')} className={`btn ${status === 'Open' ? 'btn-success' : 'btn-outline'}`}>Open</button>
                <button onClick={() => handleStatusChange('In Progress')} className={`btn ${status === 'In Progress' ? 'btn-warning' : 'btn-outline'}`}>In Progress</button>
                <button onClick={() => handleStatusChange('Closed')} className={`btn ${status === 'Closed' ? 'btn-danger' : 'btn-outline'}`}>Closed</button>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => setEditModeActive(true)} className="btn btn-warning">
                ✏️ Edit Job
              </button>
              <button onClick={handleDelete} className="btn btn-danger">
                🗑️ Delete Job
              </button>
              <button onClick={() => router.push('/')} className="btn btn-outline">
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}