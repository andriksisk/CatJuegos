//@ts-nocheck

const API = "https://17349-production.up.railway.app";

export async function login(correo, contra) {
    const xd = await fetch(`${API}/usuarios`);
    if (!xd.ok) throw new Error("Error al obtener usuarios");

    const usuarios = await xd.json();

    const encontrado = usuarios.find(encontrar);
    function encontrar (u){
        return u.correo == correo && u.contra == contra;
    }

    if (!encontrado) {
        throw new Error("Correo o contraseña incorrectos");
    }

    return encontrado;
}

export async function registerUser(nombre, correo, contra) {
    const resultado = await fetch(`${API}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, contra })
    });

    if (!resultado.ok) throw new Error("Error al registrar usuario");

    return resultado.text();
}

export async function getJuegos() {
    const resultado = await fetch(`${API}/juegos`);
    if (!resultado.ok) throw new Error("Error al obtener juegos");
    return resultado.json();
}

export async function getJuego(idJuego) {
    const resultado = await fetch(`${API}/juegos/${idJuego}`);
    if (!resultado.ok) throw new Error("Juego no encontrado");
    return resultado.json();
}

export async function getReviewsJuego(idJuego) {
    const resultado = await fetch(`${API}/reviews`);
    if (!resultado.ok) throw new Error("Error al obtener reviews");

    const reviews = await resultado.json();
    return reviews.filter(function (r){
        return r.idJuego == idJuego;
    });
}

export async function publicarReview(idJuego, idUsuario, rating , encabezado, texto) {
    const resultado = await fetch(`${API}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({idJuego, idUsuario, rating, encabezado, texto})
    });

    if (!resultado.ok) throw new Error("Error al publicar reseña");

    return resultado.json();
}

export async function crearJuego(nombre, descripcion, desarrollador, clasificacion) {
    const resultado = await fetch(`${API}/juegos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion, desarrollador, clasificacion })
    });
    return resultado.text();
}

export async function eliminarJuego(idJuego) {
    const resultado = await fetch(`${API}/juegos/${idJuego}`, {
        method: "DELETE"
    });
}

export async function eliminarReview(idReview) {
    const resultado = await fetch(`${API}/reviews/${idReview}`, {
        method: "DELETE"
    });

    if (!resultado.ok) throw new Error("Error al eliminar la reseña");
}

