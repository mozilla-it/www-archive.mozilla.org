
Welcome! 

The following instructions are a barebones installation and configuration guide
for setting up and using the ICAST Viewer & Guide software.

You should have:

- this file, mozilla_readme.txt
- another file called vgmaster.exe
- a PC running Windows 95 or Windows NT (Intel-based)
- an Internet connection, ISDN speed or greater, with access to the MBone
  (see www.mbone.com for more about that)

To install the Viewer & Guide:

1. Download vgmaster.exe if you haven't already.
2. Execute vgmaster.exe.
3. When the ICAST Setup program launches, select Viewer & Guide.
4  When the Installer comes up, select Next and proceed to select the default
   settings on each screen.
5. At the Program Registration screen, enter this serial number: 10F1300NETSCAPE
    and this activiation key: c46ec34bdb931cad
6. Continue to select the default settings.
7. At the final screen select Run the Viewer & Guide and then click Finish.
   Unless  you're Danish :-)
8. When the Guide launches, it begins to receive channel announcements
   and list them in the upper panel. When you see one you are interested in, 
   double-click it.
9 The Viewer launches and you can now view the channel.
10. Enjoy the show!

Note If you repeated open separate channels, a separate Viewer (channel viewing
window) is launched. The more windows you open, the more CPU is required and
performance begins to degrade. So don't go crazy with the chezewhiz, dude!

Visit www.icast.com to find out more about ICAST's IP multicast products
for broadcasting and viewing video, voice, and text. And buy something!




Included below is the standard README stuff that comes with this product:

ICAST Viewer & Guide Release 2.2 README file
============================================

Last updated March 31, 1998

Thank you for choosing the ICAST Viewer & Guide for Windows
95/NT!

This file includes last-minute information that could not be
included in the product documentation. We recommend that you
print this file and keep it with your printed documentation
for future reference.

This file is not a complete guide to the product. For
additional information, refer also to the

- on-line ICAST Viewer & Guide manuals, installed with the
  product
- on-line help files, installed with the product
- support materials on ICAST's web site, www.icast.com


Contents
--------
* How to find out more from ICAST Corporation
* Where to find the latest product information
* What's new with Release 2.2
* Troubleshooting guide
* Problems fixed with Release 2.2
* Known product problems and workarounds
  - Viewer
  - Guide
  - Plug-ins
* Additions and corrections to the product documentation



How to find out more from ICAST Corporation
===========================================
Please visit these locations on ICAST's web site for more
information about

- ICAST Corporation http//www.icast.com/about/
- technical support http//www.icast.com/support/
- other ICAST products http//www.icast.com/products/
- contacting ICAST http//www.icast.com/contact/



Where to find the latest product information
============================================
The most up-to-date information about this product can be accessed
on the ICAST Support Web at http//www.icast.com/support/. Here
you'll find

- tips for using and configuring ICAST products
- information about configuring your network and routers
- information about compatibility and performance with a
  variety of computer hardware
- the latest lists of documentation errata and known
  problems and workarounds
- instructions for reporting product problems



What's new with Release 2.2
===========================
- Support for H.263 video compression
- Improved plug-in viewer support for web browsers,
  including Netscape Navigator 4.0 and Microsoft
  Internet Explorer 4.0
- Automatic start-up of the ICAST Guide
- Support for integrating third-party viewer products



Troubleshooting guide
=====================
Included below are a few of the most common troubleshooting
hints. For more detailed troubleshooting help, visit the
ICAST Support Web at http//www.icast.com/support/.

Symptom Channels do not appear in the Guide
--------------------------------------------
Steps to take
(1) Wait a few minutes. When you first start the ICAST Guide,
    it may begin with an empty channel list. Channels are
    advertised periodically, often at three-minute intervals. 

(2) Make sure that there is an ICAST Broadcaster on your
    network that is advertising channels.

(a) If there is, make sure that its channels are enabled for
    Advertising SDR (in the "Broadcaster ID" settings).

(b) If there isn't, try starting a Broadcaster on the same
    subnetwork segment as your Guide and create a channel.


Symptom The Guide lists channels from my subnet, but not
from outside of my subnet
---------------------------------------------------------
Steps to take 

(1) Make sure that the router that connects your subnet
    the rest of your network is multicast-enabled. Contact
    your network administrator about that, or refer to the
    ICAST Support Web for more information about router
    configuration. 

(2) Make sure that the channels being broadcast from outside
    of your subnet have their TTL settings greater than 1 and
    sufficiently high to reach your subnet. Contact your network
    administrator to find out what TTL values are required.

    Note that some versions of the ICAST Broadcaster have
    a fixed TTL=1. If that is the case, you will need to
    upgrade your Broadcaster (contact sales@icast.com) or
    move the Broadcaster's network connection to your subnet.



