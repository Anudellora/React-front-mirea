import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import './TechnologyList.css';

function TechnologyList() {
  const { technologies } = useTechnologies();

  const getStatusLabel = (status) => {
    const labels = {
      'not-started': 'Не начато',
      'in-progress': 'В процессе',
      'completed': 'Завершено'
    };
    return labels[status] || status;
  };

  return (
    <div className="page technology-list-page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="btn btn-primary">
          + Добавить технологию
        </Link>
      </div>

      {technologies.length > 0 ? (
        <div className="technologies-grid">
          {technologies.map(tech => (
            <div key={tech.id} className={`technology-item status-${tech.status}`}>
              <h3>{tech.title}</h3>
              <p className="tech-description">{tech.description}</p>
              <div className="technology-meta">
                <span className={`status-badge status-${tech.status}`}>
                  {getStatusLabel(tech.status)}
                </span>
                <Link to={`/technology/${tech.id}`} className="btn-link">
                  Подробнее →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h2>Технологий пока нет</h2>
          <p>Начните добавлять технологии, которые хотите изучить</p>
          <Link to="/add-technology" className="btn btn-primary">
            Добавить первую технологию
          </Link>
        </div>
      )}
    </div>
  );
}

export default TechnologyList;
