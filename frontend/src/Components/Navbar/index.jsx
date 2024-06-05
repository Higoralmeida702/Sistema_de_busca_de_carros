import { Link } from 'react-router-dom';

const Navbar = () => {
   return (
      <nav>
         <ul>
            <li>
               <Link to={'/'}>Consultar veiculo</Link>
            </li>
            <li>
               <Link to={'/cadastrar'}>Cadastrar</Link>
            </li>
         </ul>
      </nav>
   );
};

export default Navbar;
