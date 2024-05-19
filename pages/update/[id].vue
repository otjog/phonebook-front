<template>
  <MainLayout>
    <contact-form
        v-if="contact"
        :contact="contact"
        button-text="Update"
        @action="(contact) => update(contact)"
    />
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
const { headers } = useHeaderToken();

let contact = ref()

const route = useRoute();
const router = useRouter();

const endpoint = "api/contacts/";

onMounted(async () => {
  let response = await load();
  contact.value = response.data;
})

const load = async () => {
  try {
    return await $fetch(endpoint + route.params.id, {
      method: "GET",
      headers: headers,
      credentials: 'include',
    });

  } catch (e) {
    if (e.statusCode === 401)
      await router.push('/login');
    else
      console.log(e.data);
  }
}

const update = async (contact) => {

  await $fetch(endpoint + route.params.id, {
    method: "PUT",
    body: contact,
    headers: headers,
  });

  await router.push(`/${route.params.id}`)

}

</script>
