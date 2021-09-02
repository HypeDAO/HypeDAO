import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import ReactMarkdown from 'react-markdown/react-markdown.min';
import { GetPost, GetPostResponse } from "./discourse-client"; // this component is auto-generated from Discourse Open API spec

const discourseServer = 'https://gov.near.org'

interface DiscoursePostProps {
  postId: string;
}

export default function DiscoursePost({ postId }: DiscoursePostProps) {
    
    const getAvatarUrl = (data: GetPostResponse | null): string => (
        discourseServer + data?.avatar_template?.replace('{size}', '90')
    )

    return (
    <GetPost
      id={postId}
      base={discourseServer}
    >
      {(data, states, actions, meta) => (
        <Card key={data?.topic_id}>
          <Box
            style={{overflowWrap: "anywhere"}}
            color={"common.black"}
            border={5}
            padding={"20px"}
          >
            <CardHeader avatar={<Avatar src={getAvatarUrl(data)}/>} title={data?.name} />
            <div>
              <Typography>
                  <ReactMarkdown>{data?.raw || ''}</ReactMarkdown>
              </Typography>
            </div>
          </Box>
        </Card>
      )}
    </GetPost>
  );
}
