<template>
  <MainLayout>
    <v-sheet class="mx-auto" width="300">

      <v-form ref="form">

        <v-text-field
            v-model="password"
            :counter="100"
            :rules="passwordRules"
            :error="!!passwordError"
            :error-messages="passwordError"
            label="Password"
            required
        ></v-text-field>
        <v-text-field
            v-model="confirm_password"
            :counter="10"
            :rules="passwordRules"
            label="Confirm Password"
            required
        ></v-text-field>

        <div class="d-flex flex-column">
          <v-btn
              class="mt-4"
              color="success"
              block
              @click="click"
          >
            Register
          </v-btn>

        </div>
      </v-form>
    </v-sheet>
  </MainLayout>
</template>
<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
const { setUserRegistered } = useUserAuth()

let form = ref();
let token = ref();
let email = ref();

let password = ref();
let confirm_password = ref();
let passwordError = ref();

const router = useRouter();
const route = useRoute();


const endpoint = "http://localhost:8000/reset-password";

const passwordRules = [
  value => {
    if (value && value.length < 10)
      return 'The name field must be more than 10 characters';
    else if(value && value.length > 100)
      return 'The name field must be less than 100 characters';

    return true;
  }
];

onMounted(() => {
  token.value = route.params.token;
  email.value = route.query.email;

  console.log(token.value);
  console.log(email.value);
})

const click = async () => {

  clearErrors();

  const {valid} = await form.value.validate()

  if (valid) {
    try {

      await $fetch('sanctum/csrf-cookie', {
        credentials: 'include',
        headers: {
          Accept: "application/json"
        },
      });

      await $fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value
        },
        credentials: 'include',
        body: {
          token: token.value,
          email: email.value,
          password: password.value,
          password_confirmation : confirm_password.value
        }
      });

      setUserRegistered(true);
      await router.push(`/login`);

    } catch (e) {
      for (let error in e.data.errors) {
        switch (error) {
          case 'password':
            passwordError.value = e.data.errors[error];
            break;
        }
      }
    }
  }
}

const clearErrors = () => {
  passwordError.value = '';
}

</script>