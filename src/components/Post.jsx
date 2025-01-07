import "./Post.css"
export const Post = ({ id, title, body, date, user, topic }) => (
  <div className="post">
    <div className="post-title">{title}</div>
    <div className="post-user">{user}</div>
    <div className="post-body">{body}</div>
    <div className="post-topic">{topic}</div>
    <div className="post-timestamp">{date}</div>
  </div>
) 
