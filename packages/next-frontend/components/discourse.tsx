import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import ReactMarkdown from "react-markdown/react-markdown.min";
import GetPostResponse from "../types/discourse";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const discourseServer = 'https://gov.near.org';

interface DiscoursePostProps {
	postId: string;
}

const DiscoursePost: React.FC<DiscoursePostProps> = (
	props: DiscoursePostProps
) => {
	const [post, setPost] = useState({} as GetPostResponse);

	useEffect(() => {
		if (!post.id) {
			axios
				.get(`${discourseServer}/posts/${props.postId}.json`)
				.then((response) => {
					setPost(response.data);
				});
		}
	}, [post, setPost]);

	const getAvatarUrl = (data: GetPostResponse | null): string =>
		discourseServer + data?.avatar_template?.replace("{size}", "90");

	return (
		<Card key={post?.topic_id}>
			<Box
				style={{ overflowWrap: "anywhere" }}
				color={"common.black"}
				border={5}
				padding={"20px"}
			>
				<CardHeader
					avatar={<Avatar src={getAvatarUrl(post)} />}
					title={post?.name}
				/>
				<div>
					<Typography>
						<ReactMarkdown>{post?.raw || ""}</ReactMarkdown>
					</Typography>
				</div>
			</Box>
		</Card>
	);
};
export default DiscoursePost;
