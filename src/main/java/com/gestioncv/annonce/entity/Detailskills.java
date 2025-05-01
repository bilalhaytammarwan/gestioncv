package com.gestioncv.annonce.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "detailskills")

@AllArgsConstructor
@NoArgsConstructor
public class Detailskills {
    @Id
    private String id;
    private String skillName;
    private int numberoflist;
    private boolean validnotification;
    private String Userid;

    public String getUserid() {
        return Userid;
    }

    public int getNumberoflist() {
        return numberoflist;
    }

    public String getSkillName() {
        return skillName;
    }

    public String getId() {
        return id;
    }

    public void setUserid(String userid) {
        Userid = userid;
    }

    public void setNumberoflist(int numberoflist) {
        this.numberoflist = numberoflist;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isValidnotification() {
        return validnotification;
    }

    public void setValidnotification(boolean validnotification) {
        this.validnotification = validnotification;
    }
}
