package com.marouane.usertoken.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
@AllArgsConstructor
@NoArgsConstructor
public class Annonce {

    private String id;
    @NonNull
    private String titre;

    @NonNull
    private String description;

    @NonNull
    private Typeannonce typeannonce;




    private String user_id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public @NonNull String getTitre() {
        return titre;
    }

    public void setTitre(@NonNull String titre) {
        this.titre = titre;
    }

    public @NonNull String getDescription() {
        return description;
    }

    public void setDescription(@NonNull String description) {
        this.description = description;
    }

    public @NonNull Typeannonce getTypeannonce() {
        return typeannonce;
    }

    public void setTypeannonce(@NonNull Typeannonce typeannonce) {
        this.typeannonce = typeannonce;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }
}
