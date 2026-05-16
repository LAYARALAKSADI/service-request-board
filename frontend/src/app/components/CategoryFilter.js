'use client';

const categories = ['All', 'Plumbing', 'Electrical', 'Painting', 'Joinery', 'Other'];

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="mb-6">
      <label className="label mb-2">Filter by Category</label>
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat === 'All' ? '' : cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === (cat === 'All' ? '' : cat)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}