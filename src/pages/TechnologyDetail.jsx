import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTechnologies from '../hooks/useTechnologies';
import './TechnologyDetail.css';

function TechnologyDetail() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const { technologies, updateStatus, updateNotes } = useTechnologies();
  const [technology, setTechnology] = useState(null);
  const [localNotes, setLocalNotes] = useState('');

  useEffect(() => {
    const tech = technologies.find(t => t.id === parseInt(techId));
    if (tech) {
      setTechnology(tech);
      setLocalNotes(tech.notes || '');
    }
  }, [techId, technologies]);

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setLocalNotes(newNotes);
    updateNotes(parseInt(techId), newNotes);
  };

  const handleStatusChange = (newStatus) => {
    updateStatus(parseInt(techId), newStatus);
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
      const saved = localStorage.getItem('technologies');
      if (saved) {
        const techs = JSON.parse(saved);
        const filtered = techs.filter(t => t.id !== parseInt(techId));
        localStorage.setItem('technologies', JSON.stringify(filtered));
        navigate('/technologies');
      }
    }
  };

  if (!technology) {
    return (
      <div className="page">
        <div className="not-found">
          <h1>❌ Технология не найдена</h1>
          <p>Технология с ID {techId} не существует.</p>
          <Link to="/technologies" className="btn btn-primary">
            ← Назад к списку
          </Link>
        </div>
      </div>
    );
  }

  const statusLabels = {
    'not-started': 'Не начато',
    'in-progress': 'В процессе',
    'completed': 'Завершено'
  };

  return (
    <div className="page technology-detail-page">
      <div className="detail-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <button onClick={handleDelete} className="btn-delete">
          🗑️ Удалить
        </button>
      </div>

      <div className="detail-content">
        <h1>{technology.title}</h1>
        <p className="detail-description">{technology.description}</p>

        <div className="detail-section">
          <h3>Статус изучения</h3>
          <div className="status-buttons">
            {Object.keys(statusLabels).map(status => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`status-btn ${technology.status === status ? 'active' : ''} status-${status}`}
              >
                {statusLabels[status]}
              </button>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>Мои заметки</h3>
          <textarea
            value={localNotes}
            onChange={handleNotesChange}
            placeholder="Добавьте заметки о процессе изучения..."
            rows="8"
            className="notes-textarea"
          />
          <div className="notes-hint">
            {localNotes.length > 0
              ? `Сохранено ${localNotes.length} символов`
              : 'Заметки сохраняются автоматически'}
          </div>
        </div>

        {technology.category && (
          <div className="detail-section">
            <h3>Категория</h3>
            <span className="category-badge">{technology.category}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnologyDetail;
