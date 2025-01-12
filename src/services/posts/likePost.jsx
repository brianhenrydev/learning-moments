
export const likePost = (likeObj) =>
  fetch("http://localhost:8088/userLikes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(likeObj)
  }).then(res => res.json())
