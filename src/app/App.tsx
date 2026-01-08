import { AppProviders } from "./providers/app-providers"
import { AppRouter } from "./router"

/**
 * Главный компонент приложения Crypto Tracker
 *
 * Структура:
 * - AppProviders: обертка с ThemeProvider и QueryProvider
 * - AppRouter: управляет роутингом между страницами
 */
function App() {
	return (
		<AppProviders>
			<div className='app'>
				<AppRouter />
			</div>
		</AppProviders>
	)
}

export default App
