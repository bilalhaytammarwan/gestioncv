package com.gestioncv.annonce.controller;

import com.gestioncv.annonce.entity.Annonce;
import com.gestioncv.annonce.service.Annonceservice;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/annonce")
public class Annoncecontroller {
    private Annonceservice annonceservice;

    public  Annoncecontroller(Annonceservice annonceservice) {
        this.annonceservice = annonceservice;

    }
    @GetMapping("/all")
    public List<Annonce> getAll(){
        return annonceservice.getAnnonces();
    }
    @GetMapping("/{id}")
    public Annonce getAnnonce(@PathVariable String id){
        return annonceservice.getAnnonce(id);
    }
    @PostMapping("/post")
    public boolean postAnnonce(@Validated @RequestBody Annonce annonce, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return false;
        }
        else {
            return annonceservice.insertAnnonce(annonce);

        }


    }
    @PutMapping("/update/{id}")
    public boolean updateAnnonce(@PathVariable String id,@Validated @RequestBody Annonce annonce, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return false;
        }
        else {
            return annonceservice.updateAnnonce(id, annonce);
        }
    }
    @DeleteMapping("/delete/{id}")
    public void deleteAnnonce(@PathVariable String id){
        annonceservice.deleteAnnonce(id);
    }
}