Symptom The Guide lists channels from other subnets within
my organization's network, but does not list channels from
the MBone
-----------------------------------------------------------
Steps to take 

(1) Make sure that the router used to connect your
   organization to the Internet is multicast-enabled. Contact
   your network administrator about that, or refer to the
   ICAST Support Web for more information about router
   configuration.

(2) Make sure that your organization's Internet Service
    Provider ISP has enabled multicast for your Internet
    service. Contact the ISP about that, or refer to the
    ICAST Support Web for more information about getting
    connected to the MBone.


Symptom When I launch the Viewer on a channel listed in the
Guide, there is no video or audio or text
-----------------------------------------------------------
Steps to take

(1) Make sure that the channel is scheduled to be broadcasting.
    Channels can be announced in advance of broadcasting, and
    depending on your Guide settings, you may see channels
    listed which have already completed their scheduled
    broadcast. Look for the Start Time in the upper panel of
    the Guide, select the channel, and then look for the
    Finish Time in the lower pane. 

(2) Make sure that the Broadcaster is actually broadcasting.
    Even though a channel is listed in the Guide, and is
    scheduled to be broadcasting, it may not be broadcasting.
    Right-click in the Viewer, select Channels, and the
    choose the Active Sources tab. If no active sources
    appear, then the Broadcaster is not broadcasting.

Symptom I get unexpected audio, video, or text, on a
channel.
-----------------------------------------------------
Steps to take

(1) It is possible for more than one Broadcaster to broadcast
    on the same IP address and port number, and you may be
    receiving audio, video, or text from a different
    Broadcaster than you expected. Right-click in the Viewer,
    select Channels, and the choose the Active Sources tab.
    Click on the selection arrow for the unexpected item
    (audio, video, or text) to see if there are multiple
    sources present. If there are, try selecting and applying
    different sources until you find the one that you were
    expecting, or select different sources and click on
    the Stats button to see more information about each
    source. For Audio sources, make sure that "Keep All"
    is not selected unless you want to hear a mixture of
    all active audio sources.

(2) Microsoft Windows 95 TCP/IP networking has a problem
    which causes a broadcast from one IP address and port
    number to be received by a Viewer that has selected a
    broadcast with a different IP address but the same port
    number. Follow step (1) to choose the appropriate
    Active Source. Broadcasters can avoid this problem
    by choosing unique port numbers for their broadcasts.



Problems fixed with Release 2.2
===============================
10033, 10035 Video freezes or corrupts in Navigator and
       Internet Explorer plug-ins

10034 Audio continues to play when you leave an Internet
       Explorer plug-in page.

10063 Multiple Text active sources cannot be accessed

10065 NT Task Manager freezes Direct Draw video display

10087 Changing Display settings causes video to stop

10146 ActiveX plug-ins do not work with Microsoft
       Internet Explorer 4.0



Known product problems and workarounds Viewer
==============================================

10019 New sources do not appear in the Active Sources list
if they become active while you are viewing the list 
-----------------------------------------------------------
Problem
The Active Sources list is not updated in real-time. Sources
that become active while the list is being displayed will not
appear in the list.

Workaround
Close the Active Sources dialog and re-open it to see the
current list of Active Sources.


10029 Active Sources status only represents video sources
----------------------------------------------------------
Problem
The status display which shows the current count of sources
only counts video sources. If a channel does not contain a
video element, or if the number of audio or text sources is
different from the number of video sources, the status
display may be misleading.

Workaround
Right-click in the Viewer, select Channels, choose the Active
Sources tab, and click on the selection arrow for the text or
audio sources list. You will see a list of all active sources
for that element.


10032 Tracking problem between Viewer volume control and
audio card mixer volume control
---------------------------------------------------------
Problem
If you adjust the Viewer volume control, the audio card's
mixer volume control (for wave input) tracks the adjustment.
However, if you adjust the audio card's mixer volume control,
the Viewer volume control doesn't track. After doing that,
if you adjust the Viewer volume control, the mixer control
abruptly jumps back into sync with the Viewer control.

Workaround
Don't adjust the mixer volume control. Use the Viewer volume
control instead.


10046, 10121 Corrupted Text broadcasts
---------------------------------------
Problem
Text broadcasts may become corrupted if the text file source
is unusually small or contains unusually short line lengths.

Workaround
To broadcast short textual messages, repeat the message
several times within the text file source. Avoid short line
lengths by appending multiple short lines together into
longer lines. Insert multiple empty lines at the beginning
of the text file.


10060 Volume control on one Viewer controls volume for all
Viewer controls the same computer.
-----------------------------------------------------------
Problem
When running multiple Viewers, volume control adjustments
on one Viewer will adjust the volume for all of the other
Viewers.

Workaround
In cases where a normal volume setting on one Viewer
results in an abnormally loud volume setting on another
Viewer, set the Mute button on for the second Viewer
before adjusting the volume on the first Viewer. When
you want to listen to the second Viewer, adjust its
volume before setting its Mute buttton off.


