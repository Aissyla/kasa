import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;