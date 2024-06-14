import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
   return (
      <nav className="navbar">
         <ul>
            <li>
               <Link to={'/'}>Consultar</Link>
            </li>
            <li>
               <Link to={'/cadastrar'}>Cadastrar Aluno</Link>
            </li>
         </ul>
      </nav>
   );
};

export default Navbar;
