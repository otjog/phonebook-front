<template>
	<v-app id="inspire">
		<v-app-bar
			class="px-3"
			density="compact"
			flat
		>
			<v-spacer></v-spacer>

      <v-btn href="/">Home</v-btn>
      <v-btn v-if="userVerified" href="/create">Create</v-btn>
      <v-btn v-if="!userRegistered" href="/register">Register</v-btn>
      <v-btn v-if="!userRegistered" href="/login">Login</v-btn>
      <v-btn v-if="userRegistered" href="/logout">Logout</v-btn>

			<v-spacer></v-spacer>

		</v-app-bar>
    <v-main class="bg-grey-lighten-3">
      <v-container>
		    <slot/>
      </v-container>
    </v-main>
	</v-app>

</template>
<script setup>
  const { userVerified, userRegistered } = useUserAuth();
</script>