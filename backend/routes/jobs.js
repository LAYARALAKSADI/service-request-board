const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');

// POST /api/jobs - create a new job
router.post('/', async (req, res) => {
  try {
    const { title, description, category, location, contactName, contactEmail } = req.body;
    
    // Validate required fields
    if (!title || !description || !category || !location || !contactName || !contactEmail) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    const job = new JobRequest(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/jobs - list all jobs with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    
    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/jobs/:id - fetch a single job
router.get('/:id', async (req, res) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/jobs/:id - update status only
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['Open', 'In Progress', 'Closed'].includes(status)) {
      return res.status(400).json({ error: 'Valid status (Open, In Progress, Closed) is required' });
    }
    
    const job = await JobRequest.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true, runValidators: true }
    );
    
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/jobs/:id - delete a job
router.delete('/:id', async (req, res) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;