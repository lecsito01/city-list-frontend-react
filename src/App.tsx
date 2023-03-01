import './App.css';
import Feed from './components/Feed';
export interface CityType {
  id: number,
  name: string,
  photoUrl: string
}

function App() {
  return (
    <div className="App">
      <Feed />
    </div>
  );
}

export default App;
