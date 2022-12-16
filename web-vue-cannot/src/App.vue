<template>
	<router-view />
</template>

<script>
import { firebase } from "@firebase/app"
import "firebase/firestore"

firebase.initializeApp({
	apiKey: "AIzaSyBHfYiw5qw8UIR_yiQITTb7lc6G-ZX1aes",
	authDomain: "codesprint-cannot.firebaseapp.com",
	projectId: "codesprint-cannot",
	storageBucket: "codesprint-cannot.appspot.com",
	messagingSenderId: "1087857857195",
	appId: "1:1087857857195:web:0b7b3aa13bcffa3f0f5dee",
	measurementId: "G-345SY9D60G"
})

export default {
	methods: {
		open() {
			this.$router.push("/about")
		}
	}
}
</script>

<style>
html,
body,
#app {
	width: 100%;
	height: 100%;
}

* {
	margin: 0;
	padding: 0;
}

::-webkit-scrollbar {
	width: 0px;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
