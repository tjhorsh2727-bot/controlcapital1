/* ============================
   VARIABLES PRINCIPALES
============================ */

let capitalInicial = 0;

let ventas = [];

let gastosNegocio = [];

let gastosCasa = [];

let puntosCapital = 0;

let misionesCompletadas = [];

let historialUsuarios = [];


/* ============================
   CAMBIAR DE PANTALLA
============================ */

function mostrarPantalla(id) {

    const pantallas =
        document.querySelectorAll(".pantalla");

    pantallas.forEach(function(pantalla) {

        pantalla.classList.remove("activa");

    });


    const pantallaNueva =
        document.getElementById(id);

    if (pantallaNueva) {

        pantallaNueva.classList.add("activa");

    }


    actualizarDinero();

    actualizarPuntos();
}


/* ============================
   CAPITAL
============================ */

function guardarCapital() {

    const input =
        document.getElementById(
            "capitalInput"
        );

    const cantidad =
        parseFloat(input.value);


    if (
        isNaN(cantidad) ||
        cantidad <= 0
    ) {

        alert(
            "Ingresa un capital válido."
        );

        return;
    }


    capitalInicial = cantidad;


    completarMisionAutomaticamente(2);


    guardarDatos();

    actualizarDinero();


    alert(
        "✅ Capital guardado correctamente."
    );


    mostrarPantalla("menu");
}


/* ============================
   VENTAS
============================ */

function registrarVenta() {

    const producto =
        document.getElementById(
            "productoVenta"
        ).value.trim();


    const precio =
        parseFloat(
            document.getElementById(
                "precioVenta"
            ).value
        );


    const cantidad =
        parseInt(
            document.getElementById(
                "cantidadVenta"
            ).value
        );


    if (
        producto === "" ||
        isNaN(precio) ||
        precio <= 0 ||
        isNaN(cantidad) ||
        cantidad <= 0
    ) {

        alert(
            "Completa correctamente los datos de la venta."
        );

        return;
    }


    const total =
        precio * cantidad;


    ventas.push({

        producto: producto,

        precio: precio,

        cantidad: cantidad,

        total: total,

        fecha:
            new Date().toLocaleString()

    });


    document.getElementById(
        "productoVenta"
    ).value = "";


    document.getElementById(
        "precioVenta"
    ).value = "";


    document.getElementById(
        "cantidadVenta"
    ).value = "";


    completarMisionAutomaticamente(3);


    guardarDatos();

    mostrarVentas();

    actualizarDinero();


    alert(
        "✅ Venta registrada."
    );
}


/* ============================
   MOSTRAR VENTAS
============================ */

function mostrarVentas() {

    const lista =
        document.getElementById(
            "listaVentas"
        );


    if (!lista) {
        return;
    }


    if (ventas.length === 0) {

        lista.innerHTML =
            '<p class="vacio">Todavía no hay ventas.</p>';

        return;
    }


    lista.innerHTML = "";


    ventas.forEach(function(
        venta,
        indice
    ) {

        const elemento =
            document.createElement("div");


        elemento.className =
            "item-lista";


        elemento.innerHTML = `

            <strong>
                ${venta.producto}
            </strong>

            ${venta.cantidad} x
            S/ ${venta.precio.toFixed(2)}

            <br>

            Total:
            <strong>
                S/ ${venta.total.toFixed(2)}
            </strong>

            <button
                class="boton-peligro"
                onclick="eliminarVenta(${indice})"
            >
                Eliminar
            </button>

        `;


        lista.appendChild(elemento);

    });
}


/* ============================
   ELIMINAR VENTA
============================ */

function eliminarVenta(indice) {

    const confirmar =
        confirm(
            "¿Quieres eliminar esta venta?"
        );


    if (!confirmar) {
        return;
    }


    ventas.splice(indice, 1);


    guardarDatos();

    mostrarVentas();

    actualizarDinero();
}


/* ============================
   GASTOS DEL NEGOCIO
============================ */

function registrarGastoNegocio() {

    const descripcion =
        document.getElementById(
            "descripcionNegocio"
        ).value.trim();


    const monto =
        parseFloat(
            document.getElementById(
                "montoNegocio"
            ).value
        );


    if (
        descripcion === "" ||
        isNaN(monto) ||
        monto <= 0
    ) {

        alert(
            "Completa correctamente el gasto."
        );

        return;
    }


    gastosNegocio.push({

        descripcion: descripcion,

        monto: monto,

        fecha:
            new Date().toLocaleString()

    });


    document.getElementById(
        "descripcionNegocio"
    ).value = "";


    document.getElementById(
        "montoNegocio"
    ).value = "";


    completarMisionAutomaticamente(4);


    guardarDatos();

    mostrarGastosNegocio();

    actualizarDinero();


    alert(
        "✅ Gasto del negocio registrado."
    );
}


