# План изучения Zod

## 📚 Обзор

Zod — это TypeScript-first библиотека для валидации схем с выводом типов. В этом проекте используется Zod 4.1.12 для валидации форм, API-ответов, переменных окружения и localStorage.

**Официальная документация:** https://zod.dev/

---

## 🎯 Уровень 1: Основы (1-2 дня)

### 1.1 Установка и базовое использование

**Цель:** Понять, что такое схема и как она работает.

```typescript
import { z } from "zod";

// Простая схема
const nameSchema = z.string();
const ageSchema = z.number();

// Валидация
nameSchema.parse("Иван"); // ✅ "Иван"
nameSchema.parse(123);    // ❌ ZodError

// Безопасная валидация
const result = nameSchema.safeParse(123);
if (result.success) {
  console.log(result.data); // тип: string
} else {
  console.log(result.error); // ZodError
}
```

**Практика:**
- Создайте простые схемы для строк, чисел, булевых значений
- Попробуйте `parse()` и `safeParse()`
- Изучите структуру `ZodError`

**Пример из проекта:**
```typescript
// src/shared/api/site/v1/master/application/schemas.ts
const idSchema = z.number().int();
const guidSchema = z.string();
```

---

### 1.2 Базовые типы данных

**Цель:** Изучить все примитивные типы Zod.

```typescript
z.string()      // строка
z.number()      // число
z.boolean()     // булево
z.bigint()      // BigInt
z.date()        // Date объект
z.undefined()   // undefined
z.null()        // null
z.void()        // void
z.any()         // любой тип (избегайте!)
z.unknown()     // неизвестный тип (предпочтительнее any)
z.never()       // никогда (для невозможных случаев)
```

**Практика:**
- Создайте схемы для всех базовых типов
- Попробуйте валидировать разные значения

---

### 1.3 Объекты и вложенные структуры

**Цель:** Научиться описывать объекты.

```typescript
const userSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
});

// Валидация
const user = userSchema.parse({
  name: "Иван",
  age: 30,
  email: "ivan@example.com"
});

// Вывод типа
type User = z.infer<typeof userSchema>;
// { name: string; age: number; email: string; }
```

**Практика:**
- Создайте схему для пользователя с несколькими полями
- Используйте `z.infer<>` для получения типа

**Пример из проекта:**
```typescript
// src/shared/api/site/v1/master/application/schemas.ts
export const applicationObjectSchema = z.object({
  guid: guidSchema,
});
```

---

## 🎯 Уровень 2: Валидация и модификаторы (2-3 дня)

### 2.1 Валидация строк

**Цель:** Научиться валидировать строки с ограничениями.

```typescript
z.string()
  .min(1, { message: "Поле обязательно" })
  .max(100, { message: "Максимум 100 символов" })
  .email({ message: "Некорректный email" })
  .url({ message: "Некорректный URL" })
  .regex(/^[A-Z]/, { message: "Должно начинаться с заглавной" })
  .startsWith("https://")
  .endsWith(".com")
  .length(10, { message: "Должно быть ровно 10 символов" })
```

**Практика:**
- Создайте схему для пароля (минимум 8 символов, хотя бы одна цифра)
- Создайте схему для телефонного номера с regex

**Пример из проекта:**
```typescript
// src/entity/application/model/schema/application-form.ts
date: z
  .string({ error: "Дата должна быть заполнена" })
  .min(1, { message: "Дата должна быть заполнена" })
  .regex(/^(?:\d{2}\.){2}\d{4}$/, {
    message: "Дата должна быть в формате DD.MM.YYYY",
  })
```

---

### 2.2 Валидация чисел

**Цель:** Научиться валидировать числа с ограничениями.

```typescript
z.number()
  .int({ message: "Должно быть целым числом" })
  .positive({ message: "Должно быть положительным" })
  .min(0, { message: "Минимум 0" })
  .max(100, { message: "Максимум 100" })
  .multipleOf(5, { message: "Должно быть кратно 5" })
  .finite() // не Infinity, не NaN
```

