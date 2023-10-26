import http from '../http.js';
const login = async function(username, password) {
	const body={
		username, password
	}
	return await http.post('login',body);
	// const db = uniCloud.database();
	// return new Promise((resolve) => {
	// 	db.collection("db_admin_user").get({
	// 		username: username
	// 	}).then((res) => {
	// 		resolve(res.result.data)
	// 	}).catch((e) => {
	// 		console.log(e)
	// 	});
	// })
}

const createUser = async function(username, password, isadmin) {
	const db = uniCloud.database();
	return new Promise((resolve) => {
		db.collection("db_admin_user").add({
			username: username,
			password: password,
			isadmin: isadmin,
			createdtime: +new Date()
		}).then((res) => {
			resolve(res.result.data)
		})
	})
}

const isFirstUser = async function() {
	return await http.post('isFirstUser');
}

const allCategories = async function(pageIndex, pageSize) {
	const db = uniCloud.database();
	if(!pageIndex){
		return new Promise((resolve) => {
			db.collection("db_categorys")
				.where('isdeleted == "false"')
				.get({
					getCount: true
				})
				.then((res) => {
					resolve(res.result)
				}).catch((e) => {
					console.log(e)
				});
		})
	}
	return new Promise((resolve) => {
		db.collection("db_categorys")
			.where('isdeleted == "false"')
			.skip((pageIndex - 1) * pageSize) // 跳过前20条
			.limit(pageSize) // 获取20条
			.get({
				getCount: true
			})
			.then((res) => {
				resolve(res.result)
			}).catch((e) => {
				console.log(e)
			});
	})
}


const createCategory = async function(name) {
	const db = uniCloud.database();
	return new Promise((resolve) => {
		db.collection("db_categorys").add({
			name: name,
			isdeleted: 'false',
			createdtime: +new Date()
		}).then((res) => {
			resolve(res.result.data)
		})
	})
}


const deleteCategory = async function(id) {
	const db = uniCloud.database();
	return new Promise((resolve) => {
		db.collection("db_categorys").where({
				_id: id
			})
			.update({
				isdeleted: "true"
			}).then((res) => {
				resolve(res.result.data)
			})
	})
}

const updateCategoryName = async function(id, name) {
	const db = uniCloud.database();
	return new Promise((resolve) => {
		db.collection("db_categorys").where({
				_id: id
			})
			.update({
				name: name
			}).then((res) => {
				resolve(res.result.data)
			})
	})
}

export {
	login,
	createUser,
	isFirstUser,
	allCategories,
	createCategory,
	deleteCategory,
	updateCategoryName
}
