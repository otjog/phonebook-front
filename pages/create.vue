<template>
	<MainLayout>
    <contact-form
        v-if="!error"
        @action="(contact) => create(contact)"
    />
    <v-alert
        v-else
        :text="error"
        type="error"
    ></v-alert>
	</MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
const { headers } = useHeaderToken();

const router = useRouter();
const endpoint = "api/contacts/";

let error = ref();

const create = async (contact) => {

  try {
    let response = await $fetch(endpoint, {
      method: "POST",
      body: contact,
      headers:headers,
    });

    await router.push(`/${response.data.id}`)
  } catch (e) {
    if (e.statusCode === 401)
      await router.push('/login');
    else
      error.value = e.data.message;
  }
}

</script>
