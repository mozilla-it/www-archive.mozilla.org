#include "nsCOMPtr.h"
#include "nsIServiceManager.h"
#include "nsISimpleStack.h"

#include "nsIObserver.h"
#include "nsIObserverService.h"

#include "nsIGenericFactory.h"

#define MAX_STACK_SIZE 256

/* Header file */
class nsSimpleStack : public nsISimpleStack, public nsIObserver
{
public:
  NS_DECL_ISUPPORTS
  NS_DECL_NSISIMPLESTACK
  NS_DECL_NSIOBSERVER

  nsSimpleStack();
  virtual ~nsSimpleStack();

  // Factory should call this method to setup object correctly.
  nsresult Init();

  /* additional members */
  long mStack[MAX_STACK_SIZE];
  int  mStackPointer;
};

/* Implementation file */
NS_IMPL_ISUPPORTS2(nsSimpleStack, nsISimpleStack, nsIObserver)

nsSimpleStack::nsSimpleStack()
{
  NS_INIT_ISUPPORTS();
  /* member initializers and constructor code */
  mStackPointer = 0;
}

nsSimpleStack::~nsSimpleStack()
{
  /* destructor code */
}

nsresult
nsSimpleStack::Init()
{
    nsresult rv;
    nsCOMPtr<nsIObserverService> observerService = do_GetService("@mozilla.org/observer-service;1", &rv);
    if (observerService) {
        // Note: passing false makes the observer service hold a reference to us.  This
        // object will not go away until xpcom shutsdown.  
        printf("nsSimpleStack (%x) adding to observer service (topic=\"xpcom-shutdown\")\n", this);
        observerService->AddObserver(this, "xpcom-shutdown", PR_FALSE);
    }
    return rv;
}
////////////////////////////////////////////////////
// nsISimpleStack Implementation:
////////////////////////////////////////////////////

/* void push (in long value); */
NS_IMETHODIMP nsSimpleStack::Push(PRInt32 value)
{
    if (mStackPointer >= MAX_STACK_SIZE)
        return NS_ERROR_FAILURE;

    mStack[mStackPointer++] = value;
    return NS_OK;
}

/* long pop (); */
NS_IMETHODIMP nsSimpleStack::Pop(PRInt32 *_retval)
{
    if (!mStackPointer)
        return NS_ERROR_FAILURE;

    *_retval = mStack[--mStackPointer];
    return NS_OK;
}

/* long peek (); */
NS_IMETHODIMP nsSimpleStack::Peek(PRInt32 *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

////////////////////////////////////////////////////
// nsIObserver Implementation:
////////////////////////////////////////////////////

NS_IMETHODIMP
nsSimpleStack::Observe(nsISupports *aSubject, const char *aTopic, const PRUnichar *someData) {
    if (!strcmp(aTopic, "xpcom-shutdown")) {
        printf("nsSimpleStack (%x) observers xpcom-shutdown\n", this);
        
        while (--mStackPointer)
            printf("%d\n", mStack[mStackPointer]);
    }
  return NS_OK;
}




// Generic Factory stuff - 

// This macro creates a factory function for the nsSimpleStack object named "nsSimpleStackConstructor"
//NS_GENERIC_FACTORY_CONSTRUCTOR(nsSimpleStack);
NS_GENERIC_FACTORY_CONSTRUCTOR_INIT(nsSimpleStack, Init);

// here is the CID for the nsSimpleStack
#define NS_SIMPLE_STACK_CID {0x3d2539ee, 0x23e2, 0x45a3, {0x9f, 0x0a, 0x7f, 0x4d, 0x09, 0x7f, 0x58, 0xc0}}

// here is the required component array for use with the generic module
static nsModuleComponentInfo components[] = 
{ 
    {
     "Silly SimpleStack Example",
     NS_SIMPLE_STACK_CID,
     "@mozilla.org/sample/nsSimpleStack;1",
     nsSimpleStackConstructor
    }   
};

// this is the macro that create the NSGetModule API for the component library
NS_IMPL_NSGETMODULE(nsSimpleStack, components);
