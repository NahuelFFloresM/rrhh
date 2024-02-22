var dataTable;
var data;
/**
 * data prototype a futuro
 * @warmup va a ser diferenciado entre lista o collapse si recibe array u object al leerlo
 * @age se va a ingresar fecha(por calenadrio o a mano) para calcular automaticamente la fecha a colocar
 */

document.addEventListener("DOMContentLoaded", async function(event) {
  const options = {};

  myModal = new bootstrap.Modal(document.getElementById('myModal'), options)

  // INICIALIZACION DE DATATABLE
  dataTable = $('#dataTable').DataTable({
    columnDefs: [
      {name: "name", targets: 0},
      {name: "age", targets: 1},
      {name: "objective", targets: 2, visible: false},
      {name: "routines", targets: 3, visible: false},
      {name: "warmups", targets: 4, visible: false},
    ],
    lenghtChange: false,
    searching: false,
    lengthChange: false,
    scrollX: false,
    paging: false,
    info: "",
    responsive: true,
    pageLength: 50,
  });

  // PEDIDO DE DATOS Y AGREGADO A LA TABLA
  await fetch('/data', {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  .then(response => response.json())
  .then(data => data.forEach(item => {
    const data = [item.name,item.age,item.objective,item.routines,item.warmups]
    // console.log(data);
    // const data = [{name:item.name,age:item.age,objetivo:item.objective,rutina:item.routines,Calentamiento:item.warmups}]
    addRows(data);
  }));

  $('#dataTable tbody').on( 'click', 'tr', function(){
      // data = dataTable.rows(this).data()[0];
      data = dataTable.row(this).data();
      // rowfocus = dataTable.rows(this);
      loadModal(data);
      myModal.show();
  } );

});

function addRows(data){
  dataTable.row.add(data).draw();
}

/*
* Table data camps
* @name-0
* @age-1
* @objective-2
* @routines[{dia,ej1/2/3/4}]-3
* @warmup[{dia,ej1/2/3/4}]-4
*/
function loadModal(data){
  console.log(data);
  document.getElementById('modal_name_cliente').innerHTML = data[0] +" - "+ data[1];
  document.getElementById('calentamiento_collapse').innerHTML = warmupText(data[4]);
  document.getElementById('rutina_collpase').innerHTML = routineText(data[3]);
  // CHEQUEO DE WARMUP- LISTA O COLLAPSE
  // var ul = document.getElementById('modal_warmup_list');
  // data[4].forEach(item => {
  //   var li = document.createElement('li');

  //   li.setAttribute('class','list-group-item d-flex justify-content-between align-items-center');
  //   var span = document.createElement('span');
  //   span.setAttribute('class','badge bg-primary rounded-pill');
  //   // spread warmup text
  //   // var span_info = data
  //   // span.innerHTML = item
    
  //   // li.innerHTML=li.innerHTML + element;
  //   ul.appendChild(li);
  // });
  // document.getElementById('modal_warmup_list')
}

function warmupText(data){
  // console.log(data);
  var text = ``
  data.forEach(item => {
    text +=
    `<div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsewarmup${item.dia}" aria-expanded="false" aria-controls="collapsewarmup${item.dia}">
          ${item.dia}
        </button>
      </h2>
      <div id="collapsewarmup${item.dia}" class="accordion-collapse collapse" data-bs-parent="#calentamiento_collapse">
        <div class="accordion-body">
            <ul class="list-group">`
              item.warmup.forEach(wp => {
                const wpinfo = wp.split('/');
                text+=`<li class="list-group-item d-flex justify-content-between align-items-center">
                ${wpinfo[0]}
                <span class="badge bg-primary rounded-pill">${wpinfo[1]}</span>
              </li>`
              })
    text+=`
            </ul>
        </div>
      </div>
    </div>`
  });
  // TODO-CHECK IF THERES NO WARMUP
  return text;
}

function routineText(data){
  console.log(data);
  var text = ``;
  data.forEach(item => {
    text +=
    `<div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseroutine${item.dia}" aria-expanded="false" aria-controls="collapseroutine${item.dia}">
          ${item.dia}
        </button>
      </h2>
      <div id="collapseroutine${item.dia}" class="accordion-collapse collapse" data-bs-parent="#collapseroutine${item.dia}">
        <div class="accordion-body">
            <ul class="list-group">`;
    item.routine.forEach(rt => {
      const rtdata = rt.split('/');
      text +=`<li class="list-group-item d-flex justify-content-between align-items-center">
        ${rtdata[0]}
        <div>
          <span class="badge bg-primary rounded-pill">${rtdata[1]}</span>
          <span class="badge bg-primary rounded-pill">${rtdata[2]}</span>
        </div>
      </li>`
    });
    text += `
      </ul>
    </div>
  </div>
</div>`    
  });

  return text;
}