/*
 * Utility to sort the entries in URLFieldSchema.tbl so that we can see how many
 * duplicates there are and therefore determine candidates for moving into 
 * FieldSchema.tbl.  Output is written to walletsort.tbl.
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

#define BUFFSIZE 300
#define MAXSTRINGS 32000

int
main(int argc, char *argv[])
{
  
  char field[BUFFSIZE];
  char schema[BUFFSIZE];
  char url[BUFFSIZE];
  char *strings[MAXSTRINGS];
  unsigned int stringCount = 0;

  /* open URLFieldSchema.tbl file */
  FILE * inFile;
  if ((inFile = fopen("URLFieldSchema.tbl", "r")) == NULL) {
    printf ("Error opening URLFieldSchema.tbl.htm\n");
    return 1;
  }

  /* open output file */
  FILE * outFile;
  if ((outFile = fopen("walletsort.tbl", "w")) == NULL) {
    printf ("Error creating output file\n");
    return 1;
  }

  /* read in the URLFieldSchema.tbl file */
/*
  while (fgetline(inFile, buffer, BUFFSIZE)) {
    strings[stringCount] = (char *) malloc(strlen(buffer));
    strcpy(strings[stringCount++], buffer);
printf("%x\n",strlen(buffer));
  }
*/

  /* read in the URLFieldSchema.tbl file */
  while (fgetline(inFile, url, BUFFSIZE)) {
    fgetline(inFile, field, BUFFSIZE);
    for (;;) {
      if (field[strlen(field)-1] == '\n') {
        field[strlen(field)-1] = '\0';
      }
      fgetline(inFile, schema, BUFFSIZE);
      if (schema[strlen(schema)-1] == '\n') {
        schema[strlen(schema)-1] = '\0';
      }
      strcat(schema, " ");
      strcat(schema, field);
      strcat(schema, " ");
      strcat(schema, url);
      strings[stringCount] = (char *) malloc(strlen(schema));
      strcpy(strings[stringCount++], schema);
      fgetline(inFile, field, BUFFSIZE); /* just to skip over blank line */
      if (fgetline(inFile, field, BUFFSIZE) < 2) {
        break;
      }
    }    
  }

  /* sort the strings array */

  int changed = 1;
  char * temp;
  while (changed) {
    changed = 0;
    for (int i=0; i<stringCount-1; i++ ) {
      if (strcmp(strings[i], strings[i+1]) > 0) {
        changed = 1;
        temp = strings[i];
        strings[i]= strings[i+1];
        strings[i+1] = temp;
      }
    }
  }

  /* write out the resulting sorted file */
  for (unsigned int i = 0; i<stringCount; i++) {

    /* skip a line if the schema changed */
    if (i > 0) {
      int j = 0;
      for ( ; ; j++) {
        if (strings[i][j] != strings[i-1][j]) {
          fprintf(outFile, "\n");
          break;
        }
        if (strings[i][j] == ' ') {
          break;
        }
      }
    }

    fprintf(outFile, "%s", strings[i]);
  }

  fclose(inFile);
  fclose(outFile);

  return 0;
}
