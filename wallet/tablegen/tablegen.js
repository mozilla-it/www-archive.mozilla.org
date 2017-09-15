    header_frame = 0;
    content_frame = 1;
    side_frame = 2;

    hidden_element = 0;
    URL_element = 0;

    url_form = 0;
    resync_form = 1;
    transmit_form = 2;

    var lastPageProcessed = "";

    BREAK = "^";
    var validSchema = [];

    // start of computer-generated string
    var validSchemaString =
      "Name" + BREAK +
      "Name.Prefix" + BREAK +
      "Name.First" + BREAK +
      "Name.Middle" + BREAK +
      "Name.Last" + BREAK +
      "Name.Suffix" + BREAK +
      "Nickname" + BREAK +
      "BillTo.Name" + BREAK +
      "BillTo.Name.Prefix" + BREAK +
      "BillTo.Name.First" + BREAK +
      "BillTo.Name.Middle" + BREAK +
      "BillTo.Name.Last" + BREAK +
      "BillTo.Name.Suffix" + BREAK +
      "BillTo.Nickname" + BREAK +
      "ShipTo.Name" + BREAK +
      "ShipTo.Name.Prefix" + BREAK +
      "ShipTo.Name.First" + BREAK +
      "ShipTo.Name.Middle" + BREAK +
      "ShipTo.Name.Last" + BREAK +
      "ShipTo.Name.Suffix" + BREAK +
      "ShipTo.Nickname" + BREAK +
      "Business.JobTitle" + BREAK +
      "Business.Department" + BREAK +
      "BillTo.CompanyName" + BREAK +
      "ShipTo.CompanyName" + BREAK +
      "Business.CompanyName" + BREAK +
      "Home.Street.Line1" + BREAK +
      "Home.Street.Line2" + BREAK +
      "Home.Street.Line3" + BREAK +
      "Home.City" + BREAK +
      "Home.State" + BREAK +
      "Home.Prov" + BREAK +
      "Home.PostalCode" + BREAK +
      "Home.PostalCode.Prefix" + BREAK +
      "Home.PostalCode.Suffix" + BREAK +
      "Home.Country" + BREAK +
      "BillTo.Street.Line1" + BREAK +
      "BillTo.Street.Line2" + BREAK +
      "BillTo.Street.Line3" + BREAK +
      "BillTo.City" + BREAK +
      "BillTo.State" + BREAK +
      "BillTo.Prov" + BREAK +
      "BillTo.PostalCode" + BREAK +
      "BillTo.PostalCode.Prefix" + BREAK +
      "BillTo.PostalCode.Suffix" + BREAK +
      "BillTo.Country" + BREAK +
      "ShipTo.Street.Line1" + BREAK +
      "ShipTo.Street.Line2" + BREAK +
      "ShipTo.Street.Line3" + BREAK +
      "ShipTo.City" + BREAK +
      "ShipTo.State" + BREAK +
      "ShipTo.Prov" + BREAK +
      "ShipTo.PostalCode" + BREAK +
      "ShipTo.PostalCode.Prefix" + BREAK +
      "ShipTo.PostalCode.Suffix" + BREAK +
      "ShipTo.Country" + BREAK +
      "Business.Street.Line1" + BREAK +
      "Business.Street.Line2" + BREAK +
      "Business.Street.Line3" + BREAK +
      "Business.City" + BREAK +
      "Business.State" + BREAK +
      "Business.Prov" + BREAK +
      "Business.PostalCode" + BREAK +
      "Business.PostalCode.Prefix" + BREAK +
      "Business.PostalCode.Suffix" + BREAK +
      "Business.Country" + BREAK +
      "Home.Phone" + BREAK +
      "Home.Phone.IntCode" + BREAK +
      "Home.Phone.LocCode" + BREAK +
      "Home.Phone.Number" + BREAK +
      "Home.Phone.Number.Prefix" + BREAK +
      "Home.Phone.Number.Suffix" + BREAK +
      "Home.Phone.Extension" + BREAK +
      "BillTo.Phone" + BREAK +
      "BillTo.Phone.IntCode" + BREAK +
      "BillTo.Phone.LocCode" + BREAK +
      "BillTo.Phone.Number" + BREAK +
      "BillTo.Phone.Number.Prefix" + BREAK +
      "BillTo.Phone.Number.Suffix" + BREAK +
      "BillTo.Phone.Extension" + BREAK +
      "ShipTo.Phone" + BREAK +
      "ShipTo.Phone.IntCode" + BREAK +
      "ShipTo.Phone.LocCode" + BREAK +
      "ShipTo.Phone.Number" + BREAK +
      "ShipTo.Phone.Number.Prefix" + BREAK +
      "ShipTo.Phone.Number.Suffix" + BREAK +
      "ShipTo.Phone.Extension" + BREAK +
      "Business.Phone" + BREAK +
      "Business.Phone.IntCode" + BREAK +
      "Business.Phone.LocCode" + BREAK +
      "Business.Phone.Number" + BREAK +
      "Business.Phone.Number.Prefix" + BREAK +
      "Business.Phone.Number.Suffix" + BREAK +
      "Business.Phone.Extension" + BREAK +
      "Home.AltPhone" + BREAK +
      "Home.AltPhone.IntCode" + BREAK +
      "Home.AltPhone.LocCode" + BREAK +
      "Home.AltPhone.Number" + BREAK +
      "Home.AltPhone.Number.Prefix" + BREAK +
      "Home.AltPhone.Number.Suffix" + BREAK +
      "Home.AltPhone.Extension" + BREAK +
      "BillTo.AltPhone" + BREAK +
      "BillTo.AltPhone.IntCode" + BREAK +
      "BillTo.AltPhone.LocCode" + BREAK +
      "BillTo.AltPhone.Number" + BREAK +
      "BillTo.AltPhone.Number.Prefix" + BREAK +
      "BillTo.AltPhone.Number.Suffix" + BREAK +
      "BillTo.AltPhone.Extension" + BREAK +
      "ShipTo.AltPhone" + BREAK +
      "ShipTo.AltPhone.IntCode" + BREAK +
      "ShipTo.AltPhone.LocCode" + BREAK +
      "ShipTo.AltPhone.Number" + BREAK +
      "ShipTo.AltPhone.Number.Prefix" + BREAK +
      "ShipTo.AltPhone.Number.Suffix" + BREAK +
      "ShipTo.AltPhone.Extension" + BREAK +
      "Business.AltPhone" + BREAK +
      "Business.AltPhone.IntCode" + BREAK +
      "Business.AltPhone.LocCode" + BREAK +
      "Business.AltPhone.Number" + BREAK +
      "Business.AltPhone.Number.Prefix" + BREAK +
      "Business.AltPhone.Number.Suffix" + BREAK +
      "Business.AltPhone.Extension" + BREAK +
      "Home.Fax" + BREAK +
      "Home.Fax.IntCode" + BREAK +
      "Home.Fax.LocCode" + BREAK +
      "Home.Fax.Number" + BREAK +
      "Home.Fax.Number.Prefix" + BREAK +
      "Home.Fax.Number.Suffix" + BREAK +
      "BillTo.Fax" + BREAK +
      "BillTo.Fax.IntCode" + BREAK +
      "BillTo.Fax.LocCode" + BREAK +
      "BillTo.Fax.Number" + BREAK +
      "BillTo.Fax.Number.Prefix" + BREAK +
      "BillTo.Fax.Number.Suffix" + BREAK +
      "ShipTo.Fax" + BREAK +
      "ShipTo.Fax.IntCode" + BREAK +
      "ShipTo.Fax.LocCode" + BREAK +
      "ShipTo.Fax.Number" + BREAK +
      "ShipTo.Fax.Number.Prefix" + BREAK +
      "ShipTo.Fax.Number.Suffix" + BREAK +
      "Business.Fax" + BREAK +
      "Business.Fax.IntCode" + BREAK +
      "Business.Fax.LocCode" + BREAK +
      "Business.Fax.Number" + BREAK +
      "Business.Fax.Number.Prefix" + BREAK +
      "Business.Fax.Number.Suffix" + BREAK +
      "Home.Mobile" + BREAK +
      "Home.Mobile.IntCode" + BREAK +
      "Home.Mobile.LocCode" + BREAK +
      "Home.Mobile.Number" + BREAK +
      "Home.Mobile.Number.Prefix" + BREAK +
      "Home.Mobile.Number.Suffix" + BREAK +
      "BillTo.Mobile" + BREAK +
      "BillTo.Mobile.IntCode" + BREAK +
      "BillTo.Mobile.LocCode" + BREAK +
      "BillTo.Mobile.Number" + BREAK +
      "BillTo.Mobile.Number.Prefix" + BREAK +
      "BillTo.Mobile.Number.Suffix" + BREAK +
      "ShipTo.Mobile" + BREAK +
      "ShipTo.Mobile.IntCode" + BREAK +
      "ShipTo.Mobile.LocCode" + BREAK +
      "ShipTo.Mobile.Number" + BREAK +
      "ShipTo.Mobile.Number.Prefix" + BREAK +
      "ShipTo.Mobile.Number.Suffix" + BREAK +
      "Business.Mobile" + BREAK +
      "Business.Mobile.IntCode" + BREAK +
      "Business.Mobile.LocCode" + BREAK +
      "Business.Mobile.Number" + BREAK +
      "Business.Mobile.Number.Prefix" + BREAK +
      "Business.Mobile.Number.Suffix" + BREAK +
      "Home.Pager" + BREAK +
      "Home.Pager.IntCode" + BREAK +
      "Home.Pager.LocCode" + BREAK +
      "Home.Pager.Number" + BREAK +
      "Home.Pager.Number.Prefix" + BREAK +
      "Home.Pager.Number.Suffix" + BREAK +
      "BillTo.Pager" + BREAK +
      "BillTo.Pager.IntCode" + BREAK +
      "BillTo.Pager.LocCode" + BREAK +
      "BillTo.Pager.Number" + BREAK +
      "BillTo.Pager.Number.Prefix" + BREAK +
      "BillTo.Pager.Number.Suffix" + BREAK +
      "ShipTo.Pager" + BREAK +
      "ShipTo.Pager.IntCode" + BREAK +
      "ShipTo.Pager.LocCode" + BREAK +
      "ShipTo.Pager.Number" + BREAK +
      "ShipTo.Pager.Number.Prefix" + BREAK +
      "ShipTo.Pager.Number.Suffix" + BREAK +
      "Business.Pager" + BREAK +
      "Business.Pager.IntCode" + BREAK +
      "Business.Pager.LocCode" + BREAK +
      "Business.Pager.Number" + BREAK +
      "Business.Pager.Number.Prefix" + BREAK +
      "Business.Pager.Number.Suffix" + BREAK +
      "Home.Email" + BREAK +
      "Home.URI" + BREAK +
      "BillTo.Email" + BREAK +
      "BillTo.URI" + BREAK +
      "ShipTo.Email" + BREAK +
      "ShipTo.URI" + BREAK +
      "Business.Email" + BREAK +
      "Business.URI" + BREAK +
      "Joint.Name" + BREAK +
      "Joint.Name.Prefix" + BREAK +
      "Joint.Name.First" + BREAK +
      "Joint.Name.Middle" + BREAK +
      "Joint.Name.Last" + BREAK +
      "Joint.Name.Suffix" + BREAK +
      "Joint.Nickname" + BREAK +
      "Joint.Business.Name" + BREAK +
      "Joint.Business.JobTitle" + BREAK +
      "Joint.Business.Department" + BREAK +
      "Joint.Business.CompanyName" + BREAK +
      "Joint.Home.Street.Line1" + BREAK +
      "Joint.Home.Street.Line2" + BREAK +
      "Joint.Home.Street.Line3" + BREAK +
      "Joint.Home.City" + BREAK +
      "Joint.Home.State" + BREAK +
      "Joint.Home.Prov" + BREAK +
      "Joint.Home.PostalCode" + BREAK +
      "Joint.Home.PostalCode.Prefix" + BREAK +
      "Joint.Home.PostalCode.Suffix" + BREAK +
      "Joint.Home.Country" + BREAK +
      "Joint.Business.Street.Line1" + BREAK +
      "Joint.Business.Street.Line2" + BREAK +
      "Joint.Business.Street.Line3" + BREAK +
      "Joint.Business.City" + BREAK +
      "Joint.Business.State" + BREAK +
      "Joint.Business.Prov" + BREAK +
      "Joint.Business.PostalCode" + BREAK +
      "Joint.Business.PostalCode.Prefix" + BREAK +
      "Joint.Business.PostalCode.Suffix" + BREAK +
      "Joint.Business.Country" + BREAK +
      "Joint.Home.Phone" + BREAK +
      "Joint.Home.Phone.IntCode" + BREAK +
      "Joint.Home.Phone.LocCode" + BREAK +
      "Joint.Home.Phone.Number" + BREAK +
      "Joint.Home.Phone.Number.Prefix" + BREAK +
      "Joint.Home.Phone.Number.Suffix" + BREAK +
      "Joint.Home.Phone.Extension" + BREAK +
      "Joint.Business.Phone" + BREAK +
      "Joint.Business.Phone.IntCode" + BREAK +
      "Joint.Business.Phone.LocCode" + BREAK +
      "Joint.Business.Phone.Number" + BREAK +
      "Joint.Business.Phone.Number.Prefix" + BREAK +
      "Joint.Business.Phone.Number.Suffix" + BREAK +
      "Joint.Business.Phone.Extension" + BREAK +
      "Joint.Home.AltPhone" + BREAK +
      "Joint.Home.AltPhone.IntCode" + BREAK +
      "Joint.Home.AltPhone.LocCode" + BREAK +
      "Joint.Home.AltPhone.Number" + BREAK +
      "Joint.Home.AltPhone.Number.Prefix" + BREAK +
      "Joint.Home.AltPhone.Number.Suffix" + BREAK +
      "Joint.Home.AltPhone.Extension" + BREAK +
      "Joint.Business.AltPhone" + BREAK +
      "Joint.Business.AltPhone.IntCode" + BREAK +
      "Joint.Business.AltPhone.LocCode" + BREAK +
      "Joint.Business.AltPhone.Number" + BREAK +
      "Joint.Business.AltPhone.Number.Prefix" + BREAK +
      "Joint.Business.AltPhone.Number.Suffix" + BREAK +
      "Joint.Business.AltPhone.Extension" + BREAK +
      "Joint.Home.Fax" + BREAK +
      "Joint.Home.Fax.IntCode" + BREAK +
      "Joint.Home.Fax.LocCode" + BREAK +
      "Joint.Home.Fax.Number" + BREAK +
      "Joint.Home.Fax.Number.Prefix" + BREAK +
      "Joint.Home.Fax.Number.Suffix" + BREAK +
      "Joint.Business.Fax" + BREAK +
      "Joint.Business.Fax.IntCode" + BREAK +
      "Joint.Business.Fax.LocCode" + BREAK +
      "Joint.Business.Fax.Number" + BREAK +
      "Joint.Business.Fax.Number.Prefix" + BREAK +
      "Joint.Business.Fax.Number.Suffix" + BREAK +
      "Joint.Home.Mobile" + BREAK +
      "Joint.Home.Mobile.IntCode" + BREAK +
      "Joint.Home.Mobile.LocCode" + BREAK +
      "Joint.Home.Mobile.Number" + BREAK +
      "Joint.Home.Mobile.Number.Prefix" + BREAK +
      "Joint.Home.Mobile.Number.Suffix" + BREAK +
      "Joint.Business.Mobile" + BREAK +
      "Joint.Business.Mobile.IntCode" + BREAK +
      "Joint.Business.Mobile.LocCode" + BREAK +
      "Joint.Business.Mobile.Number" + BREAK +
      "Joint.Business.Mobile.Number.Prefix" + BREAK +
      "Joint.Business.Mobile.Number.Suffix" + BREAK +
      "Joint.Home.Pager" + BREAK +
      "Joint.Home.Pager.IntCode" + BREAK +
      "Joint.Home.Pager.LocCode" + BREAK +
      "Joint.Home.Pager.Number" + BREAK +
      "Joint.Home.Pager.Number.Prefix" + BREAK +
      "Joint.Home.Pager.Number.Suffix" + BREAK +
      "Joint.Business.Pager" + BREAK +
      "Joint.Business.Pager.IntCode" + BREAK +
      "Joint.Business.Pager.LocCode" + BREAK +
      "Joint.Business.Pager.Number" + BREAK +
      "Joint.Business.Pager.Number.Prefix" + BREAK +
      "Joint.Business.Pager.Number.Suffix" + BREAK +
      "Joint.Home.Email" + BREAK +
      "Joint.Home.URI" + BREAK +
      "Joint.Business.Email" + BREAK +
      "Joint.Business.URI" + BREAK +
      "Card.Type" + BREAK +
      "Card.Number" + BREAK +
      "Card.Name" + BREAK +
      "Card.ExpDate" + BREAK +
      "Card.ExpDate.Month" + BREAK +
      "Card.ExpDate.Year" + BREAK +
      "SocSec" + BREAK +
      "SocSec.Prefix" + BREAK +
      "SocSec.Middle" + BREAK +
      "SocSec.Suffix" + BREAK +
      "Joint.SocSec" + BREAK +
      "Joint.SocSec.Prefix" + BREAK +
      "Joint.SocSec.Middle" + BREAK +
      "Joint.SocSec.Suffix" + BREAK +
      "License.Number" + BREAK +
      "License.State" + BREAK +
      "Joint.License.Number" + BREAK +
      "Joint.License.State" + BREAK +
      "Bdate" + BREAK +
      "Bdate.Month" + BREAK +
      "Bdate.Day" + BREAK +
      "Bdate.Year" + BREAK +
      "Joint.Bdate" + BREAK +
      "Joint.Bdate.Month" + BREAK +
      "Joint.Bdate.Day" + BREAK +
      "Joint.Bdate.Year" + BREAK +
      "Anniv" + BREAK +
      "Anniv.Month" + BREAK +
      "Anniv.Day" + BREAK +
      "Anniv.Year" + BREAK +
      "Joint.Anniv" + BREAK +
      "Joint.Anniv.Month" + BREAK +
      "Joint.Anniv.Day" + BREAK +
      "Joint.Anniv.Year" + BREAK +
      "MothersMaidenName" + BREAK +
      "Joint.MothersMaidenName";
    // end of computer-generated string

    validSchema = validSchemaString.split(BREAK);

    function ProcessSideFrame() {

      netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead")

      // save old values if this the page hasn't changed
      var samePage = (top.frames[content_frame].document.location.href == lastPageProcessed);
      var oldValue = [];
      if (samePage) {
        var ii, jj, kk;
        kk = 0;
        for (jj=0; ;jj++) {
          form = top.frames[side_frame].document.forms[jj];
          if (!form) {
            break;
          }
          for (ii=0; ii<form.length; ii++) {
            if(form.elements[ii].type == "text") {
              oldValue[kk++] = form.elements[ii].value
            }
          }
        }
      } else {
        lastPageProcessed = top.frames[content_frame].document.location.href;
      }

      // rewrite the side frame
      top.frames[side_frame].document.open();
      top.frames[side_frame].document.write(
        "<body>" +
          "<center> <b> Lists and Text Fields </b> </center> <br>" +
//        "The following lists are on <br>" +
//          top.frames[content_frame].document.location.href + "<br>" +
          "<form>"
      );

      // step through all forms in the content frame
      var i, j, k, l;
      l = 0;
      for (j=0; ;j++) {
        form = top.frames[content_frame].document.forms[j];
        if (!form) {
          break;
        }

        // step through all fields in the form
        for (i=0; i<form.length; i++) {

          if(form.elements[i].type != "select-one" &&
              form.elements[i].type != "select-multiple" &&
              form.elements[i].type != "text") {
            continue;
          }

          // display the element name
          if (form.elements[i].name) {
            top.frames[side_frame].document.write(
              form.elements[i].name + "<br>"
            );
          }

          // if it is a select field, display it for reference purposes
          if(form.elements[i].type == "select-one" ||
              form.elements[i].type == "select-multiple") {
            top.frames[side_frame].document.write(
              "<select>"
            )
            for (k=0; k<form.elements[i].length; k++) {
              // need to make sure options don't contain '<' or '>'
              var option = form.elements[i].options[k].text;
              for (m=0; m<option.length; m++) {
                if (option[m] == '<') {
                  option = (option.substr(0,m) + "{" + option.substr(m+1));
                } else if (option[m] == '>') {
                  option = (option.substr(0,m) + "}" + option.substr(m+1));
                }
              }
              top.frames[side_frame].document.write(
                "<option>" + option + "</option>"
              )
            }
            top.frames[side_frame].document.write(
              "</select> <br>"
            )
          }

          // determine if we should use last value when displaying text field
          var useLastValue = false;
          var useContentValue = false;
          if (samePage) {
            if (form.elements[i].type == "text") {
              /* reuse last value if no value is specified in the content frame */
              if (form.elements[i].value == "") {
                useLastValue = true;
              } else {
                useContentValue = true;
              }
            } else {
              /* form element is a select list so we need to reuse the last value else
               * it gets lost
               */
              useLastValue = true;
            }
          }

          // display text field
          if (useLastValue) {
            top.frames[side_frame].document.write(
              "<input name='" + form.elements[i].name +
                   "' value='" + oldValue[l] +
// Following keeps the values in the two frames in synch.  Unfortunately it does not work.
// The handler gets called but it then gives a syntax error on "top.frames["
//                 "' onchange='top.frames[' + content_frame + '].document.forms[' + j + '].elements[' + i + '].value = this.value;" +
                   "' type='text'><br><br>"
            )
          } else if (useContentValue) {
            top.frames[side_frame].document.write(
              "<input name='" + form.elements[i].name +
                   "' value='" + form.elements[i].value +
// Following keeps the values in the two frames in synch.  Unfortunately it does not work.
// The handler gets called but it then gives a syntax error on "top.frames["
//                 "' onchange='top.frames[' + content_frame + '].document.forms[' + j + '].elements[' + i + '].value = this.value;" +
                   "' type='text'><br><br>"
            )
            form.elements[i].value = ""; // to avoid confusion due to duplication
// Above line should be removed if the onchange handlers can ever be made to work.
          } else /* use no value */ {
            top.frames[side_frame].document.write(
              "<input name='" + form.elements[i].name +
                   "' value='" +
// Following keeps the values in the two frames in synch.  Unfortunately it does not work.
// The handler gets called but it then gives a syntax error on "top.frames["
//                 "' onchange='top.frames[' + content_frame + '].document.forms[' + j + '].elements[' + i + '].value = this.value;" +
                   "' type='text'><br><br>"
            )
          }
          l++;
        }
      }
      top.frames[side_frame].document.write(
          "</form>" +
        "</body>"
      );
      top.frames[side_frame].document.close();
    }

    function X(a) {
      alert("change: "+a);
    }

