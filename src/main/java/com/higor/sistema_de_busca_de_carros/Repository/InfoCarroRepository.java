package com.higor.sistema_de_busca_de_carros.Repository;

import com.higor.sistema_de_busca_de_carros.Entities.InfoCarro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InfoCarroRepository extends JpaRepository <InfoCarro, Integer> {

    Optional<InfoCarro> findByCodigoDoVeiculo(String codigoDoVeiculo);
}
