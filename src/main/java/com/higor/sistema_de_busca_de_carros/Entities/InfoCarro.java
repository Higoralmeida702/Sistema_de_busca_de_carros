package com.higor.sistema_de_busca_de_carros.Entities;

import jakarta.persistence.*;
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
