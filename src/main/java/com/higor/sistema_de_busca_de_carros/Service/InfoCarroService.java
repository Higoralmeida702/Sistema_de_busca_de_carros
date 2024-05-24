package com.higor.sistema_de_busca_de_carros.Service;

import com.higor.sistema_de_busca_de_carros.Entities.InfoCarro;
import com.higor.sistema_de_busca_de_carros.Entities.ModeloDeResposta;
import com.higor.sistema_de_busca_de_carros.Repository.InfoCarroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InfoCarroService {

    @Autowired
    private InfoCarroRepository infoCarroRepository;

    @Autowired
    private ModeloDeResposta modeloResposta;

    public Optional<InfoCarro> buscarPorCodigoVeiculo (String codigoDoVeiculo){
        return infoCarroRepository.findByCodigoDoVeiculo (codigoDoVeiculo);
    }

    public ResponseEntity<?> cadastrar(InfoCarro infoCarro, String acao) {
        if (infoCarro.getProprietario().isEmpty()) {
            return new ResponseEntity<ModeloDeResposta>(modeloResposta, HttpStatus.BAD_REQUEST);
        }else {
            if (acao.equals("cadastrar")) {
                return new ResponseEntity<InfoCarro>(infoCarroRepository.save(infoCarro), HttpStatus.CREATED);
            }else {
                return new ResponseEntity<InfoCarro>(infoCarroRepository.save(infoCarro), HttpStatus.OK);
            }
        }
    }
    public ResponseEntity<ModeloDeResposta> remover(Integer id) {
    infoCarroRepository.deleteById(id);
    modeloResposta.setMensagem("As informações do carro foram removidas com sucesso");
    return new ResponseEntity<ModeloDeResposta>(modeloResposta, HttpStatus.OK);
    }

    public Iterable<InfoCarro> listarInformacoes() {
        return infoCarroRepository.findAll();
    }
}
