// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateAccount from './Pages/CreateAccount';
import Login from './Pages/Login';
import Todo from './Pages/Todo';
function App() {
  // routers

  return (
    <div className="App" style={{backgroundImage : "url(/bg1.jpg)"}}>
        <BrowserRouter>
				<Routes>
					<Route path="/signup" element={<CreateAccount></CreateAccount>}></Route>
					<Route path="/signin" element={<Login></Login>}></Route>
					<Route path="/todo" element={<Todo></Todo>}></Route>
					<Route path="*" element={<></>}></Route>
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
