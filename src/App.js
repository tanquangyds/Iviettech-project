import {BrowserRouter as Router, Route} from "react-router-dom"
import {Provider} from "react-redux";
import { createBrowserHistory } from 'history';
import store from "./redux/store";
import { AuthProvider } from './contexts/AuthContext';
import routes, { renderRoutes } from './routes';
import './App.css';

const history = createBrowserHistory();
function App() {
  return (
    <Router>
      <Provider store={store}>
        <AuthProvider>
          {renderRoutes(routes)}
        </AuthProvider>
      </Provider>
    </Router>
  );
}

export default App;
