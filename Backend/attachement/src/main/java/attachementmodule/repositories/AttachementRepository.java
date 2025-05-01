package attachementmodule.repositories;

import attachementmodule.models.Attachement;
import attachementmodule.types.AttachementType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AttachementRepository extends MongoRepository<Attachement, String> {
    Optional<Attachement> findByUserId(String userId);
    Optional<Attachement> findByTypeAndUserId(AttachementType type, String userId);
}
