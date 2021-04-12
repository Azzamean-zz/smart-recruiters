jQuery(document).ready(($) => {

  let postingsURL = 'https://api.smartrecruiters.com/v1/companies/LinuxFoundation/postings';

  // Gather job posting table information
  async function getdata() {
    let url = await fetch(postingsURL);
    let data = await url.json();
    return data;
  }

  // Basic Filtable usage - pass in a div with the filters and the plugin will handle it
  $('#data').filtable({ controlPanel: $('.table-filters') });

  // Assign Dropdowns
  let department = $('#department');
  department.empty();
  department.append('<option selected="true" value="">All Departments</option>');
  department.prop('selectedIndex', 0);

  let locations = $('#locations');
  locations.empty();
  locations.append('<option selected="true" value="">All Locations</option>');
  locations.prop('selectedIndex', 0);

  let brands = $('#brands');
  brands.empty();
  brands.append('<option selected="true" value="">All Brands</option>');
  brands.prop('selectedIndex', 0);

  function getData() {
    getdata().then(data => {
      //console.log(data)

      // Get Dropdown Data
      $.each(data.content, (_key, entry) => {
        if (entry.customField[2] != undefined) {
          department.append($('<option></option>').attr('value', entry.customField[2].valueLabel).text(entry.customField[2].valueLabel));
        }
        brands.append($('<option></option>').attr('value', entry.customField[1].valueLabel).text(entry.customField[1].valueLabel));
        locations.append($('<option></option>').attr('value', entry.location.city).text(entry.location.city));

        // Remove duplicate values from dropdown
        $("#department option").each(function () {
          $(this).siblings('[value="' + $(this).val() + '"]').remove();
        });
        $("#brands option").each(function () {
          $(this).siblings('[value="' + $(this).val() + '"]').remove();
        });
        $("#locations option").each(function () {
          $(this).siblings('[value="' + $(this).val() + '"]').remove();
        });
      });

      for (let i = 0; i < data.content.length; i++) {

        let tr;
        let date = new Date(data.content[i].releasedDate);
        let postingsURL = data.content[i].id;
        let remote = data.content[i].location.remote;

        tr = $('<tr/>');
        tr.append("<td data-label='JOB TITLE' id='postingID'><a href='/JobPosting?" + postingsURL + "'>" + data.content[i].name + "</a></td>");
        tr.append("<td data-label='TYPE OF EMPLOYMENT'>" + data.content[i].typeOfEmployment.label + "</td>");
        let departmentvalueLabel = (data.content[i].customField[2] != undefined) ? data.content[i].customField[2].valueLabel : " ";
        tr.append("<td data-label='DEPARTMENT'>" + departmentvalueLabel + "</td>");
        tr.append("<td data-label='BRAND'>" + data.content[i].customField[1].valueLabel + "</td>");
        tr.append("<td data-label='LOCATION' class='remote'>" + data.content[i].location.city + ', ' + data.content[i].location.region + "</td>");
        tr.append("<td data-label='REMOTE' class='hidden'>" + remote + "</td>");
        tr.append("<td data-label='PUBLISHED SINCE'>" + date.toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles' }) + "</td>");
        $('.smartRecruiters').append(tr);

        if (remote == true) {
          $('td.remote').addClass('true');
          $('td.remote.true').prop('title', 'Employees can work remotely');
        }

      }

    });
  }

  getData();

})