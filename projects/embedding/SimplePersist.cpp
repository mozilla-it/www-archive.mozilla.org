
#include "nsCWebBrowserPersist.h"
#include "nsIWebProgressListener.h"
#include "nsNetUtil.h"

/* Header file */
class nsWebProgressListener : public nsIWebProgressListener
{
public:
    NS_DECL_ISUPPORTS
    NS_DECL_NSIWEBPROGRESSLISTENER

    nsWebProgressListener();
protected:
    virtual ~nsWebProgressListener();
    /* additional members */
};

nsCOMPtr<nsIWebBrowserPersist> gPersist;

nsresult SimplePersist(const char *aURI, const char *aDest)
{
    NS_ENSURE_ARG_POINTER(aURI);
    NS_ENSURE_ARG_POINTER(aDest);

    // Simple persist only supports one op at a time.
    NS_ENSURE_FALSE(gPersist, NS_ERROR_UNEXPECTED);

    // Create persist object
    nsresult rv;
    nsCOMPtr<nsIWebBrowserPersist> persist = do_CreateInstance(NS_WEBBROWSERPERSIST_CONTRACTID, &rv);
    NS_ENSURE_SUCCESS(rv, rv);

    // Set listener
    nsCOMPtr<nsIWebProgressListener> listener = do_QueryInterface(new nsWebProgressListener);
    persist->SetProgressListener(listener);

    // Flags to control persist operation
    PRUint32 flags = nsIWebBrowserPersist::PERSIST_FLAGS_BYPASS_CACHE; // Force network for debug purposes
    persist->SetPersistFlags(flags);

    // Create uri object
    nsCOMPtr<nsIURI> uri;
    rv = NS_NewURI(getter_AddRefs(uri), aURI);
    NS_ENSURE_SUCCESS(rv, rv);

    // Create file object
    nsCOMPtr<nsILocalFile> file;
    rv = NS_NewLocalFile(NS_ConvertUTF8toUCS2(aDest), PR_FALSE, getter_AddRefs(file));
    NS_ENSURE_SUCCESS(rv, rv);

    persist->SaveURI(uri, nsnull, nsnull, nsnull, nsnull, file);

    // Hold a ref so the operation can complete
    gPersist = persist;

    // EXERCISE: Add a native message processing loop here to make this
    //           operation synchronous.

    return NS_OK;
}


/* Implementation file */
NS_IMPL_ISUPPORTS1(nsWebProgressListener, nsIWebProgressListener)

nsWebProgressListener::nsWebProgressListener()
{
    /* member initializers and constructor code */
    printf("nsWebProgressListener::nsWebProgressListener()\n");
}

nsWebProgressListener::~nsWebProgressListener()
{
    /* destructor code */
    printf("nsWebProgressListener::~nsWebProgressListener()\n");
}

/* void onStateChange (in nsIWebProgress aWebProgress, in nsIRequest aRequest, in unsigned long aStateFlags, in nsresult aStatus); */
NS_IMETHODIMP nsWebProgressListener::OnStateChange(nsIWebProgress *aWebProgress, nsIRequest *aRequest, PRUint32 aStateFlags, nsresult aStatus)
{
    printf("nsWebProgressListener::OnStateChange()\n");

    if ((aStateFlags & nsIWebProgressListener::STATE_STOP) &&
        (aStateFlags & nsIWebProgressListener::STATE_IS_REQUEST))
    {
        printf("  Request finished, status = %08x\n", aStatus);
        if (aRequest)
        {
            nsCOMPtr<nsIHttpChannel> httpChannel = do_QueryInterface(aRequest);
            if (httpChannel)
            {
                PRUint32 responseStatus = 0;
                httpChannel->GetResponseStatus(&responseStatus);
                printf("  Http channel response code = %lu\n", responseStatus);
            }
        }
    }

    if ((aStateFlags & nsIWebProgressListener::STATE_STOP) &&
        (aStateFlags & nsIWebProgressListener::STATE_IS_NETWORK))
    {
        printf("  Download completed, status = %08x\n", aStatus);
        gPersist = nsnull;
    }
    return NS_OK;
}

/* void onProgressChange (in nsIWebProgress aWebProgress, in nsIRequest aRequest, in long aCurSelfProgress, in long aMaxSelfProgress, in long aCurTotalProgress, in long aMaxTotalProgress); */
NS_IMETHODIMP nsWebProgressListener::OnProgressChange(nsIWebProgress *aWebProgress, nsIRequest *aRequest, PRInt32 aCurSelfProgress, PRInt32 aMaxSelfProgress, PRInt32 aCurTotalProgress, PRInt32 aMaxTotalProgress)
{
    printf("nsWebProgressListener::OnProgressChange()\n");
    printf("  Progress for this request (%d of %d)\n", aCurSelfProgress, aMaxSelfProgress);
    printf("  Progress for total (%d of %d)\n", aCurTotalProgress, aMaxTotalProgress);
    return NS_OK;
}

/* void onLocationChange (in nsIWebProgress aWebProgress, in nsIRequest aRequest, in nsIURI location); */
NS_IMETHODIMP nsWebProgressListener::OnLocationChange(nsIWebProgress *aWebProgress, nsIRequest *aRequest, nsIURI *location)
{
    printf("nsWebProgressListener::OnLocationChange()\n");
    return NS_OK;
}

/* void onStatusChange (in nsIWebProgress aWebProgress, in nsIRequest aRequest, in nsresult aStatus, in wstring aMessage); */
NS_IMETHODIMP nsWebProgressListener::OnStatusChange(nsIWebProgress *aWebProgress, nsIRequest *aRequest, nsresult aStatus, const PRUnichar *aMessage)
{
    printf("nsWebProgressListener::OnStatusChange()\n");
    return NS_OK;
}

/* void onSecurityChange (in nsIWebProgress aWebProgress, in nsIRequest aRequest, in unsigned long state); */
NS_IMETHODIMP nsWebProgressListener::OnSecurityChange(nsIWebProgress *aWebProgress, nsIRequest *aRequest, PRUint32 state)
{
    printf("nsWebProgressListener::OnSecurityChange()\n");
    return NS_OK;
}
