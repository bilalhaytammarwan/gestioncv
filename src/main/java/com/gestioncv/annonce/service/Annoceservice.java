package com.gestioncv.annonce.service;

import com.gestioncv.annonce.dao.DaoAnnonce;
import com.gestioncv.annonce.dao.Daoannonceimp;
import com.gestioncv.annonce.dao.Daodetailskills;
import com.gestioncv.annonce.dao.Daodetailskillsimp;
import com.gestioncv.annonce.entity.Annonce;
import com.gestioncv.annonce.entity.Detailskills;
import com.gestioncv.annonce.entity.User;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class Annoceservice {
    private final Daodetailskills daodetailskills;
    private Detailskillsservice detailskillsservice;
    private Userservice userservice;
    private Daoannonceimp daoAnnonce;
    private Daodetailskillsimp daodetailskillsimp;
    private MongoTemplate mongoTemplate;

    public Annoceservice(Daoannonceimp daoAnnonce, Daodetailskillsimp daodetailskillsimp, MongoTemplate mongoTemplate, Detailskillsservice detailskillsservice, Daodetailskills daodetailskills) {
        this.daoAnnonce = daoAnnonce;
        this.daodetailskillsimp = daodetailskillsimp;
        this.mongoTemplate = mongoTemplate;
        this.detailskillsservice = detailskillsservice;
        this.daodetailskills = daodetailskills;
    }
    public List<Annonce> getAnnonceBylistofskills(List<Detailskills> listofskills) {

    int requireelementforsearch=(int)Math.ceil(listofskills.size()/2);
        List<Criteria>criteria=listofskills.stream().map((e)->Criteria.where("description").regex(".*\\b"+e.getSkillName()+"\\b.*","i"))
                .collect(Collectors.toList());
        Query query=new Query(new Criteria().orOperator(criteria));

        List<Annonce>getallannonceaboutskills=mongoTemplate.find(query,Annonce.class);
        for(Annonce annonce:getallannonceaboutskills){
            System.out.println(annonce.getDescription());
        }
    return getallannonceaboutskills.stream().filter(e->{
        long matchnumber=listofskills.stream().filter(doc->e.getDescription().toLowerCase().contains(doc.getSkillName().toLowerCase())).count();
        return matchnumber >= requireelementforsearch;
            }

            ).collect(Collectors.toList());
    }
    public boolean checkannonce(Annonce annonce,List<Detailskills> detailskills) {
        int requireelementforsearch=(int)Math.ceil(detailskills.size()/2);
        long matchnumber=detailskills.stream().filter(doc->annonce.getDescription().toLowerCase().contains(doc.getSkillName().toLowerCase())).count();
        if( matchnumber >= requireelementforsearch){
            return true;
        }
        return false;

    }
    public Annonce ajouterAnnonce(Annonce annonce) {
        if(daoAnnonce.insertAnnonce(annonce)){
            return annonce;
        }
        else {
            return null;
        }
    }
    public Annonce checknotification(Annonce annonce) {
        List<User>getall=userservice.getAllUsers();
        for(User user:getall){
         List<List<Detailskills>> getalldetailskills=  detailskillsservice.getDetailskillsbyiduser(user.getId());
            if(daodetailskills!=null){
                for(List<Detailskills> listofdetailskills:getalldetailskills){
                    boolean checkannonce=checkannonce(annonce,listofdetailskills);
                    if(checkannonce){
                        userservice.updateNotification(annonce,user);
                        return annonce;
                    }
                }
            }
        }
        return null;
    }

}