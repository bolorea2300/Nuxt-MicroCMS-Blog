<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="list in data.contents"
        :key="data.contents.id"
      >
        <v-card :to="'/article/' + list.id" nuxt>
          <v-card-title>{{ list.title }}</v-card-title>
          <div class="tags">
            <v-chip
              class="ma-2"
              color="primary"
              v-for="(data, id) in list.tags"
              :key="id"
              v-text="data.tagname"
              :to="'/tag/' + data.id"
            >
            </v-chip>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <div class="clear"></div>

    <div class="text-center mt-50">
      <v-pagination
        v-model="page"
        :length="Math.ceil(data.totalCount / 12)"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "index",
  watchQuery: ["page"],
  head() {
    return {
      titleTemplate: null,
      meta: [
        {
          hid: "description",
          property: "description",
          content: "Pincerという者が運営するブログです。",
        },
      ],
    };
  },
  data() {
    return {
      page: 1,
    };
  },
  async asyncData({ $microcms, route, error }) {
    let number;

    if (route.query.page) {
      number = route.query.page;
    } else {
      number = 1;
    }

    try {
      const data = await $microcms.get({
        endpoint: "article",
        queries: {
          limit: 12,
          orders: "-createdAt",
          offset: (number - 1) * 12,
          fields: "id,title,image,tags,createdAt",
        },
      });

      return { data: data };
    } catch (err) {
      error({
        statusCode: 404,
        reason: "ページ一覧が取得できません",
        message: "しばらくしてからお試しください。",
      });
    }
  },
  watch: {
    page(from) {
      this.$router.push("?page=" + from);
    },
  },
};
</script>
