import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import './exibir.css';

const Exibir = () => {
   const [userData, setUserData] = useState(null);
   const [isEditing, setIsEditing] = useState(false);
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
            setIsEditing(false);
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
      setIsEditing(true);
      setEditData({
         ...userData,
         placa: userData.placa || '',
         modelo: userData.modelo || '',
         nomeCarro: userData.nomeCarro || '',
         cor: userData.cor || '',
         proprietario: userData.proprietario || '',
         contatoProprietario: userData.contatoProprietario || '',
         categoria: userData.categoria || '',
         marca: userData.marca || '',
         anoFabricacao: userData.anoFabricacao || '',
      });
   };

   const handleSave = () => {
      console.log('Dados enviados para atualização:', editData);

      axios
         .put(`http://localhost:8080/alterar/${editData.codigoDoVeiculo}`, editData, {
            headers: {
               'Content-Type': 'application/json',
            },
         })
         .then((response) => {
            setUserData(response.data);
            setIsEditing(false);
            alert('Dados alterados com sucesso');
         })
         .catch((error) => {
            console.error('Erro ao alterar dados:', error);
            console.log('Detalhes do erro:', error.response.data);
            alert('Erro ao alterar dados');
         });
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditData((prevData) => ({
         ...prevData,
         [name]: value || '',
      }));
   };

   const remover = () => {
      const isConfirmed = window.confirm('Tem certeza que deseja remover este veiculo?');

      if (isConfirmed) {
         axios
            .delete(`http://localhost:8080/remover/${userData.id}`)
            .then(() => {
               setUserData(null);
               alert('veiculo removido com sucesso');
            })
            .catch((error) => {
               console.error('Erro ao remover veiculo', error);
               alert('Erro ao remover veiculo ');
            });
      }
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
                     <button className="btnBuscar" onClick={remover}>
                        Remover
                     </button>
                  </>
               )}
            </div>
         </div>
         <div>
            {error && <p>{error}</p>}
            {removalError && <p>{removalError}</p>}
            {userData && !isEditing && (
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
            {isEditing && (
               <div className="editarAluno">
                  <h2>Editar dados do carro {userData.nomeCarro}</h2>
                  <form>
                     <label>
                        Placa:
                        <input
                           autoComplete="off"
                           type="text"
                           name="placa"
                           value={editData.placa || ''}
                           onChange={handleInputChange}
                        />
                     </label>
                     <label>
                        Modelo:
                        <input
                           autoComplete="off"
                           type="text"
                           name="placa"
                           value={editData.modelo || ''}
                           onChange={handleInputChange}
                        />
                     </label>
                     <label>
                        Nome do Carro:
                        <input
                           autoComplete="off"
                           type="text"
                           name="nomeCarro"
                           value={editData.nomeCarro || ''}
                           onChange={handleInputChange}
                        />
                     </label>
                     <label>
                        Cor do carro:
                        <input
                           autoComplete="off"
                           type="text"
                           name="corCarro"
                           value={editData.cor || ''}
                           onChange={handleInputChange}
                        />
                     </label>
                     <label>
                        proprietario:
                        <input
                           autoComplete="off"
                           type="text"
                           name="proprietario"
                           value={editData.proprietario || ''}
                           onChange={handleInputChange}
                        />
                     </label>
                     <label>
                        Contato Proprietario:
                        <input
                           autoComplete="off"
                           type="number"
                           name="contatoProprietario"
                           value={editData.orgaoExpedidor || ''}
                           onChange={handleInputChange}
                        />
                     </label>
                     <label>
                        Categoria:
                        <input
                           autoComplete="off"
                           type="text"
                           name="categoria"
                           value={editData.categoria || ''}
                           onChange={handleInputChange}
                        />
                     </label>
                     <label>
                        Marca:
                        <input
                           autoComplete="off"
                           type="text"
                           name="marca"
                           value={editData.marca || ''}
                           onChange={handleInputChange}
                        />
                     </label>
                     <label>
                        Ano de fabricação:
                        <input
                           autoComplete="off"
                           type="number"
                           name="anoFabricacao"
                           value={editData.anoFabricacao || ''}
                           onChange={handleInputChange}
                        />
                     </label>
                  </form>
                  <button onClick={handleSave} className="btnSalvar">
                     Salvar
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

export default Exibir;