//    function SideFrameChanged (x,y) {
//      alert("change at "+x+" "+y);
//    }

    function Resync() {

      netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead")

      // update the value in the text box that specifies the URL
      top.frames[header_frame].document.forms[url_form].elements[URL_element].value
        = top.frames[content_frame].document.location.href;

      // regenerate the select frame and the text frame
      ProcessSideFrame();
    }

    function Load() {

      // load into the content frame the URL specified in the text box of the content frame
      var URL = top.frames[header_frame].document.forms[url_form].elements[URL_element].value;
      if (URL.search('://') == -1) {
        URL = "http://" + URL;
      }
      top.frames[content_frame].document.location.href = URL;
      top.frames[header_frame].document.forms[url_form].elements[URL_element].value = URL;

      // clear out the side frame
      top.frames[side_frame].document.open();
      top.frames[side_frame].document.close();
//      // load the lists and textfields into the side frame
//      setTimeout('ProcessSideFrame();',0); /* give content frame a chance to load */
      return false;
    }

    function Validate(value) {
      var i;
      for (i=0; i<validSchema.length; i++) {
        if (value == validSchema[i]) {
          return;
        }
      }
      alert (value + " is not a valid schema");
      return;
    }

    function TransmitFrame() {

      Resync();

      // step through the text fields in the right-side frame
      var result = "";
      var k;
      form = top.frames[side_frame].document.forms[0];
      if (form) {
        for (k=0; k<form.length; k++) {

          // it must be a select field, add its name and value to the result
          if(form.elements[k].type == "text" && form.elements[k].value) {
            result += form.elements[k].name + "\n";
            result += form.elements[k].value + "\n\n";
            Validate(form.elements[k].value);
          }
        }
      }
      return result;
    }

    function Transmit() {
      netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead")

      // initialize the result to contain the URL of the content frame
      var result = top.frames[content_frame].document.location.href;
      var index = result.search('?');
      if (index != -1) {
        result = result.slice(0, index); /* remove query string */
      }
      result += "\n";

      // step through the texts and select lists in the right-side frames
      Resync();
      var k;
      form = top.frames[side_frame].document.forms[0];
      if (form) {
        for (k=0; k<form.length; k++) {
          if(form.elements[k].type == "text" && form.elements[k].value) {
            result += form.elements[k].name + "\n";
            result += form.elements[k].value + "\n\n";
            Validate(form.elements[k].value);
          }
        }
      }
      result += "\n";

      // store the result in the header frame so it can be transmitted to the server
      alert("result="+result);
      top.frames[header_frame].document.forms[transmit_form].elements[hidden_element].value =
        result;
      return true;
    }
