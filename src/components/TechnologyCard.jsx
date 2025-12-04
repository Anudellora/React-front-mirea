import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ id, title, description, status, notes, onStatusChange, onNotesChange }) {
  const statusLabels = {
    'not-started': 'Не начато',
    'in-progress': 'В процессе',
    'completed': 'Завершено'
  };

  return (
    <div className={`technology-card status-${status}`}>
      <div className="card-header" onClick={() => onStatusChange(id)}>
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="status-badge">
          {statusLabels[status]}
        </span>
      </div>
      
      <TechnologyNotes 
        notes={notes}
        onNotesChange={onNotesChange}
        techId={id}
      />
    </div>
  );
}

export default TechnologyCard;
