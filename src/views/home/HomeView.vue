<template>
  <div class="home">
    <SignatureDialog />
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
