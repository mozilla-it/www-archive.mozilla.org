/**
        File Name:      char-002.js
        Description:

        Java fields whose value is char should be read as a JavaScript number.

        To test this:

        1.  Instantiate a Java object that has fields with char values,
            or reference a classes static field whose value is a char.
        2.  Reference the field, and set the value of a JavaScript variable
            to that field's value.
        3.  Check the value of the returned type, which should be "number"
        4.  Check the type of the returned type, which should be a number

        It is an error if the JavaScript variable is an object, or JavaObject
        whose class is java.lang.Character.

        @author     christine@netscape.com
        @version    1.00
*/
    var SECTION = "LiveConnect";
    var VERSION = "1_3";
    var TITLE   = "Java char return value to JavaScript Object";

    var tc = 0;
    var testcases = new Array();

    startTest();
    writeHeaderToLog( SECTION + " "+ TITLE);

//  In all cases, the expected type is "number"
    var E_TYPE = "number";

    //  Create arrays of actual results (java_array) and expected results
    //  (test_array).

    var java_array = new Array();
    var test_array = new Array();

    var i = 0;

    // Get File.separator char

    var os = java.lang.System.getProperty( "os.name" );
    var v;

    if ( os.startsWith( "Windows" ) || os.startsWith( "OS/2" ) ) {
        v = 92;
    } else {
        if ( os.startsWith( "Mac" ) ) {
            v = 58;
        } else {
            v = 47;
        }
    }

    java_array[i] = new JavaValue(  java.io.File.separatorChar   );
    test_array[i] = new TestValue(  "java.io.File.separatorChar", v );

    i++;

    for ( i = 0; i < java_array.length; i++ ) {
        CompareValues( java_array[i], test_array[i] );

    }

    test();

function CompareValues( javaval, testval ) {
    //  Check value
    testcases[testcases.length] = new TestCase( SECTION,
                                                testval.description,
                                                testval.value,
                                                javaval.value );
    //  Check type, which should be E_TYPE
    testcases[testcases.length] = new TestCase( SECTION,
                                                "typeof (" + testval.description +")",
                                                testval.type,
                                                javaval.type );

}
function JavaValue( value ) {
    this.value  = value;
    this.type   = typeof value;
    return this;
}
function TestValue( description, value ) {
    this.description = description;
    this.value = value;
    this.type =  E_TYPE;
    return this;
}
function test() {
    for ( tc=0; tc < testcases.length; tc++ ) {
        testcases[tc].passed = writeTestCaseResult(
                            testcases[tc].expect,
                            testcases[tc].actual,
                            testcases[tc].description +" = "+
                            testcases[tc].actual );

        testcases[tc].reason += ( testcases[tc].passed ) ? "" : "wrong value ";
    }
    stopTest();
    return ( testcases );
}
