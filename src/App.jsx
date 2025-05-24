import AppRoutes from "./routes/AppRoutes.jsx";
import './styles/index.scss';

/**
 * App
 * 
 * Root component of the application. 
 * Initializes global styles and sets up route rendering via AppRoutes.
 * 
 * @returns {JSX.Element} The root application container
 */
const App = () => {
	return (
		<div className="App">
			<AppRoutes />
		</div>
	)
}

export default App

