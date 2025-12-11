<!-- Parte de juegos vista -->
<script lang="ts">
	import { base } from '$app/paths';
	import { getJuegos, crearJuego, eliminarJuego} from "$lib/api";
	import { onMount } from "svelte";
  
	type Juego = {
    idJuego: number;
    nombre: string;
    descripcion: string;
    desarrollador: string;
    clasificacion: string;
    };

    let juegos: Juego[] = [];

    let nombre ="";
	let descripcion ="";
	let desarrollador ="";
	let clasificacion ="";

	onMount(async function() {
		juegos = await getJuegos();
	});
  
  	async function agregar() {
		if (!nombre || !descripcion || !desarrollador || !clasificacion) {
			alert("Todos los campos son obligatorios.");
			return;
		}

		await crearJuego(nombre, descripcion, desarrollador, clasificacion);
    	juegos = await getJuegos();

		nombre ="";
		descripcion ="";
		desarrollador ="";
		clasificacion ="";
	}

	async function borrar(idJuego: number) {
		if (!confirm("¿Seguro que quieres eliminar este juego?")) return;

		await eliminarJuego(idJuego);
		juegos = await getJuegos();
	}
  
</script>

<h1 class="titulo">JUEGOS</h1>

<div class="boxSuperior">
	<h2 class="agregarJuego">Agregar Juego</h2>

	<input placeholder="Nombre" bind:value={nombre}/>
	<input placeholder="Descripción" bind:value={descripcion}/>
	<input placeholder="Desarrollador" bind:value={desarrollador}/>
	<input placeholder="Clasificación" bind:value={clasificacion}/>

	<button class="Bton" on:click={agregar}>Agregar</button>
</div>

<div class="marco">
	{#each juegos as j}
		<div class="Mseleccion">
			<h3>{j.nombre}</h3>
			<p>{j.descripcion}</p>
			<p><strong>{j.desarrollador}</strong></p>
			<p>Clasificación: {j.clasificacion}</p>

			<a class="link" href="{base}/juegos/{j.idJuego}">Ver detalles</a>

			<button class="eliminar" on:click={() => borrar(j.idJuego)}>Eliminar</button>
		</div>
	{/each}
</div>

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
	.agregarJuego{
		color: rgb(252, 122, 99);
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


	input {
		padding: 10px;
		border-radius: 6px;
		border: 1px solid #888;
		font-size: 1rem;
		background: rgba(0, 0, 0, 0.8);
    color: white;
	}

	.Bton {
		padding: 10px;
		background: #66dbff;
		color: rgb(0, 0, 0);
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1rem;
		transition: 0.2s;
		width: 150px;
	}

	.Bton:hover {
		background: #cba1e9;
		transform: translateY(-2px);
	}

	.marco {
		margin-top: 10px;
		margin-left: 20px;
		margin-right: 20px;
		gap: 1.5rem;
		display: grid;
	}

	.Mseleccion {
		background: rgba(3, 3, 3, 0.795);
		padding: 15px;
		border-radius: 10px;
		color: #ffffff;
		backdrop-filter: blur(3px);
		box-shadow: 0 4px 12px rgba(0,0,0,0.35);
		transition: 0.25s;
	}

	.Mseleccion:hover {
		transform: translateY(-5px);
		background: rgba(19, 19, 19, 0.5);
	}

	.eliminar {
		background: #d62828;
		color: #ffffff;
		padding: 10px;
		border: none;
		border-radius: 6px;
		margin-top: 10px;
    	margin-left: 10px;
	}

	.eliminar:hover {
		background: #b21f1f;
		transform: translateY(-2px);
	}

	.link {
		color: #ff00c8;
		text-decoration: none;
		font-weight: bold;
	}

	.link:hover {
		text-decoration: underline;
	}
</style>
