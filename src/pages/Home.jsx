import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="page home-page">
      <div className="hero-section">
        <h1>Добро пожаловать в Трекер Технологий!</h1>
        <p className="hero-subtitle">
          Отслеживайте свой прогресс в изучении новых технологий и достигайте своих целей
        </p>
      </div>

      <div className="features">
        <h2>Наши возможности:</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Управление технологиями</h3>
            <p>Добавляйте и отслеживайте технологии, которые хотите изучить</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Статистика прогресса</h3>
            <p>Визуализируйте свой прогресс с помощью графиков и диаграмм</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Заметки и комментарии</h3>
            <p>Добавляйте заметки к каждой технологии для лучшего запоминания</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Автосохранение</h3>
            <p>Все данные сохраняются автоматически в локальное хранилище</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Начните прямо сейчас!</h2>
        <div className="cta-buttons">
          <Link to="/technologies" className="btn btn-primary">
            Посмотреть технологии
          </Link>
          <Link to="/add-technology" className="btn btn-secondary">
            Добавить технологию
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
