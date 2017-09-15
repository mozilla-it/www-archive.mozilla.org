#!/bin/bash -e

#Script for building GCC XScale Development toolchain
#Original code from the arm-linux mailing list
#By Dominic Duval, dduval@oerlikon.ca
#Modified by Darin Fisher, darin@meer.net

PREFIX=${PREFIX:-/opt/toolchain}
KERNEL=${KERNEL:-/opt/toolchain/src/linux}
HOST=

export LD_LIBRARY_PATH=
unalias -a

#export SKIP_GDB=1
#export SKIP_BINUTILS=1
#export SKIP_GCC1=1
#export SKIP_GLIBC=1
#export SKIP_GCC2=1

# versions of tools to build
BINUTILSVER=${BINUTILS:-2.14}
GCCVER=${GCCVER:-3.3.1}
GLIBCVER=${GLIBCVER:-2.3.2}
GDBVER=${GDBVER:-5.3}

echo "Preparing to build:"
echo ""
if [ -z $SKIP_GDB ]; then
  echo "  gdb-$GDBVER"
fi
if [ -z $SKIP_BINUTILS ]; then
  echo "  binutils-$BINUTILSVER"
fi 
if [ -z $SKIP_GCC1 ]; then
  echo "  gcc-$GCCVER (first pass)"
fi
if [ -z $SKIP_GLIBC ]; then
  echo "  glibc-$GLIBCVER"
fi
if [ -z $SKIP_GCC2 ]; then
  echo "  gcc-$GCCVER (second pass)"
fi
echo ""
echo "using kernel headers from $KERNEL"
echo "installation directory in $PREFIX"
echo ""
echo "PRESS A KEY TO CONTINUE, CTRL-C to CANCEL"
read x

if [ -z $SKIP_GDB ]; then
  echo 'building gdb...'
  #rm -rf gdb-$GDBVER
  tar zxf gdb-$GDBVER.tar.gz
  pushd gdb-$GDBVER
  ./configure --target=arm-linux --build=i686-pc-linux-gnu --prefix=$PREFIX
  make
  make install
  popd
  #rm -rf gdb-$GDBVER
else
  echo 'skipping gdb...'
fi

if [ "$KERNEL" = "" -o ! -d "$KERNEL/include/asm-arm" ]; then
  echo "You haven't changed KERNEL to point at a valid kernel tree"
  exit 1
fi
if [ ! -f binutils-$BINUTILSVER.tar.bz2 ]; then
  echo Binutils $BINUTILSVER seems to be missing
  exit 1
fi
if [ ! -f gcc-$GCCVER.tar.bz2 ]; then
  echo GCC $GCCVER seems to be missing
  exit 1
fi

if [ -z $SKIP_BINUTILS ]; then 
  echo 'building binutils...'
  if [ ! -d binutils-$BINUTILSVER ]; then
    tar jxf binutils-$BINUTILSVER.tar.bz2
  fi
  rm -fr binutils-$BINUTILSVER-build
  mkdir binutils-$BINUTILSVER-build
  pushd binutils-$BINUTILSVER-build
  ../binutils-$BINUTILSVER/configure --target=arm-linux --prefix=$PREFIX --with-cpu=xscale --nfp
  make 
  make install
  popd
  #rm -rf binutils-$BINUTILSVER
else
  echo 'skipping binutils...' 
fi

PATH=$PATH:$PREFIX/bin

if [ -z $SKIP_GCC1 ]; then 
  echo 'building gcc1...'
  # kill old build
  rm -fr gcc-$GCCVER

  tar jxf gcc-$GCCVER.tar.bz2
  patch -p0 < gcc-$GCCVER.diff

  perl -pi -e 's/^(TARGET_LIBGCC2_CFLAGS.*)/$1 -Dinhibit_libc -D__gthr_posix_h/' ./gcc-$GCCVER/gcc/config/arm/t-linux
  echo 'T_CFLAGS = -Dinhibit_libc -D__gthr_posix_h' >> ./gcc-$GCCVER/gcc/config/arm/t-linux

  pushd gcc-$GCCVER
  ./configure --target=arm-linux --prefix=$PREFIX $HOST --with-headers=$KERNEL/include \
    --disable-shared --disable-threads --enable-languages="c" --nfp --with-cpu=xscale \
    --without-fp --with-softfloat-support=internal
  make 
  make install 
  popd
  #rm -rf gcc-$GCCVER
