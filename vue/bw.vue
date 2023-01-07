<template>
	<router-view></router-view>
</template>
<script>
function eventListeners(app) {
	// 1. bw:alert
	// 2. bw:redirect
	// 3. bw:loading
}
export default {
	name: "bestwebs",
	created() {
		window.addEventListener("bw:alert", function ({status, message}) {
			this.$store.dispatch("alert", {status, message});
		});
		window.addEventListener("bw:redirect", function (url) {
			this.$router.push(url);
		});
		window.addEventListener("bw:loading", function (isLoading) {
			this.$store.dispatch("loading", isLoading);
		});
	}
}
</script>