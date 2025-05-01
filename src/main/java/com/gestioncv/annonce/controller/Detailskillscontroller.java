package com.gestioncv.annonce.controller;

import com.gestioncv.annonce.dao.Daodetailskillsimp;
import com.gestioncv.annonce.entity.Detailskills;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/detaiskills")
@CrossOrigin(origins = "http://localhost:5173")
public class Detailskillscontroller {

    private Daodetailskillsimp daodetailskillsimp;
    public Detailskillscontroller(Daodetailskillsimp daodetailskillsimp) {
        this.daodetailskillsimp = daodetailskillsimp;
    }
    @PostMapping("/add/{userid}")
    public int add(@RequestBody List<Detailskills> detailskills,@PathVariable("userid") String userID) {
     return   daodetailskillsimp.setDetailskills(detailskills,userID);
    }
    @GetMapping("/getallbynumberoflist/{numberoflist}")
    public List<Detailskills> getallbynumberoflist(@PathVariable("numberoflist") int numberoflist,@RequestParam("iduser") String userID) {
        return daodetailskillsimp.getDetailskills(numberoflist,userID);
    }
    @PutMapping("/update")
    public void updatedetailskills(@RequestPart("detailskills") List<Detailskills> detailskills,@RequestPart("userid") String userID) {
        daodetailskillsimp.updateDetailskill(detailskills,userID);
    }
    @DeleteMapping("/delete/{id}")
    public void deletedetailskills(@PathVariable("id") String id) {
        daodetailskillsimp.deleteDetailskill(id);
    }


}