/* ============================
   MOSTRAR GASTOS NEGOCIO
============================ */

function mostrarGastosNegocio() {

    const lista =
        document.getElementById(
            "listaGastosNegocio"
        );


    if (!lista) {
        return;
    }


    if (gastosNegocio.length === 0) {

        lista.innerHTML =
            '<p class="vacio">Todavía no hay gastos.</p>';

        return;
    }


    lista.innerHTML = "";


    gastosNegocio.forEach(function(
        gasto,
        indice
    ) {

        const elemento =
            document.createElement("div");


        elemento.className =
            "item-lista";


        elemento.innerHTML = `

            <strong>
                ${gasto.descripcion}
            </strong>

            S/ ${gasto.monto.toFixed(2)}

            <button
                class="boton-peligro"
                onclick="eliminarGastoNegocio(${indice})"
            >
                Eliminar
            </button>

        `;


        lista.appendChild(elemento);

    });
}


/* ============================
   ELIMINAR GASTO NEGOCIO
============================ */

function eliminarGastoNegocio(indice) {

    if (
        !confirm(
            "¿Eliminar este gasto?"
        )
    ) {
        return;
    }


    gastosNegocio.splice(
        indice,
        1
    );


    guardarDatos();

    mostrarGastosNegocio();

    actualizarDinero();
}


/* ============================
   GASTOS DE CASA
============================ */

function registrarGastoCasa() {

    const descripcion =
        document.getElementById(
            "descripcionCasa"
        ).value.trim();


    const monto =
        parseFloat(
            document.getElementById(
                "montoCasa"
            ).value
        );


    if (
        descripcion === "" ||
        isNaN(monto) ||
        monto <= 0
    ) {

        alert(
            "Completa correctamente el gasto."
        );

        return;
    }


    gastosCasa.push({

        descripcion: descripcion,

        monto: monto,

        fecha:
            new Date().toLocaleString()

    });


    document.getElementById(
        "descripcionCasa"
    ).value = "";


    document.getElementById(
        "montoCasa"
    ).value = "";


    completarMisionAutomaticamente(4);


    guardarDatos();

    mostrarGastosCasa();

    actualizarDinero();


    alert(
        "⚠️ Gasto de casa registrado. Recuerda cuidar el capital del negocio."
    );
}


/* ============================
   MOSTRAR GASTOS CASA
============================ */

function mostrarGastosCasa() {

    const lista =
        document.getElementById(
            "listaGastosCasa"
        );


    if (!lista) {
        return;
    }


    if (gastosCasa.length === 0) {

        lista.innerHTML =
            '<p class="vacio">Todavía no hay gastos.</p>';

        return;
    }


    lista.innerHTML = "";


    gastosCasa.forEach(function(
        gasto,
        indice
    ) {

        const elemento =
            document.createElement("div");


        elemento.className =
            "item-lista";


        elemento.innerHTML = `

            <strong>
                ${gasto.descripcion}
            </strong>

            S/ ${gasto.monto.toFixed(2)}

            <button
                class="boton-peligro"
                onclick="eliminarGastoCasa(${indice})"
            >
                Eliminar
            </button>

        `;


        lista.appendChild(elemento);

    });
}


/* ============================
   ELIMINAR GASTO CASA
============================ */

function eliminarGastoCasa(indice) {

    if (
        !confirm(
            "¿Eliminar este gasto?"
        )
    ) {
        return;
    }


    gastosCasa.splice(
        indice,
        1
    );


    guardarDatos();

    mostrarGastosCasa();

    actualizarDinero();
}


/* ============================
   CALCULAR TOTALES
============================ */

function calcularTotalVentas() {

    return ventas.reduce(
        function(total, venta) {

            return total + venta.total;

        },
        0
    );
}


function calcularGastosNegocio() {

    return gastosNegocio.reduce(
        function(total, gasto) {

            return total + gasto.monto;

        },
        0
    );
}


function calcularGastosCasa() {

    return gastosCasa.reduce(
        function(total, gasto) {

            return total + gasto.monto;

        },
        0
    );
}


function calcularDisponible() {

    return (
        capitalInicial +
        calcularTotalVentas() -
        calcularGastosNegocio() -
        calcularGastosCasa()
    );
}


/* ============================
   ACTUALIZAR DINERO
============================ */

function actualizarDinero() {

    const disponible =
        calcularDisponible();


    const elemento =
        document.getElementById(
            "dineroDisponibleMenu"
        );


    if (elemento) {

        elemento.textContent =
            "S/ " +
            disponible.toFixed(2);

    }
}


