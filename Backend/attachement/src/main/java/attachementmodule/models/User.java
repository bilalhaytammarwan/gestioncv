package attachementmodule.models;


import lombok.Data;

import java.util.List;

@Data
public class User {
    private String id;
    private String nom;
    private String telephone;
    private String email;
    private String password;
    private String description;
    private String DureDeUtilisation;
    private Typerole role;
    private String ville;
    private List<String> Favorites;
    private String imageId;
}