**Практика:**
- Создайте схему для возраста (0-120)
- Создайте схему для процента (0-100)

**Пример из проекта:**
```typescript
// src/shared/api/site/v1/master/application/schemas.ts
const idSchema = z.number().int();
```

---

### 2.3 Опциональные и nullable поля

**Цель:** Понять разницу между optional и nullable.

```typescript
z.string().optional()        // string | undefined
z.string().nullable()        // string | null
z.string().nullish()         // string | null | undefined
z.string().default("значение по умолчанию")
z.string().optional().default("значение")
```

**Практика:**
- Создайте объект с обязательными, опциональными и nullable полями
- Используйте `.default()` для значений по умолчанию

**Пример из проекта:**
```typescript
// src/entity/application/model/schema/application-form.ts
instructor: z.string().optional(),
contract: z.string().optional(),
description: z.string().optional(),
```

---

### 2.4 Массивы и кортежи

**Цель:** Научиться валидировать коллекции.

```typescript
// Массивы
z.array(z.string())
  .min(1, { message: "Минимум 1 элемент" })
  .max(10, { message: "Максимум 10 элементов" })
  .length(5, { message: "Ровно 5 элементов" })
  .nonempty({ message: "Массив не должен быть пустым" })

// Кортежи (фиксированная длина и типы)
z.tuple([z.string(), z.number(), z.boolean()])
// [string, number, boolean]

// Неоднородные массивы
z.array(z.union([z.string(), z.number()]))
```

**Практика:**
- Создайте схему для списка тегов (минимум 1, максимум 10)
- Создайте кортеж для координат [x, y]

**Пример из проекта:**
```typescript
// src/shared/api/site/v1/master/application/schemas.ts
export const getUserApplicationsFilterRequestSchema = z.object({
  object_ids: z.array(z.number().int()).optional(),
  statuses: z.array(z.string()).optional(),
});
```

---

## 🎯 Уровень 3: Продвинутые техники (3-4 дня)

### 3.1 Union и Discriminated Union

**Цель:** Валидация альтернативных типов.

```typescript
// Простой union
z.union([z.string(), z.number()])

// Discriminated union (по полю type)
const eventSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("click"), x: z.number(), y: z.number() }),
  z.object({ type: z.literal("keypress"), key: z.string() }),
]);
```

**Практика:**
- Создайте discriminated union для разных типов событий
- Используйте union для валидации разных форматов данных

---

### 3.2 Enum и Literal

**Цель:** Валидация фиксированных значений.

```typescript
// Enum
z.enum(["admin", "user", "guest"])

// Literal (одно значение)
z.literal("success")
z.literal(42)

// Несколько literals через union
z.union([z.literal("start"), z.literal("end")])
```

**Практика:**
- Создайте enum для статусов заказа
- Используйте literal для валидации конкретных значений

**Пример из проекта:**
```typescript
// src/shared/api/site/v1/master/application/schemas.ts
app_type: z.enum(["start", "end"]),

// src/shared/config/env.ts
VITE_LOG_LEVEL: z.enum(["silent", "error", "warn", "info", "log", "debug"]).optional(),
```

---

### 3.3 Кастомная валидация с `.refine()`

**Цель:** Создавать сложные правила валидации.

```typescript
z.string()
  .refine(
    (value) => value.length > 5,
    { message: "Должно быть больше 5 символов" }
  )
  .refine(
    (value) => /[A-Z]/.test(value),
    { message: "Должна быть заглавная буква" }
  )

// С доступом к полному объекту
z.object({
  password: z.string(),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"], // где показать ошибку
})
```

**Практика:**
- Создайте схему для пароля с несколькими правилами
- Валидируйте зависимость между полями

