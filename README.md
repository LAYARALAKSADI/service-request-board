Service Request Board

A full-stack web application where homeowners can post service requests and tradespeople can browse, view details, and update job status. Built for GlobalTNA Full-Stack Developer Intern Technical Assessment.

 Features

- View all service requests as beautiful cards
- Filter jobs by category (Plumbing, Electrical, Painting, Joinery, Other)
- Create new service requests with client-side validation
- View detailed job information
- Update job status (Open → In Progress → Closed)
- Delete job requests
- Responsive modern design with gradients and animations

 Tech Stack


- Frontend: Next.js 14 (App Router) + CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas
- ODM: Mongoose




Setup Instructions
Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (free tier)
- Git
Installation
1. Clone the repository**
bash
git clone https://github.com/LAYARALAKSADI/service-request-board.git
cd service-request-board

2. Setup Backend

bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
node server.js


3. Setup Frontend 

bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
4. Open your browser

text
http://localhost:3000
🔧 Environment Variables
Backend (.env file)
text
MONGODB_URI=your_mongodb_connection_string
PORT=5000
Frontend (.env.local file)
text
NEXT_PUBLIC_API_URL=http://localhost:5000
📡 API Endpoints
GET /api/jobs - Get all jobs (filter with ?category=Plumbing or ?status=Open)

GET /api/jobs/:id - Get a single job

POST /api/jobs - Create a new job

PATCH /api/jobs/:id - Update job status only

DELETE /api/jobs/:id - Delete a job

How to Run
Start the backend:

bash
cd backend
node server.js
Runs on http://localhost:5000

Start the frontend:

bash
cd frontend
npm run dev
Runs on http://localhost:3000

Sample Data (Optional)
Add sample jobs to your database:

bash
cd backend
node seed.js


Screenshots are provided 


Requirements Met
Next.js App Router frontend
Express.js backend (separate from Next.js)
MongoDB with Mongoose
REST API with proper HTTP methods
Category filter support
Job status management (Open, In Progress, Closed)
Client-side validation
Clean responsive UI with custom CSS
Seed script for sample data
Complete README

 Author
Submitted for GlobalTNA Full-Stack Developer Intern Technical Assessment

 Submission Date
May 17, 2026


