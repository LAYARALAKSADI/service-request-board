'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    contactName: '',
    contactEmail: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.description.trim()) return 'Description is required';
    if (!formData.category) return 'Category is required';
    if (!formData.location.trim()) return 'Location is required';
    if (!formData.contactName.trim()) return 'Contact name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail)) return 'Valid email is required';
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setAlert({ message: error, type: 'error' });
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await fetch(`${API_URL}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create job');
      }
      
      router.push('/');
    } catch (err) {
      setAlert({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'Other'];

  return (
    <div className="form-container">
      <h1 className="form-title">✨ Post a New Service Request</h1>
      
      {alert.message && (
        <div className={`alert alert-${alert.type}`}>
          <span>{alert.message}</span>
          <button className="alert-close" onClick={() => setAlert({ message: '', type: '' })}>×</button>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Job Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., Need a plumber for leaking tap"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Detailed description of the job..."
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., Glasgow"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Contact Name *</label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            className="form-input"
            placeholder="Your full name"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Contact Email *</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="form-input"
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            {loading ? '⏳ Posting...' : '🚀 Post Job'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="btn btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}