import { useParams } from 'react-router-dom';

/**
 * Страница детальной информации о монете
 */
export default function CoinDetailsPage() {
  const { id } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h1>💰 Детали монеты</h1>
      <p>ID монеты: <strong>{id}</strong></p>
      <p>Здесь будет детальная информация о криптовалюте</p>
    </div>
  );
}


