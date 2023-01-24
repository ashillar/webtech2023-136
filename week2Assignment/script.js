// Fetch model table data on page load
let authorCount = 0;

fetch("https://wt.ops.labs.vu.nl/api23/54db8963")
  .then(function (response) {
    return response.json();
  })
  .then(function (lists) {
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for (let list of lists) {
      out += `
         <tr> 
          // Improvement for Guideline 1.1
            <td> <img alt='${list.alt}' src='${list.image}'> </td> 
            <td> <button class='author-button' data-author='${list.author}'> ${list.author} </button> </td>
            <td>${list.alt}</td>
            <td>${list.tags}</td>
            <td>${list.description}</td>
         </tr>
      `;
    }
    placeholder.innerHTML = out;
    addEventListeners();
    tableSearch();
  })
  .catch(function (error) {
    console.log("Error: " + error);
  });


// Submit new model, get it and prevent following form link
$("#model-form").submit(function (e) {
  const tableBody = $(".models").find("tbody");
  e.preventDefault();
  $.ajax({
    url: "https://wt.ops.labs.vu.nl/api23/54db8963",
    method: "POST",
    data: $("#model-form").serialize(),
  })
    .done(function (data) {
      $.ajax({
        url: data.URI,
        method: "GET",
      })
        .done(function (data) {
          tableBody.append(`
              <tr class='bodyt'>
              // Improvement for Guideline 1.1
                  <td><img alt='${data.alt}' src='${data.image}' class='phone-img'></td>
                  <td>
                    <button class='author-button' data-author='${data.author}'>
                      ${data.author}
                    </button>
                  </td>
                  <td>${data.alt}</td>
                  <td>${data.tags}</td>
                  <td>${data.description}</td>
              </tr>
          `);

          addEventListeners();
        })
        .done(function () {
          $(".inputForm").val("");
        });
    });
});

$("#db-reset").submit(function (e) {
  const tableBody = $(".models").find("tbody");
  e.preventDefault();
  $.ajax({
    url: "https://wt.ops.labs.vu.nl/api23/54db8963/reset",
    method: "GET",
  }).done(function () {
    tableBody.empty();
    getModels();
    ddEventListeners();
  });
});

function addEventListeners() {
  document.querySelectorAll(".author-button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      let activeAuthor = this.dataset.author;
      hideOthers(activeAuthor);
    });
  });
}

function hideOthers(activeAuthor) {
  let tableRows = document.querySelectorAll("#data-output tr");
  for (let i = 0; i < tableRows.length; i++) {
    let authorButton = tableRows[i].querySelector(".author-button");
    if (authorButton && authorButton.dataset.author !== activeAuthor) {
      tableRows[i].style.display = "none";
    } else if (authorButton) {
      tableRows[i].style.display = "";
    }
  }
}

function tableSearch() {
  let input, filter, table, tr, td, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("data-output");
  tr = table.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

//Add event listeners after the table has been populated with data
let input = document.getElementById("myInput");
input.addEventListener("keyup", function(){
tableSearch();
});






