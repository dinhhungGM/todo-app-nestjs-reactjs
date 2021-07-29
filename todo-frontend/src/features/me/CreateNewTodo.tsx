import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TODO } from "../../graphql/mutation";
import { GET_ALL_TODOS, AUTHENTICATION } from "../../graphql/query";

const CreateNewTodo = () => {
  const authenticationQuery = useQuery(AUTHENTICATION, {
    errorPolicy: "ignore",
  });
  const [createSingleTodo, { data }] = useMutation(CREATE_TODO);
  const [newTodo, SetNewTodo] = useState({
    title: "",
    description: "",
  });
  const { title, description } = newTodo;
  const onNewTodoFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value,
    });
  };

  const OnNewTodoSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(authenticationQuery?.data?.me?._id);
    try {
      await createSingleTodo({
        variables: {
          title,
          description,
          userId: `${authenticationQuery?.data?.me?._id}`,
        },
        refetchQueries: [
          {
            query: GET_ALL_TODOS,
            variables: { userId: `${authenticationQuery?.data?.me?._id}` },
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
    SetNewTodo({
      title: "",
      description: "",
    });
  };
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <form onSubmit={OnNewTodoSubmit}>
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
            onChange={onNewTodoFormChange}
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
            value={description}
            autoComplete="javascript"
            onChange={onNewTodoFormChange}
          />
          <Button color="primary" type="submit">
            {" "}
            Create Todo
          </Button>
        </form>
      </Grid>
    </React.Fragment>
  );
};

export default CreateNewTodo;
