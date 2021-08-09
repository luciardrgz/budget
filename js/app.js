const ingresos = [];

const egresos = [];

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
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
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

const cargarIngresos = () => {
  let ingresosHTML = ""; // Contiene inputs de HTML
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  // En id 'lista-ingresos' se sustituye cada elemento con el valor de ingresosHTML;
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

// Cada iteración del arreglo regresa un (ingreso) recibido acá:
const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
  <div class="elemento limpiarEstilos">
                <div class="elemento_descripcion">${ingreso.descripcion}</div>
                <div class="derecha limpiarEstilos">
                  <div class="elemento_valor">+${formatoMoneda(
                    ingreso.valor
                  )}</div>
                  <div class="elemento_eliminar">
                    <button class='elemento_eliminar--btn'>
                      <ion-icon name="close-circle-outline" onclick='eliminarIngreso(${
                        ingreso.id
                      })'></ion-icon>
                    </button>
                  </div>
                </div>
              </div>`;
  return ingresoHTML;
};

const cargarEgresos = () => {
  let egresosHTML = ""; // Contiene inputs de HTML
  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }
  // En id 'lista-egresos' se sustituye cada elemento con el valor de ingresosHTML;
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresoHTML = `
          <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
              <div class="elemento_porcentaje">${formatoPorcentaje(
                egreso.valor / totalEgresos()
              )}</div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                  <ion-icon name="close-circle-outline" onclick='eliminarEgreso(${
                    egreso.id
                  })'></ion-icon> 
                </button>
              </div>
            </div>
          </div>
  `;
  return egresoHTML;
};

const eliminarIngreso = (id) => {
  // Método findIndex: compara cada objeto del arreglo con parámetro
  let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
  ingresos.splice(indiceEliminar, 1); // Elimina 1 elemento (índice recibido)
  cargarCabecero();
  cargarIngresos();
};

const eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
  egresos.splice(indiceEliminar, 1); // Elimina 1 elemento del arreglo Egresos (índice recibido)
  cargarCabecero();
  cargarEgresos();
};

const agregarDato = () => {
  let forma = document.forms["forma"]; // Recupera el formulario
  let tipo = forma["tipo"]; // Recupera el select (ingreso o egreso)
  let descripcion = forma["descripcion"];
  let valor = forma["valor"];
  if (descripcion.value !== "" && valor.value !== "") {
    if (tipo.value === "ingreso") {
      ingresos.push(new Ingreso(descripcion.value, +valor.value)); // '+': convierte string a number (sintaxis Number simplificada)
      cargarCabecero();
      cargarIngresos();
    } else if (tipo.value === "egreso") {
      egresos.push(new Egreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarEgresos();
    }
  }
  document.forms['forma'].reset();
};
