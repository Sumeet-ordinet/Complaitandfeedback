const clientId = 4;
    const projectId = 10;
    const organizationId = 2;
    const siteId = 5;

    // Get button elements
    const complaintButton = document.getElementById('complaintButton');
    const feedbackButton = document.getElementById('feedbackButton');

    // Set onclick event for the buttons
    complaintButton.onclick = function() {
        window.location.href = `Complaint/complaintForm.html?client_id=${clientId}&project_id=${projectId}&organization_id=${organizationId}&site_id=${siteId}`;
    };

    feedbackButton.onclick = function() {
        window.location.href = `feedback/feedbackForm.html?client_id=${clientId}&project_id=${projectId}&organization_id=${organizationId}&site_id=${siteId}`;
    };