package Repository;

import Entities.InfoCarro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoAluoRepository extends JpaRepository <InfoCarro, Integer> {

}
