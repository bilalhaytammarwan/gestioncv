package com.gestioncv.annonce.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class LastDetailSkills {
    private String id;
    private int lastlistelement;

    public int getLastlistelement() {
        return lastlistelement;
    }

    public void setLastlistelement(int lastlistelement) {
        this.lastlistelement = lastlistelement;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
