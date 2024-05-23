package Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class InfoCarro {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    private String codigoDoVeiculo;
    private String placa;
    private String modelo;
    private String nomeCarro;
    private String cor;
    private String proprietario;
    private String contatoProprietario;
    private String categoria;
    private String marca;
    private long anoFabricacao;

}
