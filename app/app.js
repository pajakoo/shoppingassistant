import React from 'react'
import routes from './routes'
import { Router } from 'react-router'
//import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import './app.scss'

//injectTapEventPlugin();

const App = ({ history }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Router history={history}>
      {routes}
    </Router>
  </MuiThemeProvider>
)

App.propTypes = {
  history: React.PropTypes.object.isRequired
}

export default App
