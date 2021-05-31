import TextEditor from './components/TextEditor'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import {v4 as uuidV4} from 'uuid'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/documents/${uuidV4()}`} />
        </Route>
        <Route path="/documents/:id">
          <TextEditor />
        </Route>
    </Switch>
    </Router>
  );
}

export default App;
