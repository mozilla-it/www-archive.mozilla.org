function f(unicode, name)
{
  window.parent.frames.bottom.document.write
  (
    "<style> .big { font-size: 100pt; } </style>" +
    "<span class=big>&#" + unicode + ";</span><br>" +
    name
  );
  window.parent.frames.bottom.document.close();
}
