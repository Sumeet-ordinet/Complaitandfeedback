let submitForm = document.getElementById("submitForm");

let username = document.getElementById("username");
 
let mobileNumber = document.getElementById("mobileNumber");

let locationInput = document.getElementById("inputLocation");

let areaInput = document.getElementById("inputArea");  

let description = document.getElementById("description");

console.log('JavaScript is running!');


//--------------------  location dropdown ----------------------------------------------------------------------

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


//--------- location wise area dropdown ----------------------------------------------------------------

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



//-------- smile face ---------------------------------------------------------------------------------------
// document.querySelectorAll('.feedback li').forEach(entry => entry.addEventListener('click', e => {
//     if (!entry.classList.contains('active')) {
//         document.querySelector('.feedback li.active').classList.remove('active');
//         entry.classList.add('active');
        
//         // Get the selected smiley face
//         const selectedSmiley = entry.classList[0]; // Assumes the smiley face class is the first class in the class list
//         console.log("Selected smiley:", selectedSmiley);
//     }
//     e.preventDefault();
// }));
 

document.querySelectorAll('.feedback li').forEach(entry => entry.addEventListener('click', e => {
    if (!entry.classList.contains('active')) {
        document.querySelector('.feedback li.active').classList.remove('active');
        entry.classList.add('active');
        
        // Get the selected smiley face
        const selectedSmiley = entry.dataset.text;
        console.log("Selected smiley:", selectedSmiley);
    }  
   
    e.preventDefault();
})); 
 


// For the first set of smiley faces
document.querySelectorAll('#question1 .feedback li').forEach(entry => {
    entry.addEventListener('click', e => {
        const isActive = entry.classList.contains('active');
        document.querySelector('#question1 .feedback li.active').classList.remove('active');
        if (!isActive) {
            entry.classList.add('active');
            const selectedSmiley = entry.dataset.text;
            console.log("Selected smiley (Set 1):", selectedSmiley);
        }
        e.preventDefault();
    });
});


   

    

///-----------------------------------------------------------------------

submitForm.addEventListener('click', function() {

    let regexName = /([0-9a-zA-Z]{1,500})/;
    const valueName = username.value.replace(/&/, "%26"); 

    let regexMobile = /([0-9a-zA-Z]{1,500})/;
    const valueMobile = username.value.replace(/&/, "%26");  
    
    let regexLocation = /([0-9a-zA-Z]{1,500})/;
    const valueLocation  = locationInput.value.replace(/&/, "%26");

    let regexArea = /([0-9a-zA-Z]{1,500})/;
    const valueArea  = areaInput.value.replace(/&/, "%26");

    const valueDescription = description.value;


    const questions = document.querySelectorAll('.question');
    const data = [];

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>"); 
    console.log(`name: ${valueName}`);
    console.log(`mobile_number: ${valueMobile}`);
    console.log(`location: ${valueLocation}`);
    console.log(`area: ${valueArea}`);
    console.log(`description: ${valueDescription}`);
    console.log(`questions1: ${questions}`);
    console.log(`answers1: ${rating}`);
    console.log(`questions2: ${questions}`);
    console.log(`answers2: ${rating}`);
    console.log(`questions3: ${questions}`);
    console.log(`answers3: ${rating}`);
    console.log(`questions4: ${questions}`);
    console.log(`answers4: ${rating}`);
    console.log(`questions5: ${questions}`);  
    console.log(`answers5: ${rating}`);


        data.push({
            "name": valueName,
            "mobile_number" : valueMobile,
            "location": valueLocation,
            "area": valueArea ,
            "description": valueDescription, 
            "questions": questionText,
            "answers": rating
        });
   

    // Post data to API
    postDataToApi(data);
});

function postDataToApi(data) {
    // Replace 'API_URL' with the actual endpoint URL
    const apiUrl = addUserFeedback;
 
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('API Response:', data);
        // Handle response if needed
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        // Handle error
    });
}




///------------- Star rating code ----------------------------------------------------------------

// Star rating event listeners remain the same
// const starRatingContainers = document.querySelectorAll('.star-rating');

// starRatingContainers.forEach(container => {
//     const stars = container.querySelectorAll('.star');

//     stars.forEach((star, index) => {
//         star.addEventListener('click', function() {
//             const rating = parseInt(this.getAttribute('data-rating'));
//             const parentQuestion = this.closest('.question');
//             const answerInput = parentQuestion.querySelector('.answer-input');
        
//             if (answerInput) {
//                 answerInput.value = rating;

//                 // Remove 'active' class from all stars
//                 stars.forEach(s => s.classList.remove('active'));
//                 console.log(stars);  
//                 console.log(rating);
//                 console.log(parentQuestion); 
//                 console.log(answerInput);
//                 // Add 'active' class to stars up to the clicked star
//                 for (let i = 0; i <= index; i++) {
//                     stars[i].classList.add('active');
//                 }
//             } else {
//                 console.error('Answer input not found in container:', container);
//             }
//         });
//     });
// });



// // JavaScript
// const starRatingContainers = document.querySelectorAll('.star-rating');

// starRatingContainers.forEach(container => {
//     const stars = container.querySelectorAll('.star');

//     stars.forEach((star, index) => {
//         star.addEventListener('click', function() {
//             const rating = parseInt(this.getAttribute('data-rating'));
//             const parentQuestion = this.closest('.question');
//             const answerInput = parentQuestion.querySelector('.answer-input');

//             console.log('Parent Question:', parentQuestion);
//             console.log('Answer Input:', answerInput);

//             if (answerInput) {
//                 answerInput.value = rating;

//                 // Remove 'active' class from all stars
//                 stars.forEach(s => s.classList.remove('active'));

//                 // Add 'active' class to stars up to the clicked star
//                 for (let i = 0; i <= index; i++) {
//                     stars[i].classList.add('active');
//                 }
//             } else {
//                 console.error('Answer input not found in container:', container);
//             }
//         });
//     });
// });










submitForm.addEventListener("click", function () {

  console.log("--------------------------------------------");  

  let regexName = /([0-9a-zA-Z]{1,500})/;
  const valueName = username.value.replace(/&/, "%26");

  let regexMobile = /([0-9]{1,13})/;
  const valueMobile = mobileNumber.value.replace(/&/, "%26");

  let regexLocation = /([0-9a-zA-Z]{1,500})/;
  const valueLocation  = locationInput.value.replace(/&/, "%26");

  let regexDescription = /([0-9a-zA-Z]{1,500})/;
  const valueDescription = description.value.replace(/&/, "%26");




  if (!regexName.test(valueName)) {
    alert("Please Enter Name");
  }  else if (!regexMobile.test(valueMobile)) {
    alert("Please Enter Valid MobileNumber");
  } else if (!regexLocation.test(valueLocation)) {
    alert("Please Enter location");
  } else if (!regexDescription.test(valueDescription)) {
    alert("Please Enter description");
  }  else {
    
   
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>"); 
    console.log(`user_name: ${valueName}`);    
    console.log(`mobile_number: ${valueMobile}`);    
    console.log(`location: ${valueLocation}`);    
    console.log(`description: ${valueDescription}`);      
 
    // Serialize the form data into an object 
    const formData = new FormData();
    formData.append('user_name', valueName);
    formData.append('mobile_number', valueMobile);
    formData.append('location', valueLocation); 
    formData.append('description', valueDescription);  
  
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://13.126.168.56:7000/api/userfeedback/add-userfeedback/');
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