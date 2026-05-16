'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const router = useRouter();

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [category, jobs]);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/jobs`);
      const data = await res.json();
      setJobs(data);
      setFilteredJobs(data);
    } catch (err) {
      showAlert('Failed to fetch jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    if (!category) {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.category === category));
    }
  };

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    
    try {
      const res = await fetch(`${API_URL}/api/jobs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      
      setJobs(jobs.filter(job => job._id !== id));
      showAlert('Job deleted successfully', 'success');
    } catch (err) {
      showAlert('Failed to delete job', 'error');
    }
  };

  const handleEdit = (id) => {
    router.push(`/jobs/${id}?edit=true`);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p style={{ marginTop: '1rem' }}>Loading amazing jobs...</p>
      </div>
    );
  }

  const categories = ['All', 'Plumbing', 'Electrical', 'Painting', 'Joinery', 'Other'];

  const getStatusClass = (status) => {
    if (status === 'Open') return 'status-Open';
    if (status === 'In Progress') return 'status-In Progress';
    return 'status-Closed';
  };

  return (
    <>
      {alert.message && (
        <div className={`alert alert-${alert.type}`}>
          <span>{alert.message}</span>
          <button className="alert-close" onClick={() => setAlert({ message: '', type: '' })}>×</button>
        </div>
      )}

      <div className="filter-section">
        <div className="filter-title">🔍 Filter by Category</div>
        <div className="filter-buttons">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat === 'All' ? '' : cat)}
              className={`filter-btn ${(cat === 'All' && !category) || category === cat ? 'filter-btn-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-title">No jobs found</div>
          <div className="empty-text">Be the first to post a service request!</div>
          <button onClick={() => router.push('/jobs/new')} className="btn btn-primary">
            📝 Post a Job
          </button>
        </div>
      ) : (
        <div className="job-grid">
          {filteredJobs.map(job => (
            <div key={job._id} className="card">
              <div className="card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <h3 className="card-title">
                    <Link href={`/jobs/${job._id}`}>{job.title}</Link>
                  </h3>
                  <span className={`status-badge ${getStatusClass(job.status)}`}>
                    {job.status}
                  </span>
                </div>
                
                <p className="card-description">{job.description}</p>
                
                <div className="card-meta">
                  <span className="meta-tag">📁 {job.category}</span>
                  <span className="meta-tag">📍 {job.location}</span>
                  <span className="meta-tag">📅 {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="card-actions">
                  <Link href={`/jobs/${job._id}`} className="btn btn-primary">
                    👁️ View
                  </Link>
                  <button onClick={() => handleEdit(job._id)} className="btn btn-warning">
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(job._id)} className="btn btn-danger">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}