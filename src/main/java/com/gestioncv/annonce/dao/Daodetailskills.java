package com.gestioncv.annonce.dao;



import com.gestioncv.annonce.entity.Detailskills;

import java.util.List;

public interface Daodetailskills {
   public List<Detailskills> getDetailskills(int numberoflist,String userid);
   public int setDetailskills(List<Detailskills> detailskills,String userid);
   public Detailskills getDetailskill(String id);

   public void updateDetailskill(List<Detailskills> detailskills,String userid);
   public void deleteDetailskill(String id);

}
