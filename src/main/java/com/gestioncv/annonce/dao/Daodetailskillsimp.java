package com.gestioncv.annonce.dao;

import com.gestioncv.annonce.dto.LastDetailSkills;
import com.gestioncv.annonce.entity.Detailskills;
import com.gestioncv.annonce.repo.Detailskillsrepo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class Daodetailskillsimp implements Daodetailskills{

    private MongoTemplate mongoTemplate;
    private Detailskillsrepo detailskillsrepo;
    private int i;



    public Daodetailskillsimp(Detailskillsrepo detailskillsrepo, MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
        this.detailskillsrepo = detailskillsrepo;
    }
    public LastDetailSkills getlastdetailskills(String userid){
        Aggregation aggregation= org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation(

                        Aggregation.match(Criteria.where("Userid").is(userid)),

                        Aggregation.group("Userid").max("numberoflist").as("lastlistelement")
        );
        AggregationResults<LastDetailSkills> result=mongoTemplate.aggregate(aggregation,Detailskills.class, LastDetailSkills.class);
        return result.getUniqueMappedResult();
    }

    @Override
    public List<Detailskills> getDetailskills(int numberoflist,String userid) {
        if(detailskillsrepo.existsByNumberoflist(numberoflist)){
        return detailskillsrepo.findByNumberoflistAndUserid(numberoflist,userid);
        }
        else {
            return null;
        }

    }


    @Override
    public int setDetailskills(List<Detailskills> detailskills,String userid) {

        if (detailskills != null) {
            LastDetailSkills list = getlastdetailskills(userid);
            System.out.println(list);


            if (list == null) {
                i=1;
                detailskills.forEach((element) -> {element.setNumberoflist(1);
                    element.setUserid(userid);

                });
            }
            else {
                detailskills.forEach((element) -> {element.setNumberoflist(list.getLastlistelement()+1);
                    element.setUserid(userid);});
                i=list.getLastlistelement()+1;
            }


        }
        detailskillsrepo.saveAll(detailskills);
        System.out.println(i);
 return i;
    }

    @Override
    public Detailskills getDetailskill(String id) {
        return detailskillsrepo.findById(id).get();
    }



    @Override
    public void updateDetailskill(List<Detailskills> detailskills,String userid) {
if (detailskills != null) {
    LastDetailSkills lastelement=getlastdetailskills(userid);
    List<Detailskills> getlastdetailskills=detailskillsrepo.findByNumberoflist(lastelement.getLastlistelement());
    getlastdetailskills.stream().forEach((e)-> deleteDetailskill(e.getId()));
    detailskillsrepo.saveAll(detailskills);
}
    }

    @Override
    public void deleteDetailskill(String id) {
detailskillsrepo.deleteById(id);
    }
}
