<<<<<<< HEAD
import {BrowserRouter as Router, Route} from "react-router-dom"
import {Provider} from "react-redux";
import { createBrowserHistory } from 'history';
import store from "./redux/store";
import { AuthProvider } from './contexts/AuthContext';
import routes, { renderRoutes } from './routes';
import './App.css';
import Nav from './components/Nav';
=======
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
// import './assets/scss/index.scss';
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Details from "./pages/Details/Details";
>>>>>>> 36bc223059bced53eb659c2f7c6aa20f3cf4b945

const history = createBrowserHistory();
function App() {
  return (
    <Router>
<<<<<<< HEAD
     <Provider store={store}>
        <AuthProvider>
          <Nav/>
          <Router history={history} >{renderRoutes(routes)}</Router>
        </AuthProvider>
=======
      <Provider store={store}>
        <Nav />
        <Route path="/" exact component={Home} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/details/:id" exact component={Details} />
>>>>>>> 36bc223059bced53eb659c2f7c6aa20f3cf4b945
      </Provider>
    </Router>
  );
}

export default App;
