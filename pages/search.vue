<template>
  <v-container>
    <h1>検索ワード「{{ $route.query.keyword }}」</h1>
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
  name: "tag",
  watchQuery: ["page", "keyword"],
  head() {
    return {
      title: "「" + this.$route.query.keyword + "」を含むページ一覧",
    };
  },
  data() {
    return {
      page: 1,
    };
  },
  async asyncData({ $microcms, route, redirect }) {
    let page;

    if (route.query.page) {
      page = route.query.page;
    } else {
      page = 1;
    }

    const data = await $microcms
      .get({
        endpoint: "article",
        queries: {
          filters:
            "title[contains]" +
            route.query.keyword +
            "[or]body[contains]" +
            route.query.keyword,
          limit: 12,
          fields: "id,title,image,tags,createdAt",
          orders: "-createdAt",
          offset: (page - 1) * 12,
        },
      })
      .catch((res) => redirect("/404"));

    return { data: data };
  },
  watch: {
    page(from) {
      this.$router.push("?page=" + from);
    },
  },
};
</script>
