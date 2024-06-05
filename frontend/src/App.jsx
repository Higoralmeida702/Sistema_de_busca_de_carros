import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar/index';
function App() {
   const [posts, setPosts] = useState([]);

   const getPosts = async () => {
      try {
         const response = await axios.get('http://localhost:8080/listarInformacoes');
         const data = response.data;
         setPosts(data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getPosts();
   }, []);

   return (
      <div>
         <Navbar />
         <div>
            <Outlet />
         </div>
      </div>
   );
}

export default App;
