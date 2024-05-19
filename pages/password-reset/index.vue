<template>
  <MainLayout>
    <v-sheet class="mx-auto" width="300">

      <v-form ref="form" v-if="!isSend">
        <v-text-field
            v-model="email"
            :rules="emailRules"
            :error="!!emailError"
            :error-messages="emailError"
            label="E-mail"
            required
        ></v-text-field>

        <div class="d-flex flex-column">
          <v-btn
              class="mt-4"
              color="success"
              block
              @click="click"
          >
            Reset Password
          </v-btn>

        </div>
      </v-form>
      <div v-else>
        Проверьте ваш почтовый ящик для сброса пароля
      </div>
    </v-sheet>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
const { headers } = useHeaderToken();

let isSend = ref(false);

let form = ref();
let email = ref();
let emailError = ref();

const router = useRouter();

const endpoint = "forgot-password";

const emailRules = [
  value => {
    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value))
      return true

    return 'Вы должны указать email';
  }
];


const click = async () => {

  clearErrors();

  const {valid} = await form.value.validate()

  if (valid) {
    try {

      await $fetch('sanctum/csrf-cookie');

      await $fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: {
          email: email.value,
        }
      });

      isSend.value = true;

    } catch (e) {
      for (let error in e.data.errors) {
        switch (error) {
          case 'email':
            emailError.value = e.data.errors[error];
            break;
        }
      }
    }
  }
}

const clearErrors = () => {
  emailError.value = '';
}

</script>