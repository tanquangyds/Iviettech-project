import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
// import './assets/scss/index.scss';
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Details from "./pages/Details/Details";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Nav />
        <Route path="/" exact component={Home} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/details/:id" exact component={Details} />
      </Provider>
    </Router>
  );
}

export default App;
