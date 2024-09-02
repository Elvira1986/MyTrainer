import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Favourites from './pages/Favourites.jsx';
import Exercises from './pages/Exercises.jsx';
import Meals from './pages/Meals.jsx';
import Error404 from './pages/Error404.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
