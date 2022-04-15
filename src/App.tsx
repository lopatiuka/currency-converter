import './styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainComponent } from './components/main-component';
import { HeaderComponent } from './components/header-component';

function App() {
  return (
    <div>
      <HeaderComponent/>
      <MainComponent/>
    </div>
  );
}

export default App;
