package com.gestioncv.annonce.repo;

import com.gestioncv.annonce.entity.Detailskills;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface Detailskillsrepo extends MongoRepository<Detailskills, String> {
    List<Detailskills> findByNumberoflist(int numberoflist);

    boolean existsByNumberoflist(int numberoflist);
   List<Detailskills>findByUserid(String userid);
   boolean existsByUserid(String userid);

    List<Detailskills> findByNumberoflistAndUserid(int numberoflist, String userid);
}
