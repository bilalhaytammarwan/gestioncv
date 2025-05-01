package com.gestioncv.annonce.service;

import com.gestioncv.annonce.dao.Daodetailskillsimp;
import com.gestioncv.annonce.entity.Detailskills;
import com.gestioncv.annonce.repo.Detailskillsrepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class Detailskillsservice {

    private Daodetailskillsimp daodetailskillsimp;
    private Detailskillsrepo detailskillsrepo;
    public Detailskillsservice(Daodetailskillsimp daodetailskillsimp, Detailskillsrepo detailskillsrepo) {
        this.daodetailskillsimp = daodetailskillsimp;

        this.detailskillsrepo = detailskillsrepo;
    }
    public List<List<Detailskills>>getDetailskillsbyiduser(String iduser) {
       int i=1;
       if(!detailskillsrepo.existsByUserid(iduser)){
           return null;
       }
        List<Detailskills>getalldetailskills=detailskillsrepo.findByUserid(iduser);
        List<List<Detailskills>>detailskills=new ArrayList<>();
        List<Detailskills>list=new ArrayList<>();
        for(Detailskills detailskill:getalldetailskills){

            if(detailskill.getNumberoflist() == i){
                if(detailskill.isValidnotification()==true) {
                    list.add(detailskill);
                }
            }else {
                detailskills.add(list);
                list=new ArrayList<>();
                i++;
                if(detailskill.getNumberoflist() == i){
                    list.add(detailskill);

                }
            }
        }
        return detailskills;
    }
}
