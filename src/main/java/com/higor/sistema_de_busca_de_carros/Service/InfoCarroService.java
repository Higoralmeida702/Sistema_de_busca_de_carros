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

    public Optional<InfoCarro> buscarPorCodigoVeiculo(String codigoDoVeiculo) {
        return infoCarroRepository.findByCodigoDoVeiculo(codigoDoVeiculo);
    }

    public ResponseEntity<?> cadastrar(InfoCarro infoCarro, String acao) {
        if (infoCarro.getProprietario().isEmpty()) {
            return new ResponseEntity<ModeloDeResposta>(modeloResposta, HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("cadastrar")) {
                return new ResponseEntity<InfoCarro>(infoCarroRepository.save(infoCarro), HttpStatus.CREATED);
            } else {
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

    public ResponseEntity<?> atualizarCarroInformacoes(String codigoDoVeiculo, InfoCarro infoCarro) {
        Optional<InfoCarro> carroInformacoesOptional = infoCarroRepository.findByCodigoDoVeiculo(codigoDoVeiculo);
        if (carroInformacoesOptional.isPresent()) {
            InfoCarro carroInformacoes = carroInformacoesOptional.get();

            if (infoCarro.getProprietario() != null) {
                carroInformacoes.setProprietario(infoCarro.getProprietario());
            }if (infoCarro.getNomeCarro() != null) {
                carroInformacoes.setNomeCarro(infoCarro.getNomeCarro());
            }if (infoCarro.getCor() != null) {
                carroInformacoes.setCor(infoCarro.getCor());
            }if (infoCarro.getCategoria() != null) {
                carroInformacoes.setCategoria(infoCarro.getCategoria());
            }if (infoCarro.getMarca() != null) {
                carroInformacoes.setMarca(infoCarro.getMarca());
            }if (infoCarro.getPlaca() != null) {
                carroInformacoes.setPlaca(infoCarro.getPlaca());
            }if (infoCarro.getModelo() != null) {
                carroInformacoes.setModelo(infoCarro.getModelo());
            }if (infoCarro.getContatoProprietario() != null) {
                carroInformacoes.setContatoProprietario(infoCarro.getContatoProprietario());
            }if (infoCarro.getAnoFabricacao() != 0) {
                carroInformacoes.setAnoFabricacao(infoCarro.getAnoFabricacao());
            }if (infoCarro.getPlaca() != null) {
                carroInformacoes.setPlaca(infoCarro.getPlaca());
            }if (infoCarro.getCodigoDoVeiculo() != null) {
                carroInformacoes.setCodigoDoVeiculo(infoCarro.getCodigoDoVeiculo());
            }

            infoCarroRepository.save(carroInformacoes);
            return ResponseEntity.ok("Informação alterada com sucesso para o Carro com o codigo:" + codigoDoVeiculo);
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}