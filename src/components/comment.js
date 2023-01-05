const Comment = (props) => {
  return <div dangerouslySetInnerHTML={{ __html: props.text }}></div>;
};
export default Comment;
