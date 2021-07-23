import { Modal, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectIsOpenUpdateTodoModal,
  toggleUpdateTodoModal,
  selectTodoDetails,
  updateTodoDetails,
} from "./ManageTodoSlice";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_TODO } from "../../graphql/mutation";
import { GET_ALL_TODOS, AUTHENTICATION } from "../../graphql/query";

const UpdateTodo = () => {
  const authenticationQuery = useQuery(AUTHENTICATION, {
    errorPolicy: "ignore",
  });
  const [updateSingleTodo, { data }] = useMutation(UPDATE_TODO);

  const handleUpdateSingleTodo = async (e: any) => {
      console.log(_id, title, description);
      
      try {
          await updateSingleTodo({
              variables: {
                 _id, title, description 
             },
             refetchQueries: [
                {
                  query: GET_ALL_TODOS,
                  variables: { userId: `${authenticationQuery?.data?.me?._id}` },
                }
            ]
          })
      } catch (error) {
          console.log(error)
      }
      handleCloseModal()
  }

  const isOpenModal = useAppSelector(selectIsOpenUpdateTodoModal);
  const dispatch = useAppDispatch();
  const { _id, title, description } = useAppSelector(selectTodoDetails);

  const HandleUpdateFormDataChange = (e: any) => {
    dispatch(
      updateTodoDetails({
        ...{ _id, title, description },
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleCloseModal = () => {
    dispatch(updateTodoDetails({ _id: "", title: "", description: "" }));
    dispatch(toggleUpdateTodoModal());
  };

  return (
    <Modal
      show={isOpenModal}
      onHide={() => handleCloseModal()}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="title"
          label="title"
          type="title"
          id="title"
          autoComplete="javascript"
          value={title}
          onChange={HandleUpdateFormDataChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="description"
          label="description"
          type="description"
          id="description"
          autoComplete="javascript"
          value={description}
          onChange={HandleUpdateFormDataChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button color="primary" onClick={handleUpdateSingleTodo}> Update Todo</Button>
        <Button onClick={() => handleCloseModal()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateTodo;
