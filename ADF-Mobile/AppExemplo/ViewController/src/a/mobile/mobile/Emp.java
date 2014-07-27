package a.mobile.mobile;

public class Emp {
    public Emp() {
        super();
    }
    
    private String name;
    private String email;
    
    public Emp(String name, String email) {
        super();
        this.name = name;
        this.email = email;
    }
    
    public void setNome(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmail() {
        return email;
    }
}
