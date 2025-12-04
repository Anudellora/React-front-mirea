import './SearchBox.css';

function SearchBox({ searchQuery, setSearchQuery, resultsCount }) {
  return (
    <div className="search-box">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Поиск технологий по названию или описанию..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button 
            className="clear-search"
            onClick={() => setSearchQuery('')}
            title="Очистить поиск"
          >
            ✕
          </button>
        )}
      </div>
      <div className="search-results-count">
        Найдено: <strong>{resultsCount}</strong> {resultsCount === 1 ? 'технология' : 'технологий'}
      </div>
    </div>
  );
}

export default SearchBox;
