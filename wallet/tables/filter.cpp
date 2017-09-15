/*
 * Utility to filter out unnecessary entries from URLFieldSchema.tbl
 *
 * The way this works is as follows:
 *   URLFieldSchema.tbl has been created by the batch script "add_all"
 *   It might contain entries that are unnecessary because they are already
 *      in FieldSchema.tbl
 *   This program compares the two files and removes such unnecessary lines
 */

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

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

#define BUFFSIZE 32000
#define TABLESIZE 32000

bool
EmptyLine(char * buffer) {
  if (strlen(buffer) == 0) {
    return false;
  } else if ((buffer[0] == '\r') || (buffer[0] == '\n')) {
    return true;
  } else {
    return false;
  }
}
int
main(int argc, char *argv[])
{
  char * field[TABLESIZE];
  char * schema[TABLESIZE];
  int tableEnd = 0;

  char buffer0[BUFFSIZE+1];
  char buffer[BUFFSIZE+1];
  char buffer2[BUFFSIZE+1];
  char strip[BUFFSIZE+1];
  buffer0[BUFFSIZE] = '\0';
  buffer[BUFFSIZE] = '\0';
  buffer2[BUFFSIZE] = '\0';
  strip[BUFFSIZE] = '\0';

  /* open FieldSchema.tbl */
  FILE * inFieldSchemaFile;
  if ((inFieldSchemaFile = fopen("FieldSchema.tbl", "r")) == NULL) {
    printf("FieldSchema.tbl file not found\n");
    return 1;
  }

  /* read in FieldSchema.tbl file */
  while (fgetline(inFieldSchemaFile, buffer, BUFFSIZE)) {
    /* read in fieldname */
    field[tableEnd] = (char *)malloc(strlen(buffer));
    strcpy(field[tableEnd], buffer);

    /* read in schema name */
    if (!fgetline(inFieldSchemaFile, buffer, BUFFSIZE)) {
      printf("Invalid format in FieldSchema.tbl\n");
      return 1;
    }
    schema[tableEnd] = (char *)malloc(strlen(buffer));
    strcpy(schema[tableEnd++], buffer);

    /* read in blank line */
    if (!fgetline(inFieldSchemaFile, buffer, BUFFSIZE)) {
      break; /* end of file encountered */
    }
    if (!EmptyLine(buffer)) {
      printf("Invalid format in FieldSchema.tbl\n");
      return 1;
    }
  }

  /* create new URLFieldSchema file */
  FILE * outURLFieldSchemaFile;
  if ((outURLFieldSchemaFile = fopen("URLFieldSchema.tbl.xxx", "w")) == NULL) {
    printf ("Error creating output file\n");
    return 1;
  }

  /* Copy old URLFieldSchemaFile to new one, filtering as we go */
  FILE * inURLFieldSchemaFile;
  if ((inURLFieldSchemaFile = fopen("URLFieldSchema.tbl", "r")) != NULL) {
    while (fgetline(inURLFieldSchemaFile, buffer0, BUFFSIZE)) {
      bool first = true;
      for (;;) {

        /* read in field name */
        if (!fgetline(inURLFieldSchemaFile, buffer, BUFFSIZE)) {
          break; /* end of entries for this URL */
        }
        if (EmptyLine(buffer)) {
          if (!first) {
            fprintf(outURLFieldSchemaFile,"\n");
          }
          break; /* end of current site */
        }

        /* strip separator characters out of field name */
        int i=0;
        for (int j=0; j<strlen(buffer); j++) {
          char c = buffer[j];
          if ((c>='0' && c<='9') || (c>='A' && c<='Z') ||
              (c>='a' && c<='z') || c>'~' || c=='\n' || c=='\r') {
            strip[i++] = c;
          }
        }
        strip[i] = '\0';

        /* read in schema name */
        if (!fgetline(inURLFieldSchemaFile, buffer2, BUFFSIZE)) {
          printf("bad format in URLFieldSchema.tbl\n");
          return 1;
        }
        if (EmptyLine(buffer2)) {
          printf("bad format in URLFieldSchema.tbl\n");
          return 1;
        }

        /* see if that pair is in FieldSchema table */
        bool found = false;
        for (int k = 0; k < tableEnd; k++) {
          /* stricmp is equivalent to strcasecmp */
          if (!stricmp(strip, field[k]) && !stricmp(buffer2, schema[k])) {
            found = true;
            break;
          }
        }

        /* if it was found, don't bother outputting it to new URLFieldSchema table */
        if (!found) {
          if (first) {
            fprintf(outURLFieldSchemaFile, "%s", buffer0); /* this is the site's URL */
            first = false;
          }
          fprintf(outURLFieldSchemaFile, "%s", buffer);
          fprintf(outURLFieldSchemaFile, "%s", buffer2);
          fprintf(outURLFieldSchemaFile,"\n");
        }

        /* read in blank line following field and schema names */
        if (!fgetline(inURLFieldSchemaFile, buffer, BUFFSIZE)) {
          break; /* end of file encountered */
        }
        if (!EmptyLine(buffer)) {
          printf("Invalid format in URLFieldSchema.tbl\n");
          return 1;
        }
      }
    }
    fclose(inURLFieldSchemaFile);
  }

  fclose(outURLFieldSchemaFile);
  return 0;
}
