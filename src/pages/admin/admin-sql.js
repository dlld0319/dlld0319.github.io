import http from '../http.js';
const login = async function(username, password) {
	const body={
		username, password
	}
	return await http.post('login',body);
}

const createUser = async function(username, password, isadmin) {
	const body={
		username, password, isadmin
	}
	return await http.post('createUser',body);
}

const isFirstUser = async function() {
	return await http.post('isFirstUser');
}

const allCategories = async function(pageIndex, pageSize) {
	const body={
		pageIndex, pageSize
	}
	return await http.post('allCategories',body);
}


const createCategory = async function(name) {
	const body={
		name
	}
	return await http.post('createCategory',body);
}


const deleteCategory = async function(id) {
	const body={
		id
	}
	return await http.post('deleteCategory',body);
}

const updateCategoryName = async function(id, name) {
	const body={
		id, name
	}
	return await http.post('deleteCategory',body);
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
