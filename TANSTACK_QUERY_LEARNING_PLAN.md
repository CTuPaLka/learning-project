# План изучения TanStack Query (React Query)

## 🎯 Цель
Свободно читать и писать код, используя TanStack Query v5, понимая best practices и паттерны.

---

## 📚 Этап 1: Основы (1-2 дня)

### 1.1 Концепции и терминология
- **Query** - запрос данных (GET-запросы)
- **Mutation** - изменение данных (POST, PUT, DELETE)
- **Query Key** - уникальный идентификатор запроса
- **Query Function** - функция, которая выполняет запрос
- **Cache** - кеш запросов
- **Stale Time** - время, в течение которого данные считаются свежими
- **Cache Time** (GC Time в v5) - время хранения неактивных данных в кеше
- **Refetch** - повторный запрос данных
- **Invalidation** - инвалидация кеша

### 1.2 Базовое использование
```typescript
// Простейший useQuery
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(res => res.json())
});

// Простейший useMutation
const mutation = useMutation({
  mutationFn: (newUser) => fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(newUser)
  })
});
```

**Практика:**
- Создайте простой компонент с useQuery
- Создайте форму с useMutation
- Поэкспериментируйте с состояниями: `isLoading`, `isError`, `isSuccess`

---

## 📚 Этап 2: Query Keys и организация (1 день)

### 2.1 Структура Query Keys
**Best Practice:** Используйте иерархическую структуру

```typescript
// ❌ Плохо
queryKey: ['user', userId]

// ✅ Хорошо - иерархическая структура
queryKey: ['users', userId]
queryKey: ['users', userId, 'posts']
queryKey: ['users', userId, 'posts', postId]

// ✅ Еще лучше - с типами
queryKey: ['users', { id: userId }]
queryKey: ['users', { id: userId }, 'posts', { id: postId }]
```

### 2.2 Query Key Factory Pattern
**Best Practice:** Создайте фабрику для query keys

```typescript
// shared/libs/react-query/query-keys.ts
export const queryKeys = {
  users: {
    all: ['users'] as const,
    detail: (id: string) => ['users', id] as const,
    posts: (userId: string) => ['users', userId, 'posts'] as const,
  },
  posts: {
    all: ['posts'] as const,
    detail: (id: string) => ['posts', id] as const,
  },
} as const;
```

**Практика:**
- Создайте query-keys.ts файл
- Рефакторите существующие query keys в проекте
- Используйте TypeScript для типобезопасности

---

## 📚 Этап 3: Конфигурация QueryClient (1 день)

### 3.1 Настройка QueryClient
**Best Practice:** Централизованная конфигурация

```typescript
// shared/libs/react-query/react-query-client.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 минут
      gcTime: 1000 * 60 * 30, // 30 минут (было cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

### 3.2 Обработка ошибок
```typescript
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        // Глобальная обработка ошибок
        console.error('Query error:', error);
      },
    },
    mutations: {
      onError: (error) => {
        // Глобальная обработка ошибок мутаций
        console.error('Mutation error:', error);
      },
    },
  },
});
```

**Практика:**
- Настройте QueryClient в вашем проекте
- Добавьте глобальную обработку ошибок
- Настройте retry логику

---

## 📚 Этап 4: Кастомные хуки (1-2 дня)

### 4.1 Создание переиспользуемых хуков
**Best Practice:** Инкапсулируйте логику запросов

```typescript
// features/users/api/use-user.ts
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/libs/react-query/query-keys';
import { userApi } from './user-api';

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => userApi.getUser(userId),
    enabled: !!userId, // Запрос выполнится только если userId есть
  });
};
```

### 4.2 Типизация с TypeScript
```typescript
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type User = { id: string; name: string };

