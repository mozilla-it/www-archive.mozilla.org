/*
 * Utility to update the schema table in tablegen.js by using info from schemas.htm file
 * Also updated FieldSchema.tbl file to include all these schema names
 *
 * The way it works is as follows:
 *   schemas.htm file is maintained (using composer) as master list of all allowable schema
 *   run batch script "schema"
 *   at this point old schema table in tablegen.js has been updated and fresh
 *   FieldSchema.tbl file has been created.
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

#define BUFFSIZE 32000
#define OUTBUFFSIZE 200
int
main(int argc, char *argv[])
{
  char buffer[BUFFSIZE];
  char outbuffer[OUTBUFFSIZE];

  /* open schemas.htm files */
  FILE * schemaFile;
  if ((schemaFile = fopen("schemas.htm", "r")) == NULL) {
    printf ("Error opening schemas.htm\n");
    return 1;
  }

  /* open FieldSchema.tbl output file */
  FILE * fieldSchemaOutfile;
  if ((fieldSchemaOutfile = fopen("FieldSchema.tbl.xxx", "w")) == NULL) {
    printf ("Error creating output file\n");
    return 1;
  }

  /* open tablegen.js output file */
  FILE * tablegenOutfile;
  if ((tablegenOutfile = fopen("tablegen.js.xxx", "w")) == NULL) {
    printf ("Error creating output file\n");
    return 1;
  }

  /* open tablegen.js input file */
  FILE * tablegenInfile;
  if ((tablegenInfile = fopen("tablegen.js", "r")) == NULL) {
    printf ("Error opening tablegen.js\n");
    return 1;
  }

  /* Copy begining of old tablegen.js file to new one */
  while (fgetline(tablegenInfile, buffer, BUFFSIZE)) {
    fprintf(tablegenOutfile, "%s", buffer);
    if (strstr(buffer,"start of computer-generated string")) {
      break;
    }
  }

  /* Process each line */
  unsigned int linenumb = 0;
  unsigned int index = 0;
  while (fgetline(schemaFile, buffer, BUFFSIZE)) {
    unsigned int i = 0;
    unsigned int charcount = 0;
    while (i<(strlen(buffer)-1)) {
      if (buffer[i] == '<') {
        i++;
        while (buffer[i++] != '>') {
          /* strip out html elements */
        }
      } else if (buffer[i] == '&') {
        i++;
        while (buffer[i++] != ';') {
          /* strip out & elements */
        }
      } else if (buffer[i] == ' ') {
        i++;
      } else {
        if (linenumb >= 2) {
          if (charcount == 0) {
            if (linenumb > 2 ) {
              fprintf(tablegenOutfile, " + BREAK +\n      \"");
              outbuffer[index++] = '\0';

              /* remove dots from field name before writing it to file. */

              /*    The fieldname matching that is done at wallet runtime will ignore
               *    dots in the fieldnames found on the websites.  This is done to give
               *    more possible hits.  So we need to strip out the dots here as well
               *    in order for the matching to work
               */

              for (int j=0; j<strlen(outbuffer); j++) {
                if (outbuffer[j] != '.') {
                  fprintf(fieldSchemaOutfile, "%c", outbuffer[j]);
                }
              }
              fprintf(fieldSchemaOutfile, "%c", '\n');

              /* but keep the dots in the schema name that is written to file */
              fprintf(fieldSchemaOutfile, "%s\n", outbuffer);

              fprintf(fieldSchemaOutfile, "\n");
              index = 0;
            } else {
              fprintf(tablegenOutfile, "    var validSchemaString =\n      \"");
            }
          }

          outbuffer[index++] = buffer[i];
          putc(buffer[i++], tablegenOutfile);
        } else {
          i++;
        }
        charcount++;
      }
    }
    if (charcount > 0) {
      if (linenumb >= 2) {
        putc('\"', tablegenOutfile);
      }
      linenumb++;
    }
  }
  putc(';', tablegenOutfile);
  putc('\n', tablegenOutfile);
  fclose(schemaFile);

  /* Skip over previous table in old tablegen.js file */
  while (fgetline(tablegenInfile, buffer, BUFFSIZE)) {
    if (strstr(buffer,"end of computer-generated string")) {
      fprintf(tablegenOutfile, "%s", buffer);
      break;
    }
  }

  /* Copy remained of old tablegen.js file to new one */
  while (fgetline(tablegenInfile, buffer, BUFFSIZE)) {
    fprintf(tablegenOutfile, "%s", buffer);
  }

  fclose(tablegenInfile);
  fclose(tablegenOutfile);
  return 0;
}
