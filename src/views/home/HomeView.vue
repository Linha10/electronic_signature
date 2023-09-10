<template>
  <div class="home">
    <SignatureDialog />
  </div>
</template>

<script>
// import EleSingture from "@/components/EleSingture";
import SignatureDialog from "@/views/home/SignatureDialog";
export default {
  name: "HomeView",
  components: {
    SignatureDialog,
  },
};
</script>
