package attachementmodule.models;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Cv extends Attachement {
    private String title;

}
