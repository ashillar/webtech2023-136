
//-------------------------------- Functions -----------------------------------
// Fetch model table data on page load
fetch("https://wt.ops.labs.vu.nl/api23/54db8963")
.then(function(response){
   return response.json();
})
.then(function(lists){
   let placeholder = document.querySelector("#data-output");
   let out = "";
   for(let list of lists){
      out += `
         <tr>
            <td> <img src='${list.image}'> </td>
            <td>${list.author}</td>
            <td>${list.alt}</td>
            <td>${list.tags}</td>
            <td>${list.description}</td>
         </tr>
      `;
   }
 
   placeholder.innerHTML = out;
});

// Submit new model, get it and prevent following form link
$('#model-form').submit(function (e) {
  const tableBody = $('.models').find('tbody');
  e.preventDefault();
  $.ajax({
      url: 'https://wt.ops.labs.vu.nl/api23/54db8963',
      method: 'POST',
      data: $('#model-form').serialize(),
  }).done(function (data) {
      $.ajax({
          url: data.URI,
          method: 'GET',
      }).done(function (data) {
          tableBody.append(`
              <tr class='bodyt'>
                  <td><img alt='${data.author} ${data.alt}' src='${data.image}' class='phone-img'></td>
                  <td>${data.author}</td>
                  <td>${data.alt}</td>
                  <td>${data.tags}</td>
                  <td>${data.description}</td>

              </tr>
          `);
      }).done(function () {
          $('.inputForm').val('');
      });
  });
});

$('#db-reset').submit(function (e) {
  const tableBody = $('.models').find('tbody');
  e.preventDefault();
  $.ajax({
      url: 'https://wt.ops.labs.vu.nl/api23/54db8963/reset',
      method: 'GET',
  }).done(function () {
      tableBody.empty();

      getModels();
  });
});

function tableSearch() {
    let input, filter, table, tr, td, txtValue;

    //Intialising Variables
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
