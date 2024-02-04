const get = async function(type) {
	return new Promise(async (resolve, reject) => {
		uni.request({
			url: `https://fc-mp-fb19cbbf-7877-4ed9-b04c-6ee15f347da4.next.bspapp.com/db?type=${type}`,
			method: "GET",
			success: res => {
				resolve(res);
			},
			fail: err => {
				console.log(err)
			}
		})
	})
}

const post = async function(type, data) {
	console.log(data)
	return new Promise(async (resolve, reject) => {
		uni.request({
			url: `https://fc-mp-fb19cbbf-7877-4ed9-b04c-6ee15f347da4.next.bspapp.com/db?type=${type}`,
			method: "POST",
			data: data,
			success: res => {
				resolve(res.data);
			},
			fail: err => {
				console.log(err)
			}
		})
	})
}

export default {
	get,
	post
}
