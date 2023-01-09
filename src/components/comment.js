import { MDBCardImage, MDBIcon, MDBTypography } from "mdb-react-ui-kit";

const Comment = (props) => {
  return (
    <div style={{ minWidth: 700 }}>
      {props.imageUrl ? (
        <MDBCardImage
          className="rounded-circle shadow-1-strong me-3"
          src={props.imageUrl}
          alt="avatar"
          width="60"
          height="60"
        />
      ) : (
        <div></div>
      )}
      <div>
        <MDBTypography tag="h6" className="fw-bold mb-1">
          {props.userName}
        </MDBTypography>
        <div className="d-flex align-items-center mb-3">
          <p className="mb-0">{props.createdAt}</p>
        </div>
        <p className="mb-0">{props.text}</p>
      </div>
    </div>
  );
};
export default Comment;
