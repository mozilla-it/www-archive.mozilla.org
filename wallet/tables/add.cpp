/*
 * Utility to add an e-mail for a URL-specific site to the URLFieldToSchema.tbl file
 *
 * The way this works is as follows:
 *   Person uses tablegen.htm to fill in info for site and emails to morse@netscape.com
 *   I receive e-mail, right-click on the attachment and do a save-as to <filename>.
 *   I run the batch script "add_one <filename>"
 *   At this point the data has been appended to the master URLFieldToSchema.tbl
 */

#include <stdio.h>
#include <string.h>

int
fgetline(FILE * fp, char *s, int lim) {
  char c;
  int i;
  for (i=0; i<lim-1 && (c=getc(fp)) != EOF && c!='\n'; i++) {
    s[i] = c;
  }
  if (c == '\n') {
    s[i++] = c;
  }
  s[i] = '\0';
  return i;
}

char
dehex(char c) {
  if (('0' <= c) && (c <= '9')) {
    return c-'0';
  } else if (('a' <= c) && (c <= 'z')) {
    return 10+(c-'a');
  } else if (('A' <= c) && (c <= 'Z')) {
    return 10+(c-'A');
  } else {
    return '\0';
  }
}

#define BUFFSIZE 32000
int
main(int argc, char *argv[])
{
  if (argc != 2) {
    printf("usage: add <name of table to append>");
    return 1;
  }

  char buffer[BUFFSIZE+1];
  buffer[BUFFSIZE] = '\0';
	
  /* update URLFieldSchema file */
  FILE * URLFieldSchemaFile;
  if ((URLFieldSchemaFile = fopen("URLFieldSchema.tbl", "a")) == NULL) {
    printf ("Error creating output file\n");
    return 1;
  }

  /* open new data */
  FILE * newData;
  if ((newData = fopen(argv[1], "r")) == NULL) {
    printf ("Error opening new data\n");
    return 1;
  }

  /* Append new data */
  int firstread = 1;
  while (fgetline(newData, buffer, BUFFSIZE)) {
    unsigned int i = 0;
    if (firstread) {
      /* strnicmp is equivalent to strncasecmp */
      if (!strnicmp(buffer, "result=https%3A%2F%2F", strlen("result=https%3A%2F%2F"))) {
        i = strlen("result=https%3A%2F%2F");
      } else if (!strnicmp(buffer, "result=http%3A%2F%2F", strlen("result=http%3A%2F%2F"))) {
        i = strlen("result=http%3A%2F%2F");
      } else if (!strstr(buffer, "result=")){ /* we should never get this far */
        i = strlen("result=");
        printf("No protocol specified for %s\n", buffer);
      } else { /* we certainly should never get here */
        i = 0;
        printf("No result= specified for %s\n", buffer);
      }
    }
    for (; i<strlen(buffer); i++) {
      if (buffer[i] == '%') {
        char c = ((dehex(buffer[++i]))<<4) + dehex(buffer[++i]);
        putc(c, URLFieldSchemaFile);
      } else if (buffer[i] != '\n') { /* ignore lf at end of file */
        putc(buffer[i], URLFieldSchemaFile);
      }
    }
  }
  fclose(newData);


  fclose(URLFieldSchemaFile);

  return 0;
}
