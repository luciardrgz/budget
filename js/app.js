const ingresos = [
  new Ingreso("Sueldo", 21500.0),
  new Ingreso("Venta coche", 12000.0),
];

const egresos = [new Egreso("Comida", 500.0), new Egreso("Ropa", 200.0)];

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

let totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

// Dándole formato a las variables monetarias del cabecero
const formatoMoneda = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }); // Estilo moneda, USD, parte fraccionaria (ctvs)
};

// Dándole formato a la variable porcentaje del cabecero
const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const cargarIngresos = () =>{
  let ingresosHTML = ''; // Contiene inputs de HTML
  for (let ingreso of ingresos){
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  // En id 'lista-ingresos' se sustituye cada elemento con el valor de ingresosHTML;
  document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

// Cada iteración del arreglo regresa un (ingreso) recibido acá:
const crearIngresoHTML = (ingreso) =>{
  let ingresoHTML= `
  <div class="elemento limpiarEstilos">
                <div class="elemento_descripcion">${ingreso.descripcion}</div>
                <div class="derecha limpiarEstilos">
                  <div class="elemento_valor">+${formatoMoneda(ingreso.valor)}</div>
                  <div class="elemento_eliminar">
                    <button class='elemento_eliminar--btn'>
                      <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>`;
              return ingresoHTML;

}

const cargarEgresos = () =>{
  let egresosHTML = ''; // Contiene inputs de HTML
  for (let egreso of egresos){
    egresosHTML += crearEgresoHTML(egreso);
  }
  // En id 'lista-egresos' se sustituye cada elemento con el valor de ingresosHTML;
  document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) =>{
  let egresoHTML=`
          <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
              <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                  <ion-icon name="close-circle-outline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
  `;
  return egresoHTML;
}