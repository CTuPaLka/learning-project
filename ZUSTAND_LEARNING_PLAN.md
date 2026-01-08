# План изучения Zustand: от основ до продвинутых паттернов

## Цель

Полностью понять Zustand 5, его паттерны, взаимодействие с React и React Context, чтобы уверенно читать и писать код с использованием этой библиотеки.

## Структура обучения

### Этап 1: Основы Zustand (1-2 дня)

#### 1.1 Введение и установка
- Что такое Zustand и зачем он нужен
- Установка: `pnpm add zustand`
- Версии: Zustand 4 vs Zustand 5 (в проекте используется 5.0.8)
- Основные концепции: store, state, actions

#### 1.2 Простейший store (React API)
```typescript
// Базовый пример
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
```

**Практика:**
- Создать простой счетчик
- Понять функцию `set` и её варианты
- Разница между `set({ count: 1 })` и `set((state) => ({ count: state.count + 1 }))`

#### 1.3 Селекторы и подписки
- Как компоненты подписываются на изменения
- Селекторы: `useStore((state) => state.count)`
- Подписка на весь store: `useStore()`
- Когда происходит ре-рендер компонента

**Практика:**
- Создать store с несколькими полями
- Подписаться на разные части store в разных компонентах
- Наблюдать ре-рендеры через React DevTools

### Этап 2: TypeScript и типизация (1 день)

#### 2.1 Типизация store
```typescript
interface State {
  count: number
  name: string
}

interface Actions {
  increment: () => void
  setName: (name: string) => void
}

type Store = State & Actions

const useStore = create<Store>((set) => ({
  count: 0,
  name: '',
  increment: () => set((state) => ({ count: state.count + 1 })),
  setName: (name) => set({ name }),
}))
```

**Практика:**
- Типизировать существующий store
- Использовать типы для автодополнения в IDE

#### 2.2 Типизация селекторов
- Типизированные селекторы: `useStore<number>((state) => state.count)`
- Вынесение селекторов в отдельные функции (как в проекте: `selectors.ts`)

**Пример из проекта:**
```typescript
// src/features/barcode-scanner/model/store/selectors.ts
export const selectIsDecoding = (s: Store) => s.isDecoding;
export const selectLastResult = (s: Store) => s.lastResult;
```

### Этап 3: Vanilla Store и React Context паттерн (2-3 дня)

#### 3.1 Vanilla Store API
- Зачем нужен `zustand/vanilla`
- Создание store вне React: `createStore` из `zustand/vanilla`
- Использование store в не-React коде

**Пример из проекта:**
```typescript
// src/features/barcode-scanner/model/store/store.ts
import { createStore as createZustandStore } from "zustand/vanilla";

export const createStore = (init: Partial<State> = {}) =>
  createZustandStore<Store>()(
    devtools(
      (set) => ({ ...initialState, ...init, actions: { ... } }),
      { name: "barcode-scanner" }
    )
  );
```

#### 3.2 Интеграция с React Context
- Зачем комбинировать vanilla store с Context
- Преимущества: SSR, изоляция store, инициализация с props

**Паттерн из проекта:**
```typescript
// 1. Создаём vanilla store
const createStore = (init: State) => createZustandStore<Store>()(...)

// 2. Создаём Context
const StoreContext = createContext<StoreAPI | null>(null);

// 3. Provider компонент
export const StoreProvider = ({ children, init }) => {
  const store = useRef<StoreAPI>();
  if (!store.current) {
    store.current = createStore(init);
  }
  return <StoreContext.Provider value={store.current}>{children}</StoreContext.Provider>;
};

// 4. Хук для использования
export const useStore = <T,>(selector: (store: Store) => T) => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("...");
  return useStore(context, selector);
};
```

**Практика:**
- Изучить полный пример из `src/features/barcode-scanner/model/store/`
- Создать свой store по этому паттерну
- Понять, когда использовать vanilla + Context, а когда просто `create()`

#### 3.3 Разделение State и Actions
- Паттерн разделения State и Actions (как в проекте)
- Преимущества для типизации и организации кода

**Пример из проекта:**
```typescript
// types.ts
export interface State { ... }
export interface Actions { actions: { ... } }
export type Store = State & Actions;
```

### Этап 4: Middleware (1-2 дня)

#### 4.1 Devtools Middleware
- Интеграция с Redux DevTools
- Настройка имени store для DevTools

**Пример из проекта:**
```typescript
import { devtools } from "zustand/middleware";

createZustandStore<Store>()(
  devtools(
    (set) => ({ ... }),
    { name: "barcode-scanner" }
  )
);
```

**Практика:**
- Установить Redux DevTools Extension
- Наблюдать изменения store в реальном времени
- Использовать time-travel debugging

#### 4.2 Другие middleware
- `persist` - сохранение в localStorage
- `immer` - иммутабельные обновления (если нужно)
- `subscribeWithSelector` - подписка на селекторы
- Композиция middleware

