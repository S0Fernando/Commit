<?php
require_once('../config/conexion.php');

class Clase_Articulos {
    public function todos()
    {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "SELECT * FROM `Articulos`";
        $todos = mysqli_query($con, $cadena);
        $con->close();
        return $todos;
    }

    public function uno($id_articulo)
    {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "SELECT * FROM `Articulos` WHERE id_articulo = $id_articulo";
        $resultado = mysqli_query($con, $cadena);
        $con->close();
        return $resultado;
    }

    public function insertar($titulo, $contenido, $fecha_publicacion, $id_usuario)
    {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "INSERT INTO `Articulos` (titulo, contenido, fecha_publicacion, id_usuario)
                    VALUES ('$titulo', '$contenido', '$fecha_publicacion', $id_usuario)";
        $resultado = mysqli_query($con, $cadena);
        $con->close();
        return $resultado;
    }

    public function actualizar($id_articulo, $titulo, $contenido, $fecha_publicacion, $id_usuario)
    {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "UPDATE `Articulos`
                    SET titulo = '$titulo',
                        contenido = '$contenido',
                        fecha_publicacion = '$fecha_publicacion',
                        id_usuario = $id_usuario
                    WHERE id_articulo = $id_articulo";
        $resultado = mysqli_query($con, $cadena);
        $con->close();
        return $resultado;
    }

    public function eliminar($id_articulo)
    {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "DELETE FROM `Articulos` WHERE id_articulo = $id_articulo";
        $resultado = mysqli_query($con, $cadena);
        $con->close();
        return $resultado;
    }
}