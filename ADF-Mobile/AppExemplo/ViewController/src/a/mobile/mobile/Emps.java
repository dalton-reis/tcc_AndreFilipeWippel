package a.mobile.mobile;

import java.util.ArrayList;
import java.util.List;

public class Emps {
    private List s_emps = null;
    public Emps() {
        super();
    }

    public Emp[] getEmps() {
        Emp[] emps = null;
        s_emps = new ArrayList();
        s_emps.add(new Emp("André", "wippelandre@hotmail.com"));
        s_emps.add(new Emp("Marcelo", "mawippel@hotmail.com"));
        s_emps.add(new Emp("Dalton", "dalton@furb.br"));
        emps = (Emp[]) s_emps.toArray(new Emp[s_emps.size()]);
        return emps;
    }
}
