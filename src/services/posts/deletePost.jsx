export const deletePost = (postId) =>
  fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE"
  }).then(res => res.json())
