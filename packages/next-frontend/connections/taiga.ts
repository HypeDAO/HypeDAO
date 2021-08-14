
export interface TaskInterface {
	title: string;
	bounty: string;
	link: string;
	assigned_to: null | {
		username: string;
		full_name: string;
	};
	status: null | {
		name: "New" | "Ready" | "In progress" | "Ready for test" | "Done";
		color: string;
		is_closed: boolean;
	}
}
export function getTaigaTasks(): Promise<TaskInterface[]> | null {
	const url = "https://api.taiga.io/api/v1/userstories?project=416197&status__is_archived=false"
	const params = {
		method: "GET",
	}

	const getTaskLink = (ref: string) => "https://tree.taiga.io/project/starpause-hype-dao/us/" + ref
	const getTaskTitleAndBounty = (taskSubject: string) => {
		let bounty = ""
		let title = ""
		//split up the string into chunks based on "("
		const byParenthesis = taskSubject.split("(")

		//if there is only one chunk that means there was no bounty found
		if (byParenthesis.length === 1) {
			bounty = "N/A"
			title = taskSubject
		} else {
			//get title by removing everything after the last "("
			for (let i = 0; i < byParenthesis.length - 1; i++) {
				const chunk = byParenthesis[i]
				title += chunk
			}
			//get bounty from the last "()" in the subject
			const last = byParenthesis[byParenthesis.length - 1]
			const onlyContent = last.split(")")
			bounty = onlyContent[0]
		}
		return { bounty, title }
	}
	try {
		return fetch(url, params)
			.then(results => results.json())
			.then(results => results.map((task: any) => {
				const { title, bounty } = getTaskTitleAndBounty(task.subject)
				return {
					title,
					bounty,
					link: getTaskLink(task.ref),
					assigned_to: (task.assigned_to
						? {
							username: task.assigned_to_extra_info.username,
							full_name: task.assigned_to_extra_info.full_name_display,
						}
						: null),
					status: {
						name: task.status_extra_info.name,
						color: task.status_extra_info.color,
						is_closed: task.status_extra_info.is_closed,
					}
				} as TaskInterface
			}))
	} catch (err) {
		console.log(err)
		return null
	}
}