let submitForm = document.getElementById("submitForm");

let username = document.getElementById("username");
 
let mobileNumber = document.getElementById("mobileNumber");

let locationInput = document.getElementById("inputLocation");

let areaInput = document.getElementById("inputArea");  

let description = document.getElementById("description");
let organization = document.getElementById("organization");

console.log('JavaScript is running!');


//--------------------  location dropdown ----------------------------------------------------------------------

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}



// Get parameters from the URL


// Log the parameters for debugging




// Function to get query parameter value by name
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


//------------------by client id-----------------------//



function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Fetch clientId from the URL
const clientId = getQueryParam('client_id');

if (clientId) {
    console.log(`clientId retrieved: ${clientId}`);
    fetchQuestions(clientId);
} else {
    console.error("clientId is missing from the URL");
}

      let que = [];

function fetchQuestions(clientId) {
    if (!clientId) {
        console.error("clientId is required");
        return;
    }

    const getQuestionsUrl = `http://13.127.117.53:4000/question/get-question_by_client/?client_id=${clientId}`;
    let xhr = new XMLHttpRequest();

//     xhr.onload = function () {
//         if (xhr.status >= 200 && xhr.status < 300) {
//             let questionsData = JSON.parse(this.responseText);
//             let questionsList = questionsData.data;

//             // Create a questions array
      
//             questionsList.forEach(d => que.push(d.question));

//             let questionsContainer = document.getElementById("questionsContainer");

//             questionsContainer.innerHTML = '';

//             questionsList.forEach((questionItem, index) => {
//                 const questionContainer = document.createElement("div");
//                 questionContainer.className = "question-container";

//                 const questionLabel = document.createElement("div");
//                 questionLabel.className = "question-label";
//                 questionLabel.textContent = `Question ${index + 1}:`;

//                 const questionText = document.createElement("div");
//                 questionText.className = "question-text";
//                 questionText.textContent = questionItem.question;

//                 questionContainer.appendChild(questionLabel);
//                 questionContainer.appendChild(questionText);

//                 // Append the emoji feedback section
//                 const feedbackList = document.createElement("ul");
//                 feedbackList.className = "feedback";
//                 feedbackList.id = `question${index + 1}`;

//                 const feedbackEmojis = [
//                     { class: "angry", text: "Very Bad" },
//                     { class: "sad", text: "Bad" },
//                     { class: "ok", text: "Good" },
//                     { class: "good", text: "Very Good" },
//                     { class: "happy", text: "Excellent" }
//                 ];

//                 feedbackEmojis.forEach(feedback => {
//                     const feedbackItem = document.createElement("li");
//                     feedbackItem.className = feedback.class;
//                     feedbackItem.dataset.text = feedback.text;

//                     const feedbackDiv = document.createElement("div");
//                     feedbackItem.appendChild(feedbackDiv);

//                     feedbackList.appendChild(feedbackItem);
//                 });

//                 questionContainer.appendChild(feedbackList);

//                 // Append the feedback text options
//                 const feedbackTextContainer = document.createElement("div");
//                 feedbackTextContainer.id = `selectedText${index + 1}`;
//                 feedbackTextContainer.style = "margin-left: 5%; margin-right: 20%; display: flex; justify-content: space-evenly;";

//                 feedbackEmojis.forEach(feedback => {
//                     const textOption = document.createElement("span");
//                     textOption.className = "text-option";
//                     textOption.style.fontSize = "10px";
//                     textOption.textContent = feedback.text;
//                     feedbackTextContainer.appendChild(textOption);
//                 });

//                 questionContainer.appendChild(feedbackTextContainer);
//                 questionsContainer.appendChild(questionContainer);
//             });

//             // Add event listeners for the feedback selection
//             document.querySelectorAll('.feedback li').forEach(entry => {
//                 entry.addEventListener('click', e => {
//                     if (!entry.classList.contains('active')) {
//                         const parentUl = entry.closest('ul');
//                         parentUl.querySelector('.active')?.classList.remove('active');
//                         entry.classList.add('active');
//                     }
//                     e.preventDefault();
//                 });
//             });
//         } else {
//             console.error('Failed to fetch data');
//         }
//     };

//     xhr.onerror = function () {
//         console.error('Request failed');
//     };

//     xhr.open("GET", getQuestionsUrl);
//     xhr.send();
// }

xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        let questionsData = JSON.parse(this.responseText);
        let questionsList = questionsData.data;

        // Create a questions array
        questionsList.forEach(d => que.push(d.question));

        let questionsContainer = document.getElementById("questionsContainer");

        questionsContainer.innerHTML = '';

        questionsList.forEach((questionItem, index) => {
            const questionContainer = document.createElement("div");
            questionContainer.className = "question-container";

            const questionLabel = document.createElement("div");
            questionLabel.className = "question-label";
            questionLabel.textContent = `Question ${index + 1}:`;

            const questionText = document.createElement("div");
            questionText.className = "question-text";
            questionText.textContent = questionItem.question;

            questionContainer.appendChild(questionLabel);
            questionContainer.appendChild(questionText);

            // Append the emoji feedback section
            const feedbackList = document.createElement("ul");
            feedbackList.className = "feedback";
            feedbackList.id = `question${index + 1}`;

            const feedbackEmojis = [
                { class: "angry", text: "Very Bad" },
                { class: "sad", text: "Bad" },
                { class: "ok", text: "Good" },
                { class: "good", text: "Very Good" },
                { class: "happy", text: "Excellent" }
            ];

            feedbackEmojis.forEach(feedback => {
                const feedbackItem = document.createElement("li");
                feedbackItem.className = feedback.class;
                feedbackItem.dataset.text = feedback.text;

                const feedbackDiv = document.createElement("div");
                
                if (feedback.class !== 'ok') {
                    const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    leftEye.classList.add("eye", "left");
                    const useLeftEye = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    useLeftEye.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#eye");
                    leftEye.appendChild(useLeftEye);
                    feedbackDiv.appendChild(leftEye);

                    const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    rightEye.classList.add("eye", "right");
                    const useRightEye = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    useRightEye.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#eye");
                    rightEye.appendChild(useRightEye);
                    feedbackDiv.appendChild(rightEye);
                }

                if (feedback.class !== 'ok') {
                    const mouth = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    mouth.classList.add("mouth");
                    const useMouth = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    useMouth.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#mouth");
                    mouth.appendChild(useMouth);
                    feedbackDiv.appendChild(mouth);
                }

                feedbackItem.appendChild(feedbackDiv);
                feedbackList.appendChild(feedbackItem);
            });

            questionContainer.appendChild(feedbackList);

            // Append the feedback text options
            const feedbackTextContainer = document.createElement("div");
            feedbackTextContainer.id = `selectedText${index + 1}`;
            feedbackTextContainer.style = "margin: 4px -45px 4px 22px; display: flex; justify-content: space-evenly;";

            feedbackEmojis.forEach(feedback => {
                const textOption = document.createElement("span");
                textOption.className = "text-option";
                textOption.style.fontSize = "13px";
                textOption.textContent = feedback.text;
                feedbackTextContainer.appendChild(textOption);
            });

            questionContainer.appendChild(feedbackTextContainer);
            questionsContainer.appendChild(questionContainer);
        });

        // Add event listeners for the feedback selection
        document.querySelectorAll('.feedback li').forEach(entry => {
            entry.addEventListener('click', e => {
                if (!entry.classList.contains('active')) {
                    const parentUl = entry.closest('ul');
                    parentUl.querySelector('.active')?.classList.remove('active');
                    entry.classList.add('active');
                }
                e.preventDefault();
            });
        });
    } else {
        console.error('Failed to fetch data');
    }
};

