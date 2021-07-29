import React, { FC } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { DELETE_TODO } from "../../graphql/mutation";
import { GET_ALL_TODOS, AUTHENTICATION } from "../../graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import UpdateTodo from "./UpdateTodo";
import { useAppDispatch } from '../../app/hooks';
import {toggleUpdateTodoModal, updateTodoDetails} from './ManageTodoSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 345,
  },
}));

export type PropsTodo = {
  _id: string;
  title: string;
  description: string;
};

const TodoDetail: FC<PropsTodo> = ({ _id, title, description }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const authenticationQuery = useQuery(AUTHENTICATION, {
    errorPolicy: "ignore",
  });
  const [DeleteTodo, { data }] = useMutation(DELETE_TODO);
  const handleDeleteTodo = async (e: any) => {
    try {
        await DeleteTodo({
          variables: {
            id: _id
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
  };
  const handleUpdateTodoClick = async () => {
    dispatch(updateTodoDetails({ _id, title, description }))
    dispatch(toggleUpdateTodoModal())
  }
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://source.unsplash.com/random"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={handleUpdateTodoClick}>
              Update
            </Button>
            <Button size="small" color="primary" onClick={handleDeleteTodo}>
              Delete
            </Button>
            <UpdateTodo key={_id}/>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default TodoDetail;
