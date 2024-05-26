import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
   const [posts, setPosts] = useState([]);

   const getPosts = async () => {
      try {
         const response = await axios.get(
            'http://localhost:8080/listarInformacoes'
         );
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
         <h1>Consultar veiculo</h1>
      </div>
   );
}

export default App;
