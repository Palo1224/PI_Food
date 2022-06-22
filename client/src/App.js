import "./App.css";
import { BrowserRouter, Route,Switch } from "react-router-dom";
import LandingPage from "./components/LadingPage/LandingPage";
import Home from "./components/Home/Home";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import Details from "./components/Details/Details";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/recipes/:id" component={Details} />
          <Route path="/recipes" component={Home} />
          <Route path="/recipe" component={CreateRecipe} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
