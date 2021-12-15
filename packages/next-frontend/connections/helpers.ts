function getParams(data?: any) {
	return {
		method: "GET",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
}
function postParams(data: any) {
	return {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	}
}

function putParams(data: any) {
	return {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
}

function deleteParams() {
	return {
		method: "DELETE",
		headers: {
			'Content-Type': 'application/json'
		}
	}
}

function parsePath(path: string) {
	if (path.startsWith('http')) return path;
	else return `${process.env.NEXT_PUBLIC_API_BASE}/api/v1${path}`;
}

export function Get(path: string, data?: any) {
	return fetch(parsePath(path), getParams(data)).then(results => results.json())
}

export function Put(path: string, data: any) {
	return fetch(parsePath(path), putParams(data)).then(results => results.json())
}

export function Post(path: string, data: any) {
	return fetch(parsePath(path), postParams(data)).then(results => results.json())
}

export function Delete(path: string) {
	return fetch(parsePath(path), deleteParams()).then(results => results.json())
}