import { useState } from 'react';

const Cadastrar = () => {
   const [objInfoCarro, setObjInfoCarro] = useState({
      id: '',
      codigoDoVeiculo: '',
      placa: '',
      modelo: '',
      nomeCarro: '',
      cor: '',
      proprietario: '',
      contatoProprietario: '',
      categoria: '',
      marca: '',
      anoFabricacao: '',
   });
   const [infoCarro, setInfoCarro] = useState([]);

   const handleChange = (e) => {
      setObjInfoCarro((prevObjInfoCarro) => ({
         ...prevObjInfoCarro,
         [e.target.name]: e.target.value,
      }));
   };

   const cadastrar = () => {
      if (
         !objInfoCarro.codigoDoVeiculo ||
         !objInfoCarro.placa ||
         !objInfoCarro.modelo ||
         !objInfoCarro.nomeCarro ||
         !objInfoCarro.cor ||
         !objInfoCarro.proprietario ||
         !objInfoCarro.contatoProprietario ||
         !objInfoCarro.categoria ||
         !objInfoCarro.marca ||
         !objInfoCarro.anoFabricacao
      ) {
         alert('Todos os campos obrigatórios devem ser preenchidos');
         return;
      }

      fetch('http://localhost:8080/cadastrar', {
         method: 'POST',
         body: JSON.stringify(objInfoCarro),
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
      })
         .then((infoCarro) => infoCarro.json())
         .then((infoCarro_convertidos) => {
            if (infoCarro_convertidos.mensagem !== undefined) {
               alert(infoCarro_convertidos.mensagem);
            } else {
               setInfoCarro([...infoCarro, infoCarro_convertidos]);
               alert('Carro cadastrado com sucesso');
            }
         });
   };
   return (
      <div>
         <h1>Cadastrar Carro</h1>
         <form>
            <div>
               <label>Código do Veículo:</label>
               <input
                  type="text"
                  name="codigoDoVeiculo"
                  value={objInfoCarro.codigoDoVeiculo}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>Placa:</label>
               <input
                  type="text"
                  name="placa"
                  value={objInfoCarro.placa}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>Modelo:</label>
               <input
                  type="text"
                  name="modelo"
                  value={objInfoCarro.modelo}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>Nome do Carro:</label>
               <input
                  type="text"
                  name="nomeCarro"
                  value={objInfoCarro.nomeCarro}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>Cor:</label>
               <input
                  type="text"
                  name="cor"
                  value={objInfoCarro.cor}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>Proprietário:</label>
               <input
                  type="text"
                  name="proprietario"
                  value={objInfoCarro.proprietario}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>Contato do Proprietário:</label>
               <input
                  type="text"
                  name="contatoProprietario"
                  value={objInfoCarro.contatoProprietario}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>Categoria:</label>
               <input
                  type="text"
                  name="categoria"
                  value={objInfoCarro.categoria}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>Marca:</label>
               <input
                  type="text"
                  name="marca"
                  value={objInfoCarro.marca}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>Ano de Fabricação:</label>
               <input
                  type="text"
                  name="anoFabricacao"
                  value={objInfoCarro.anoFabricacao}
                  onChange={handleChange}
               />
            </div>
            <button type="button" onClick={cadastrar}>
               Cadastrar
            </button>
         </form>
      </div>
   );
};

export default Cadastrar;
