import './Statistics.css';

function Statistics({ technologies }) {
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;

  return (
    <div className="statistics">
      <h3>Статистика изучения</h3>
      <div className="stats-grid">
        <div className="stat-item stat-not-started">
          <span className="stat-number">{notStarted}</span>
          <span className="stat-label">Не начато</span>
        </div>
        <div className="stat-item stat-in-progress">
          <span className="stat-number">{inProgress}</span>
          <span className="stat-label">В процессе</span>
        </div>
        <div className="stat-item stat-completed">
          <span className="stat-number">{completed}</span>
          <span className="stat-label">Завершено</span>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
