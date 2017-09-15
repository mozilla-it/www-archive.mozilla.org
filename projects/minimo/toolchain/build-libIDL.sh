#!/bin/bash -e

TOOLCHAIN="/opt/toolchain"
PREFIX="$TOOLCHAIN/arm-linux/local"
PATH="/bin:$TOOLCHAIN/bin:$PREFIX/bin:/usr/bin"

unset make

# version of the tools to build
LIBIDLVER=${LIBIDLVER:-0.8.2}

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
echo "  libIDL-$LIBIDLVER"
echo ""
echo "installation directory in $PREFIX"
echo ""
echo "PRESS A KEY TO CONTINUE, CTRL-C to CANCEL"
read x

if [ ! -d libIDL-$LIBIDLVER ]; then
  tar xfj libIDL-$LIBIDLVER.tar.bz2
fi
rm -fr libIDL-$LIBIDLVER-build
mkdir libIDL-$LIBIDLVER-build
(cd libIDL-$LIBIDLVER-build &&
 cp ../libIDL-config.cache config.cache &&
 ../libIDL-$LIBIDLVER/configure --prefix=$PREFIX \
   --build=i686-pc-linux-gnu --host=arm-linux \
   --cache-file=config.cache &&
 make &&
 make install)
verify_install libIDL $LIBIDLVER

# vim: ts=2 sw=2 expandtab
