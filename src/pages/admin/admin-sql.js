import http from '../http.js';
const login = async function(username, password) {
	const body = {
		username,
		password
	}
	return await http.post('login', body);
}

const createUser = async function(username, password, isadmin) {
	const body = {
		username,
		password,
		isadmin
	}
	return await http.post('createUser', body);
}

const isFirstUser = async function() {
	return await http.post('isFirstUser');
}

const allCategories = async function(pageIndex, pageSize) {
	const body = {
		pageIndex,
		pageSize
	}
	return await http.post('allCategories', body);
}


const createCategory = async function(name) {
	const body = {
		name
	}
	return await http.post('createCategory', body);
}


const deleteCategory = async function(id) {
	const body = {
		id
	}
	return await http.post('deleteCategory', body);
}

const updateCategoryName = async function(id, name) {
	const body = {
		id,
		name
	}
	return await http.post('deleteCategory', body);
}

const saveArticles = async function(content, title, categoryids) {
	const body = {
		content,
		title,
		categoryids
	}
	return await http.post('saveArticles', body);
}

const allArticles = async function(pageIndex, pageSize, keyWords) {
	const body = {
		pageIndex,
		pageSize,
		keyWords
	}
	return await http.post('allArticles', body);
}
const saveArticlesEdit = async function(content, title, categoryids, id) {
	const body = {
		id,
		content,
		title,
		categoryids
	}
	return await http.post('saveArticlesEdit', body);
}

const getOneArticle = async function(id) {
	const body = {
		id
	}
	return await http.post('getOneArticle', body);
}

const alldailies = async function(pageIndex,
	pageSize) {
	const body = {
		pageIndex,
		pageSize
	}
	return await http.post('alldailies', body);
}
const createDaily = async function(content) {
	const body = {
		content
	}
	return await http.post('createDaily', body);
}
const updateDaily = async function(id,content) {
	const body = {
		id,content
	}
	return await http.post('updateDaily', body);
}
const deleteDaily = async function(id) {
	const body = {
		id
	}
	return await http.post('deleteDaily', body);
}
const getOneDaily = async function(id) {
	const body = {
		id
	}
	return await http.post('getOneDaily', body);
}

export {
	login,
	createUser,
	isFirstUser,
	allCategories,
	createCategory,
	deleteCategory,
	updateCategoryName,
	saveArticles,
	allArticles,
	saveArticlesEdit,
	getOneArticle,
	alldailies,
	createDaily,
	updateDaily,
	deleteDaily,
	getOneDaily,
}
