import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import {About} from './pages/About';
import {Home} from './pages/Home';
import {CreateProgram} from './pages/CreateProgram';
import {MyProgram} from './pages/MyProgram';
import {useTypedSelector} from "./app/hooks";
import Content from "./components/layout/Content";

const App: React.FC = () => {
  const {isAuth} = useTypedSelector(state => state.user)

  return (
      <BrowserRouter>
          <Navbar/>
          <Content>
              <Switch>
                  <Route path="/" component={Home} exact/>
                  <Route path="/about" component={About}/>
                  {isAuth && <>
                      <Route path="/create-program" component={CreateProgram}/>
                      <Route path="/my-program" component={MyProgram}/>
                  </>}
                  <Redirect to='/'/>
              </Switch>
          </Content>
      </BrowserRouter>
  );
}

export default App;
