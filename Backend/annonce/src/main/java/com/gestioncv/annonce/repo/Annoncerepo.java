package com.gestioncv.annonce.repo;

import com.gestioncv.annonce.entity.Annonce;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Annoncerepo extends MongoRepository<Annonce,String> {

}
