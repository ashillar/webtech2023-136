//-------------------------------- Functions -----------------------------------
//The function should have the link and more data
function addRow(link, author, alt, tags, description) {

    let aRow = document.createElement("tr");

    let tableDataOne = document.createElement("td");
    tableDataOne.innerHTML = "<img src='" + link + "'>";

    aRow.appendChild(tableDataOne);

    let tableDataTwo = document.createElement("td");
    tableDataTwo.innerHTML = "<p>Author: " + author + "</p>" + "<p>Alt: " + alt + "</p>" + "<p>Tags: " + tags + "</p>" + "<p>Description: " + description + "</p>";

    aRow.appendChild(tableDataTwo);

    let gal = document.getElementById("Gallery");
    gal.appendChild(aRow);
}



//-------------------Posting the data-----------------

let countNum = 0;

//Preventing the page from reloading after the submit button is clicked
let form = document.getElementById('form');


// Add an event listener to the form to handle the submission
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    countNum += 1;
    
    // Get the textarea values from the submit button
    let image = document.querySelector('input[name="image"]').value;
    let author = document.querySelector('input[name="author"]').value;
    let alt = document.querySelector('input[name="alt"]').value;
    let tags = document.querySelector('input[name="tags"]').value;
    let description = document.querySelector('textarea[name="description"]').value;

    // Validate the data before sending the request
    if (!image) {
        alert("Image is required");
        return;
    }

    if (!author) {
        alert("Author is required");
        return;
    }

    if (!alt) {
        alert("Alt is required");
        return;
    }

    if (!tags) {
        alert("Tags is required");
        return;
    }

    if (!description) {
        alert("Description is required");
        return;
    }

    // Create a FormData object to store the form data
    var formData = new FormData();
    formData.append('imageUrl' + countNum, image);
    formData.append('author' + countNum, author);
    formData.append('alt' + countNum, alt);
    formData.append('tags' + countNum, tags);
    formData.append('description' + countNum, description);
    

    // Send the request
    fetch('https://wt.ops.labs.vu.nl/api23/1d6a86bc', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        addRow(image, author, alt, tags, description); 
    })
    .catch(error => {
        console.error(error);
    });
});








