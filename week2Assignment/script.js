
// -------------------------- Functions ---------------------------------------


// Data supposed to be in the FormData object which is made when data is posted to the api

//The function should have the link and maybe more data
function addRow(link) {

	let aRow = document.createElement("tr");

	let tableDataOne = document.createElement("td");
	tableDataOne.innerHTML = "<img src='" + link + "'>";

	aRow.appendChild(tableDataOne);
	//let tableDataTwo = document.createElement("td");

	let gal = document.getElementById("Gallery");
	gal.appendChild(aRow);
}


//-------------------Posting the data----------------- 

let countNum = 0;

//Preventing the page from reloading after the submit button is clicked
let form = document.getElementById('form');


// Add an event listener to the form to handle the submission
form.addEventListener('submit', function(event) {
    event.preventDefault();

    countNum += 1;

    // Get the textarea values from the submit button
    let image = document.querySelector('textarea[name="image"]').value;
    let author = document.querySelector('textarea[name="author"]').value;
    let alt = document.querySelector('textarea[name="alt"]').value;
    let tags = document.querySelector('textarea[name="tags"]').value;
    let description = document.querySelector('textarea[name="description"]').value;

    // Create a FormData object to store the form data
    var formData = new FormData();
    formData.append('imageUrl' + countNum, image);
    formData.append('author' + countNum, author);
    formData.append('alt' + countNum, alt);
    formData.append('tags' + countNum, tags);
    formData.append('description' + countNum, description);
    

    console.log(" formData is: " + formData);
    
    // Send the request
    fetch('https://wt.ops.labs.vu.nl/api23/1d6a86bc', {
        method: 'POST',
        body: formData
    })
    .then(response => {
    	if (response.status === 200){
    		return response.text();
    	} else{
    		throw new Error("Request failed: " + response.status);
    	}
    })

    .then(data => {
        console.log(data);
        addRow(data.image); //Add name, alt, tags ...
    })

    .catch(error => {
        console.error(error);
    });
});






