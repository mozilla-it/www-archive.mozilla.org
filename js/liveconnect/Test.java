import netscape.javascript.JSObject;

public class Test {

    public static Object doit(JSObject obj, String code) {
	obj.eval(code);
	return null;
    }
}
