package com.gestioncv.annonce.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collation = "annonce")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Annonceentreprise extends Annonce {

    private String lien;
}
