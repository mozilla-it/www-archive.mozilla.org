#include <stdio.h>
#include <sys/timeb.h>

int
main(int argc, char **argv)
{
  /**
   * prog: full path to mozilla executable
   */
  char *prog = "c:/temp/bin_sbtests/mozilla.exe";

  /**
   * url: fully qualified URL to page that will load and compute delta
   *      which is the browser startup time
   */
  char *url = "http://puma/browser/machv/sidebar/perf/startup.html";
 
  struct timeb now;
  char cmd[512];

  ftime(&now);
  
  sprintf(cmd, "%s -P mozilla %s?%d%.3d", prog, url, now.time, now.millitm);
  system(cmd);

  return 0;
}
