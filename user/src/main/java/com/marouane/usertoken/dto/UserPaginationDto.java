package com.marouane.usertoken.dto;

import com.marouane.usertoken.model.User;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
public class UserPaginationDto {
    private List<Userwithimagedto> content;
    private int totalpages;

    public List<Userwithimagedto> getContent() {
        return content;
    }

    public void setContent(List<Userwithimagedto> content) {
        this.content = content;
    }

    public int getTotalpages() {
        return totalpages;
    }

    public void setTotalpages(int totalpages) {
        this.totalpages = totalpages;
    }
}
