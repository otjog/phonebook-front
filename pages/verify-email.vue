<template>
  <MainLayout>

  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
const { setUserVerified } = useUserAuth()
const { headers } = useHeaderToken();

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  let api_url = route.query.api_url+'&signature='+route.query.signature;
  await verify(api_url);

})

const verify = async (url) => {
  try {
    await $fetch(url, { headers: headers });

    setUserVerified(true);
    await router.push(`/`);

  } catch (e) {
    if (e.statusCode === 401)
      await router.push('/login');
    else
      console.log(e.data);
  }
}

</script>