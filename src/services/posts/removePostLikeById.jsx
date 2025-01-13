
export const removePostLike = (id) => {
  fetch(`http://localhost:8088/userLikes/${id}`, {
    method: "DELETE"
  }).then(res => res.json())

}
