<!-- Vista de login -->

<script>
  //@ts-nocheck
  //importación para que el usuario loggeado pueda guardarse localmente
	import { user } from "$lib/stores.js";
	//importación para hacer uso de la función login de nuestro api.js en esta vista
	import { login } from "$lib/api";

	let correo ="";
	let password ="";
	let error = "";
	//función la cual nos permite entrar o no, dependiendo de la respuesta que se haga a nuestro api.js
	//uso de funciones tipo "async" con "await" para evitar que aparezcan errores, la cual, su única finalidad es que, cada que hay un "await" es para que lo que
	//siga, en este caso, "login(correo,password)" se termine de ejecutar al 100%, para después seguir con su proceso (o sea, que luego siga las siguientes líneas)
	async function entrar() {
		try {
			const data = await login(correo, password);
			user.set(data);
      		window.location.href = "juegos";
		} catch (e) {
			error = "Usuario o contraseña incorrectos";
		}
	}

	// let correo ="";
	// let password ="";
	// let error = "";
</script>

	
<div class="Login">
	<h1 class="titulo">Iniciar sesión</h1>
	<input bind:value={correo} placeholder="Correo">
	<input type="password" bind:value={password} placeholder="Contraseña">

	<button class="Bton" on:click={entrar}>Entrar</button>
<!-- bloque #if, el cual, dependiendo de la variable error, puede o no mostrar visualmente el elemento tipo "p" -->
	{#if error}
		<p class="error">{error}</p>
	{/if}

	<a class="crear" href="register">Crear cuenta</a>

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

	.Login{
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
	.crear{
		text-align: center;
		color: white;
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
</style>
