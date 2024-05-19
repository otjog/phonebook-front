<template>
  <MainLayout>
    <v-sheet class="mx-auto" width="300">

      <v-form ref="form">

        <v-text-field
            v-model="email"
            label="E-mail"
            required
        ></v-text-field>
        <v-text-field
            v-model="password"
            :counter="100"
            label="Password"
            required
        ></v-text-field>

        <div class="d-flex flex-column">
          <v-btn
              class="mt-4"
              color="success"
              block
              @click="click"
          >
            Login
          </v-btn>

        </div>
      </v-form>
      <div class="px-4 py-2 text-center">
        <a class="text-grey" href="/password-reset">Забыли пароль?</a>
      </div>
      <v-alert
          v-if="error"
          :text="error"
          type="error"
      ></v-alert>
    </v-sheet>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
const { setUserRegistered, setUserVerified } = useUserAuth()
const { headers } = useHeaderToken();

let form = ref();
let email = ref();
let password = ref();
let error = ref();

const router = useRouter();

const endpoint = "login/";

const click = async () => {
  error.value = null;
  const {valid} = await form.value.validate()

  if (valid) {
    try {

      await $fetch('sanctum/csrf-cookie');

      let response = await $fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: {
          email: email.value,
          password: password.value,
        }
      });

      setUserRegistered(true);
      setUserVerified(response.data.verified);

      await router.push(`/`);

    } catch (e) {
      error.value = e.data.message;
    }
  }
}

</script>