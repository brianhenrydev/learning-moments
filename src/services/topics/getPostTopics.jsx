
export const getPostTopics = () =>
  fetch(" http://localhost:8088/topics")
    .then(res => res.json())
