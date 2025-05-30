package com.marouane.usertoken.dto;

import java.util.List;

public class Companypaginationdto {
    private List<Companywithimagedto> content;
    private int totalpages;

    public List<Companywithimagedto> getContent() {
        return content;
    }

    public void setContent(List<Companywithimagedto> content) {
        this.content = content;
    }

    public int getTotalpages() {
        return totalpages;
    }

    public void setTotalpages(int totalpages) {
        this.totalpages = totalpages;
    }

    public Companypaginationdto(List<Companywithimagedto> content, int totalpages) {
        this.content = content;
        this.totalpages = totalpages;
    }
}
