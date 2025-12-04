import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTechnology.css';

function AddTechnology() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    status: 'not-started',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Загружаем существующие технологии
    const saved = localStorage.getItem('technologies');
    const technologies = saved ? JSON.parse(saved) : [];

    // Создаем новую технологию с уникальным ID
    const newTechnology = {
      id: Date.now(),
      ...formData
    };

    // Добавляем и сохраняем
    const updated = [...technologies, newTechnology];
    localStorage.setItem('technologies', JSON.stringify(updated));

    // Перенаправляем на список
    navigate('/technologies');
  };

  return (
    <div className="page add-technology-page">
      <div className="form-container">
        <h1>Добавить новую технологию</h1>
        <p className="form-subtitle">
          Заполните информацию о технологии, которую хотите изучить
        </p>

        <form onSubmit={handleSubmit} className="add-technology-form">
          <div className="form-group">
            <label htmlFor="title">Название технологии *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Например: React Hooks"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Краткое описание того, что вы хотите изучить..."
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Категория *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">База данных</option>
              <option value="devops">DevOps</option>
              <option value="tools">Инструменты</option>
              <option value="other">Другое</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Статус</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="not-started">Не начато</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Завершено</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Заметки (необязательно)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Дополнительные заметки или ссылки..."
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              ✅ Добавить технологию
            </button>
            <button
              type="button"
              onClick={() => navigate('/technologies')}
              className="btn btn-secondary"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTechnology;
