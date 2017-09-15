#!/bin/bash -e

# version of the tools to build
PKGCONFIGVER=${PKGCONFIGVER:-0.15.0}

if [ ! -d pkgconfig-$PKGCONFIGVER ]; then
  tar xfz pkgconfig-$PKGCONFIGVER.tar.gz
fi
rm -fr pkgconfig-$PKGCONFIGVER-build
mkdir pkgconfig-$PKGCONFIGVER-build
(cd pkgconfig-$PKGCONFIGVER-build &&
 ../pkgconfig-$PKGCONFIGVER/configure --prefix=/opt/toolchain/arm-linux/local &&
 make &&
 make install)
