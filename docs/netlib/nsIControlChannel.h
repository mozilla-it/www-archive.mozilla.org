/* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*-
 *
 * The contents of this file are subject to the Netscape Public License
 * Version 1.0 (the "NPL"); you may not use this file except in
 * compliance with the NPL.  You may obtain a copy of the NPL at
 * http://www.mozilla.org/NPL/
 *
 * Software distributed under the NPL is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the NPL
 * for the specific language governing rights and limitations under the
 * NPL.
 *
 * The Initial Developer of this code under the NPL is Netscape
 * Communications Corporation.  Portions created by Netscape are
 * Copyright (C) 1998 Netscape Communications Corporation.  All Rights
 * Reserved.
 */

#ifndef nsIControlChannel_h___
#define nsIControlChannel_h___

#include "nscore.h"
#include "nsISupports.h"
#include "prio.h"

class nsIStreamListener;

#define NS_IControlChannel_IID           \
{ 0x54ae75a0, 0x99e8, 0x11d2, \
  {0xb9, 0x47, 0x00, 0x80, 0x5f, 0x52, 0x35, 0x1a} }

class nsIControlChannel : public nsIStreamListener {
public:


  /**
   * Abort the current transfer
   *
   * @param transport  the Transport that needs to be aborted
   * @return The return value is currently ignored.
   */
  NS_IMETHOD Abort(nsITransport *transport) const = 0;


  /**
   * Suspend the given Transport
   *
   * @param transport  the Transport that needs to be suspended
   * @return The return value is currently ignored.
   */
  NS_IMETHOD Suspend(nsITransport *transport) const = 0;


  /**
   * Resume the given Transport
   *
   * @param transport  the Transport that needs to be resumed
   * @return The return value is currently ignored.
   */
  NS_IMETHOD Resume(nsITransport *transport) const = 0;



};


#endif /* nsIControlChannel_h___ */
