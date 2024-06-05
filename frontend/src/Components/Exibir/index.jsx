import { useState } from 'react';
import axios from 'axios';
import './exibir.css';

const Exibir = () => {
   const [userData, setUserData] = useState(null);
   const [isEditando, setIsEditando] = useState(false);
   const [editData, setEditData] = useState({});
   const [codigoDoVeiculo, setCodigoDoVeiculo] = useState('');
   const [error, setError] = useState(null);
   const [removalError] = useState(null);

   const handleSearch = () => {
      axios
         .get(`http://localhost:8080/buscarPorCodigoVeiculo/${codigoDoVeiculo}`)
         .then((response) => {
            setUserData(response.data);
            setError(null);
            setIsEditando(false);
         })
         .catch(() => {
            setUserData(null);
            setError(
               alert(
                  'Erro ao buscar dados. Por favor, verifique o codigo do veiculo e tente novamente'
               )
            );
         });
   };

   const handleEdit = () => {
      isEditando(true);
      setEditData({
         proprietario: userData.proprietario,
      });
   };
   return (
      <div>
         <div className="consultarVeiculos">
            <h1>Dados do veículo</h1>
            <input
               autoComplete="off"
               type="text"
               value={codigoDoVeiculo}
               onChange={(e) => setCodigoDoVeiculo(e.target.value)}
               placeholder="Digite o Código do veículo"
               style={{ width: '210px' }}
            />
            <div className="consultarBotoes">
               <button onClick={handleSearch} className="btnBuscar">
                  Buscar
               </button>
               {userData && (
                  <>
                     <button onClick={handleEdit} className="btnBuscar">
                        Editar
                     </button>
                     <button className="btnBuscar">Remover</button>
                  </>
               )}
            </div>
         </div>
         <div>
            {error && <p>{error}</p>}
            {removalError && <p>{removalError}</p>}
            {userData && !isEditando && (
               <div>
                  <div className="form-grid">
                     <p className="resultadosMostrados">
                        Código: <span className="result-color">{userData.id}</span>
                     </p>
                     <p className="resultadosMostrados">
                        Placa: <span className="result-color">{userData.placa}</span>
                     </p>
                     <p className="resultadosMostrados">
                        Modelo: <span className="result-color">{userData.modelo}</span>
                     </p>
                     <p className="resultadosMostrados">
                        Nome veículo: <span className="result-color">{userData.nomeCarro}</span>
                     </p>
                     <p className="resultadosMostrados">
                        Cor:
                        <span className="result-color">{userData.cor}</span>
                     </p>
                     <p className="resultadosMostrados">
                        Proprietario: <span className="result-color">{userData.proprietario}</span>
                     </p>
                     <p className="resultadosMostrados">
                        Contato:{' '}
                        <span className="result-color">{userData.contatoProprietario}</span>
                     </p>
                     <p className="resultadosMostrados">
                        Categoria: <span className="result-color">{userData.categoria}</span>
                     </p>
                     <p className="resultadosMostrados">
                        Marca: <span className="result-color">{userData.marca}</span>
                     </p>
                     <p className="resultadosMostrados">
                        Ano Fabricação:{' '}
                        <span className="result-color">{userData.anoFabricacao}</span>
                     </p>
                  </div>
                  <button className="btnSalvar">Salvar</button>
               </div>
            )}
         </div>
      </div>
   );
};

const handleInputChange = (e) => {
   const { name, value } = e.target;
   setEditData((prevData) => ({
      ...prevData,
      [name]: value || '',
   }));
};

export default Exibir;
