package attachementmodule.repositories;

import attachementmodule.models.Attachement;
import attachementmodule.models.Cv;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CvRepository extends MongoRepository<Cv, String> {
    Optional<Attachement> findByUserId(String userId);

    // Custom query methods can be defined here if needed
    // For example, find by user ID or any other criteria
}
