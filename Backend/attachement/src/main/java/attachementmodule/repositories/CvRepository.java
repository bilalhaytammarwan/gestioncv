package attachementmodule.repositories;

import attachementmodule.models.Cv;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CvRepository extends MongoRepository<Cv, String> {
    // Custom query methods can be defined here if needed
    // For example, find by user ID or any other criteria
}
