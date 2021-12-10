import axios from 'axios';
// import { Message } from '@alicloud/console-components';
// 进度条功能
import NProgress from 'nprogress';
// import errorCode from './errorCode';
// import cache from '@/utils/storage';
import qs from 'qs';
// import { messageShow } from '@/utils/utils';

const TOKEN = 'token';
const TENANT_ID = 'skyview-tenant-id';
const PROJECT_ID = 'skyview-project-id';
const ROLE_ID = 'skyview-role-id';
const DC_ID = 'skyview-dc-id';

// To add to window  解决promise 在ie中未定义的问题
if (!window.Promise) {
	window.Promise = Promise;
}

NProgress.configure({
	minimum: 0.1,
	easing: 'ease',
	speed: 800,
	showSpinner: false
});

const isObject = (value) => value !== null && typeof value === 'object';

axios.defaults.withCredentials = true;

axios.defaults.transformRequest = [
	function (data) {
		/**
		 * The workhorse; converts an object to x-www-form-urlencoded serialization.
		 * @param {Object} obj
		 * @return {String}
		 */
		var param = function (obj) {
			var query = '',
				name,
				value,
				fullSubName,
				subName,
				subValue,
				innerObj,
				i;

			for (name in obj) {
				value = obj[name];

				if (value instanceof Array) {
					for (i = 0; i < value.length; ++i) {
						subValue = value[i];
						fullSubName = name + '[' + i + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				} else if (value instanceof Object) {
					for (subName in value) {
						subValue = value[subName];
						var str = 'labels+[+[0-9]+]$';
						if (name.match('labels') && !name.match(str)) {
							fullSubName = name + '[' + subName + ']';
							innerObj = {};
							innerObj[fullSubName] = subValue;
							query += param(innerObj) + '&';
						} else {
							fullSubName = name + '.' + subName + '';
							innerObj = {};
							innerObj[fullSubName] = subValue;
							query += param(innerObj) + '&';
						}
					}
				} else if (value == null || value === '') {
					delete obj[name];
				} else {
					query +=
						encodeURIComponent(name) +
						'=' +
						encodeURIComponent(value == null ? '' : value) +
						'&';
				}
			}
			return query.length ? query.substr(0, query.length - 1) : query;
		};

		return isObject(data) && String(data) !== '[object File]'
			? param(data)
			: data;
	}
];
// http request 拦截器
axios.interceptors.request.use(
	(config) => {
		NProgress.start();
		config.headers['Access-Control-Allow-Orign'] = '*';
		config.headers['Access-Control-Allow-Credentials'] = 'true';
		config.headers.Authorization = `${cache.getLocal(TOKEN)}`;
		config.headers[TENANT_ID] = `${cache.getSession(TENANT_ID)}`;
		config.headers[PROJECT_ID] = `${cache.getSession(PROJECT_ID)}`;
		config.headers[ROLE_ID] = `${cache.getSession(ROLE_ID)}`;
		config.headers[DC_ID] = `${cache.getSession(DC_ID)}`;
		return config;
	},
	(err) => {
		NProgress.done();
		return Promise.reject(err);
	}
);

// http response 拦截器
axios.interceptors.response.use(
	(response) => {
		NProgress.done();
		return response;
	},
	(err) => {
		NProgress.done();
		console.log(err);
		const {
			response: { status }
		} = err;
		if (status === 401) {
			return;
		} else {
			err.message = ''
				// errorCode[err?.response?.status] ||
				// `${err?.response?.data?.data}`;
		}
		return Promise.reject(err);
	}
);

/**
 * _get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求配置]
 * @param {String} method [请求方法]
 * @return {Promise}
 */
function _get(url, params = {}, option = {}, method = 'GET') {
	return new Promise((resolve, reject) => {
		const { restUrl, data } = restfulAPI(url, params);
		let options = {
			url: restUrl,
			params: data,
			method,
			paramsSerializer: (params) => {
				return qs.stringify(params, { indices: false });
			},
			...option
		};
		axios(options)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err.data);
			});
	});
}

// function _delete(url, params = {}, option = {}) {
// 	return _get(url, params, option, 'DELETE');
// }

function _delete(url, params = {}, option = {}, method = 'DELETE') {
	return new Promise((resolve, reject) => {
		const { restUrl, data } = restfulAPI(url, params);
		let options = {
			url: restUrl,
			params: data,
			method,
			headers: {
				// 'Content-Type':"application/x-www-form-urlencoded",
				Accept: '*/*'
			},
			paramsSerializer: (params) => {
				return qs.stringify(params, { indices: false });
			},
			...option
		};
		axios(options)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err.data);
			});
	});
}

/**
 * _post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求配置]
 * @param {String} method [请求方法]
 * 'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
 */
function _post(url, params = {}, option = {}, method = 'POST') {
	return new Promise((resolve, reject) => {
		console.log(params);
		const { restUrl } = restfulAPI(url, params);
		let options = {
			url: restUrl,
			data: JSON.stringify(params),
			method,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			...option
		};
		axios(options)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err.data);
			});
	});
}

/**
 * _post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求配置]
 * @param {String} method [请求方法]
 * 'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
 */
function _postForUpload(url, params = {}, option = {}, method = 'POST') {
	return new Promise((resolve, reject) => {
		const { restUrl, data } = restfulAPI(url, params);
		let options = {
			url: restUrl,
			data: data,
			method,
			headers: {
				'Content-Type': 'multipart/form-data;boundary=ABC'
			},
			// Multipart
			// processData: false,
			// contentType: false,
			...option
		};

		axios(options)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err.data);
			});
	});
}

function _put(url, params = {}, option = {}) {
	return _post(url, params, option, 'PUT');
}

/**
 * _json方法
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求配置]
 * @param {String} method [请求方法]
 */
function _json(url, params = {}, option = {}, method = 'POST') {
	return new Promise((resolve, reject) => {
		const { restUrl, data } = restfulAPI(url, params);
		let options = {
			url: restUrl,
			data,
			method,
			paramsSerializer: (params) => {
				return qs.stringify(params, { indices: false });
			},
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			...option
		};
		axios(options)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err.data);
			});
	});
}

/**
 * _json方法
 * @param {String} url [请求的url地址]
 * @return {Boolean} method [请求方法]
 */
const isRestful = (url) => {
	return url.indexOf('{') > -1;
};

/**
 * _json方法
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求配置]
 * @param {String} method [请求方法]
 */
const restfulAPI = function (url, formData) {
	if (!url) throw new Error('url不能为空');
	let restfulUrl = url;
	const newFormData = Array.isArray(formData)
		? [...formData]
		: { ...formData };
	if (isRestful(url) && formData) {
		const restfulArray = url.split('/');
		restfulUrl = restfulArray
			.map((item) => {
				if (item.indexOf('{') !== -1) {
					const key = item.substring(1, item.length - 1);
					delete newFormData[key];
					return formData[key] || '';
				}
				return item;
			})
			.join('/');
	}
	return { restUrl: restfulUrl, data: newFormData };
};

export default {
	get: _get,
	delete: _delete,
	post: _post,
	put: _put,
	json: _json,
	restfulAPI: restfulAPI
};