10066, 10178 Socket error messages appear when no
TCP/IP stack is installed or if network is
disconnected
--------------------------------------------------
Problem
Running the Guide or the Viewer with no TCP/IP stack
installed results in a series of socket error messages.

Workaround
Install a TCP/IP stack and do not disconnect from the
network. Didn't you read the manual!?


10119 Video View Only mode is not saved along with other
window settings
---------------------------------------------------------
Problem
If you exit and restart the Viewer, Video View Only mode
is always unselected. Other window size, position, and
mode settings are saved between sessions.

Workaround
None.


10122 Delay between starting the Viewer and first display of
Text
-------------------------------------------------------------
Problem
When the Viewer is started for a channel that is broadcasting
Text, there may be a delay of several seconds before Text
display begins.

Workaround
None.


10124 Video view becomes green
-------------------------------
Problem
Sometimes a Viewer will show only green instead of video. This
is caused by a color map problem on the Broadcaster. 

Workaround
This problem must be corrected on the ICAST Broadcaster.
See Known Problem 10075 in the Broadcaster README.TXT file.


10168 Text continues to scroll after broadcast has completed
-------------------------------------------------------------
Problem
If a channel is broadcasting Text at the time it stops
broadcasting, the Viewer will continue to display text.

Workaround
Exit the Viewer.



Known product problems and workarounds Guide
=============================================

10061 Autolaunch doesn't work more than once on a channel
----------------------------------------------------------
Problem
If you launch a Viewer by selecting Autolaunch for a
particular channel, close the Viewer and unselect
Autolaunch, and then select Autolaunch again, the channel
will not launch again.

Workaround
Exit the Guide program and restart it to re-enable
Autolaunch for that channel.


10062 Double-clicking the Autolaunch column may launch
unexpected Viewer or channels
-------------------------------------------------------
Problem
If you have selected one channel, and then double-click
the Autolaunch column for another channel, the first
channel will launch a Viewer. If the second channel is
scheduled for broadcast at that time, it too will launch
a Viewer.

Workaround
Double-click in the Channels column to launch a Viewer.
Single-click in the Autolaunch column to set or unset
Autolaunch.


10066, 10178 Socket error messages when no TCP/IP stack is
installed or if network is disconnected
-----------------------------------------------------------
Problem
Running the Guide or the Viewer with no TCP/IP stack
installed results in socket error messages.

Workaround
Install a TCP/IP stack and do not disconnect from the network.



Known product problems and workarounds Plug-ins
================================================

Problems with older versions of Netscape Navigator and
Microsoft Internet Explorer
------------------------------------------------------
Problem
Some problems exist with older versions of web browsers,
ranging from plug-ins not functioning at all with browser
versions 2.X and previous, to various video and audio
problems using early 3.X versions.

Workaround
ICAST does not support Microsoft or Netscape 2.X or early
3.X version web browsers. Upgrade to Internet Explorer
version 3.02 (or newer) and Navigator version 3.03 (or
newer).


10074, 10132 ActiveX Controls don't work with applications
other than Internet Explorer
-----------------------------------------------------------
Problem
The ActiveX plug-ins do not work properly when inserted
into applications other than Internet Explorer (e.g.
Microsoft Word).

Workaround
None. ICAST's ActiveX plug-ins do not support this use.


20043 Cannot view video in more than one Netscape plug-in
on the same page
----------------------------------------------------------
Problem
If more than one video viewer is embedded in the same HTML
page and you open the page with Netscape Navigator, only
the first viewer plug-in will display video. The others
remain blank.

Workaround
None. ICAST's Navigator plug-in does not currently support
multiple simultaneous video plug-ins.


20044, 20075 Audio is not received by a Viewer if an
audio plug-in is active
-----------------------------------------------------
Problem
If you open a web page containing an audio plug-in and
then open a standalone Viewer, the Viewer will not receive
audio.

Workaround
Close the web browser and the Viewer, and then re-open the
Viewer.


20076 Only the first of multiple audio plug-ins receives
audio
---------------------------------------------------------
Problem
If you open a web page with multiple audio plug-ins, or
two web browsers with audio plug-ins, only the first one
will receive audio. There is no way to switch audio focus
to the other plug-in.

Workaround
None. ICAST's Internet Explorer and Navigator plug-ins do
not support this usage.



Additions and corrections to the product documentation
======================================================
Manual Using the ICAST Viewer & Guide
Chapter Installation
Section Reinstalling, Updating, or Uninstalling
Additional material

    In addition to the instructions described in this
    section, you must also exit the Viewer and Guide
    programs before you uninstall or reinstall the programs.



Thank you for choosing ICAST!
=============================
Copyright (c) 1997-8, ICAST Corporation
All Rights Reserved
