#include "nsXPCOM.h"

#include "nsCOMPtr.h"

#include "nsISimpleStack.h"

#include "nsIComponentManager.h"

int main(int argc, char **argv)
{
    nsresult rv;
    // Start up XPCOM
    rv = NS_InitXPCOM2(NULL, NULL, NULL);
    
    if (NS_FAILED(rv))
        return -1;

    
    // get a simplestack implmentation
    nsCOMPtr<nsISimpleStack> aSimpleStack = do_CreateInstance("@mozilla.org/sample/nsSimpleStack;1", &rv);

    // if we get one do some stuff with it
    if (aSimpleStack)
    {
        int i;
        for (i=0; i< 100; i++)
           aSimpleStack->Push(i);
    }    

    // by contract the ownership of the this object is held by the nsIObserverService
    aSimpleStack = 0;

    // shutdown XPCOM 
    NS_ShutdownXPCOM(NULL);


    return 0;
}
