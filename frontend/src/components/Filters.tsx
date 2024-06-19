import React, { useState } from 'react';

interface FiltersProps {
  genres: string[];
  onApplyFilters: (filters: { genre: string; author: string; year: number | undefined }) => void;
}

const Filters: React.FC<FiltersProps> = ({ genres, onApplyFilters }) => {
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState<number | undefined>(undefined);

  const handleApplyFilters = () => {
    onApplyFilters({ genre, author, year });
  };

  return (
    <div>
      <h2>Filters</h2>
      <div className="mb-3">
        <label htmlFor="genre" className="form-label">Genre</label>
        <select
          id="genre"
          className="form-select"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">Author</label>
        <input
          id="author"
          type="text"
          className="form-control"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="year" className="form-label">Publication Year</label>
        <input
          id="year"
          type="number"
          className="form-control"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value) || undefined)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleApplyFilters}>
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;