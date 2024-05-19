<template>
	<NuxtLayout>
		<v-app>
			<NuxtPage />
		</v-app>
	</NuxtLayout>
</template>

<script setup>
import { ofetch } from 'ofetch';

const fetchOptions = {
  baseURL: useRuntimeConfig().public.apiUrl || "http://localhost:8000/",
  headers: {
    Accept: "application/json",
  },
  credentials: 'include',
};

globalThis.$fetch = ofetch.create(fetchOptions);
</script>