### Этап 5: Оптимизация производительности (1-2 дня)

#### 5.1 useShallow для предотвращения лишних ре-рендеров
- Проблема: объекты и массивы создают новые ссылки
- Решение: `useShallow` из `zustand/react/shallow`

**Пример из проекта:**
```typescript
import { useShallow } from "zustand/react/shallow";

return useStore(context, useShallow(selector));
```

**Практика:**
- Создать store с вложенными объектами
- Показать проблему без `useShallow`
- Исправить с `useShallow`
- Измерить разницу в ре-рендерах

#### 5.2 Селекторы и мемоизация
- Правильное написание селекторов
- Избегание создания новых функций в селекторах
- Вынесение селекторов в константы

**Пример из проекта:**
```typescript
// ✅ Хорошо - селектор вынесен
const lastResult = useBarcodeScannerStore(selectLastResult);

// ❌ Плохо - новая функция на каждый рендер
const lastResult = useBarcodeScannerStore((s) => s.lastResult);
```

#### 5.3 Подписка вне React
- Использование `store.subscribe()` для не-React кода
- Подписка на конкретные части store

### Этап 6: Продвинутые паттерны (2-3 дня)

#### 6.1 Асинхронные actions
- Работа с async/await в actions
- Обработка loading и error состояний

**Практика:**
- Создать store для API запросов
- Реализовать loading, success, error состояния

#### 6.2 Композиция stores
- Разделение больших stores на маленькие
- Объединение stores через селекторы

#### 6.3 Store refs для доступа вне компонентов
**Пример из проекта:**
```typescript
// ref.ts
export const barcodeScannerStoreRef: {
  current: { getState: () => Store; setState: (s: Partial<Store>) => void } | null;
} = { current: null };

// provider.tsx
store.current = createStore(init);
barcodeScannerStoreRef.current = store.current;
```

**Практика:**
- Использовать store в обычных функциях (не хуках)
- Доступ к store в event handlers

#### 6.4 Инициализация store с props
- Обновление store при изменении props
- Использование `useEffect` для синхронизации

**Пример из проекта:**
```typescript
useEffect(() => {
  if (!store.current) return;
  store.current.setState({ ...init });
}, [init]);
```

### Этап 7: Практика на реальном проекте (2-3 дня)

#### 7.1 Анализ существующего кода
- Изучить `src/features/barcode-scanner/model/store/` полностью
- Понять структуру: `store.ts`, `provider.tsx`, `types.ts`, `selectors.ts`, `ref.ts`
- Проследить использование в компонентах

#### 7.2 Создание нового store
- Использовать скрипт `scripts/create-store.mjs`
- Создать store для новой фичи
- Применить все изученные паттерны

#### 7.3 Рефакторинг (опционально)
- Если есть старые stores на других библиотеках - мигрировать на Zustand
- Оптимизировать существующие stores

### Этап 8: Тестирование (1 день)

#### 8.1 Тестирование stores
- Тестирование vanilla stores
- Тестирование с React Testing Library
- Моки и изоляция

### Этап 9: Best Practices и анти-паттерны (1 день)

#### 9.1 Что делать
- Разделять State и Actions
- Выносить селекторы в отдельные функции
- Использовать типизацию
- Использовать `useShallow` для объектов/массивов
- Именовать stores понятно

#### 9.2 Чего избегать
- Не создавать селекторы внутри компонентов
- Не забывать про `useShallow`
- Не мутировать state напрямую
- Не создавать слишком большие stores

## Рекомендуемые ресурсы

1. **Официальная документация**: https://zustand.docs.pmnd.rs/
2. **GitHub репозиторий**: https://github.com/pmndrs/zustand
3. **Примеры из проекта**:
   - `src/features/barcode-scanner/model/store/` - полный пример паттерна
   - `scripts/create-store.mjs` - шаблон для создания stores

## Чек-лист понимания

После прохождения плана вы должны уметь:

- [ ] Создать простой store с `create()`
- [ ] Типизировать store в TypeScript
- [ ] Использовать vanilla store API
- [ ] Интегрировать store с React Context
- [ ] Использовать middleware (devtools, persist)
- [ ] Оптимизировать ре-рендеры с `useShallow`
- [ ] Писать правильные селекторы
- [ ] Работать с асинхронными actions
- [ ] Использовать store refs для доступа вне компонентов
- [ ] Читать и понимать код Zustand в любом проекте
- [ ] Создавать stores по паттернам проекта

## Временные рамки

- Минимум: 7-10 дней (интенсивное изучение)
- Комфортно: 2-3 недели (с практикой)
- С углублением: 1 месяц (включая эксперименты)

## Следующие шаги

После освоения основ можно изучить:
- Интеграцию с React Query
- SSR с Zustand
- Миграцию с Redux/MobX на Zustand
- Продвинутые паттерны для больших приложений

