package com.gestioncv.annonce.dao;

import com.gestioncv.annonce.entity.Annonce;

import java.util.List;

public interface DaoAnnonce {
    public List<Annonce> getAnnonces();

    public Annonce getAnnonce(String id);
    public Boolean insertAnnonce(Annonce annonce);
    public Boolean updateAnnonce(String id,Annonce annonce);
    public void deleteAnnonce(String id);


}
