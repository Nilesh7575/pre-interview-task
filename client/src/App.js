import logo from './logo.svg';
import './App.css';
import TopNav from './components/TopNavbar/TopNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatePost from './components/Post/CreatePost';



function App() {
  return (
    <div className="mainCard App">
      <TopNav/>
      <CreatePost/>
    </div>
  );
}

export default App;