/* ============================
   RESUMEN
============================ */

function mostrarResumen() {

    const ventasTotal =
        calcularTotalVentas();


    const negocioTotal =
        calcularGastosNegocio();


    const casaTotal =
        calcularGastosCasa();


    const disponible =
        calcularDisponible();


    const ganancia =
        ventasTotal -
        negocioTotal -
        casaTotal;


    document.getElementById(
        "resumenCapital"
    ).textContent =
        "S/ " +
        capitalInicial.toFixed(2);


    document.getElementById(
        "resumenVentas"
    ).textContent =
        "S/ " +
        ventasTotal.toFixed(2);


    document.getElementById(
        "resumenGastosNegocio"
    ).textContent =
        "S/ " +
        negocioTotal.toFixed(2);


    document.getElementById(
        "resumenGastosCasa"
    ).textContent =
        "S/ " +
        casaTotal.toFixed(2);


    document.getElementById(
        "resumenDisponible"
    ).textContent =
        "S/ " +
        disponible.toFixed(2);


    document.getElementById(
        "resumenGanancia"
    ).textContent =
        "S/ " +
        ganancia.toFixed(2);


    completarMisionAutomaticamente(5);


    mostrarPantalla("resumen");
}


/* ============================
   GUÍA SBS
============================ */

function abrirGuiaCapital() {

    window.open(
        "https://www.sbs.gob.pe/educacion-financiera/finanzas-para-ti",
        "_blank"
    );


    setTimeout(
        function() {

            const boton =
                document.getElementById(
                    "botonMision1"
                );


            if (boton) {

                boton.disabled = false;

                boton.textContent =
                    "✅ Ya lo leí — Ganar 50 puntos";

            }

        },
        3000
    );
}


/* ============================
   COMPLETAR MISIÓN 1
============================ */

function completarMision(id) {

    if (
        misionesCompletadas.includes(id)
    ) {

        alert(
            "Esta misión ya fue completada."
        );

        return;
    }


    let puntos = 0;


    if (id === 1) {
        puntos = 50;
    }


    misionesCompletadas.push(id);

    puntosCapital += puntos;


    guardarDatos();

    actualizarPuntos();

    actualizarMisiones();


    alert(
        "🎉 Misión completada. +" +
        puntos +
        " Puntos Capital."
    );
}


/* ============================
   MISIONES AUTOMÁTICAS
============================ */

function completarMisionAutomaticamente(id) {

    if (
        misionesCompletadas.includes(id)
    ) {
        return;
    }


    let puntos = 0;


    if (id === 2) {
        puntos = 30;
    }

    if (id === 3) {
        puntos = 40;
    }

    if (id === 4) {
        puntos = 50;
    }

    if (id === 5) {
        puntos = 40;
    }


    misionesCompletadas.push(id);

    puntosCapital += puntos;


    guardarDatos();

    actualizarPuntos();

    actualizarMisiones();
}


/* ============================
   PUNTOS
============================ */

function actualizarPuntos() {

    const elementos = [

        document.getElementById(
            "puntosMenu"
        ),

        document.getElementById(
            "puntosMisiones"
        ),

        document.getElementById(
            "puntosRecompensas"
        )

    ];


    elementos.forEach(
        function(elemento) {

            if (elemento) {

                elemento.textContent =
                    puntosCapital;

            }

        }
    );
}


/* ============================
   ESTADO DE MISIONES
============================ */

function actualizarMisiones() {

    misionesCompletadas.forEach(
        function(id) {

            const mision =
                document.getElementById(
                    "mision" + id
                );


            if (mision) {

                mision.classList.add(
                    "mision-completada"
                );

            }

        }
    );


    if (
        misionesCompletadas.includes(1)
    ) {

        const boton =
            document.getElementById(
                "botonMision1"
            );


        if (boton) {

            boton.disabled = true;

            boton.textContent =
                "✅ Misión completada";

        }
    }
}


/* ============================
   RECOMPENSAS
============================ */

function canjearRecompensa(
    costo,
    nombre
) {

    if (
        puntosCapital < costo
    ) {

        alert(
            "❌ No tienes suficientes Puntos Capital."
        );

        return;
    }


    const confirmar =
        confirm(
            "¿Quieres canjear " +
            nombre +
            " por " +
            costo +
            " puntos?"
        );


    if (!confirmar) {
        return;
    }


    puntosCapital -= costo;


    guardarDatos();

    actualizarPuntos();


    alert(
        "🏆 Has canjeado: " +
        nombre
    );
}


/* ============================
   HISTORIAL DE USUARIOS
============================ */

