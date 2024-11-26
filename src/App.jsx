import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/router.jsx';
import { Provider } from "react-redux";
import store from "./redux/store.js";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Router>
          <AppRouter />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
