import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "../../pages/home"
import CoinDetailsPage from "../../pages/coin-details/[id]"
import PortfolioPage from "../../pages/portfolio"
import AlertsPage from "../../pages/alerts"

/**
 * TODO: пофиксить ошибку в router
 */
/**
 * Роутер приложения Crypto Tracker
const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/coin/:id',
    element: <CoinDetailsPage />,
  },
]
 * Использует React Router v7 с createBrowserRouter
 */
export const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/coin/:id",
		element: <CoinDetailsPage />,
	},
	{
		path: "/portfolio",
		element: <PortfolioPage />,
	},
	{
		path: "/alerts",
		element: <AlertsPage />,
	},
])

/**
 * Компонент-обертка для роутера
 */
export function AppRouter() {
	return <RouterProvider router={router} />
}
