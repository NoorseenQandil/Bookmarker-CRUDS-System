var siteNameInput   = document.getElementById('siteNameInput');
var siteUrlInput    = document.getElementById('siteUrlInput');
var updateBtn       = document.getElementById("updateBtn");
var addBtn          = document.getElementById("submitButton");
var alertName       = document.getElementById("alertName");
var alertUrl        = document.getElementById("alertUrl");
var closeBtn        = document.getElementById("closeBtn");
var deleteBtn       = document.getElementById("deleteBtn");

// Starts at the beginning of the line.
// Contains only letters (both uppercase and lowercase), hyphens, spaces, and digits.
// Has a length between 3 and 50 characters.
// Ends at thend of the line.
var siteNameRegex = /^[A-z-\s0-9]{3,50}$/ 

// Starts at the beginning of the line.
// Contains either "ftp," "http," or "https." (For internet protocols)
// Followed by "://".
// Followed by one or more characters that are not a space or a double quote.
// Ends at the end of the line.
var siteUrlRegex = /^(ftp|http|https):\/\/[^ "]+$/

var sitesInfo = [];    // Array to push in it

var indexUpdate;     // declare variable to get index ###

// Check localStorage has data
if( localStorage.getItem("sites") != null){
    sitesInfo = JSON.parse(localStorage.getItem("sites"))

    // Display data after retrieve it
    displayData()
}

// add sites in local storage and display it 
if (JSON.parse(localStorage.getItem("sites")) != null) {  // check if it null


    sitesInfo = JSON.parse(localStorage.getItem("sites"));  // add from lacal storage to array and display it   
    displayData();
}


// To clear inputs after push data
function clearInputs(){
    siteNameInput.value = " ";
    siteUrlInput.value = " ";
    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");
}

// To validate site name
function validateSiteName(){
    var text = siteNameInput.value;
    if( siteNameRegex.test(text) === true){                // declare validation to text
        siteNameInput.classList.add("is-valid");          //  add class valid  
        siteNameInput.classList.remove("is-invalid");    //  remove class invalid
        alertName.classList.add("d-none");              //  add class none to remove alert 
        return true;
    }
    else{                                               // if it is invalid
        siteNameInput.classList.add("is-invalid");     // add class invalid
        siteNameInput.classList.remove("is-valid");   // remove class is valid
        alertName.classList.remove("d-none");        // remove class none to show alert 
        return false;
    }
}


// To validate site url
function validateSiteURL(){
    var text = siteUrlInput.value;
    if ( siteUrlRegex.test(text) === true){                   // declare validation to text
        siteUrlInput.classList.add("is-valid");              //  add class valid 
        siteUrlInput.classList.remove("is-invalid");        // remove class invalid 
        alertUrl.classList.add("d-none");                 //  add class none to remove alert
        return true;
    }
    else{                                                    // if it is invalid
        siteUrlInput.classList.add("is-invalid");            // add class invalid
        siteUrlInput.classList.remove("is-valid");           // remove class is valid
        alertUrl.classList.remove("d-none");                // remove class none to show alert 
        return false;
    }
}

// To close the alert box 
function exit() {
    document.getElementById("layer").classList.add("d-none");         // Add class to close 
    document.getElementById("boxAlert").classList.add("d-none");     // Add class to close
}

// To add in the array
function addSiteInfo(){
    if ( validateSiteName() === true && validateSiteURL() === true ){    // if entered data is valid
        var siteData = {                                             // create object
            name: siteNameInput.value, 
            url: siteUrlInput.value
        };

        sitesInfo.push(siteData);                                       // Push objects in array
        localStorage.setItem("sites", JSON.stringify(sitesInfo));       // Add in the local storage
        
        displayData();     // display push result
        clearInputs();     // Clear inputs from data
    }
    else{
        document.getElementById("layer").classList.remove("d-none");     // To show box alert
        document.getElementById("boxAlert").classList.remove("d-none"); // To show layer 
  }
}

// To delete the selected row
var deletedItem;
function deleteData(index) {
    deletedItem = sitesInfo.splice(index, 1);                      //remove object from array 
    localStorage.setItem("sites", JSON.stringify(sitesInfo));     // remove from local 
    displayData();
    deleteBtn.classList.remove("d-none");
    return deletedItem;
}


// Restore the deleted item ,undo delete and push if to array and display it  
function undoDelete() {
    var x = deletedItem[0];                                       // declare deleted item
    sitesInfo.push(x);                                           // push it to original array
    localStorage.setItem("sites", JSON.stringify(sitesInfo));   // add to loacal storage
    displayData();                                             // display with removed item again
    deleteBtn.classList.add("d-none");                        // add class to hide undo button 
}


// To display saved data
function displayData(){
    var item = " ";      // box of html element
    for( var i = 0 ; i < sitesInfo.length ; i++ ){
        item += `
        <tr>
        <td>${i}</td>
        <td>${sitesInfo[i].name}</td>
        <td>
                <button id="updateBtn" class="py-1 px-3 btn btn-outline-warning text-capitalize" onclick="sitUpdates(${i})">
                <i class="fa-solid fa-pen"></i> update
                </button>
        </td>
        <td>
                <button id="visitBtn" class="py-1 px-3 btn btn-outline-success text-capitalize" onclick="visitSite()">
                <i class="fa-regular fa-eye"></i><a href="${sitesInfo[i].url}" target="_blank" class="text-success"> visit
                </button>
        </td>
        <td>
                <button id="delete${i}" class="deleteBtn py-1 px-3 btn btn-outline-danger text-capitalize" onclick="deleteData(${i})">
                <i class="fa-solid fa-trash"></i> delete
                </button>
        </td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = item;
}


// Search Function
function searchWebsite(){
    var term = searchInput.value; // catch the search input value
    var item = " ";      // box of html element
    for( var i = 0 ; i < sitesInfo.length ; i++ ){
        // check
        if( sitesInfo[i].name.toLowerCase().includes (term.toLowerCase() ) ){
        item += `
        <tr>
        <td>${i + 1}</td>
        <td>${sitesInfo[i].name}</td>
        <td>
                <button class="py-1 px-3 btn btn-outline-warning text-capitalize" onclick="sitUpdates(${i})">
                <i class="fa-solid fa-pen"></i> update
                </button>
        </td>
        <td>
                <button class="py-1 px-3 btn btn-outline-success text-capitalize" onclick="visitSite()">
                <i class="fa-regular fa-eye"></i><a href="${sitesInfo[i].url}" target="_blank" class="text-success"> visit
                </button>
        </td>
        <td>
                <button id="delete${i}" class="py-1 px-3 btn btn-outline-danger text-capitalize" onclick="deleteData(${i})">
                <i class="fa-solid fa-trash"></i> delete
                </button>
        </td>
        </tr>
        `
    }
}
    document.getElementById('tbody').innerHTML = item;
}


// To update data
function sitUpdates(index) {
    var deletbtn = document.getElementById("delete" + index); // declare button who need te disabled
    indexUpdate = index;                      // assign index to use it in doneUpdate ###
    var chosenSite = sitesInfo[index];      // declare site who need to update  ###
    
    siteNameInput.value = chosenSite.name;      // display site name to input and update it ###
    siteUrlInput.value = chosenSite.url;        // display site url to input and update it ###
    updateBtn.classList.remove("d-none");  // remove class from btn to show it ###
    addBtn.classList.add("d-none");        // add class to btn to remove it ###
    deletbtn.classList.add("disabled");    // add class to button to disabled it ###
}


// To update and replace with the new data
function doneUpdate(){
        if (validateSiteName() === true && validateSiteURL() === true) { // if validate true 
            var siteData = {                                             // same object with replace
                name: siteNameInput.value, 
                url: siteUrlInput.value
            };
  
            sitesInfo.splice(indexUpdate, 1, siteData);                    // remove old and add new data
            localStorage.setItem("sites", JSON.stringify(sitesInfo));     // override with update to loacal storage 
  
            displayData();                                            // display data after update 
            updateBtn.classList.add("d-none");                       // add class from btn to show it 
            addBtn.classList.remove("d-none");                      // remove class to btn to remove it 
            clearInputs();                                               // clear fields after update 
    }
        else {
              document.getElementById("layer").classList.remove("d-none");                 // show box alert
              document.getElementById("boxAlert").classList.remove("d-none");              // show layer 
        }
}
