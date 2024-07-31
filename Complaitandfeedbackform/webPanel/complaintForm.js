let submitForm = document.getElementById("submitForm");

let username = document.getElementById("username");

// let mobileNumber = document.getElementById("mobileNumber");

let images = document.getElementById("photoUpload");  

let locationInput = document.getElementById("inputLocation");

let areaInput = document.getElementById("inputArea");

let description = document.getElementById("description");

console.log('JavaScript is running!');   

  

let xhr_get_locationDropdown = new XMLHttpRequest();
    xhr_get_locationDropdown.onload = function () {
        if (xhr_get_locationDropdown.status >= 200 && xhr_get_locationDropdown.status < 300) {
          console.log("------get dropdown data--------------------------------");
            let locationDropdownData = JSON.parse(this.responseText);

            let locationDropdownList = locationDropdownData.data.Location;
            let dropdown = locationInput;
                 
            locationDropdownList.forEach((valueItem) => {
                const option = document.createElement("option");
                option.value = valueItem.id;
                option.textContent = valueItem.name;   

                dropdown.appendChild(option);  
            });
        } else {
            console.error('Failed to fetch data');
        }
    };

    xhr_get_locationDropdown.onerror = function () {
        console.error('Request failed');
    };

    xhr_get_locationDropdown.open("GET", getLocation);
    xhr_get_locationDropdown.send();
      

//---------location wise area dropdown----------//
locationInput.onchange = function () {
  let locationId = locationInput.value;

  let xhr_get_locationAreaDropdown = new XMLHttpRequest();
  xhr_get_locationAreaDropdown.onload = function () {
      if (xhr_get_locationAreaDropdown.status >= 200 && xhr_get_locationAreaDropdown.status < 300) {
        console.log("--------- area dropdown -----------------------------------");
          let locationAreaDropdownData = JSON.parse(this.responseText);
          let locationAreaDropdownList = locationAreaDropdownData.data.LocationChecklist;
          let dropdown = areaInput;

          dropdown.innerHTML = ""; // Clear existing options
          
          locationAreaDropdownList.forEach((valueItem) => {
              const option = document.createElement("option");
              option.value = valueItem.area;
              option.textContent = valueItem.area;
              dropdown.appendChild(option);
          });
      } else {
          console.error('Failed to fetch area data');
      } 
  };  

  xhr_get_locationAreaDropdown.onerror = function () {
      console.error('Request failed');
  };

  xhr_get_locationAreaDropdown.open("GET", `${getLocationWiseArea}?location_id=${locationId}`);
  xhr_get_locationAreaDropdown.send();
};



submitForm.addEventListener("click", function () {

  console.log("--------------------------------------------");  

  let regexName = /([0-9a-zA-Z]{1,500})/;
  const valueName = username.value.replace(/&/, "%26");

  // let regexMobile = /([0-9]{1,13})/;
  // const valueMobile = mobileNumber.value.replace(/&/, "%26");

  let regexLocation = /([0-9a-zA-Z]{1,500})/;
  const valueLocation  = locationInput.value.replace(/&/, "%26");

  let regexArea = /([0-9a-zA-Z]{1,500})/;
  const valueArea  = areaInput.value.replace(/&/, "%26");

  let regexDescription = /([0-9a-zA-Z]{1,500})/;
  const valueDescription = description.value.replace(/&/, "%26");

  const addImage = images.files[0];

  if (!regexName.test(valueName)) {
    alert("Please Enter Name");
  } 
  //  else if (!regexMobile.test(valueMobile)) {
  //   alert("Please Enter Valid MobileNumber");
  // } 
  else if (!regexLocation.test(valueLocation)) {
    alert("Please Enter location");
  } else if (!regexDescription.test(valueDescription)) {
    alert("Please Enter description");
  }  else {

    
   
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>"); 
    console.log(`name: ${valueName}`);    
    console.log(`location_id: ${valueLocation}`);    
    console.log(`area: ${valueArea}`);     
    console.log(`photo: ${addImage.name}`);    
    console.log(`description: ${valueDescription}`);     
    console.log(`ticket_type: By User`);    

    // Serialize the form data into an object
    const formData = new FormData(); 
    formData.append('name', valueName);
    formData.append('location_id', valueLocation);
    formData.append('area', valueArea);  
    formData.append('photo', addImage);      
    formData.append('description', valueDescription);   
    formData.append('ticket_type', 'By User');   
    
    const xhr = new XMLHttpRequest();   
    xhr.open('POST', 'http://13.126.168.56:7000/api/ticket/add-ticket/');
    xhr.send(formData);

    xhr.onreadystatechange = function () { 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // API request was successful
                console.log('API Response:', xhr.responseText);
                // Optionally, handle the response as needed
            } else {
                // Handle API errors here
                console.error('API request error:', xhr.status, xhr.statusText);
            }
        }
    };

  }
});