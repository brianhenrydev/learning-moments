
export const getUserById = (userId) =>
  fetch(`http://localhost:8088/users/${userId}`).then(res => res.json())
