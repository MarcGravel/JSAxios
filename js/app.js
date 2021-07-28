//Event listener button for random activity.
document.getElementById('randomBtn').addEventListener('click', randomActivity);

//random activity request + success and fail functions below
function randomActivity() {
    axios.request({
        method: "GET",
        url: "https://www.boredapi.com/api/activity/"
    }).then(randomSuccess).catch(randomFail);
}

function randomSuccess(response) {
    console.log(response);
    let randomEvent = document.createElement('h2');
    randomEvent.innerText = response.data.activity + ".";
    document.getElementById('randomActivity').append(randomEvent);
}

function randomFail(error) {
    console.log(error);
    document.getElementById('randomActivity').append(document.createElement('h2').innerText = 'Something went wrong. Reload the page. ');
}

//Event listener button for drop down activities.
document.getElementById('dropBtn').addEventListener('click', amountActivity);
// Event Listener to clear drop down warning if applicable
document.getElementById('dropDown').addEventListener('click', clearText);

//function to get amount of participants and then find activity on request to match 
function amountActivity() {
    let dropSelection = document.getElementById('dropDown').value;
    if (dropSelection == ""){
        let userAlert = document.createElement('h2');
        userAlert.setAttribute('id', 'chooseWarning');
        userAlert.style.display = "block";
        userAlert.style.color = "red";
        userAlert.innerText = 'Please make a selection on the drop down'
        document.getElementById('activityAnswers').append(userAlert);
    } else {
        let participantsDynamicURL = "http://www.boredapi.com/api/activity?participants=" + dropSelection;
        console.log(participantsDynamicURL);
        axios.request({
            method: "GET",
            url: participantsDynamicURL 
        }).then(amountSuccess).catch(amountFail);
    }
}

//Success function
function amountSuccess(response) {
    console.log(response);
    let currentEvent = document.createElement('h1');
    currentEvent.innerText = response.data.activity + ".";
    currentEvent.style.display = "block";
    document.getElementById('activityAnswers').append(currentEvent);
    let amtPart = document.createElement('h2');
    amtPart.innerText = `Participants required: ${response.data.participants}`;
    document.getElementById('activityAnswers').append(amtPart);
}

//fail function
function amountFail(error) {
    console.log(error);
    document.getElementById('activityAnswers').append(document.createElement('h2').innerText = 'Something went wrong. Reload the page. ');
}

//clears warning text if applicable 
function clearText() {
    let chooseWarning = document.getElementById('chooseWarning');
    if (chooseWarning != null) {
        chooseWarning.remove();
    }
}