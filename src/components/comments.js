import React from "react";
import { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBBtn,
  MDBTextArea,
  MDBCardImage,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import Comment from "./comment";
import { fetchComments, postComment } from "../store/recipe/thunks";
import { toggleCommentIsSent } from "../store/recipe/slice";
import { selectComments, selectCommentIsSent } from "../store/recipe/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";

export function RecentComments(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const commentIssent = useSelector(selectCommentIsSent);
  const comments = useSelector(selectComments);
  const [newComment, setNewComment] = useState();
  useEffect(() => {
    dispatch(fetchComments(props.id));
  }, [dispatch]);
  useEffect(() => {
    if (commentIssent === true) {
      setNewComment("");
      dispatch(toggleCommentIsSent(false));
    }
  }, [commentIssent]);
  const onCommentPost = () => {
    dispatch(
      postComment({
        text: newComment,
        recipeId: props.id.id,
        userId: user.id,
      })
    );
  };
  const onCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const onCommentCancel = () => {
    setNewComment("");
  };
  return (
    <section
      style={{ backgroundColor: "#f7f6f6", color: "black", minWidth: 800 }}
    >
      <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="12" lg="10">
            <MDBCard className="text-dark">
              <MDBCardBody className="p-4">
                <MDBTypography tag="h4" className="mb-0">
                  Recent comments
                </MDBTypography>
                <p className="fw-light mb-4 pb-2">
                  Latest Comments section by users
                </p>

                {comments ? (
                  comments.map((comment, index) => {
                    return (
                      <div>
                        <hr className="my-0" />

                        <MDBCardBody className="p-4">
                          <div className="d-flex flex-start">
                            <Comment
                              createdAt={comment.createdAt}
                              imageUrl={comment.user.imageUrl}
                              userName={comment.user.name}
                              text={comment.text}
                            />
                          </div>
                        </MDBCardBody>
                        <hr className="my-0" />
                      </div>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </MDBCardBody>
              <MDBCardFooter
                className="py-3 border-0"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex flex-start w-100">
                  {user ? (
                    <MDBCardImage
                      className="rounded-circle shadow-1-strong me-3"
                      src={user.imageUrl}
                      alt="avatar"
                      width="40"
                      height="40"
                    />
                  ) : (
                    <div></div>
                  )}
                  <MDBTextArea
                    label="Message"
                    id="textAreaExample"
                    rows={4}
                    style={{ backgroundColor: "#fff" }}
                    wrapperClass="w-100"
                    onChange={onCommentChange}
                    value={newComment}
                  />
                </div>
                <div className="float-end mt-2 pt-1">
                  <MDBBtn onClick={onCommentPost} size="sm" className="me-1">
                    Post comment
                  </MDBBtn>
                  <MDBBtn onClick={onCommentCancel} outline size="sm">
                    Cancel
                  </MDBBtn>
                </div>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
