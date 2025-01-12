
export const editUserPost = (post) =>
  fetch(`http://localhost:8088/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post)
  }).then(res => res.json())
