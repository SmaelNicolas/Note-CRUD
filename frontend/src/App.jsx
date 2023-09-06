import "./App.css";
import { Navbar } from "./components";
import { MyRoutes } from "./routes";

function App() {
	return (
		<div className="app">
			<Navbar />
			<MyRoutes />
		</div>
	);
}

export default App;
