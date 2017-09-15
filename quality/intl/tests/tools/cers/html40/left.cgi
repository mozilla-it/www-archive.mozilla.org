#!/bin/sh
echo 'Content-Type: text/html; charset=iso-8859-1'
echo
echo '<table>'
for charset in `cat charsets`
do
  echo '<tr>'
  echo '<td>'$charset'</td>'
  echo '<td><a href=charset-alpha.cgi?'$charset' target=right>A</a></td>'
  echo '<td><a href=charset-num.cgi?'$charset' target=right>N</a></td>'
  echo '<td><a href=charset-asis.cgi?'$charset' target=right>H</a></td>'
  echo '</tr>'
done
echo '</table>'
echo '<hr><a href=right.html target=right><i>Legend</i></a>'