function registrarIngresoUsuario() {

    let nombre =
        localStorage.getItem(
            "nombreUsuarioControlCapital"
        );


    if (!nombre) {

        nombre = prompt(
            "👋 Bienvenido a ControlCapital\n\n¿Cuál es tu nombre?"
        );


        if (
            nombre === null ||
            nombre.trim() === ""
        ) {

            nombre = "Usuario";

        }


        nombre = nombre.trim();


        localStorage.setItem(
            "nombreUsuarioControlCapital",
            nombre
        );
    }


    const ingreso = {

        nombre: nombre,

        fecha:
            new Date().toLocaleDateString(
                "es-PE"
            ),

        hora:
            new Date().toLocaleTimeString(
                "es-PE",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )

    };


    historialUsuarios.push(
        ingreso
    );


    localStorage.setItem(
        "historialControlCapital",
        JSON.stringify(
            historialUsuarios
        )
    );
}


/* ============================
   MOSTRAR HISTORIAL
============================ */

function mostrarHistorial() {

    cargarHistorial();

    actualizarHistorial();

    mostrarPantalla(
        "historial"
    );
}


function actualizarHistorial() {

    const lista =
        document.getElementById(
            "listaHistorial"
        );


    if (!lista) {
        return;
    }


    if (
        historialUsuarios.length === 0
    ) {

        lista.innerHTML =

            '<p class="vacio">' +
            'Todavía no hay usuarios registrados.' +
            '</p>';

        return;
    }


    lista.innerHTML = "";


    historialUsuarios
        .slice()
        .reverse()
        .forEach(
            function(usuario) {

                const elemento =
                    document.createElement(
                        "div"
                    );


                elemento.className =
                    "usuario-historial";


                elemento.innerHTML = `

                    <div class="nombre">
                        👤 ${usuario.nombre}
                    </div>

                    <div class="fecha">
                        📅 ${usuario.fecha}
                        &nbsp;
                        🕐 ${usuario.hora}
                    </div>

                `;


                lista.appendChild(
                    elemento
                );

            }
        );
}


/* ============================
   CARGAR HISTORIAL
============================ */

function cargarHistorial() {

    const historialGuardado =
        localStorage.getItem(
            "historialControlCapital"
        );


    if (historialGuardado) {

        try {

            historialUsuarios =
                JSON.parse(
                    historialGuardado
                );

        } catch (error) {

            historialUsuarios = [];

        }
    }
}


/* ============================
   GUARDAR DATOS
============================ */

function guardarDatos() {

    const datos = {

        capitalInicial:
            capitalInicial,

        ventas:
            ventas,

        gastosNegocio:
            gastosNegocio,

        gastosCasa:
            gastosCasa,

        puntosCapital:
            puntosCapital,

        misionesCompletadas:
            misionesCompletadas

    };


    localStorage.setItem(
        "controlCapitalDatos",
        JSON.stringify(datos)
    );
}


/* ============================
   CARGAR DATOS
============================ */

function cargarDatos() {

    const guardado =
        localStorage.getItem(
            "controlCapitalDatos"
        );


    if (guardado) {

        try {

            const datos =
                JSON.parse(
                    guardado
                );


            capitalInicial =
                datos.capitalInicial || 0;


            ventas =
                datos.ventas || [];


            gastosNegocio =
                datos.gastosNegocio || [];


            gastosCasa =
                datos.gastosCasa || [];


            puntosCapital =
                datos.puntosCapital || 0;


            misionesCompletadas =
                datos.misionesCompletadas || [];

        } catch (error) {

            console.log(
                "No se pudieron cargar los datos."
            );
        }
    }


    mostrarVentas();

    mostrarGastosNegocio();

    mostrarGastosCasa();

    actualizarDinero();

    actualizarPuntos();

    actualizarMisiones();
}


/* ============================
   REINICIAR APP
============================ */

function reiniciarAplicacion() {

    const confirmar =
        confirm(
            "⚠️ ¿Seguro que quieres borrar los datos financieros de la aplicación?"
        );


    if (!confirmar) {
        return;
    }


    localStorage.removeItem(
        "controlCapitalDatos"
    );


    capitalInicial = 0;

    ventas = [];

    gastosNegocio = [];

    gastosCasa = [];

    puntosCapital = 0;

    misionesCompletadas = [];


    actualizarDinero();

    actualizarPuntos();

    mostrarVentas();

    mostrarGastosNegocio();

    mostrarGastosCasa();


    alert(
        "✅ Datos reiniciados."
    );


    mostrarPantalla(
        "inicio"
    );
}


/* ============================
   INICIAR APLICACIÓN
============================ */

cargarHistorial();

cargarDatos();

registrarIngresoUsuario();

actualizarHistorial();