else
  echo 'skipping gcc1...'
fi

# make sure include/linux and include/asm are linked properly
mkdir -p $PREFIX/arm-linux/include
if [ ! -L $PREFIX/arm-linux/include/linux ]; then
    ln -s $PREFIX/arm-linux/sys-include/linux $PREFIX/arm-linux/include/linux
fi
if [ ! -L $PREFIX/arm-linux/include/asm ]; then
    ln -s $PREFIX/arm-linux/sys-include/asm $PREFIX/arm-linux/include/asm
fi

if [ -z $SKIP_GLIBC ]; then
  if [ ! -f "$KERNEL/include/linux/version.h" ]; then
    echo "Building glibc requires a configured kernel tree."
    echo "So, build the kernel with the cross compiler in $PREFIX and run this script again."
    exit 1
  fi
  echo 'building glibc...'
  if [ ! -d glibc-$GLIBCVER ]; then
    tar jxf glibc-$GLIBCVER.tar.bz2
    (cd glibc-$GLIBCVER && tar jxf ../glibc-linuxthreads-$GLIBCVER.tar.bz2)
    patch -p0 < glibc-$GLIBCVER.diff
  fi
  rm -fr glibc-$GLIBCVER-build
  mkdir glibc-$GLIBCVER-build
  pushd glibc-$GLIBCVER-build
  ../glibc-$GLIBCVER/configure --host=arm-linux --build=i686-pc-linux-gnu \
    --with-headers=$KERNEL/include --enable-add-ons=linuxthreads --enable-shared \
    --prefix=$PREFIX/arm-linux --with-cpu=xscale --without-fp --enable-kernel=2.4.19
  make
  make install
  popd

  #
  # remove some garbage from libc.so and libpthread.so
  # (see http://sources.redhat.com/ml/bug-glibc/2003-05/msg00076.html)
  #
  pushd $PREFIX/arm-linux/lib
  perl -pi -e 's/^\*\*\* BUG.*\n$//' ./libc.so
  perl -pi -e 's/^\*\*\* BUG.*\n$//' ./libpthread.so
  popd

  #
  # make sure GCC finds the GLIBC copy of limits.h.  since it oddly only searches
  # sys-include for it, we'll work around the problem by making sure GCC finds
  # limits.h in sys-include ;-)
  #
  pushd $PREFIX/arm-linux/sys-include
  if [ ! -L limits.h ]; then
    ln -s $PREFIX/arm-linux/include/limits.h
  fi
  popd

  #rm -rf glibc-$GLIBCVER
else
  echo 'skipping glibc...'
fi

if [ -z $SKIP_GCC2 ]; then
  echo 'building gcc2...'
  # kill old build
  rm -fr gcc-$GCCVER

  tar jxf gcc-$GCCVER.tar.bz2
  patch -p0 < gcc-$GCCVER.diff

  pushd gcc-$GCCVER
  ./configure --target=arm-linux --prefix=$PREFIX $HOST --with-headers=$KERNEL/include \
    --with-cpu=xscale --with-softfloat-support=internal --enable-languages=c,c++ --nfp
  make 
  make install 
  popd

  #
  # need to help the compiler find gcc-lib
  #
  pushd $PREFIX/arm-linux/lib
  if [ ! -L gcc-lib ]; then
    ln -s $PREFIX/lib/gcc-lib
  fi
  popd

  #rm -rf gcc-$GCCVER
else
  echo 'skipping gcc2...'
fi
