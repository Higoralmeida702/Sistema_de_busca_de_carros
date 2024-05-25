package com.higor.sistema_de_busca_de_carros.Controller;

import com.higor.sistema_de_busca_de_carros.Entities.InfoCarro;
import com.higor.sistema_de_busca_de_carros.Entities.ModeloDeResposta;
import com.higor.sistema_de_busca_de_carros.Service.InfoCarroService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@CrossOrigin (origins = "*")
public class InfoCarroController {

    @Autowired
    private InfoCarroService infoCarroService;

    @GetMapping("/buscarPorCodigoVeiculo/{codigoDoVeiculo}")
        public ResponseEntity<?> buscarPorCodigoVeiculo (@PathVariable String codigoDoVeiculo){
            try {
                Optional<InfoCarro> codigoVeiculo = infoCarroService.buscarPorCodigoVeiculo(codigoDoVeiculo);
                if (codigoVeiculo.isPresent()) {
                    return ResponseEntity.ok(codigoVeiculo.get());
                }else {
                    return ResponseEntity.notFound().build();
                }
            }catch (Exception e) {
                return ResponseEntity.badRequest().body("O codigo do veiculo não foi encontrado" + e.getMessage());
            }
        }
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody InfoCarro infoCarro){
        return infoCarroService.cadastrar(infoCarro, "cadastrar");
    }

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<ModeloDeResposta> remover (@PathVariable Integer id) {
        return infoCarroService.remover(id);
    }

    @GetMapping("/listarInformacoes")
    public Iterable<InfoCarro> listarInformacoes() {
        return infoCarroService.listarInformacoes();
    }

    @PutMapping("/alterar/{codigoDoVeiculo}")
        public ResponseEntity<?> alterarInformacao(@PathVariable String codigoDoVeiculo, @RequestBody InfoCarro infoCarro) {
            try {
                ResponseEntity<?> response = infoCarroService.atualizarCarroInformacoes(codigoDoVeiculo, infoCarro);
                return response;
            }catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Erro ao alterar informação do carro do codigo" + codigoDoVeiculo + ":" + e.getMessage());
            }
        }
}
