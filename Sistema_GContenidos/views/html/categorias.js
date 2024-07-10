// categorias.js
function cargarCategorias() {
    document.getElementById("cuerpoCategorias").innerHTML = "";
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../controllers/categorias.controllers.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Respuesta del servidor: " + xhr.responseText);
            var categorias = JSON.parse(xhr.responseText);
            
            categorias.forEach(function(categoria) {
                var row = "<tr>";
                row += "<td>" + categoria.id_categoria + "</td>";
                row += "<td>" + categoria.nombre_categoria + "</td>";
                row += "<td><button class='btn btn-sm btn-warning' onclick='abrirModal(\"editar\", " + JSON.stringify(categoria) + ")'>Editar</button> ";
                row += "<button class='btn btn-sm btn-danger' onclick='eliminarCategoria(" + categoria.id_categoria + ")'>Eliminar</button></td>";
                row += "</tr>";
                document.getElementById("cuerpoCategorias").innerHTML += row;
            });
        }
    };
    xhr.send();
}

function abrirModal(modo, categoria = null) {
    if (modo === "insertar") {
        document.getElementById("formCategoria").reset();
        document.getElementById("id_categoria").value = "";
        $('#modalCategoria').modal('show');
    } else if (modo === "editar") {
        document.getElementById("id_categoria").value = categoria.id_categoria;
        document.getElementById("nombre_categoria").value = categoria.nombre_categoria;
        $('#modalCategoria').modal('show');
    }
}

document.getElementById("formCategoria").onsubmit = function(event) {
    event.preventDefault();
    
    var id_categoria = document.getElementById("id_categoria").value;
    var nombre_categoria = document.getElementById("nombre_categoria").value;
    
    var datos = JSON.stringify({
        id_categoria: id_categoria,
        nombre_categoria: nombre_categoria
    });
    
    var xhr = new XMLHttpRequest();
    if (id_categoria) {
        xhr.open("PUT", "../controllers/categorias.controllers.php", true);
    } else {
        xhr.open("POST", "../controllers/categorias.controllers.php", true);
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#modalCategoria').modal('hide');
            cargarCategorias();
        }
    };
    xhr.send(datos);
};

function eliminarCategoria(id_categoria) {
    if (confirm("¿Está seguro de eliminar esta categoría?")) {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "../controllers/categorias.controllers.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                cargarCategorias();
            }
        };
        xhr.send(JSON.stringify({
            id_categoria: id_categoria
        }));
    }
}

// Cargar categorías al iniciar la página
window.onload = function() {
    cargarCategorias();
};