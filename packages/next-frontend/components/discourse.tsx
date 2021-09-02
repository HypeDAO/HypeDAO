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
      base={"https://gov.near.org"}
    >
      {(data, states, actions, meta) => (
        <Card key={data?.topic_id}>
          <Box
            style={{overflowWrap: "anywhere"}}
            color={"common.black"}
            textAlign={"center"}
            border={5}
          >
            <CardHeader avatar={<Avatar>{""}</Avatar>} title={data?.name} />
            <div>
              <Typography>{data?.raw}</Typography>
            </div>
          </Box>
        </Card>
      )}
    </GetPost>
  );
}
