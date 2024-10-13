import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import blogData from './Data';
import AddNewArticle from './Pages/AddNewArticle';
import BlogDetailPage from './Pages/BlogDetailPage';
import Blogs from './Pages/Blogs';
import HomePage from './Pages/HomePage';
import SignUp from './Pages/SignUp';
import SignOut from './Pages/SignOut';
import { useNavigate } from 'react-router-dom';

  const App = () => {
    const[login,setLogin ] = useState(false)


    function handleLogin(){
      setLogin(!login)
    }

    const [articles, setArticles] = useState(blogData);
  

    const addNewArticle = (article) => {
      setArticles([article, ...articles]);
    }

  return (
    <Router>
      <Navbar login={login}/>
      <div className="App">
        <Routes>
        {/* <Route element={useNavigate('/signup')} /> */}
          {!login ? ( 
              <Route path="/signup" element={<SignUp handleLogin={handleLogin} />} />
          ) : (  
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                <Route path="/add-article" element={<AddNewArticle addNewArticle={addNewArticle} />} />
                <Route path="/signout" element={<SignOut handleLogin={handleLogin}/>} />

              </>
          )}
          </Routes>
      </div>
      <Footer/>
    </Router>
  );
}
export default App;
