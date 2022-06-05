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
          <v-img :src="list.image.url" height="300px">
            <v-chip
              class="ma-2"
              color="primary"
              v-for="(data, id) in list.tags"
              :key="id"
              v-text="data.tagname"
              :to="'/tag/' + data.id"
            >
            </v-chip>
          </v-img>
          <v-card-title>{{ list.title }}</v-card-title>
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
  watchQuery: ["page", "id"],
  head() {
    return {
      title: "タグ「" + this.tag + "」を含むページ一覧",
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

    const tag = await $microcms
      .get({
        endpoint: "tag",
        queries: {
          filters: "id[equals]jhsp9c2jvb4",
          limit: 1,
          fields: "tagname",
        },
      })
      .catch((res) => redirect("/404"));

    const data = await $microcms
      .get({
        endpoint: "article",
        queries: {
          filters: "tags[contains]" + route.params.id,
          limit: 12,
          fields: "id,title,image,tags,createdAt",
          orders: "-createdAt",
          offset: (page - 1) * 12,
        },
      })
      .catch((res) => redirect("/404"));

    return { tag: tag.contents[0].tagname, data: data };
  },
  watch: {
    page(from) {
      this.$router.push("?page=" + from);
    },
  },
};
</script>
