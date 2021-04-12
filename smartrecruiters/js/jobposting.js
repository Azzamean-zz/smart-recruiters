jQuery(document).ready(($) => {

    let queryString = window.location.search;
    let postingID = queryString.replace('?', '');
    let postingIDURL = 'https://api.smartrecruiters.com/v1/companies/LinuxFoundation/postings/' + postingID;

    // GATHER INDIVIDUAL POSTING INFORMATION
    async function getdata() {
        let url = await fetch(postingIDURL);
        let data = await url.json();
        return data;
    }

    function getData() {

        getdata().then((data) => {

            let country = data.location.country;
            if (country == 'us') {
                country = 'USA';
            }

            let remote = data.location.remote;
            if (remote == true) {
                remote = 'Employees can work remotely';
            }
            else {
                document.getElementById("remote").style.display = "none";
            }


            //IMAGE INFORMATIN FOR JOB POSTINGS LOGO
            // let linuxFoundationImage;
            // if (location.hostname === "localhost") {
            //     linuxFoundationImage = '../images/LinuxFoundationLogo.png';
            // }
            // else {
            //     linuxFoundationImage = '/wp-content/themes/enfold-child/smartrecruiters/images/LinuxFoundationLogo.png';
            // }

            // let brandLogo = data.customField[1].valueLabel;
            // switch (brandLogo) {
            //     case "Linux Foundation":
            //         document.getElementById("brandLogo").src = linuxFoundationImage;
            //         break;
            //     default:
            //         document.getElementById("brandLogo").src = linuxFoundationImage;
            // }

            document.getElementById("brand").innerHTML = data.customField[1].valueLabel
            document.getElementById("jobTitle").innerHTML = data.name;
            document.getElementById("jobLocation").innerHTML = data.location.city + ", " + data.location.region + " " + country;
            document.getElementById("remote").innerHTML = remote;
            document.getElementById("employmentType").innerHTML = data.typeOfEmployment.label;
            document.getElementById("companyDescriptionTitle").innerHTML = data.jobAd.sections.companyDescription.title;
            document.getElementById("companyDescription").innerHTML = data.jobAd.sections.companyDescription.text;
            document.getElementById("jobDescriptionTitle").innerHTML = data.jobAd.sections.jobDescription.title;
            document.getElementById("jobDescription").innerHTML = data.jobAd.sections.jobDescription.text;
            document.getElementById("qualificationsTitle").innerHTML = data.jobAd.sections.qualifications.title;
            document.getElementById("qualifications").innerHTML = data.jobAd.sections.qualifications.text;
            document.getElementById("additionalInformationTitle").innerHTML = data.jobAd.sections.additionalInformation.title;
            document.getElementById("additionalInformation").innerHTML = data.jobAd.sections.additionalInformation.text;
            document.getElementById("apply").href = data.applyUrl;

        });
    }

    getData();

})