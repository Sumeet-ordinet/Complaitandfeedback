let submitForm = document.getElementById("submitForm");

let username = document.getElementById("username");

// let mobileNumber = document.getElementById("mobileNumber");

let images = document.getElementById("photoUpload");  

let locationInput = document.getElementById("inputLocation");

let areaInput = document.getElementById("inputArea");

let description = document.getElementById("description");

console.log('JavaScript is running!');   

  

//------get location--------//


function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get parameters from the URL
const clientId = getUrlParameter('ci');
const organizationId = getUrlParameter('oi');



function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Fetch siteId from the URL
const siteId = getQueryParam('site_id');

if (siteId) {
  console.log(`siteId retrieved: ${siteId}`);

  // Function to fetch location data based on siteId
  function fetchLocationData(siteId) {
      const getLocation = `http://13.127.117.53:4000/location/get-locations_site/?site_id=${siteId}`;

      // Create a new XMLHttpRequest object
      let xhr_get_locationDropdown = new XMLHttpRequest();

      // Define the function to be executed when the request is complete
      xhr_get_locationDropdown.onload = function () {
          // Check if the request was successful
          if (xhr_get_locationDropdown.status >= 200 && xhr_get_locationDropdown.status < 300) {
              console.log("------get dropdown data--------------------------------");

              // Parse the JSON response
              let locationDropdownData = JSON.parse(this.responseText);

              // Get the array of location data
              let locationDropdownList = locationDropdownData.data;

              // Get the dropdown element by its ID
              let dropdown = document.getElementById("inputLocation");

              // Clear existing options in the dropdown except the first one
              dropdown.innerHTML = '<option value="">Select location</option>';

              // Loop through the location data and create option elements
              locationDropdownList.forEach((valueItem) => {
                  const option = document.createElement("option");
                  option.value = valueItem.id;
                  option.textContent = valueItem.location_name;

                  // Append the option element to the dropdown
                  dropdown.appendChild(option);
              });
          } else {
              // Log an error message if the request was not successful
              console.error('Failed to fetch data');
          }
      };

      // Define the function to be executed if the request fails
      xhr_get_locationDropdown.onerror = function () {
          console.error('Request failed');
      };

      // Open a GET request to the API endpoint
      xhr_get_locationDropdown.open("GET", getLocation);

      // Send the request
      xhr_get_locationDropdown.send();
  }

  // Add event listener for the focus event on the dropdown
  document.getElementById("inputLocation").addEventListener('focus', function() {
      fetchLocationData(siteId);
  });
} else {
  console.error("siteId is missing from the URL");
}

   

//---------complaint form added----------//

function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Get parameters from the URL

const projectId = getUrlParameter('project_id');

submitForm.addEventListener("click", function () {

  console.log("--------------------------------------------");  

  let regexName = /([0-9a-zA-Z\s]{1,500})/; // Updated regex to include spaces
  const valueName = username.value.trim().replace(/&/, "%26");

  let regexLocation = /([0-9a-zA-Z\s]{1,500})/; // Updated regex to include spaces
  const valueLocation = locationInput.value.trim().replace(/&/, "%26");

  let regexDescription = /([0-9a-zA-Z\s]{1,500})/; // Updated regex to include spaces
  const valueDescription = description.value.trim().replace(/&/, "%26");

  const addImage = images.files[0];
  // const siteValue = parseInt(siteInput.value.trim(), 10); // Convert to integer
  // const projectValue = parseInt(projectInput.value.trim(), 10); // Convert to integer

  if (!regexName.test(valueName)) {
      alert("Please Enter a valid Name");
  } else if (!regexLocation.test(valueLocation)) {
      alert("Please Enter a valid Location");
  } else if (!regexDescription.test(valueDescription)) {
      alert("Please Enter a valid Description");
  } else if (!addImage) {
      alert("Please Upload a Photo");
      
  // } else if (isNaN(siteValue) || siteValue <= 0) {
  //     alert("Please Select a Valid Site");
  // } else if (isNaN(projectValue) || projectValue < 0) {
  //     alert("Please Select a Valid Project");
  } else {

      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>"); 
      console.log(`name: ${valueName}`);    
      console.log(`location: ${valueLocation}`);    
      console.log(`photo: ${addImage.name}`);    
      console.log(`description: ${valueDescription}`);     
      // console.log(`site: ${siteValue}`);    
      // console.log(`project: ${projectValue}`);    

      // Serialize the form data into an object
      const formData = new FormData(); 
      formData.append('name', valueName);
      formData.append('location', valueLocation); // Ensure the field name matches the API expectation
      formData.append('photo', addImage);      
      formData.append('description', valueDescription);   
      formData.append('site', siteId);   // Add site field
      formData.append('project', projectId );   // Add project field
      
      const xhr = new XMLHttpRequest();   
      xhr.open('POST', `http://13.127.117.53:4000/tickets/add-ticket/`);
      xhr.send(formData);

      xhr.onreadystatechange = function () { 
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  // API request was successful
                  console.log('API Response:', xhr.responseText);
                alert('complaint added successfully!');
                window.location.reload();
              } else {
                  // Handle API errors here
                  console.error('API request error:', xhr.status, xhr.statusText);
                  console.error('Response:', xhr.responseText);
              }
          }
      };

  }
});



document.getElementById('backButton').addEventListener('click', function() {
    // Replace with the actual site ID

window.location.href = `http://13.127.117.53/Complaitandfeedbackform/?oi=${organizationId}&ci=${clientId}&pi=${projectId}&si=${siteId}`;
});

