# Router - Роутинг приложения

## Описание

Этот модуль отвечает за настройку роутинга приложения с использованием React Router v7.

## Структура роутов

```
/ - Главная страница со списком криптовалют и поиском
/coin/:id - Страница с детальной информацией о конкретной монете
/portfolio - Страница портфолио пользователя
/alerts - Страница управления алертами по ценам
```

## Как это работает

### createBrowserRouter

Используется `createBrowserRouter` - современный подход к роутингу в React Router v7:

- **Декларативная конфигурация**: Все роуты объявляются в одном месте
- **Типизация**: Отличная поддержка TypeScript
- **Производительность**: Оптимизированная загрузка данных
- **Data APIs**: Поддержка loader/action для загрузки данных на уровне роутов

### Динамический параметр :id

Роут `/coin/:id` использует динамический параметр:
- `:id` - это переменная часть URL
- Доступ к параметру в компоненте через `useParams()` hook
- Пример: `/coin/bitcoin` → `id = "bitcoin"`

## Использование

```tsx
import { AppRouter } from './app/router';

function App() {
  return <AppRouter />;
}
```

## Навигация в приложении

### Link компонент
```tsx
import { Link } from 'react-router-dom';

<Link to="/portfolio">Портфолио</Link>
<Link to="/coin/bitcoin">Биткоин</Link>
```

### Программная навигация
```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/portfolio');
navigate(`/coin/${coinId}`);
```

### Получение параметров
```tsx
import { useParams } from 'react-router-dom';

function CoinDetailsPage() {
  const { id } = useParams(); // получаем :id из URL
  // id будет содержать значение, например "bitcoin"
}
```

## Расширение

Для добавления нового роута:

1. Создайте компонент страницы в `src/pages/`
2. Импортируйте компонент в `router/index.tsx`
3. Добавьте новый объект в массив конфигурации:

```tsx
{
  path: '/new-page',
  element: <NewPage />,
}
```

## Future: Nested Routes

В будущем можно будет добавить вложенные роуты с layout:

```tsx
{
  path: '/',
  element: <Layout />, // общий layout с навигацией
  children: [
    { index: true, element: <HomePage /> },
    { path: 'portfolio', element: <PortfolioPage /> },
    // ...
  ]
}
```

## Future: Загрузка данных

React Router v7 поддерживает loader для загрузки данных:

```tsx
{
  path: '/coin/:id',
  element: <CoinDetailsPage />,
  loader: async ({ params }) => {
    // Загрузка данных до рендера компонента
    const coin = await fetchCoin(params.id);
    return { coin };
  }
}
```

Это позволяет загружать данные параллельно с навигацией, улучшая UX.

