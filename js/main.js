var siteName = document.getElementById("SiteName");
var siteUrl = document.getElementById("SiteUrl");
var alert = document.getElementById("popUp");
var closeBtn = document.getElementById("close-btn");

var siteList;

console.log(localStorage.getItem("siteList"));
if (localStorage.getItem("siteList") == null) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem("siteList"));
  displaySite(siteList);
}

function addSite() {
  var site = {
    name: siteName.value,
    url: siteUrl.value,
  };

  if (
    ValidateSiteName(siteName.value) == true &&
    nameChecker(siteName.value) == false &&
    ValidUrl(siteUrl.value) == true
  ) {
    siteList.push(site);
    displaySite(siteList);
    localStorage.setItem("siteList", JSON.stringify(siteList));
    clearform();
  } else {
    alert.classList.replace("d-none", "d-flex");
  }
}

closeBtn.addEventListener("click", closeAlert);

function closeAlert() {
  alert.classList.replace("d-flex", "d-none");
}

function clearform() {
  siteName.value = "";
  siteUrl.value = "";
}

function deleteSite(index) {
  console.log("deleted");
  siteList.splice(index, 1);
  console.log(siteList);
  localStorage.setItem("siteList", JSON.stringify(siteList));
  displaySite(siteList);
}

function viewSite(index) {
  window.open(siteList[index].url);
}

function displaySite(list) {
  var cartona = ``;
  for (var i = 0; i < list.length; i++) {
    cartona += ` <tr>
    <td>${i + 1}</td>
    <td>${list[i].name}</td>
    <td><button onclick="viewSite(${i})" class="input-btn"><i class="fa fa-eye"> Visit</i></button></td>
    <td><button onclick="deleteSite(${i})" class="input-btn-del"><i class="fa fa-trash-can"> Delete</i></button></td>

</tr>`;
  }
  document.getElementById("tBody").innerHTML = cartona;
}

function ValidateSiteName() {
  var regex = /^[A-Z][a-z]{3,}$/;
  if (regex.test(siteName.value)) {
    siteName.style = "border:3px solid green";
    return true;
  } else {
    siteName.style = "border:3px solid red";
    return false;
  }
}

function ValidUrl() {
  var regex =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  if (regex.test(siteUrl.value)) {
    siteUrl.style = "border35px solid green";

    return true;
  } else {
    siteUrl.style = "border:3px solid red";
    return false;
  }
}

function nameChecker(name) {
  var existed = false;
  for (var i = 0; i < siteList.length; i++) {
    if (name == siteList[i].name) {
      existed = true;
    } else {
      existed = false;
    }
  }
  return existed;
}
