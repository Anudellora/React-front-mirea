import useTechnologies from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';
import './Statistics.css';

function Statistics() {
  const { technologies, progress } = useTechnologies();

  const stats = {
    total: technologies.length,
    notStarted: technologies.filter(t => t.status === 'not-started').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    completed: technologies.filter(t => t.status === 'completed').length
  };

  const categories = {};
  technologies.forEach(tech => {
    const cat = tech.category || 'other';
    if (!categories[cat]) {
      categories[cat] = { total: 0, completed: 0 };
    }
    categories[cat].total++;
    if (tech.status === 'completed') {
      categories[cat].completed++;
    }
  });

  const categoryLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'База данных',
    devops: 'DevOps',
    tools: 'Инструменты',
    other: 'Другое'
  };

  return (
    <div className="page statistics-page">
      <h1>📊 Статистика прогресса</h1>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Всего технологий</p>
          </div>
        </div>

        <div className="stat-card stat-not-started">
          <div className="stat-icon">⏸️</div>
          <div className="stat-content">
            <h3>{stats.notStarted}</h3>
            <p>Не начато</p>
          </div>
        </div>

        <div className="stat-card stat-in-progress">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3>{stats.inProgress}</h3>
            <p>В процессе</p>
          </div>
        </div>

        <div className="stat-card stat-completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.completed}</h3>
            <p>Завершено</p>
          </div>
        </div>
      </div>

      <div className="overall-progress">
        <h2>Общий прогресс</h2>
        <ProgressBar
          progress={progress}
          label="Прогресс изучения"
          color="#667eea"
          height={30}
          animated={true}
        />
      </div>

      {Object.keys(categories).length > 0 && (
        <div className="category-progress">
          <h2>Прогресс по категориям</h2>
          <div className="category-list">
            {Object.entries(categories).map(([category, data]) => {
              const categoryProgress = data.total > 0
                ? Math.round((data.completed / data.total) * 100)
                : 0;

              return (
                <div key={category} className="category-item">
                  <div className="category-header">
                    <h3>{categoryLabels[category] || category}</h3>
                    <span className="category-count">
                      {data.completed} из {data.total}
                    </span>
                  </div>
                  <ProgressBar
                    progress={categoryProgress}
                    color="#4ecdc4"
                    height={20}
                    showPercentage={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {technologies.length === 0 && (
        <div className="empty-statistics">
          <p>Добавьте технологии, чтобы увидеть статистику</p>
        </div>
      )}
    </div>
  );
}

export default Statistics;
