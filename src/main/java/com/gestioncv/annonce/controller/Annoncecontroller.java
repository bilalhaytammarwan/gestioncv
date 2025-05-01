package com.gestioncv.annonce.controller;

import com.gestioncv.annonce.dao.Daoannonceimp;
import com.gestioncv.annonce.dao.Daodetailskills;
import com.gestioncv.annonce.entity.Annonce;

import com.gestioncv.annonce.entity.Detailskills;
import com.gestioncv.annonce.service.Annoceservice;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/annonce")
@CrossOrigin(origins = "http://localhost:5173")
public class Annoncecontroller {
    private final SimpMessagingTemplate messagingTemplate;
    private Daoannonceimp daoannonceimp;
    private Annoceservice annonceservice;
    private Daodetailskills daodetailskills;

    public  Annoncecontroller(SimpMessagingTemplate messagingTemplate, Daoannonceimp daoannonceimp, Annoceservice annonceservice, Daodetailskills daodetailskills) {
        this.messagingTemplate = messagingTemplate;
        this.daoannonceimp = daoannonceimp;
        this.annonceservice = annonceservice;
        this.daodetailskills = daodetailskills;

    }
    @GetMapping("/all")
    public List<Annonce> getAll(){
        return daoannonceimp.getAnnonces();
    }
    @GetMapping("/{id}")
    public Annonce getAnnonce(@PathVariable String id){
        return daoannonceimp.getAnnonce(id);
    }

    public boolean postAnnonce(@Validated @RequestBody Annonce annonce, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return false;
        }
        else {
            return daoannonceimp.insertAnnonce(annonce);

        }


    }
    @PutMapping("/update/{id}")
    public boolean updateAnnonce(@PathVariable String id,@Validated @RequestBody Annonce annonce, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return false;
        }
        else {
            return daoannonceimp.updateAnnonce(id, annonce);
        }
    }
    @DeleteMapping("/delete/{id}")
    public void deleteAnnonce(@PathVariable String id){
        daoannonceimp.deleteAnnonce(id);
    }

    @GetMapping("/getallannoncebyskills/{numberoflist}")
    public List<Annonce> getAllAnnoncebyskills(@PathVariable("numberoflist") int num,@RequestParam("user")String user){
       List<Detailskills> listofskills=daodetailskills.getDetailskills(num,user);
       for(Detailskills detailskills:listofskills){
           System.out.println(detailskills);
       }

        return annonceservice.getAnnonceBylistofskills(listofskills);

    }
    @PostMapping("/post")
    public Annonce postAnnonce(@RequestBody Annonce annonce){
      Annonce a=  annonceservice.ajouterAnnonce(annonce);
        Annonce a1=annonceservice.checknotification(annonce);
        messagingTemplate.convertAndSend("/topic/messages",a1);
        return a1;
    }

}
