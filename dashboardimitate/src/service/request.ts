import axios, { AxiosRequestConfig,Method } from 'axios';
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
	(config:any) => {
		NProgress.start();
		config.headers['Access-Control-Allow-Orign'] = '*';
		config.headers['Access-Control-Allow-Credentials'] = 'true';
		config.headers.Authorization = `${window.localStorage.getLocal(TOKEN)}`;
		config.headers[TENANT_ID] = `${window.sessionStorage.getSession(TENANT_ID)}`;
		config.headers[PROJECT_ID] = `${window.sessionStorage.getSession(PROJECT_ID)}`;
		config.headers[ROLE_ID] = `${window.sessionStorage.getSession(ROLE_ID)}`;
		config.headers[DC_ID] = `${window.sessionStorage.getSession(DC_ID)}`;
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

 interface Options   {
  url: string,
  data?: any,
  method: string,
  paramsSerializer?: (params: any) => string,
  headers?: any,
  option?: any
}

/**
 * _json方法
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求配置]
 * @param {String} method [请求方法]
 */
function _post(url, params = {}, option = {}, ) {
	return new Promise((resolve, reject) => {
		const { restUrl, data } = restfulAPI(url, params);
		let options:AxiosRequestConfig<any> = {
			url: restUrl,
			data,
			method: 'POST',
			paramsSerializer: (params) => {
				return qs.stringify(params, { indices: false });
			},
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			...option
		};
		axios(options as any)
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
	post: _post,

	restfulAPI: restfulAPI
};
