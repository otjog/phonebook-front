<template>

</template>

<script setup>
const { setUserRegistered, setUserVerified } = useUserAuth()
const { headers } = useHeaderToken();
const router = useRouter();
const endpoint = "logout/";

onMounted(() => {
  logout();
})

const logout = async () => {
  try {
    await $fetch(endpoint, {
      method: "POST",
      headers: headers,
    });

    setUserRegistered(false);
    setUserVerified(false);
    await router.push(`/login`);

  } catch (e) {
    if (e.statusCode === 401)
      await router.push('/login');
    else
      console.log(e.data);
  }
}

</script>