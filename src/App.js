import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateAccount from './Pages/CreateAccount';
import Login from './Pages/Login';
function App() {
  // routers

  return (
    <div className="App">
        <BrowserRouter>
				<Routes>
					<Route path="/signup" element={<></>}></Route>
					<Route path="/signin" element={<Login></Login>}></Route>
					<Route path="*" element={<></>}></Route>
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
