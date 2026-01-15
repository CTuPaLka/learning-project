import type z from "zod"

// LocalStorage утилиты с Zod
export class LocalStorageService<T> {
	private key: string
	private schema: z.ZodType<T>
	private fallback: T

	constructor(key: string, schema: z.ZodType<T>, fallback: T) {
		this.key = key
		this.schema = schema
		this.fallback = fallback
	}

	get(): T {
		try {
			const item = localStorage.getItem(this.key)
			if (!item) return this.fallback

			const parsed = JSON.parse(item)
			const validated = this.schema.safeParse(parsed)

			if (!validated.success) {
				console.warn("LocalStorage validation failed:", validated.error)
				return this.fallback
			}

			return validated.data
		} catch {
			return this.fallback
		}
	}

	set(value: T): void {
		const validated = this.schema.parse(value)
		localStorage.setItem(this.key, JSON.stringify(validated))
	}

	remove(): void {
		localStorage.removeItem(this.key)
	}
}