xhr.onerror = function () {
    console.error('Request failed');
};

xhr.open("GET", getQuestionsUrl);
xhr.send();
}


// let que = [];
// function fetchQuestions(clientId) {
//     const getQuestionsUrl = `http://13.127.117.53:4000/question/get-question_by_client/?client_id=${clientId}`;

//     let xhr = new XMLHttpRequest();

//     xhr.onload = function () {
//         if (xhr.status >= 200 && xhr.status < 300) {
//             let questionsData = JSON.parse(this.responseText);
//             let questionsList = questionsData.data;

//             questionsData.data.forEach(d => que.push(d.question))

//             let questionsContainer = document.getElementById("questionsContainer");

//             questionsContainer.innerHTML = '';

//             questionsList.forEach((questionItem, index) => {
//                 const questionContainer = document.createElement("div");
//                 questionContainer.className = "question-container";

//                 const questionLabel = document.createElement("div");
//                 questionLabel.className = "question-label";
//                 questionLabel.textContent = `Question ${index + 1}:`;

//                 const questionText = document.createElement("div");
//                 questionText.className = "question-text";
//                 questionText.textContent = questionItem.question;

//                 questionContainer.appendChild(questionLabel);
//                 questionContainer.appendChild(questionText);

//                 // Append the emoji feedback section
//                 const feedbackList = document.createElement("ul");
//                 feedbackList.className = "feedback";
//                 feedbackList.id = `question${index + 1}`;

