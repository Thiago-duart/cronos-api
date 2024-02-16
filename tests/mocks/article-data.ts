export const articleData = {
  validData: {
    body: {
      title: "valid-title",
      img: "valid-img",
      article: "valid-article",
    },
  },
  withoutTitle: {
    body: {
      img: "valid-img",
      article: "valid-article",
    },
  },
  withoutArticle: {
    body: {
      img: "valid-img",
      title: "valid-title",
    },
  },
  withoutImg: {
    body: {
      article: "valid-article",
      title: "valid-title",
    },
  },
  invalidTitle: {
    body: {
      title: "invalid-title",
      img: "valid-img",
      article: "valid-article",
    },
  },
  successArticle: {
    body: {
      id: "valid-id",
      title: "valid-title",
      img: "valid-img",
      article: "valid-article",
    }
  },
  successArticleUpdate: {
    body: {
      id: "valid-id",
      title: "update-title",
      img: "valid-img",
      article: "valid-article",
    },
  },
  invalidArticle: {
    body: {
      title: "valid-title",
      img: "valid-img",
      article: "invalid-article",
    },
  },
};
