<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" md="2"></v-col>
        <v-col cols="12" md="8">
          <v-sheet rounded="lg" class="mx-auto" width="700">

            <v-form ref="form">
              <v-text-field
                  v-model="fio"
                  :counter="100"
                  label="ФИО"
                  :rules="fioRules"
                  :error-messages="fioError"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="phone"
                  label="Номер телефона"
                  :rules="phoneRules"
                  :error-messages="phoneError"
                  required
              ></v-text-field>

              <v-checkbox
                  v-model="isFavorite"
                  label="Is favorite?"
                  required
              ></v-checkbox>

              <div class="d-flex flex-column">
                <v-btn
                    class="mt-4"
                    color="success"
                    block
                    @click="click"
                >
                  {{buttonText}}
                </v-btn>
              </div>
            </v-form>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="2"></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
const props = defineProps({
  contact: {
    type: Object,
    required: false,
  },
  buttonText: {
    type: String,
    default: 'Create'
  }
});

const {contact} = toRefs(props);

const emit = defineEmits(['action'])

onMounted(() => {
  if (contact.value) {
    fio.value = contact.value.fio
    phone.value = contact.value.phone
    isFavorite.value = !!contact.value.is_favorite;
  }
})

let form = ref();
let fio = ref();
let fioError = ref();
let phoneError = ref();
let phone = ref();
let isFavorite = ref();

const fioRules = [
  value => {
    if (value && value.length <= 100)
      return true;
    else if(value && value.length > 100)
      return 'The name field must be less than 100 characters';

    return 'Вы должны указать ФИО контакта';
  }
];

const phoneRules = [
  value => {
    if (value > 0 && value <= 99999999999)
      return true;
    else if (value && value > 99999999999)
      return 'The phone must be less than 999999999';
    return 'Вы должны указать номер телефона';
  }
];

const click = async () => {

  const {valid} = await form.value.validate()

  if (valid) {
    try {

      let contact = {
        fio: fio.value,
        phone: phone.value,
        is_favorite: isFavorite.value,
      };

      emit('action', contact);
    } catch (e) {
      setErrors(e.response._data.errors);
    }
  }
}

const setErrors = (errors) => {
  for (let error in errors) {
    let fieldName = error.split('.')[0];

    switch (fieldName) {
      case 'fio':
        fioError.value = errors[error];
        break;
      case 'price':
        phoneError.value = errors[error];
        break;
    }
  }
}
</script>