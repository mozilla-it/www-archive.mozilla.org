/**
        File Name:      boolean-001.js
        Description:

        If a Java method returns a Java boolean primitive, JavaScript should
        read the value as a JavaScript boolean primitive.

        To test this:

        1.  Call a java method that returns a Java boolean primitive.
        2.  Check the type of the returned type, which should be "boolean"
        3.  Check the value of the returned type, which should be true or false.

        It is an error if the returned value is read as a JavaScript Boolean
        object.

        @author     christine@netscape.com
        @version    1.00
*/
    var SECTION = "LiveConnect";
    var VERSION = "1_3";
    var TITLE   = "Java Boolean Primitive to JavaScript Object";

    var tc = 0;
    var testcases = new Array();

    startTest();
    writeHeaderToLog( SECTION + " "+ TITLE);

    //  In all test cases, the expected type is "boolean"

    var E_TYPE = "boolean";

    //  Create arrays of actual results (java_array) and expected results
    //  (test_array).

    var java_array = new Array();
    var test_array = new Array();

    var i = 0;

    // Call a java method that returns true
    java_array[i] = new JavaValue(  (new java.lang.Boolean(true)).booleanValue() );
    test_array[i] = new TestValue(  "(new java.lang.Boolean(true)).booleanValue()",
                                    true )
    i++;

    // Call a java method that returns false
    java_array[i] = new JavaValue(  (new java.lang.Boolean(false)).booleanValue() );
    test_array[i] = new TestValue(  "(new java.lang.Boolean(false)).booleanValue()",
                                    false )
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
    //  Check type.

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
