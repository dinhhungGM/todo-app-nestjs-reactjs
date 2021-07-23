import Grid from "@material-ui/core/Grid";
import { useQuery } from "@apollo/client";
import { GET_ALL_TODOS, AUTHENTICATION } from "../../graphql/query";
import TodoDetail from "./TodoDetail";
import CreateNewTodo from "./CreateNewTodo"


const ManageTodo = () => {
  const authenticationQuery = useQuery(AUTHENTICATION, {
    errorPolicy: "all",
  });
  const { loading, error, data } = useQuery(GET_ALL_TODOS, {
    variables: {
      userId: authenticationQuery?.data?.me?._id,
    },
  });

  return (
    <Grid container spacing={5}>
      <Grid container item xs={12} spacing={4}>
        {data?.getAllTodosOfUser?.map((item: any) => (
          <TodoDetail
            {...{
              _id: item?._id,
              title: item?.title,
              description: item?.description,
            }}
            key={item?._id}
          />
        ))}
        <CreateNewTodo />
      </Grid>
    </Grid>
  );
};

export default ManageTodo;
