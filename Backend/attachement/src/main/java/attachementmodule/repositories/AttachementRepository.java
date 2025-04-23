package attachementmodule.repositories;

import attachementmodule.models.Attachement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttachementRepository extends MongoRepository<Attachement, String> {

}