**Пример из проекта:**
```typescript
// src/entity/application/model/schema/application-form.ts
timeRange: z
  .string()
  .refine(
    (value) => {
      try {
        const parsed = JSON.parse(value) as { start?: string; end?: string };
        return (
          parsed && typeof parsed.start === "string" && typeof parsed.end === "string"
        );
      } catch {
        return false;
      }
    },
    { message: "Некорректный формат времени" }
  )
  .refine(
    (value) => {
      try {
        const { start, end } = JSON.parse(value) as { start: string; end: string };
        return start !== end;
      } catch {
        return false;
      }
    },
    { message: "Время начала и окончания не может совпадать" }
  )
```

---

### 3.4 Сложная валидация с `.superRefine()`

**Цель:** Валидация с несколькими ошибками и условной логикой.

```typescript
z.object({
  email: z.string().email(),
  age: z.number(),
  country: z.string(),
})
.superRefine((data, ctx) => {
  // Условная валидация
  if (data.country === "US" && data.age < 21) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["age"],
      message: "В США нужно быть старше 21",
    });
  }
  
  // Несколько ошибок на одно поле
  if (data.email.includes("test") && data.country === "RU") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["email"],
      message: "Тестовые email не разрешены в России",
    });
  }
})
```

**Практика:**
- Создайте форму с зависимыми полями
- Добавьте несколько условий валидации

**Пример из проекта:**
```typescript
// src/entity/application/model/schema/application-form.ts
.superRefine((data, ctx) => {
  if (data.requiresInstructor && !data.instructor) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["instructor"],
      message: "Требуется выбрать инструктора",
    });
  }
  if (data.contractRequired && !data.contract) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["contract"],
      message: "Договор должен быть выбран",
    });
  }
})
```

---

### 3.5 Трансформация данных с `.transform()`

**Цель:** Преобразование данных во время валидации.

```typescript
z.string()
  .transform((val) => val.trim())
  .transform((val) => val.toLowerCase())

z.string()
  .transform((val) => Number.parseInt(val, 10))
  .pipe(z.number().int())

// Преобразование объекта
z.object({
  firstName: z.string(),
  lastName: z.string(),
})
.transform((data) => ({
  fullName: `${data.firstName} ${data.lastName}`,
}))
```

**Практика:**
- Создайте схему, которая нормализует email (trim + lowercase)
- Преобразуйте строку в число с валидацией

---

### 3.6 Предварительная валидация с `.preprocess()`

**Цель:** Обработка данных перед валидацией.

```typescript
z.preprocess(
  (input) => {
    if (typeof input === "string") {
      return JSON.parse(input);
    }
    return input;
  },
  z.object({
    name: z.string(),
    age: z.number(),
  })
)
```

**Практика:**
- Создайте схему, которая принимает и строку, и объект
- Нормализуйте данные перед валидацией

---

## 🎯 Уровень 4: Композиция и переиспользование (2-3 дня)

### 4.1 Создание переиспользуемых схем

**Цель:** Строить сложные схемы из простых.

```typescript
// Базовые схемы
const idSchema = z.number().int().positive();
const emailSchema = z.string().email();
const passwordSchema = z.string().min(8);

// Композиция
const userSchema = z.object({
  id: idSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Расширение схем
const adminSchema = userSchema.extend({
  role: z.literal("admin"),
  permissions: z.array(z.string()),
});

// Merge схем
const baseSchema = z.object({ name: z.string() });
const extendedSchema = z.object({ age: z.number() });
const merged = baseSchema.merge(extendedSchema);
```

**Практика:**
- Создайте библиотеку переиспользуемых схем
- Расширяйте базовые схемы для разных случаев

**Пример из проекта:**
```typescript
// src/shared/api/site/v1/master/application/schemas.ts
const idSchema = z.number().int();
const guidSchema = z.string();
const isoDateString = z.string();
const timeString = z.string();

// Использование в разных схемах
export const createApplicationRequestSchema = z.object({
  contract_guid: guidSchema,
  contractor_guid: guidSchema.optional(),
  date_start: isoDateString,
  // ...
});
```

