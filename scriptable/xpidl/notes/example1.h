/*
 * DO NOT EDIT.  THIS FILE IS GENERATED FROM example1.idl
 */

#ifndef __gen_example1_h__
#define __gen_example1_h__

#include "nsISupports.h" /* interface nsISupports */
#include "nsrootidl.h" /* interface nsrootidl */

#ifdef XPIDL_JS_STUBS
#include "jsapi.h"
#endif
class nsIDeclaredButNotIncluded; /* forward decl */

/* starting interface:    nsISomeInterface */
/* namespace:             com.netscape.widget */
/* fully qualified name:  com.netscape.widget.nsISomeInterface */

/* {a2be35b0-ed1d-11d2-baa0-00805f8a5dd7} */
#define NS_ISOMEINTERFACE_IID_STR "a2be35b0-ed1d-11d2-baa0-00805f8a5dd7"
#define NS_ISOMEINTERFACE_IID \
  {0xa2be35b0, 0xed1d, 0x11d2, \
    { 0xba, 0xa0, 0x00, 0x80, 0x5f, 0x8a, 0x5d, 0xd7 }}

class nsISomeInterface : public nsISupports {
 public: 
  static const nsIID& GetIID() {
    static nsIID iid = NS_ISOMEINTERFACE_IID;
    return iid;
  }

  /* attribute short Prop1; */
  NS_IMETHOD GetProp1(PRInt16 *aProp1) = 0;
  NS_IMETHOD SetProp1(PRInt16 aProp1) = 0;

  /* readonly attribute short Prop2; */
  NS_IMETHOD GetProp2(PRInt16 *aProp2) = 0;

  /* string GetAnswer (); */
  NS_IMETHOD GetAnswer(char **_retval) = 0;

  /* void ExplicitRetVal (in string question, [retval] out string answer); */
  NS_IMETHOD ExplicitRetVal(const char *question, char **answer) = 0;

  /* void ManyOutParam (out short a1, out short a2, out short a3); */
  NS_IMETHOD ManyOutParam(PRInt16 *a1, PRInt16 *a2, PRInt16 *a3) = 0;
  enum { option0 = -5 };
  enum { option1 = 0 };
  enum { option2 = 101 };

  /* short SetSomethingAndReturnPrev (in short newVal); */
  NS_IMETHOD SetSomethingAndReturnPrev(PRInt16 newVal, PRInt16 *_retval) = 0;

  /* void InOutManyTypes (inout octet p1, inout short p2, inout long p3, inout long long p4, inout octet p5, inout unsigned short p6, inout unsigned long p7, inout unsigned long long p8, inout float p9, inout double p10, inout boolean p11, inout char p12, inout wchar p13, inout string p14, inout wstring p15); */
  NS_IMETHOD InOutManyTypes(PRUint8 *p1, PRInt16 *p2, PRInt32 *p3, PRInt64 *p4, PRUint8 *p5, PRUint16 *p6, PRUint32 *p7, PRUint64 *p8, float *p9, double *p10, PRBool *p11, char *p12, PRUint16 *p13, char **p14, PRUnichar **p15) = 0;

  /* PRInt32 TypedefedTypes (in PRUint8 p1, in PRUint16 p2, in PRUint32 p3, in PRUint64 p4, in PRInt16 p5, in PRInt32 p6, in PRInt64 p7); */
  NS_IMETHOD TypedefedTypes(PRUint8 p1, PRUint16 p2, PRUint32 p3, PRUint64 p4, PRInt16 p5, PRInt32 p6, PRInt64 p7, PRInt32 *_retval) = 0;

  /* void NativeTypes (in voidStar p1, in voidRef p2, in nsIDRef p3, in nsIIDRef p4, in nsCIDRef p5, in nsIDPtr p6, in nsIIDPtr p7, in nsCIDPtr p8); */
  NS_IMETHOD NativeTypes(void * p1, void & p2, const nsID & p3, const nsIID & p4, const nsCID & p5, const nsID * p6, const nsIID * p7, const nsCID * p8) = 0;

  /* [noscript] void ElectrocuteUser (); */
  NS_IMETHOD ElectrocuteUser() = 0;

  /* void GetInterface (in nsIIDRef uuid, [iid_is (uuid), retval] out voidStar result); */
  NS_IMETHOD GetInterface(const nsIID & uuid, void * *result) = 0;

  /* [notxpcom] PRUint32 FixThisStupidMethod (); */
  NS_IMETHOD_(PRUint32) FixThisStupidMethod() = 0;

#ifdef XPIDL_JS_STUBS
  static NS_EXPORT_(JSObject *) InitJSClass(JSContext *cx);
  static NS_EXPORT_(JSObject *) GetJSObject(JSContext *cx, nsISomeInterface *priv);
#endif
};
#include "foo.h"
#include "bar.h"


#endif /* __gen_example1_h__ */
