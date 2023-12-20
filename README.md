# Bookmarker-CRUDS-System
Created with HTML, CSS, Bootstrap and java script

## Main objective
Bookmarker is a CRUDS System to save your favourite links by adding its name and url.

## Design
![design](https://github.com/NoorseenQandil/Bookmarker-CRUDS-System/assets/70522199/3d46aeb3-339f-494a-a119-0cc343e9f10c)

## Features
### 1.User-Friendly Interface:
* The user interface is clean, intuitive, and easy to navigate.
* A visually appealing layout ensures a positive user experience.
  
### 2.Regex:
* Site name validation to ensure that it starts at the beginning of the line, contains only letters (both uppercase and lowercase), hyphens, spaces, and digits, has a length between 3 and 50 characters and ends at the end of the line.
  ```
  var siteNameRegex = /^[A-z-\s0-9]{3,50}$/ 
  ```

* Site URL validation to ensure that it starts at the beginning of the line, contains either "ftp," "http," or "https." (For internet protocols) ,followed by "://", followed by one or more characters that are not a space or a double quote and ends at the end of the line.
  ```
  var siteUrlRegex = /^(ftp|http|https):\/\/[^ "]+$/
  ```

### 3. Warning Alert Message.
* IF the validation processes aren't true, this shows a warning alert message.
![invalid](https://github.com/NoorseenQandil/Bookmarker-CRUDS-System/assets/70522199/b7c84398-5612-4b6a-accc-f13243d07356)

### 4. Oninput Validation 
* While typing data in inputs, the validation message is shown until enter the right data, It will hide.
#### While typing
![validation1](https://github.com/NoorseenQandil/Bookmarker-CRUDS-System/assets/70522199/b43132b2-2ddf-480c-9b70-ccb47562d58e)
#### After typing right data
![validation2](https://github.com/NoorseenQandil/Bookmarker-CRUDS-System/assets/70522199/2bb9673c-fce2-4be6-b2a7-9fb55f2f4bf3)


### 5. Save the entered data.
* Save the entered data in a table and in the local storage too.
  ```
  localStorage.setItem("sites", JSON.stringify(sitesInfo)); 
  ```
  ![localstorage](https://github.com/NoorseenQandil/Bookmarker-CRUDS-System/assets/70522199/291fab2f-1a6f-40cf-a5b4-6c20e285e16e)

### 6. Update data in the table and in the local storage too.
* Update data in the table and in the local storage too.
  ```
  localStorage.setItem("sites", JSON.stringify(sitesInfo)); 
  ```
### 7. Delete Data
* Delete the entered data from the table and from the local storage too.
  ```
  localStorage.setItem("sites", JSON.stringify(sitesInfo));  
  ```
### 8. Undo Delete
* Can retreive the last deleted one to the table and to the local storage too.

### 9. Visit the site
* Depending on the URL attached for the site, Press on visit button to open the site in a new window.

### 10. Real Time Search
* Real Time Search by name. Type any character and the result will include all site name with the typed character.
![search](https://github.com/NoorseenQandil/Bookmarker-CRUDS-System/assets/70522199/f7a1de5d-ef39-42d4-9fb2-2289db31ffc2)

### 11. Clear inputs
* After adding the entered data, clear all inputs.
  
### 12. Responsive Design
* Page design is responsive for all devices.

## Getting Started
1- Clone or download this repository to your local machine.

2- Open the index.html file in a web browser.

## Java script Functions
* Site Name Validation
  ```
  function validateSiteName(){
      var text = siteNameInput.value;
      if( siteNameRegex.test(text) === true){                
          siteNameInput.classList.add("is-valid");            
          siteNameInput.classList.remove("is-invalid");    
          alertName.classList.add("d-none");              
          return true;
      }
      else{                                              
          siteNameInput.classList.add("is-invalid");    
          siteNameInput.classList.remove("is-valid");   
          alertName.classList.remove("d-none");        
          return false;
      }
  }
  ```
  
* Site URL Validation
  ```
  function validateSiteURL(){
      var text = siteUrlInput.value;
      if ( siteUrlRegex.test(text) === true){                   
          siteUrlInput.classList.add("is-valid");              
          siteUrlInput.classList.remove("is-invalid");        
          alertUrl.classList.add("d-none");                 
          return true;
      }
      else{                                                 
          siteUrlInput.classList.add("is-invalid");            
          siteUrlInput.classList.remove("is-valid");           
          alertUrl.classList.remove("d-none");                
          return false;
      }
  }
  ```

* Addition
  ```
  function addSiteInfo(){
    if ( validateSiteName() === true && validateSiteURL() === true ){    
        var siteData = {                                             
            name: siteNameInput.value, 
            url: siteUrlInput.value
        };

        sitesInfo.push(siteData);                                       
        localStorage.setItem("sites", JSON.stringify(sitesInfo));       
        
        displayData();     // display push result
        clearInputs();     // Clear inputs from data
    }
    else{
        document.getElementById("layer").classList.remove("d-none");     
        document.getElementById("boxAlert").classList.remove("d-none");
  }
}
  ```

* Display
  ```
  function displayData(){
    var item = " ";      
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
  ```

* Clear
  ```
  function clearInputs(){
    siteNameInput.value = " ";
    siteUrlInput.value = " ";
    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");
}
  ```

* Update
  ```
  function sitUpdates(index) {
    var deletbtn = document.getElementById("delete" + index); 
    indexUpdate = index;                      
    var chosenSite = sitesInfo[index];      
    
    siteNameInput.value = chosenSite.name;      
    siteUrlInput.value = chosenSite.url;        
    updateBtn.classList.remove("d-none");  
    addBtn.classList.add("d-none");        
    deletbtn.classList.add("disabled");    
}
function doneUpdate(){
        if (validateSiteName() === true && validateSiteURL() === true) { 
            var siteData = {                                             
                name: siteNameInput.value, 
                url: siteUrlInput.value
            };
  
            sitesInfo.splice(indexUpdate, 1, siteData);                    
            localStorage.setItem("sites", JSON.stringify(sitesInfo));     
  
            displayData();                                             
            updateBtn.classList.add("d-none");                       
            addBtn.classList.remove("d-none");                      
            clearInputs();                                               
    }
        else {
              document.getElementById("layer").classList.remove("d-none");                 
              document.getElementById("boxAlert").classList.remove("d-none");              
        }
}
  ```

* Delete
  ```
  function deleteData(index) {
    deletedItem = sitesInfo.splice(index, 1);                      
    localStorage.setItem("sites", JSON.stringify(sitesInfo));     
    displayData();
    deleteBtn.classList.remove("d-none");
    return deletedItem;
}
  ```

* Undo
  ```
  function undoDelete() {
    var x = deletedItem[0];                                       
    sitesInfo.push(x);                                           
    localStorage.setItem("sites", JSON.stringify(sitesInfo));   
    displayData();                                             
    deleteBtn.classList.add("d-none");                      
}
  ```

* Search
  ```
  function searchWebsite(){
    var term = searchInput.value; 
    var item = " ";      
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
  ```

* Exit the alert
  ```
  function exit() {
    document.getElementById("layer").classList.add("d-none");         
    document.getElementById("boxAlert").classList.add("d-none");    
}
  ```

## Live Demo
Experience the Tabs Project in action! Click the link below to access the live demo:

[Live Demo] (https://noorseenqandil.github.io/Bookmarker-CRUDS-System/)

Feel free to interact with the project, browse through different jobs, and explore the user-friendly interface. The live demo provides a hands-on experience to see the Tabs Project in action.

## Contributing
If you have suggestions or find issues with the template, feel free to open an issue or create a pull request. Contributions are welcome!

## Contact
If you have any questions, feedback, or suggestions, please feel free to reach out to us at NourseenQandil@gmail.com We value your input and would love to hear from you!