---

### 4.2 `.pick()`, `.omit()`, `.partial()`

**Цель:** Создавать варианты схем из существующих.

```typescript
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

// Выбрать только нужные поля
const publicUserSchema = userSchema.pick({ id: true, name: true, email: true });

// Исключить поля
const createUserSchema = userSchema.omit({ id: true });

// Все поля опциональны
const updateUserSchema = userSchema.partial();

// Глубокий partial
const deepPartial = userSchema.deepPartial();
```

**Практика:**
- Создайте схему для создания и обновления из одной базовой
- Используйте pick для публичных версий объектов

---

### 4.3 `.passthrough()` и `.strict()`

**Цель:** Контроль над дополнительными полями.

```typescript
// По умолчанию Zod удаляет неизвестные поля
z.object({ name: z.string() }).parse({ name: "Иван", age: 30 });
// { name: "Иван" } - age удален

// passthrough - оставить дополнительные поля
z.object({ name: z.string() }).passthrough().parse({ name: "Иван", age: 30 });
// { name: "Иван", age: 30 }

// strict - ошибка при дополнительных полях
z.object({ name: z.string() }).strict().parse({ name: "Иван", age: 30 });
// ❌ ZodError: Unrecognized key(s) in object: 'age'
```

**Практика:**
- Используйте strict для строгой валидации API-ответов
- Используйте passthrough когда нужно сохранить дополнительные данные

---

## 🎯 Уровень 5: Реальные кейсы (3-4 дня)

### 5.1 Валидация переменных окружения

**Цель:** Безопасная работа с env переменными.

```typescript
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().transform(Number).pipe(z.number().int().positive()),
  NODE_ENV: z.enum(["development", "production", "test"]),
  API_KEY: z.string().min(1),
});

const env = envSchema.parse(process.env);
```

**Практика:**
- Создайте схему для всех env переменных проекта
- Добавьте значения по умолчанию где нужно

**Пример из проекта:**
```typescript
// src/shared/config/env.ts
const schema = z.object({
  VITE_API_URL: z.string().optional(),
  VITE_FRONTEND_URL: z.string().optional(),
  VITE_LOG_LEVEL: z.enum(["silent", "error", "warn", "info", "log", "debug"]).optional(),
  MODE: z.string().optional(),
  DEV: z.boolean().optional(),
  // ...
});

const parsed = schema.parse(import.meta.env);
```

---

### 5.2 Валидация API-ответов

**Цель:** Типобезопасная работа с API.

```typescript
// Схема ответа
const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// Валидация ответа
async function fetchUser(id: number) {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  
  // Валидация и вывод типа
  const user = userResponseSchema.parse(data);
  return user; // тип: { id: number; name: string; email: string; }
}
```

**Практика:**
- Создайте схемы для всех API-эндпоинтов
- Используйте `z.infer<>` для типов

**Пример из проекта:**
```typescript
// src/shared/api/site/v1/master/application/schemas.ts
export const createApplicationResponseSchema = z.object({
  contract_guid: guidSchema,
  contractor_guid: guidSchema,
  date_start: isoDateString,
  // ...
});

// Вывод типа
export type CreateApplicationResponse = z.infer<typeof createApplicationResponseSchema>;
```

---

### 5.3 Валидация форм с React Hook Form

**Цель:** Интеграция Zod с формами.

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Имя обязательно"),
  email: z.string().email("Некорректный email"),
  age: z.number().min(18, "Минимум 18 лет"),
});

type FormData = z.infer<typeof formSchema>;

function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  
  // ...
}
```

**Практика:**
- Создайте форму с валидацией
- Добавьте кастомные сообщения об ошибках

**Пример из проекта:**
```typescript
// src/features/application/manage-application/ui/application-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationFormSchema } from "@/entity/application";

