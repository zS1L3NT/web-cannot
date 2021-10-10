<template>
	<main>
		<div>
			<div id="firebaseui-auth-container"></div>
			<div id="loader">Loading...</div>
		</div>
	</main>
	<div class="background"></div>
	<div class="blackshade"></div>
</template>

<script>
import * as firebaseui from "firebaseui"
import { firebase } from "@firebase/app"
import "firebaseui/dist/firebaseui.css"
import "firebase/auth"
import axios from "axios"

const ui = new firebaseui.auth.AuthUI(firebase.auth())
ui.start("#firebaseui-auth-container", {
	callbacks: {
		signInSuccessWithAuthResult: function(authResult) {
			axios.post("http://5bdd-58-182-61-207.ngrok.io/login", { id: authResult.user.uid })
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			return true
		},
		uiShown: function() {
			// The widget is rendered.
			// Hide the loader.
			document.getElementById("loader").style.display = "none"
		}
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow: "popup",
	signInSuccessUrl: "warehouses",
	signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
	]
})

export default {
	name: "Login"
}
</script>

<style scoped>
main {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

main > div {
	z-index: 2;
}

.background {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;

	filter: blur(3px);
	background-image: url("/psa.png");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}

.blackshade {
	width: 100%;
	height: 100%;
	background-color: #000000;
	opacity: 0.6;
	position: absolute;
	top: 0;
	z-index: 1;
}

.fullscreen-image {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}
</style>
