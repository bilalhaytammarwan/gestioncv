package com.gestioncv.annonce.service;

import com.gestioncv.annonce.dao.DaoAnnonce;
import com.gestioncv.annonce.entity.Annonce;
import com.gestioncv.annonce.repo.Annoncerepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class Annonceservice implements DaoAnnonce {
private Annoncerepo annoncerepo;
public  Annonceservice(Annoncerepo annoncerepo) {
    this.annoncerepo = annoncerepo;


}
    @Override
    public List<Annonce> getAnnonces() {
return annoncerepo.findAll();
    }

    @Override
    public Annonce getAnnonce(String id) {
        return annoncerepo.findById(id).orElse(null);
    }



    @Override
    public Boolean insertAnnonce(Annonce annonce) {
        if(annonce!=null) {
            annoncerepo.save(annonce);
            return true;
        }
        return false;
    }

    @Override
    public Boolean updateAnnonce(String id,Annonce annonce) {
        if(annonce!=null) {
            annonce.setId(id);
            annoncerepo.save(annonce);
            return true;
        }
        return false;
    }

    @Override
    public void deleteAnnonce(String id) {
annoncerepo.deleteById(id);
    }
}