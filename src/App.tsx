import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Container, Grid, Paper} from '@material-ui/core';
import Navbar from './components/layout/Navbar';
import {About} from './pages/About';
import {Home} from './pages/Home';
import {CreateProgram} from './pages/CreateProgram';
import {MyProgram} from './pages/MyProgram';
import {useTypedSelector} from "./app/hooks";

const App: React.FC = () => {
  const {isAuth} = useTypedSelector(state => state.user)

  return (
      <BrowserRouter>
        <Navbar/>
        <Container maxWidth="xl">
          <Grid container spacing={1} justifyContent="center">
            <Grid item container direction="column" xs={12} sm={2}>
              <Grid item>
                <Paper style={{height: '49vh', background: 'orange'}}/>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Paper style={{height: '100vh', background: 'lightgrey', overflow: 'hidden'}}>
                <Switch>
                  <Route path="/" component={Home} exact/>
                  <Route path="/about" component={About}/>
                  {isAuth && <>
                    <Route path="/create-program" component={CreateProgram}/>
                    <Route path="/my-program" component={MyProgram}/>
                  </>}
                </Switch>
              </Paper>
            </Grid>

            <Grid item container direction="column" xs={12} sm={2}>
              <Grid item>
                <Paper style={{height: '49vh', background: 'green'}}/>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </BrowserRouter>
  );
}

export default App;
