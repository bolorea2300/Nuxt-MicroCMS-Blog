<template>
  <v-container>
    <h1>このページは存在しません</h1>
  </v-container>
</template>

<script>
export default {
  name: "404",
  head() {
    return {
      title: "このページは存在しません",
      meta: [{ hid: "robots", name: "robots", content: "noindex" }],
    };
  },
};
</script>
