<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-subheader>メニュー</v-subheader
        ><v-list-item-group v-model="select" color="primary">
          <v-list-item to="/" nuxt>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>タイトル</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/contact" nuxt>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>お問い合わせ</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Pincer's Blog</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="dialog = !dialog">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>検索フォーム</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="word"
            label="検索ワード"
            required
          ></v-text-field>
          <v-btn
            depressed
            color="primary"
            block
            @click="search"
            v-bind:disabled="judge"
          >
            <span v-if="judge">3文字以上入力してください</span>
            <span v-else>検索</span>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  head: {
    script: [
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2166373542921617",
        crossorigin: "anonymous",
        async: true,
      },
    ],
  },
  data: () => ({ drawer: null, dialog: false, select: 1, word: "" }),
  methods: {
    search: function () {
      this.$router.push("/search?keyword=" + this.word);
    },
  },
  computed: {
    judge: function () {
      if (this.word.length > 2) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    $route() {
      this.dialog = false;
    },
  },
};
</script>
