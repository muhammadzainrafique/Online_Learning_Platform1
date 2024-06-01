import { useParams } from "react-router-dom";
import {
  useDeleteLectureMutation,
  useGetCourseQuery,
  useUpdateLectureMutation,
} from "./courseApiSlice";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
export default function InstructorViewCourse() {
  const { id: courseId } = useParams();
  const [deleteLectureId, setDeleteLectureId] = useState('')
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [editedRowIndex, setEditedRowIndex] = useState(-1);
  const { isLoading, isError, isSuccess, error, data } =
    useGetCourseQuery(courseId);
  const [
    updateLecture,
    {
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      data: updateData,
      error: updateError,
    },
  ] = useUpdateLectureMutation();
  const [
    deleteLecture,
    {
      isError: isDelError,
      error: delError,
      isSuccess: isDelSuccess,
      data: delData,
    },
  ] = useDeleteLectureMutation();
  useEffect(() => {

    if (isUpdateError) console.log(updateError?.data?.Message);
    if (isUpdateSuccess) console.log(updateData?.Message);
    if(isDelSuccess) setOpen(false);
    if(isDelError) console.log(delError?.data?.Message);

  }, [isUpdateError, isUpdateSuccess, isDelError, isDelSuccess]);
  const handleUpdateCourseClicked = async (lectureId) => {
    await updateLecture({
      lectureId,
      data: { title, description, videoLink, courseId },
    });
  };
  let content;
  const handleEditClick = (lecture) => {
    setTitle(lecture?.title);
    setDescription(lecture?.description);
    setVideoLink(lecture?.videoLink);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleLinkChange = (e) => {
    setVideoLink(e.target.value);
  };
  const handleClickOpen = (lectureId) => {
    setDeleteLectureId(lectureId);
    setOpen(true);
  };

  const handleClose = () => {
    setDeleteLectureId('');
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteLecture({lectureId:deleteLectureId, courseId});
    setDeleteLectureId('');
  };
  if (isLoading) content = <p>Loading...</p>;
  if (isError)
    content = <p>{error?.data?.Message || "something went wrong."}</p>;
  if (isSuccess) {
    content = (
      <div className="insturctor-course-view">
        <div className="delete-confirmation">
          {open && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleClose}>
                  &times;
                </span>
                <h2>Are you sure?</h2>
                <p>
                  This action cannot be undone. Are you sure you want to delete
                  this course?
                </p>
                <div className="button-container">
                  <button className="cancel-button" onClick={handleClose}>
                    No
                  </button>
                  <button className="delete-button" onClick={handleDelete}>
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <p className="text-md">{data?.Message.title}</p>
        <table>
          <thead>
            <tr>
              <th>Lecture Title</th>
              <th>Description</th>
              <th>Video Link</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.Message?.lessons?.length ? (
              data?.Message?.lessons?.map((lesson, index) => (
                <tr key={index}>
                  <td>
                    {editedRowIndex === index + 1 ? (
                      <textarea
                        style={{
                          resize: editedRowIndex !== index + 1 && "none",
                        }}
                        type="text"
                        value={title}
                        onChange={(e) => handleTitleChange(e)}
                      />
                    ) : (
                      lesson.title
                    )}
                  </td>
                  <td>
                    {editedRowIndex === index + 1 ? (
                      <textarea
                        style={{
                          resize: editedRowIndex !== index + 1 && "none",
                        }}
                        type="text"
                        value={description}
                        onChange={(e) => handleDescriptionChange(e)}
                      />
                    ) : (
                      lesson.description
                    )}
                  </td>
                  <td>
                    {editedRowIndex === index + 1 ? (
                      <textarea
                        style={{
                          resize: editedRowIndex !== index + 1 && "none",
                        }}
                        type="text"
                        value={videoLink}
                        onChange={(e) => handleLinkChange(e)}
                      />
                    ) : (
                      lesson.videoLink
                    )}
                  </td>
                  <td
                    onClick={() =>
                      setEditedRowIndex(
                        editedRowIndex === index + 1 ? -1 : index + 1
                      )
                    }
                  >
                    {editedRowIndex === index + 1 ? (
                      <FaSave
                        onClick={() => handleUpdateCourseClicked(lesson?._id)}
                      />
                    ) : (
                      <FaEdit onClick={() => handleEditClick(lesson)} />
                    )}
                  </td>
                  <td>
                    <FaTrash onClick={()=>handleClickOpen(lesson?._id)} />
                  </td>
                </tr>
              ))
            ) : (
              <p>No Lecture Found Yet</p>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  return content;
}
