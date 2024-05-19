<template>
	<MainLayout>

    <div v-if="!error">
      <v-row v-if="data">
        <v-col
            v-for="contact in data"
            :key="contact"
            cols="12"
            sm="6"
            md="4"
            lg="3"
        >
          <v-card
              class="mx-auto"
          >
            <v-card-title>
              {{contact.fio}}
            </v-card-title>
            <v-card-subtitle>
              {{contact.phone}}
            </v-card-subtitle>
            <template v-slot:actions>
              <v-btn
                  color="blue"
                  size="small"
                  variant="flat"
                  :href="`/${contact.id}`"
              >
                View
              </v-btn>
              <v-btn
                  color="green"
                  size="small"
                  variant="flat"
                  :href="`/update/${contact.id}`"
              >
                Change
              </v-btn>
            </template>
          </v-card>
        </v-col>
      </v-row>
      <v-btn class="my-5" block href="/create">Add contact</v-btn>
      <v-btn class="my-5" block v-if="cursor" @click="loadContacts()">Load more</v-btn>
    </div>
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

let data = ref([]);
let cursor = ref();
let error = ref();
const endpoint = "api/contacts/";

onMounted(async () => {
  cursor.value = endpoint;
	await loadContacts();
})

const loadContacts = async () => {
	if (cursor.value) {

    try {
      let response = await $fetch(cursor.value, {
        method:"GET",
        headers: headers,
      });
      data.value.push(...response.data);
      cursor.value = response.links.next;
    } catch (e) {
      if (e.statusCode === 401)
        await router.push('/login');
      else
        error.value = e.data.message;
    }

	}
}

</script>
