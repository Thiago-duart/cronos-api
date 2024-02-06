export const articleData = {
  validData: {
    body: {
      title: "valid-title",
      article: "valid-article",
    },
  },
  withoutTitle: {
    body: {
      article: "valid-article",
    },
  },
  withoutArticle: {
    body: {
      title: "valid-title",
    },
  },
  invalidTitle: {
    body: {
      title: "invalid-title",
      article: "valid-article",
    },
  },
  successArticle: {
    body: {
      id: "valid-id",
      title: "valid-title",
      article: "valid-article",
    },
  },
  invalidArticle: {
    body: {
      title: "valid-title",
      article: "invalid-article",
    },
  },
};
