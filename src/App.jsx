// App.jsx
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/router.jsx";
function App() {
  // const onSubmit = () => {};
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
