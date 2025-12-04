import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  const totalTechnologies = technologies.length;
  const completedTechnologies = technologies.filter(
    tech => tech.status === 'completed'
  ).length;
  const completionPercentage = totalTechnologies > 0 
    ? Math.round((completedTechnologies / totalTechnologies) * 100) 
    : 0;

  return (
    <div className="progress-header">
      <h2>Прогресс обучения</h2>
      <div className="stats">
        <p>Всего технологий: <strong>{totalTechnologies}</strong></p>
        <p>Изучено: <strong>{completedTechnologies}</strong></p>
        <p>Прогресс: <strong>{completionPercentage}%</strong></p>
      </div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${completionPercentage}%` }}
        >
          {completionPercentage > 0 && <span>{completionPercentage}%</span>}
        </div>
      </div>
    </div>
  );
}

export default ProgressHeader;
