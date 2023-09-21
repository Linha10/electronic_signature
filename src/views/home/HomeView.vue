<template>
  <div class="home">
    <SignatureDialog />
    <router-view />
  </div>
</template>

<script>
import SignatureDialog from "@/views/home/SignatureDialog";

export default {
  name: "HomeView",
  components: {
    SignatureDialog,
  },
};
</script>