export const useUser = (
  userId: string,
  options?: Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<User>({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => userApi.getUser(userId),
    ...options,
  });
};
```

**Практика:**
- Создайте кастомные хуки для ваших API endpoints
- Добавьте полную типизацию
- Используйте `enabled` для условных запросов

---

## 📚 Этап 5: Mutations и оптимистичные обновления (2 дня)

### 5.1 Базовые мутации
```typescript
// features/users/api/use-create-user.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/shared/libs/react-query/query-keys';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserData) => userApi.createUser(data),
    onSuccess: (newUser) => {
      // Инвалидация списка пользователей
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      
      // Или добавление в кеш напрямую
      queryClient.setQueryData(
        queryKeys.users.detail(newUser.id),
        newUser
      );
    },
  });
};
```

### 5.2 Оптимистичные обновления
**Best Practice:** Обновляйте UI до получения ответа сервера

```typescript
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserData }) =>
      userApi.updateUser(id, data),
    
    // Оптимистичное обновление
    onMutate: async (variables) => {
      // Отменяем активные запросы
      await queryClient.cancelQueries({ 
        queryKey: queryKeys.users.detail(variables.id) 
      });

      // Сохраняем предыдущее значение
      const previousUser = queryClient.getQueryData<User>(
        queryKeys.users.detail(variables.id)
      );

      // Оптимистично обновляем
      queryClient.setQueryData(
        queryKeys.users.detail(variables.id),
        (old: User) => ({ ...old, ...variables.data })
      );

      return { previousUser };
    },

    // Откат при ошибке
    onError: (err, variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(
          queryKeys.users.detail(variables.id),
          context.previousUser
        );
      }
    },

    // Всегда выполняем refetch после успеха или ошибки
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.users.detail(variables.id) 
      });
    },
  });
};
```

**Практика:**
- Создайте мутации для создания, обновления, удаления
- Реализуйте оптимистичные обновления
- Добавьте обработку ошибок с откатом

---

## 📚 Этап 6: Инвалидация и синхронизация кеша (1 день)

### 6.1 Стратегии инвалидации
**Best Practice:** Используйте правильную стратегию для каждого случая

```typescript
// После создания - инвалидируем список
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
}

// После обновления - обновляем конкретный элемент
onSuccess: (data) => {
  queryClient.setQueryData(queryKeys.users.detail(data.id), data);
  queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
}

// После удаления - удаляем из кеша и инвалидируем список
onSuccess: (_, deletedId) => {
  queryClient.removeQueries({ queryKey: queryKeys.users.detail(deletedId) });
  queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
}
```

### 6.2 Паттерн: Query Invalidation Strategy
```typescript
// shared/libs/react-query/revalidation/strategy.ts
export const revalidationStrategy = {
  // Инвалидация всех связанных запросов
  invalidateAll: (queryClient: QueryClient) => {
    queryClient.invalidateQueries();
  },
  
  // Инвалидация конкретной сущности
  invalidateEntity: (queryClient: QueryClient, entity: string, id?: string) => {
    if (id) {
      queryClient.invalidateQueries({ 
        queryKey: [entity, id] 
      });
    }
    queryClient.invalidateQueries({ 
      queryKey: [entity] 
    });
  },
};
```

**Практика:**
- Изучите существующую стратегию в проекте
- Создайте централизованную систему инвалидации
- Протестируйте различные сценарии

---

## 📚 Этап 7: Продвинутые паттерны (2-3 дня)

### 7.1 Dependent Queries (Зависимые запросы)
```typescript
const { data: user } = useUser(userId);

const { data: posts } = useQuery({
  queryKey: queryKeys.users.posts(userId),
  queryFn: () => userApi.getUserPosts(userId),
  enabled: !!user, // Запрос выполнится только после получения user
});
```

### 7.2 Parallel Queries
```typescript
// Используйте useQueries для параллельных запросов
const results = useQueries({
  queries: userIds.map((id) => ({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => userApi.getUser(id),
  })),
});
```

### 7.3 Infinite Queries (Пагинация)
```typescript
import { useInfiniteQuery } from '@tanstack/react-query';

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: queryKeys.posts.all,
  queryFn: ({ pageParam = 0 }) => 
    postApi.getPosts({ page: pageParam, limit: 10 }),
  getNextPageParam: (lastPage, pages) => 
    lastPage.hasNext ? pages.length : undefined,
  initialPageParam: 0,
});
```

### 7.4 Prefetching (Предзагрузка)
```typescript
// Предзагрузка данных при наведении
const queryClient = useQueryClient();

const handleMouseEnter = () => {
  queryClient.prefetchQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => userApi.getUser(userId),
    staleTime: 1000 * 60 * 5,
  });
};
```

**Практика:**
- Реализуйте зависимые запросы
- Добавьте infinite scroll с useInfiniteQuery
- Добавьте prefetching для улучшения UX

---

## 📚 Этап 8: DevTools и отладка (0.5 дня)

### 8.1 React Query DevTools
```typescript
// app/providers/react-query.tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const ReactQueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
```

**Практика:**
- Установите и настройте DevTools
- Изучите все вкладки: Queries, Mutations, Cache
- Используйте для отладки проблем с кешем

---

## 📚 Этап 9: Тестирование (1-2 дня)

### 9.1 Тестирование с моками
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

test('useUser fetches user data', async () => {
  const { result } = renderHook(() => useUser('1'), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual({ id: '1', name: 'John' });
});
```

**Практика:**
- Напишите тесты для ваших кастомных хуков
- Протестируйте мутации
- Протестируйте инвалидацию кеша

---

## 📚 Этап 10: Best Practices и паттерны (постоянно)