//                 // Define static emojis and their corresponding text
//                 const feedbackEmojis = [
//                     { emoji: "😡", text: "Very Bad" },
//                     { emoji: "😞", text: "Bad" },
//                     { emoji: "😐", text: "Okay" },
//                     { emoji: "😊", text: "Good" },
//                     { emoji: "😍", text: "Excellent" }
//                 ];

//                 feedbackEmojis.forEach(feedback => {
//                     const feedbackItem = document.createElement("li");
//                     feedbackItem.dataset.text = feedback.text;

//                     const feedbackDiv = document.createElement("div");
//                     feedbackDiv.textContent = feedback.emoji;
//                     feedbackItem.appendChild(feedbackDiv);

//                     feedbackList.appendChild(feedbackItem);
//                 });

//                 questionContainer.appendChild(feedbackList);

//                 // Append the feedback text options
//                 const feedbackTextContainer = document.createElement("div");
//                 feedbackTextContainer.id = `selectedText${index + 1}`;
//                 feedbackTextContainer.style = "margin-left: 5%; margin-right: 20%; display: flex; justify-content: space-evenly;";

//                 feedbackEmojis.forEach(feedback => {
//                     const textOption = document.createElement("span");
//                     textOption.className = "text-option";
//                     textOption.style.fontSize = "10px";
//                     textOption.textContent = feedback.text;
//                     feedbackTextContainer.appendChild(textOption);
//                 });

//                 questionContainer.appendChild(feedbackTextContainer);
//                 questionsContainer.appendChild(questionContainer);
//             });

//             // Add event listeners for the feedback selection
//             document.querySelectorAll('.feedback li').forEach(entry => {
//                 entry.addEventListener('click', e => {
//                     const parentUl = entry.closest('ul');
//                     parentUl.querySelector('.active')?.classList.remove('active');
//                     entry.classList.add('active');
//                     e.preventDefault();
//                 });
//             });
//         } else {
//             console.error('Failed to fetch data');
//         }
//     };

//     xhr.onerror = function () {
//         console.error('Request failed');
//     };

//     xhr.open("GET", getQuestionsUrl);
//     xhr.send();
// }

// // Call the function with a dynamic client_id
// const clientId = 4; // Set this dynamically as needed
// fetchQuestions(clientId);




//---------------------------------------end--------------------------//

   

    

///---------------------feedback added form--------------------------------------------------



const apiUrl = `http://13.127.117.53:4000/userfeedback/add-userfeedback/`;

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get parameters from the URL
// const clientId = getUrlParameter('client_id');
const projectId = getUrlParameter('project_id');
const organizationId = getUrlParameter('organization_id');
// const siteId = getUrlParameter('site_id');

// Function to post data
async function postData() {

    if (
        !areaInput.value.trim() ||
        !username.value.trim() ||
        !mobileNumber.value.trim() ||
        !description.value.trim() ||
        !inputLocation.value.trim() ||
        !document.querySelector('.feedback li.active')
    ) {
        alert('Please fill in all the fields.');
        return;
    }


    let ans = [];
 
    
    document.querySelectorAll('.feedback li').forEach(entry => {
        if (entry.classList.contains('active')) {
        
                ans.push(entry.dataset.text);
        }
    });
    
    console.log(ans);
    const data = {
        'area': areaInput.value,
        'name': username.value,
        'mobile_number': mobileNumber.value, 
        'description': description.value,
        'organization': organizationId,
        'location': parseInt(inputLocation.value), 
        'sites': siteId,
        'project': projectId, 
        'questions': que,
        'answers': ans,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(data) // Convert data object to JSON string
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the response JSON if needed
        const responseData = await response.json();
        console.log('Response data:', responseData);
        alert('feedback added successfully!');
        window.location.reload();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Call the function to post data
document.getElementById('submitForm').addEventListener('click', function() {
    postData();
});





document.getElementById('backButton').addEventListener('click', function() {
                  // Replace with the actual site ID

    window.location.href = `http://13.127.117.53/Complaitandfeedbackform/?oi=${organizationId}&ci=${clientId}&pi=${projectId}&si=${siteId}`;
});


    




