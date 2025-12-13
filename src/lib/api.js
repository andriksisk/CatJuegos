//@ts-nocheck
//variable "fija" la cual nos permite hacer uso de las funciones y todos los procesos, ya que nos permite la conexión al backend mediante el railway
const API = "https://17349-production.up.railway.app";

//función login para la vista login
export async function login(correo, contra) {
    const xd = await fetch(`${API}/usuarios`);
    if (!xd.ok) throw new Error("Error al obtener usuarios");
    //obtención de datos de tipo jason a la variable usuarios
    const usuarios = await xd.json();

    //Apartado para identificar y validar que coincidan los datos del backend con los que ha pueso el usuario
    const encontrado = usuarios.find(encontrar);
    function encontrar (u){
        return u.correo == correo && u.contra == contra;
    }

    if (!encontrado) {
        throw new Error("Correo o contraseña incorrectos");
    }

    return encontrado;
}
//función de tipo peticion POST para crear usuarios, dependiendo de los parámetros enviados
export async function registerUser(nombre, correo, contra) {
    const resultado = await fetch(`${API}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, contra })
    });

    if (!resultado.ok) throw new Error("Error al registrar usuario");

    return resultado.text();
}

//función de tipo get el cual nos permite obtener todos los juegos
export async function getJuegos() {
    const resultado = await fetch(`${API}/juegos`);
    if (!resultado.ok) throw new Error("Error al obtener juegos");
    return resultado.json();
}
//función de tipo get el cual nos permite obtener solamente un juego especificado por el parámetro de "idJuego"
export async function getJuego(idJuego) {
    const resultado = await fetch(`${API}/juegos/${idJuego}`);
    if (!resultado.ok) throw new Error("Juego no encontrado");
    return resultado.json();
}
//función de tipo get el cual nos permite obtener todas las reseñas de un juego específico (usando idJuego)
export async function getReviewsJuego(idJuego) {
    const resultado = await fetch(`${API}/reviews`);
    if (!resultado.ok) throw new Error("Error al obtener reviews");

    const reviews = await resultado.json();
    return reviews.filter(function (r){
        return r.idJuego == idJuego;
    });
}
//función de tipo POST en el cual creamos una nueva reseñas envíandolo a nuestro backend
export async function publicarReview(idJuego, idUsuario, rating , encabezado, texto) {
    const resultado = await fetch(`${API}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({idJuego, idUsuario, rating, encabezado, texto})
    });

    if (!resultado.ok) throw new Error("Error al publicar reseña");

    return resultado.json();
}
//función de tipo petición POST el cual se crean juegos dependiendo de los parámetros ingresados
export async function crearJuego(nombre, descripcion, desarrollador, clasificacion) {
    const resultado = await fetch(`${API}/juegos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion, desarrollador, clasificacion })
    });
    return resultado.text();
}
//función de tipo delete el cual elimina un juego dependiendo de su id
export async function eliminarJuego(idJuego) {
    const resultado = await fetch(`${API}/juegos/${idJuego}`, {
        method: "DELETE"
    });
}
//eliminar una review usando su id. Usa petición de tipo DELETE
export async function eliminarReview(idReview) {
    const resultado = await fetch(`${API}/reviews/${idReview}`, {
        method: "DELETE"
    });

    if (!resultado.ok) throw new Error("Error al eliminar la reseña");
}

