import { useState } from 'react';
import './QuickActions.css';
import Modal from './Modal';

function QuickActions({ onResetAll, onCompleteAll, technologies }) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportData, setExportData] = useState('');

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      totalTechnologies: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      inProgress: technologies.filter(t => t.status === 'in-progress').length,
      notStarted: technologies.filter(t => t.status === 'not-started').length,
      technologies: technologies
    };
    const dataStr = JSON.stringify(data, null, 2);
    setExportData(dataStr);
    console.log('Данные для экспорта:', dataStr);
    setShowExportModal(true);
  };

  const handleDownload = () => {
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tech-tracker-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="actions-buttons">
        <button className="action-btn complete-btn" onClick={onCompleteAll}>
          ✅ Завершить всё
        </button>
        <button className="action-btn reset-btn" onClick={onResetAll}>
          🔄 Сбросить всё
        </button>
        <button className="action-btn export-btn" onClick={handleExport}>
          📤 Экспорт данных
        </button>
      </div>

      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <div className="export-modal-content">
          <p>✅ Данные успешно подготовлены для экспорта!</p>
          <div className="export-stats">
            <p><strong>Всего технологий:</strong> {technologies.length}</p>
            <p><strong>Завершено:</strong> {technologies.filter(t => t.status === 'completed').length}</p>
            <p><strong>В процессе:</strong> {technologies.filter(t => t.status === 'in-progress').length}</p>
            <p><strong>Не начато:</strong> {technologies.filter(t => t.status === 'not-started').length}</p>
          </div>
          <div className="export-actions">
            <button className="btn-primary" onClick={handleDownload}>
              💾 Скачать JSON
            </button>
            <button className="btn-secondary" onClick={() => setShowExportModal(false)}>
              Закрыть
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default QuickActions;
