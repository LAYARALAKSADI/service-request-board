'use client';
import Link from 'next/link';

const statusColors = {
  'Open': 'bg-green-100 text-green-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Closed': 'bg-gray-100 text-gray-800'
};

export default function JobCard({ job, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-3">
        <Link href={`/jobs/${job._id}`} className="flex-1">
          <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800">
            {job.title}
          </h3>
        </Link>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
          {job.status}
        </span>
      </div>
      
      <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
      
      <div className="text-sm text-gray-500 mb-3">
        <span className="inline-block mr-3"> {job.category}</span>
        <span className="inline-block"> {job.location}</span>
      </div>
      
      <div className="flex gap-2">
        <Link 
          href={`/jobs/${job._id}`}
          className="btn bg-blue-500 text-white hover:bg-blue-600 text-sm px-3 py-1 rounded"
        >
          View Details
        </Link>
        <button
          onClick={() => onEdit(job._id)}
          className="btn bg-yellow-500 text-white hover:bg-yellow-600 text-sm px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(job._id)}
          className="btn bg-red-500 text-white hover:bg-red-600 text-sm px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}