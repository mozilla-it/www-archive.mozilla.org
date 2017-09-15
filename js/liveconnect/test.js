print("Throwing JS Exception");
try {
    throw 'Thrown JS exception';
    print("\tNo exception caught\n");       
} catch (e) {
    print("\tException caught: " + e.toString());
    print("\tJS Type of exception: " + typeof e + "\n");
}

print("Triggering Java ClassNotFoundException");
try {
    str = java.lang.Class.forName("blah");
    print("\tNo exception caught: " + str + "\n");
} catch (e) {
    print("\tException caught: " + e.toString());
    print("\tJS Type of exception: " + typeof e + "\n");
}

print("Throwing string: Packages.Test.doit(this, throw 'foo';)");
try {
    str = Packages.Test.doit(this, "throw 'foo';");
    print("\tNo exception caught: " + str + "\n");
} catch ( e ) {
    print("\tException caught: " + e.toString());
    print("\tJS Type of exception: " + typeof e + "\n");
}

print("Throwing number: Packages.Test.doit(this, throw 42;)");
try {
    str = Packages.Test.doit(this, "throw 42;");
    print("\tNo exception caught: " + str + "\n");
} catch ( e ) {
    print("\tException caught: " + e.toString());
    print("\tJS Type of exception: " + typeof e + "\n");
}

print("Throwing number: Packages.Test.doit(this, throw 4.2;)");
try {
    str = Packages.Test.doit(this, "throw 4.2;");
    print("\tNo exception caught: " + str + "\n");
} catch ( e ) {
    print("\tException caught: " + e.toString());
    print("\tJS Type of exception: " + typeof e + "\n");
}

print("Throwing boolean: Packages.Test.doit(this, throw false;)");
try {
    str = Packages.Test.doit(this, "throw false;");
    print("\tNo exception caught: " + str + "\n");
} catch ( e ) {
    print("\tException caught: " + e.toString());
    print("\tJS Type of exception: " + typeof e + "\n");
}

print("Throwing Object (new Date): Packages.Test.doit(this, throw new Date();)");
try {
    str = Packages.Test.doit(this, "throw new Date();");
    print("\tNo exception caught: " + str + "\n");
} catch ( e ) {
    print("\tException caught: " + e.toString());
    print("\tJS Type of exception: " + typeof e + "\n");
}

print("Throwing Object (new String): Packages.Test.doit(this, throw new String();)");
try {
    str = Packages.Test.doit(this, "throw new String();");
    print("\tNo exception caught: " + str + "\n");
} catch ( e ) {
    print("\tException caught: " + e.toString());
    print("\tJS Type of exception: " + typeof e + "\n");
}

print("Throwing Object ({a:42}): Packages.Test.doit(this, throw {a:42};)");
try {
    str = Packages.Test.doit(this, "throw {a:42};");
    print("\tNo exception caught: " + str + "\n");
} catch ( e ) {
    print("\tException caught: " + e.toString());
    print("\tJS Type of exception: " + typeof e + "\n");
}

print("Throwing undefined: Packages.Test.doit(this, throw undefined)");
try {
        str = Packages.Test.doit(this, "throw undefined;");
        print("\tNo exception caught: " + str + "\n");
} catch ( e ) {
        print("\tException caught.");
        print("\tJS Type of exception: " + typeof e + "\n");
}

print("Throwing null: Packages.Test.doit(this, throw null)");
try {
        str = Packages.Test.doit(this, "throw null;");
        print("\tNo exception caught: " + str + "\n");
} catch ( e ) {
        print("\tException caught.");
        print("\tType of exception: " + typeof e);
}
