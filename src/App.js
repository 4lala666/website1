import { SearchProvider } from './context/SearchContext';
import HomePage from './components/HomePage/HomePage';

function App() {
  return <SearchProvider><HomePage /></SearchProvider>;
}

export default App;