const form = useForm({
  resolver: zodResolver(applicationFormSchema),
});
```

---

### 5.4 Валидация localStorage

**Цель:** Безопасное хранение данных.

```typescript
const userPreferencesSchema = z.object({
  theme: z.enum(["light", "dark"]),
  language: z.string(),
});

function savePreferences(prefs: unknown) {
  const validated = userPreferencesSchema.parse(prefs);
  localStorage.setItem("prefs", JSON.stringify(validated));
}

function loadPreferences() {
  const stored = localStorage.getItem("prefs");
  if (!stored) return null;
  
  try {
    const parsed = JSON.parse(stored);
    return userPreferencesSchema.parse(parsed);
  } catch {
    return null;
  }
}
```

**Практика:**
- Создайте сервис для работы с localStorage
- Добавьте fallback значения

**Пример из проекта:**
```typescript
// src/shared/utils/local-storage.utils.ts
export class LocalStorageService<T> {
  private readonly schema: z.ZodType<T>;
  
  get(): T | undefined {
    const item = localStorage.getItem(this.key);
    if (!item) return this.fallback;
    
    const parsed = JSON.parse(item);
    const validated = this.schema.safeParse(parsed);
    
    if (!validated.success) {
      console.warn(`Validation failed:`, validated.error);
      return this.fallback;
    }
    
    return validated.data;
  }
}
```

---

### 5.5 Валидация URL параметров и query strings

**Цель:** Валидация параметров маршрута.

```typescript
const searchParamsSchema = z.object({
  page: z.string().transform(Number).pipe(z.number().int().positive()).default("1"),
  limit: z.string().transform(Number).pipe(z.number().int().min(1).max(100)).default("10"),
  sort: z.enum(["asc", "desc"]).optional(),
});

function parseSearchParams(searchParams: URLSearchParams) {
  const params = Object.fromEntries(searchParams);
  return searchParamsSchema.parse(params);
}
```

**Практика:**
- Создайте схему для фильтров
- Валидируйте параметры маршрута

---

## 🎯 Уровень 6: Продвинутые паттерны (2-3 дня)

### 6.1 Рекурсивные схемы

**Цель:** Валидация вложенных структур.

```typescript
type Category = {
  name: string;
  subcategories?: Category[];
};

const categorySchema: z.ZodType<Category> = z.lazy(() =>
  z.object({
    name: z.string(),
    subcategories: z.array(categorySchema).optional(),
  })
);
```

**Практика:**
- Создайте схему для дерева комментариев
- Валидируйте рекурсивные структуры

---

### 6.2 Условная валидация с `.and()`, `.or()`

**Цель:** Комбинирование схем.

```typescript
// AND - все условия должны выполняться
z.string().min(5).and(z.string().max(10))

// OR - хотя бы одно условие
z.union([z.string(), z.number()])
```

---

### 6.3 Работа с датами

**Цель:** Валидация и трансформация дат.

```typescript
z.date()
z.string().datetime() // ISO 8601
z.string().date()     // YYYY-MM-DD
z.coerce.date()       // автоматическое преобразование

// Кастомный формат
z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/)
  .transform((str) => {
    const [day, month, year] = str.split(".");
    return new Date(`${year}-${month}-${day}`);
  })
```

**Практика:**
- Создайте схему для даты в формате DD.MM.YYYY
- Валидируйте диапазон дат

---

### 6.4 Обработка ошибок

**Цель:** Красивое отображение ошибок.

```typescript
import { ZodError } from "zod";

