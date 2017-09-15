#!/bin/bash -e

TOOLCHAIN="/opt/toolchain"
PREFIX="/opt/toolchain/arm-linux/local"
PATH="/bin:$TOOLCHAIN/bin:$TOOLCHAIN/arm-linux/local/bin:/usr/bin"
LDFLAGS="-L$TOOLCHAIN/arm-linux/local/lib"

unset make

#SKIP_GLIB=1
#SKIP_ATK=1
#SKIP_PANGO=1
#SKIP_GTK=1

# version of the tools to build
GLIBVER=${GLIBVER:-2.2.3}
ATKVER=${ATKVER:-1.2.4}
PANGOVER=${PANGOVER:-1.2.5}
GTKVER=${GTKVER:-2.2.4}

verify_install() {
  pkg=$1
  ver=$2
  if ! pkg-config --exists $pkg --exact-version=$ver ; then
    echo "### pkg-config thinks that $pkg-$ver was not installed!!"
    exit 1
  fi
}

echo "Preparing to build:"
echo ""
if [ -z $SKIP_GLIB ]; then
  echo "  glib-$GLIBVER"
fi
if [ -z $SKIP_ATK ]; then
  echo "  atk-$ATKVER"
fi 
if [ -z $SKIP_PANGO ]; then
  echo "  pango-$PANGOVER"
fi
if [ -z $SKIP_GTK ]; then
  echo "  gtk+-$GTKVER"
fi
echo ""
echo "installation directory in $PREFIX"
echo ""
echo "PRESS A KEY TO CONTINUE, CTRL-C to CANCEL"
read x

if [ -z "$SKIP_GLIB" ]; then
  if [ ! -d glib-$GLIBVER ]; then
    tar xfj glib-$GLIBVER.tar.bz2
  fi
  rm -fr glib-$GLIBVER-build
  mkdir glib-$GLIBVER-build
  (cd glib-$GLIBVER-build &&
   cp ../glib-config.cache config.cache &&
   ../glib-$GLIBVER/configure --prefix=$PREFIX \
     --build=i686-pc-linux-gnu --host=arm-linux \
     --cache-file=config.cache &&
   make &&
   make install &&
   chmod a-x $PREFIX/bin/glib-* &&
   chmod a-x $PREFIX/bin/gobject-*)
fi
verify_install glib $GLIBVER

if [ -z "$SKIP_ATK" ]; then
  if [ ! -d atk-$ATKVER ]; then
    tar xfj atk-$ATKVER.tar.bz2 
  fi
  rm -fr atk-$ATKVER-build
  mkdir atk-$ATKVER-build
  (cd atk-$ATKVER-build &&
   ../atk-$ATKVER/configure --prefix=$PREFIX \
     --build=i686-pc-linux-gnu --host=arm-linux &&
   make &&
   make install)
fi
verify_install atk $ATKVER

if [ -z "$SKIP_PANGO" ]; then
  if [ ! -d pango-$PANGOVER ]; then
    tar xfj pango-$PANGOVER.tar.bz2 
    # do not build tests since we cannot run them ;-)
    (cd pango-$PANGOVER &&
     cat Makefile.in | sed 's/\(^SUBDIRS.*\)tests/\1/' > Makefile.in.temp &&
     mv -f Makefile.in.temp Makefile.in)
  fi
  rm -fr pango-$PANGOVER-build
  mkdir pango-$PANGOVER-build
  (cd pango-$PANGOVER-build &&
   ../pango-$PANGOVER/configure --prefix=$PREFIX \
     --build=i686-pc-linux-gnu --host=arm-linux \
     --x-includes=$PREFIX/X11R6/include \
     --x-libraries=$PREFIX/X11R6/lib &&
   make &&
   patch -p0 < ../pangoxft.pc.diff &&
   make install)
fi
verify_install pango $PANGOVER

if [ -z "$SKIP_GTK" ]; then
  if [ ! -d gtk+-$GTKVER ]; then
    tar xfj gtk+-$GTKVER.tar.bz2 
  fi
  rm -fr gtk+-$GTKVER-build
  mkdir gtk+-$GTKVER-build
  (cd gtk+-$GTKVER-build &&
   cp ../gtk+-config.cache config.cache &&
   ../gtk+-$GTKVER/configure --prefix=$PREFIX \
     --build=i686-pc-linux-gnu --host=arm-linux \
     --cache-file=config.cache \
     --without-libtiff \
     --without-libjpeg \
     --without-libpng \
     --x-includes=$PREFIX/X11R6/include \
     --x-libraries=$PREFIX/X11R6/lib &&
   make &&
   make install)
fi
verify_install gtk+ $GTKVER

# vim: ts=2 sw=2 expandtab
