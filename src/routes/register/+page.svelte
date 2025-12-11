<!-- Vista de register -->

<script>
	import { base } from '$app/paths';
	import { registerUser } from "$lib/api";

	let nombre ="";
	let correo ="";
	let contra ="";
	let msg ="";
	let error ="";

	async function registrar() {
		msg ="";
		error ="";
		if(!nombre || !correo||!contra){
			error ="No se ha podido registrar";
			return;
		}
		try {
			await registerUser(nombre, correo, contra);
			msg = "Registro exitoso, ahora puede iniciar sesión";
			error ="";

			nombre="";
			correo="";
			contra="";

		} catch (e) {
			error = "No se ha podido registrar";
			msg = "";
		}

		// let nombre ="";
		// let correo = "";
		// let contra ="";
		// let msg ="";
		// let error ="";

	}
</script>

<div class="register">
	<h1 class="titulo">Registrarse</h1>

	<input bind:value={nombre} placeholder="Nombre">
	<input bind:value={correo} placeholder="Correo">
	<input bind:value={contra} type="password" placeholder="Contraseña">

	<button class="Bton" on:click={registrar}>Crear cuenta</button>
	<a class="Regresar" href="{base}/">Regresar</a>
	
	{#if msg}
		<p class="exito">{msg}</p>
	{/if}

	{#if error}
		<p class="error">{error}</p>
	{/if}
</div>

<style>

	:global(body) {
		background-color: #2c2c2c;
		font-family: 'Inter', sans-serif;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60vh;
  	}
	.titulo{
		color: #ffffff;
		text-align: center;
		top: 200px;
    	font-size: 3.5rem;
		text-shadow:0 4px 8px rgba(0, 0, 0, 1);
	}
	.register{
		margin-top: 300px;
		background-color: rgb(56, 56, 56);
		display: flex;
		gap: 12px;
		padding: 30px 80px;
		width: 300px;
		flex-direction: column;
		box-shadow: 0 4px 18px rgba(0,0,0,0.2);
		border-radius: 12px;
	}
	input {
		margin-top: 10px;
		padding: 10px;
		border-radius: 6px;
		border: 1px solid #afafaf;
		font-size: 1rem;
	}
	input:focus {
		border-color: rgb(255, 255, 255);
		box-shadow: 0 0 4px rgb(255, 255, 255);
		outline: none;
	}
	.Bton {
		padding: 10px;
		background: #000000;
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.Bton:hover {
		background: rgb(133, 133, 133);
		transform: translateY(-.5px);
	}
	.error{
		text-align: center;
		color: red;
	}
	.exito{
		text-align: center;
		color: green;
	}
	.Regresar{
		text-align: center;
		color: white;
	}
</style>