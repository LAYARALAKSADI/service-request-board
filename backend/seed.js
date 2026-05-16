require('dotenv').config();
const mongoose = require('mongoose');
const JobRequest = require('./models/JobRequest');

const sampleJobs = [
  {
    title: "Leaking kitchen tap",
    description: "Kitchen tap is leaking badly. Need a plumber urgently.",
    category: "Plumbing",
    location: "Glasgow",
    contactName: "John Smith",
    contactEmail: "john@example.com",
    status: "Open"
  },
  {
    title: "Rewire living room",
    description: "Need electrical rewiring for living room renovation.",
    category: "Electrical",
    location: "Edinburgh",
    contactName: "Sarah Johnson",
    contactEmail: "sarah@example.com",
    status: "In Progress"
  },
  {
    title: "Paint bedroom",
    description: "Master bedroom needs painting - white walls.",
    category: "Painting",
    location: "Glasgow",
    contactName: "Mike Brown",
    contactEmail: "mike@example.com",
    status: "Open"
  },
  {
    title: "Install new cabinets",
    description: "Kitchen renovation - need custom joinery work.",
    category: "Joinery",
    location: "Aberdeen",
    contactName: "Emma Wilson",
    contactEmail: "emma@example.com",
    status: "Open"
  },
  {
    title: "Fix bathroom light",
    description: "Bathroom light fixture not working.",
    category: "Electrical",
    location: "Dundee",
    contactName: "David Clark",
    contactEmail: "david@example.com",
    status: "Closed"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await JobRequest.deleteMany();
    await JobRequest.insertMany(sampleJobs);
    console.log('✅ Database seeded with sample jobs');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();