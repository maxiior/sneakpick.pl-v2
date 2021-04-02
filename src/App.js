import { BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Main from './components/Main'
import Nav from './components/Nav/Nav'
import WTB from './components/WTB'

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <WTB />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
