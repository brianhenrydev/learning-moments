
export const getPostByUserId = (userId) =>
  fetch(`http://localhost:8088/posts?userId=${userId}`)
    .then(res => res.json())
