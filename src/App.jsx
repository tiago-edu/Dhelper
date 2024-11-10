// App.jsx
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/router.jsx'; 
import { styles } from './utils/styles.jsx';
import FileInput from './components/FileInput.tsx';
function App() {
  // const onSubmit = () => {};
  return (
    <div className="app">
      <Router>
        <AppRouter />
      </Router>
      {/* <form onSubmit={onSubmit} className={`${styles.formSubmit}`}>
        <FileInput />
      </form> */}
    </div>
  );
}

export default App;