### 10.1 Организация кода
```
features/
  users/
    api/
      user-api.ts          # API функции
      use-user.ts          # Query hooks
      use-create-user.ts   # Mutation hooks
      query-keys.ts        # Query keys для этой фичи
```

### 10.2 Правила именования
- Query hooks: `use[Entity]` или `use[Entity]List`
- Mutation hooks: `use[Action][Entity]` (useCreateUser, useUpdateUser)
- Query keys: иерархическая структура с фабрикой

### 10.3 Обработка состояний загрузки
```typescript
// ❌ Плохо - показывать loading для каждого запроса
if (isLoading) return <Spinner />;

// ✅ Хорошо - использовать Suspense или скелетоны
const { data } = useQuery({ ... });

// Или
if (isLoading && !data) return <Skeleton />;
if (error) return <Error />;
```

### 10.4 Error Boundaries
```typescript
// Оберните приложение в Error Boundary
<ErrorBoundary fallback={<ErrorFallback />}>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
</ErrorBoundary>
```

### 10.5 Отмена запросов
```typescript
const queryClient = useQueryClient();

// Отмена при размонтировании компонента
useEffect(() => {
  return () => {
    queryClient.cancelQueries({ queryKey: queryKeys.users.all });
  };
}, []);
```

---

## 🎯 Чеклист для свободного владения

- [ ] Понимаю концепции Query, Mutation, Cache
- [ ] Умею создавать и использовать кастомные хуки
- [ ] Знаю, как правильно структурировать Query Keys
- [ ] Умею настраивать QueryClient с правильными defaults
- [ ] Могу реализовать оптимистичные обновления
- [ ] Понимаю стратегии инвалидации кеша
- [ ] Умею работать с зависимыми запросами
- [ ] Знаю, как использовать Infinite Queries
- [ ] Умею prefetch данные
- [ ] Могу отлаживать с помощью DevTools
- [ ] Пишу тесты для хуков
- [ ] Следую best practices организации кода

---

## 📖 Ресурсы для изучения

1. **Официальная документация**: https://tanstack.com/query/latest
2. **React Query Essentials**: https://tanstack.com/query/latest/docs/react/overview
3. **TypeScript Guide**: https://tanstack.com/query/latest/docs/react/typescript
4. **Примеры из проекта**: 
   - `src/shared/libs/react-query/` - конфигурация
   - `src/features/*/api/` - примеры использования
   - `src/widgets/*/` - использование в компонентах

---

## 🎓 Примеры из вашего проекта

### Query Keys Factory (уже реализовано)
```typescript
// src/shared/libs/react-query/query-keys.ts
export const queryKeys = {
  tasks: {
    all: () => ["tasks"] as const,
    list: (params?: unknown) => ["tasks", "list", params] as const,
    byId: (id: string | number) => ["tasks", "detail", id] as const,
  },
  applications: {
    filter: (filter: unknown) => ["applications", "filter", filter] as const,
    byId: (id: string | number) => ["applications", "detail", id] as const,
    analytics: (objectGuid: string, onlyUser: boolean, dateFrom?: string) =>
      ["applications", "analytics", objectGuid, onlyUser, dateFrom] as const,
  },
} as const;
```

**Что изучить:**
- Почему используется `as const` - для типобезопасности
- Иерархическая структура ключей
- Параметризованные ключи

### Кастомные хуки (useApiQuery, useApiMutation)
```typescript
// src/shared/libs/react-query/hooks.ts
export function useApiQuery<TData = ApiInterface<unknown>, TError = ServerErrorImpl>(
  options: UseQueryOptions<TData, TError>
) {
  return useQuery(options);
}

export function useApiMutation<
  TData = ApiInterface<unknown>,
  TError = ServerErrorImpl,
  TVariables = void,
>(options: UseMutationOptions<TData, TError, TVariables>) {
  return useMutation(options);
}
```

**Практика:**
- Изучите, почему созданы обертки над стандартными хуками
- Посмотрите на типизацию - как используется дженерики

### Пример Query Hook из проекта
```typescript
// src/entity/waybill/model/queries/use-get-current-waybill.ts
const useGetCurrentWaybill = () => {
  return useApiQuery({
    queryKey: queryKeys.driverWaybill.current(),
    queryFn: async () => {
      try {
        const res = await siteApi.v1.driver.waybill.getCurrent({...});
        return { data: mapCurrentWaybillFromApi(res.data) };
      } catch {
        return { data: null };
      }
    },
    throwOnError: false,
    retry: false,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
```

**Что изучить:**
- `throwOnError: false` - обработка ошибок внутри queryFn
- `staleTime: 0` - данные всегда считаются устаревшими
- `refetchOnWindowFocus: true` - обновление при фокусе окна

