<template>
	<MainLayout>
    <v-row v-if="contact && !error">
      <v-col cols="12" md="2"></v-col>

      <v-col
          cols="12"
          md="8"
      >

        <v-btn
            @click="switchFavorite()"
            :prepend-icon="(contact.is_favorite) ? 'mdi-star-off' : 'mdi-star'"
            color="blue"
            :text="(contact.is_favorite) ? 'Remove from favorites' : 'Add to favorites'"
        />

        <h1>{{contact.fio}}</h1>

        <div>{{contact.phone}}</div>

        <v-btn
            @click="remove"
            prepend-icon="mdi-delete-outline"
            color="red"
        >
          Delete
        </v-btn>

        <v-btn
            @click="update"
            prepend-icon="mdi-pencil"
            color="green"
        >
          Change
        </v-btn>

      </v-col>

      <v-col cols="12" md="2">    </v-col>
    </v-row>
    <v-alert
        v-if="error"
        :text="error"
        type="error"
    ></v-alert>
	</MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
const { headers } = useHeaderToken();

let contact = ref();
let error = ref();
const router = useRouter();
const route = useRoute();

const endpoint = "api/contacts/";

onMounted(async () => {
	let response = await load();
  contact.value = response.data;
})

const load = async () => {
  try {
    return await $fetch(endpoint + route.params.id, {
      headers: headers,
    });

  } catch (e) {
    if (e.statusCode === 401)
      await router.push('/login');
    else
      error.value = e.data.message;
  }
}

const remove = async () => {
  try {
    await $fetch(endpoint + route.params.id, {
      method: "DELETE",
      headers: headers,
    });

    await router.push(`/`)

  } catch (e) {
    error.value = e.data.message;
  }
}

const update = async () => {
  router.push(`/update/${route.params.id}`)
}

const switchFavorite = async () => {
  try {
    await $fetch(endpoint + route.params.id, {
      method: "PUT",
      headers: headers,
      body: {
        'is_favorite': !contact.value.is_favorite
      },
    });

    contact.value.is_favorite = !contact.value.is_favorite;
  } catch (e) {
    error.value = e.data.message;
  }
}

</script>
