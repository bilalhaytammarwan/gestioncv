package com.gestioncv.annonce.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "annonce")
public class Annonce {

    @Id
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

    public @NonNull String getTitre() {
        return titre;
    }

    public @NonNull String getDescription() {
        return description;
    }

    public @NonNull Typeannonce getTypeannonce() {
        return typeannonce;
    }



    public void setId(String id) {
        this.id = id;
    }

    public void setTitre(@NonNull String titre) {
        this.titre = titre;
    }

    public void setDescription(@NonNull String description) {
        this.description = description;
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
