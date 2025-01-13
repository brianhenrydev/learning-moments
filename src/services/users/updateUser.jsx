export const updateUser = (user) =>
  fetch(`http://localhost:8088/users/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  }).then(res => res.json())
