<template>
  <MainLayout>
    <v-sheet class="mx-auto" width="300">

      <v-form ref="form">
        <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            :error="!!nameError"
            :error-messages="nameError"
            label="Name"
            required
        ></v-text-field>
        <v-text-field
            v-model="email"
            :rules="emailRules"
            :error="!!emailError"
            :error-messages="emailError"
            label="E-mail"
            required
        ></v-text-field>
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
const { headers } = useHeaderToken();

let form = ref();
let name = ref();
let nameError = ref();
let email = ref();
let emailError = ref();
let password = ref();
let confirm_password = ref();
let passwordError = ref();

const router = useRouter();

const endpoint = "register/";

const nameRules = [
  value => {
    if (value && value.length <= 100)
      return true;
    else if(value && value.length > 100)
      return 'The name field must be less than 100 characters';

    return 'Вы должны указать ФИО контакта';
  }
];

const emailRules = [
  value => {
    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value))
      return true

    return 'Вы должны указать email';
  }
];

const passwordRules = [
  value => {
    if (value && value.length < 10)
      return 'The name field must be more than 10 characters';
    else if(value && value.length > 100)
      return 'The name field must be less than 100 characters';

    return true;
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
          name: name.value,
          email: email.value,
          password: password.value,
          password_confirmation : confirm_password.value
        }
      });

      setUserRegistered(true);
      await router.push(`/`);

    } catch (e) {
      for (let error in e.data.errors) {
        switch (error) {
          case 'email':
            emailError.value = e.data.errors[error];
            break;
          case 'password':
            passwordError.value = e.data.errors[error];
            break;
          case 'name':
            nameError.value = e.data.errors[error];
            break;
        }
      }
    }
  }
}

const clearErrors = () => {
  nameError.value = '';
  emailError.value = '';
  passwordError.value = '';
}

</script>