//-------------------Testing----------------------

console.log("This is the testing area");



//-------------------------------- Functions -----------------------------------
//The function should have the link and more data
function addRow(link, author, alt, tags, description) {

    let aRow = document.createElement("tr");

    let tableDataOne = document.createElement("td");
    tableDataOne.innerHTML = "<img src='" + link + "'>";
    aRow.appendChild(tableDataOne);

    let tableDataTwo = document.createElement("td");
    tableDataTwo.innerHTML = author;
    aRow.appendChild(tableDataTwo);

    let tableDataThree = document.createElement("td");
    tableDataThree.innerHTML = alt;
    aRow.appendChild(tableDataThree);

    let tableDataFour = document.createElement("td");
    tableDataFour.innerHTML = tags;
    aRow.appendChild(tableDataFour);

    let tableDataFive = document.createElement("td");
    tableDataFive.innerHTML = description;
    aRow.appendChild(tableDataFive);

    let gal = document.getElementById("Gallery");
    gal.appendChild(aRow);
}

console.log("function addRow has been checked");

//-------------------Posting the data-----------------

let countNum = 0;

//Preventing the page from reloading after the submit button is clicked
let form = document.getElementById('form');


// Add an event listener to the form to handle the submission
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    countNum += 1;
    
    // Get the textarea values from the submit button There's likely a problem in this area here --> cannot find the input[name="img"] or whatev
    let image = document.querySelector('input[name="image"]').value;
    let author = document.querySelector('input[name="author"]').value;
    let alt = document.querySelector('input[name="alt"]').value;
    let tags = document.querySelector('input[name="tags"]').value;
    let description = document.querySelector('input[name="description"]').value;

    console.log("IMAGE IS " + image);

    console.log("Image" + countNum + " is: " + image + "<<>>");
    console.log("Author" + countNum + " is: " + author + "<<>>");
    console.log("Alt" + countNum + " is: " + alt + "<<>>");
    console.log("tags" + countNum + " is: " + tags + "<<>>");
    console.log("Description" + countNum + " is: " + description);

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

    // Create a JSON object to store the form data
    var formData = {
        imageUrl: image,
        author: author,
        alt: alt,
        tags: tags,
        description: description,
    }


    // Send the request
    fetch('https://wt.ops.labs.vu.nl/api23/1d6a86bc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), //Convert it to json for the server
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







