import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { GetPost } from "./discourse-client"; // this component is auto-generated from Discourse Open API spec

interface DiscoursePostProps {
  postId: string;
}

export default function DiscoursePost({ postId }: DiscoursePostProps) {
  return (
    <GetPost
      id={postId}
      base={"http://localhost:9000"}
      requestOptions={(url, method, requestBody) => ({
        headers: new Headers({'Origin': 'http://localhost:3000'}),
      })}
    >
      {(data, states, actions, meta) => (
        <Card key={data?.topic_id}>
          <Box
            position={"relative"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"top"}
            justifyContent={"center"}
            minHeight={250}
            color={"common.black"}
            textAlign={"center"}
            border={5}
          >
            <CardHeader avatar={<Avatar>{""}</Avatar>} title={data?.name} />
            <div>
              <Typography variant={"h2"}>{data?.raw}</Typography>
            </div>
          </Box>
        </Card>
      )}
    </GetPost>
  );
}
