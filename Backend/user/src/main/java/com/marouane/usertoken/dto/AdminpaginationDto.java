package com.marouane.usertoken.dto;

import java.util.List;

public class AdminpaginationDto {
   private List<Admindto>content;
    private int totalpages;


    public void setContent(List<Admindto> content) {
        this.content = content;
    }

    public int getTotalpages() {
        return totalpages;
    }

    public void setTotalpages(int totalpages) {
        this.totalpages = totalpages;
    }

    public AdminpaginationDto(List<Admindto> content, int totalpages) {
        this.content = content;
        this.totalpages = totalpages;
    }

    public List<Admindto> getContent() {
        return content;
    }
}
