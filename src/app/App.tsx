import { AppRouter } from './router';

/**
 * Главный компонент приложения Crypto Tracker
 * 
 * Структура:
 * - AppRouter: управляет роутингом между страницами
 * 
 * В будущем здесь будут добавлены:
 * - QueryClientProvider для TanStack Query
 * - Другие глобальные провайдеры (темы, локализация и т.д.)
 */
function App() {
  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;