### Пример Mutation с инвалидацией
```typescript
// src/entity/waybill/model/mutations/use-finish-waybill.ts
const useFinishWaybill = () => {
  const invalidate = useInvalidateQueries();
  return useApiMutation({
    mutationKey: ["waybill-finish"],
    mutationFn: async (payload: FinishWaybillInput) => {
      const body = mapFinishToApi(payload);
      return siteApi.v1.driver.waybill.finish(body);
    },
    onSuccess: async () => {
      toast.success("Смена закрыта");
      await invalidate(["driver", "waybill", "current"]);
      await invalidate(["driver", "waybill", "filter"]);
    },
    onError: async (error) => {
      toast.error("Не удалось закрыть смену");
      await invalidate(["driver", "waybill", "filter"]);
    },
    throwOnError: false,
    retry: false,
  });
};
```

**Что изучить:**
- Инвалидация нескольких query keys
- Инвалидация даже при ошибке (для очистки состояния)
- `throwOnError: false` - не пробрасывать ошибку выше

### Prefetching из проекта
```typescript
// src/widgets/driver/driver-dashboard-widget/driver-dashboard-widget.tsx
const queryClient = useQueryClient();
const prefetchApplicationsForDate = useCallback(
  async (date: Date) => {
    const { day_start, day_finish } = dateUtils.getUserDayRangeIsoUtc(date);
    await queryClient.prefetchQuery({
      queryKey: queryKeys.driverApplications.filter({
        date_from: day_start,
        date_to: day_finish,
      }),
      queryFn: async () => {
        const res = await siteApi.v1.driver.application.filter({...});
        return { data: items };
      },
      staleTime: 5 * 60 * 1000, // 5 минут
    });
  },
  [queryClient]
);
```

**Что изучить:**
- Prefetch для улучшения UX при свайпах
- `staleTime` при prefetch - данные останутся свежими 5 минут

### Централизованная стратегия ревалидации
```typescript
// src/shared/libs/react-query/revalidation/strategy.ts
export const strategies: Record<MutationKind, RevalidationStrategy> = {
  updateApplication: async ({ queryClient, variables }) => {
    // Инвалидируем все списки и аналитику
    await queryClient.invalidateQueries({
      queryKey: ["applications", "filter"],
      refetchType: "all",
    });
    
    // Инвалидируем конкретную заявку
    if (variables && typeof variables === "object" && "id" in variables) {
      const id = variables.id as number;
      await queryClient.invalidateQueries({
        queryKey: queryKeys.applications.byId(id),
        refetchType: "all",
      });
    }
  },
};
```

**Что изучить:**
- Паттерн централизованной ревалидации через MutationCache
- Автоматическая инвалидация на основе типа мутации
- Использование `refetchType: "all"` для принудительного обновления

### Зависимые запросы из проекта
```typescript
// src/features/application/manage-application/model/use-application-form.ts
// Получаем список объектов
const { data: objectsData, isLoading: isLoadingObjects } = useGetDirectoryOfObjects();

// Получаем справочники для выбранного объекта
const { data: applicationInfoData, isLoading: isLoadingInfo } =
  useGetApplicationInfo(selectedObjectId);
```

**Что изучить:**
- Как работают зависимые запросы
- Когда использовать `enabled` для условных запросов

---

## 🔍 Задания на основе проекта

1. **Изучите query-keys.ts** - поймите структуру и добавьте свои ключи по аналогии
2. **Изучите use-finish-waybill.ts** - создайте свою мутацию с инвалидацией
3. **Изучите driver-dashboard-widget.tsx** - добавьте prefetching в свой компонент
4. **Изучите strategy.ts** - добавьте новую стратегию ревалидации для своей мутации
5. **Изучите use-application-form.ts** - поймите паттерн зависимых запросов

---

## 🚀 Практические задания

1. **День 1-2**: Создайте простой CRUD с useQuery и useMutation
2. **День 3**: Рефакторите существующие запросы в проекте, используя query-keys factory
3. **День 4-5**: Добавьте оптимистичные обновления для всех мутаций
4. **День 6**: Реализуйте infinite scroll для списка
5. **День 7**: Добавьте prefetching при наведении на ссылки
6. **День 8**: Напишите тесты для всех хуков
7. **День 9+**: Применяйте best practices в реальных задачах

---

## 💡 Полезные советы

1. **Всегда используйте TypeScript** - это поможет избежать ошибок
2. **Используйте DevTools** - они покажут состояние кеша в реальном времени
3. **Не бойтесь инвалидировать кеш** - лучше обновить данные, чем показать устаревшие
4. **Используйте enabled** - для условных запросов вместо условного рендеринга
5. **Оптимистичные обновления** - делают UI отзывчивым, но всегда делайте откат при ошибке
6. **Query Keys Factory** - сэкономит много времени и предотвратит ошибки

---

**Удачи в изучении! 🎉**

