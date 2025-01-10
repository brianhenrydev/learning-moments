export const getPostLikes = (postId) =>
  fetch(`http://localhost:8088/userLikes?postId=${postId}`).then(res => res.json())