try {
  schema.parse(data);
} catch (error) {
  if (error instanceof ZodError) {
    // Форматирование ошибок
    error.errors.forEach((err) => {
      console.log(`${err.path.join(".")}: ${err.message}`);
    });
    
    // Или используйте zod-validation-error
    const formatted = fromZodError(error);
    console.log(formatted.message);
  }
}
```

**Практика:**
- Создайте утилиту для форматирования ошибок
- Покажите ошибки пользователю в понятном виде

---

## 📖 Рекомендуемые ресурсы

1. **Официальная документация:** https://zod.dev/
2. **Zod GitHub:** https://github.com/colinhacks/zod
3. **Примеры из проекта:**
   - `src/entity/application/model/schema/application-form.ts` - сложная валидация формы
   - `src/shared/api/site/v1/master/application/schemas.ts` - API схемы
   - `src/shared/config/env.ts` - валидация окружения
   - `src/shared/utils/local-storage.utils.ts` - валидация localStorage

---

## ✅ Чеклист прогресса

### Уровень 1: Основы
- [ ] Понимаю, что такое схема и как она работает
- [ ] Могу создать простые схемы для базовых типов
- [ ] Понимаю разницу между `parse()` и `safeParse()`
- [ ] Могу создавать объекты и получать типы через `z.infer<>`

### Уровень 2: Валидация
- [ ] Могу валидировать строки с ограничениями
- [ ] Могу валидировать числа с ограничениями
- [ ] Понимаю разницу между `.optional()`, `.nullable()`, `.nullish()`
- [ ] Могу работать с массивами и кортежами

### Уровень 3: Продвинутые техники
- [ ] Могу использовать `.refine()` для кастомной валидации
- [ ] Могу использовать `.superRefine()` для сложной валидации
- [ ] Понимаю union и discriminated union
- [ ] Могу использовать `.transform()` для преобразования данных

### Уровень 4: Композиция
- [ ] Могу создавать переиспользуемые схемы
- [ ] Могу использовать `.pick()`, `.omit()`, `.partial()`
- [ ] Понимаю разницу между `.passthrough()` и `.strict()`

### Уровень 5: Реальные кейсы
- [ ] Могу валидировать переменные окружения
- [ ] Могу валидировать API-ответы
- [ ] Могу интегрировать Zod с React Hook Form
- [ ] Могу валидировать данные в localStorage

### Уровень 6: Продвинутые паттерны
- [ ] Могу создавать рекурсивные схемы
- [ ] Могу работать с датами
- [ ] Могу красиво обрабатывать ошибки

---

## 🎓 Практические задания

### Задание 1: Схема пользователя
Создайте схему для пользователя со следующими полями:
- `id`: число, положительное, целое
- `email`: валидный email
- `password`: минимум 8 символов, хотя бы одна цифра и заглавная буква
- `age`: от 18 до 120
- `role`: "admin" | "user" | "guest"
- `tags`: массив строк, максимум 10 элементов
- `createdAt`: дата

### Задание 2: Форма регистрации
Создайте схему для формы регистрации:
- `email`: валидный email
- `password`: минимум 8 символов
- `confirmPassword`: должно совпадать с password
- `terms`: должно быть true
- `newsletter`: опционально, по умолчанию false

### Задание 3: API схема
Создайте схемы для API эндпоинта `/api/posts`:
- Request: `{ page: number, limit: number, sort: "asc" | "desc" }`
- Response: `{ data: Post[], total: number, page: number }`
- Post: `{ id: number, title: string, content: string, author: User, createdAt: string }`

### Задание 4: Валидация окружения
Создайте схему для env переменных:
- `DATABASE_URL`: валидный URL
- `PORT`: число от 1000 до 65535
- `NODE_ENV`: "development" | "production" | "test"
- `API_KEY`: непустая строка
- `DEBUG`: булево, по умолчанию false

---

## 💡 Советы

1. **Всегда используйте `safeParse()` в production** - это безопаснее, чем `parse()`
2. **Используйте `z.infer<>` для типов** - один источник истины
3. **Создавайте переиспользуемые схемы** - не дублируйте код
4. **Добавляйте понятные сообщения об ошибках** - это поможет пользователям
5. **Используйте `.transform()` для нормализации данных** - перед валидацией
6. **Тестируйте схемы** - особенно edge cases
7. **Изучайте примеры из проекта** - там много реальных паттернов

---

**Удачи в изучении Zod! 🚀**

