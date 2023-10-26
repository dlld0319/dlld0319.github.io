'use strict';


function bodyToJson(body) {
	if (body) {
		return JSON.parse(body)
	} else {
		return '';
	}
}
// async function myquestions(event, context) {
// 	var body = bodyToJson(event.body);
// 	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
// 		event,
// 		context
// 	});
// 	var openid = body.openid;
// 	var main = await dbJQL.collection('toupiaomain').where({
// 		openid: openid
// 	}).get();
// 	return main;
// }

const login = async function(event, context) {
	var body = bodyToJson(event.body);
	console.log(body)
	console.log(body.username)
	var username = body.username
	var password = body.password
	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	});
	const db = dbJQL;
	return db.collection("db_admin_user").get({
		username: username
	})
}

const createUser = async function(event, context) {
	var body = bodyToJson(event.body);
	var username = body.username
	var password = body.password
	var isadmin = body.isadmin
	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	});
	const db = dbJQL;
	return db.collection("db_admin_user").add({
		username: username,
		password: password,
		isadmin: isadmin,
		createdtime: +new Date()
	})
}

const isFirstUser = async function(event, context) {
	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	});
	const db = dbJQL;
	return db.collection("db_admin_user").get()
}

const allCategories = async function(event, context) {
	var body = bodyToJson(event.body);
	var pageIndex = body.pageIndex
	var pageSize = body.pageSize
	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	});
	const db = dbJQL;
	if (!pageIndex) {
		return db.collection("db_categorys")
			.where('isdeleted == "false"')
			.get({
				getCount: true
			})
	}
	return db.collection("db_categorys")
		.where('isdeleted == "false"')
		.skip((pageIndex - 1) * pageSize) // 跳过前20条
		.limit(pageSize) // 获取20条
		.get({
			getCount: true
		})
}


const createCategory = async function(event, context) {
	var body = bodyToJson(event.body);
	var name = body.name;
	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	});
	const db = dbJQL;
	return db.collection("db_categorys").add({
		name: name,
		isdeleted: 'false',
		createdtime: +new Date()
	})
}


const deleteCategory = async function(event, context) {
	var body = bodyToJson(event.body);
	var id = body.id;
	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	});
	const db = dbJQL;
	return db.collection("db_categorys").where({
			_id: id
		})
		.update({
			isdeleted: "true"
		})
}

const updateCategoryName = async function(event, context) {
	var body = bodyToJson(event.body);
	var id = body.id
	var name = body.name
	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	});
	const db = dbJQL;
	return db.collection("db_categorys").where({
			_id: id
		})
		.update({
			name: name
		})
}


exports.main = async (event, context) => {
	var type = event.queryStringParameters.type;
	var result = null;
	switch (type) {
		case 'login':
			result = await login(event, context);
			break;
		case 'createUser':
			result = await createUser(event, context);
			break;
		case 'isFirstUser':
			result = await isFirstUser(event, context);
			if(result.data.data.length>0){
				result.data.data=[1]
			}
			break;
		case 'allCategories':
			result = await allCategories(event, context);
			break;
		case 'createCategory':
			result = await createCategory(event, context);
			break;
		case 'deleteCategory':
			result = await deleteCategory(event, context);
			break;
		case 'updateCategoryName':
			result = await updateCategoryName(event, context);
			break;
	}
	return result;
}