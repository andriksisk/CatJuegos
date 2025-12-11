<!-- Vista reviews -->

<script lang="ts">
// @ts-nocheck
	import { page } from "$app/stores";
	import { getJuego, getReviewsJuego, publicarReview, eliminarReview } from "$lib/api";
	import { user } from "$lib/stores.js";

	let juego = null;
	let reseñas = [];
	let encabezado ="";
	let texto ="";
	let rating = 5;

	let idJuego;

	$: idJuego = $page.params.id;

	$: if (idJuego) {   
		cargarDatos();
	}

	async function cargarDatos() {
		juego = await getJuego(idJuego);
		reseñas = await getReviewsJuego(idJuego);
	}

	async function enviar() {
		if (!$user) {
			alert("Debes iniciar sesión para publicar una reseña.");
			return;
		}

		if (!encabezado || !texto) {
			alert("Debe llenar todos los campos");
			return;
		}

		await publicarReview(idJuego, $user.idUsuario, rating, encabezado, texto);
		reseñas = await getReviewsJuego(idJuego);
		encabezado = "";
		texto = "";
		rating = 5;
	}

	async function borrar(idReview) {
		if (!confirm("¿Seguro que deseas eliminar esta reseña?")) return;

		await eliminarReview(idReview);
		await cargarDatos(); 
	}
</script>

{#if juego}
	<h1 class="titulo">{juego.nombre}</h1>

	<div class="boxSuperior">

		<p class="info">{juego.descripcion}</p>
		<h2 class="reselas">Reseñas</h2>
		{#each reseñas as r}
			<div class="review">
				<strong>{r.encabezado}</strong> ===> {r.rating}/5 ⭐
				<p>{r.texto}</p>
				<button on:click={() => borrar(r.idReview)}>Eliminar</button>  
			</div>
		{/each}
		<h3>Agregar reseña</h3>
		<div class="boxReseña">
			<input class="encabezado" placeholder="Encabezado" bind:value={encabezado}/>
			<input class="texto"placeholder="Reseña" bind:value={texto}/>
			<input class="rating" type="number" min="1" max="5" bind:value={rating}>
		</div>
		
		<button class="BtonEnviar" on:click={enviar}>Enviar</button>
		<a class="regresar" href="/juegos">Regresar</a>

	</div>
	
{/if}

<style>
	:global(body) {
		margin: 0;
		font-family: 'Inter', sans-serif;

		background-image: url(https://images6.alphacoders.com/319/thumb-1920-319998.jpg);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;

		color: white;
	}
	.titulo {
		color: rgb(252, 122, 99);
			text-align: center;
			font-size: 3.5rem;
			margin-top: 25px;
		}
	.boxSuperior {
    text-align: center;
		background: rgba(30, 30, 30, 0.75);
		backdrop-filter: blur(4px);
		max-width: 1300px;
		margin: 40px auto;
		padding: 30px;
		border-radius: 12px;
		box-shadow: 0 8px 30px rgba(0,0,0,0.4);
	}
	.info{
		padding: 10px;
		border-radius: 6px;
		font-size: 1.6rem;
    	color: white;
		text-align: justify;
	}
	.reselas{
		padding: 10px;
		border-radius: 6px;
		font-size: 1.6rem;
		background: rgba(46, 46, 46, 0.8);
    	color: rgb(255, 255, 255);
	}
	.regresar{
		color:#ffffff;
	}
	.boxReseña{
		display: flex;
		flex-direction: column;
		gap: 15px;
		background: rgba(46, 46, 46, 0.8);
		padding: 20px;
		border-radius: 6px;
		margin-bottom: 20px;
	}
	.encabezado{
		height: 40px;
		border-radius: 6px;
		text-align: center;
		font-size: 1rem;
	}
	.texto{
		height: 100px;
		border-radius: 6px;
		text-align: center;
		font-size: 1rem;
	}
	.review{
		padding-bottom: 10px;
		margin-bottom: 10px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	}
	.BtonEnviar{
		width: 100px;
		margin-right: 10px;
		background: #000000;
		color: white;
		border: none;
		border-radius: 6px;
		padding: 12px;
		font-size: 1rem;
		cursor: pointer;
	}
	.BtonEnviar:hover{
		background: rgba(46, 46, 46, 0.8);
		transform: translateY(-.5px);
	}
	.rating{
		text-align: center;
		align-self: center;
		width: 199px;
		color: #000000;
		font-size: 1.5rem;
		background-color: yellow;
	}
</style>
