// App.jsx
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/router.jsx'; 
function App() {
  return (
    <div className="app">
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
