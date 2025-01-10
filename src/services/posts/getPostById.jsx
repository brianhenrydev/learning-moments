
export const getPostById = (postId) =>
  fetch(`http://localhost:8088/posts/${postId}?_expand=topic&_expand=user`)
    .then(res => res.json())
