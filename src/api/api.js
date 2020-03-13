import axios from 'axios';
// axios.defaults.baseURL = 'http://www.baidu.com/';
let base = '';

export const getAuthority = params => { return axios.get(`/app/getAuthority.html`, { params: params }); };//权限

export const getDeploytList = params => { return axios.get(`/app/getDeploytList.html`, { params: params }); };//任务列表

export const getRankingsByLevel2 = params => { return axios.get(`/app/getRankingsByLevel2.html`, { params: params }); };//支行排名

export const getRankingsByLevel3 = params => { return axios.get(`/app/getRankingsByLevel3.html`, { params: params }); };//网点排名

export const toSvaeFeedbackContent = params => { return axios.get(`/app/toSvaeFeedbackContent.html`, { params: params }); };//反馈页面所需信息

export const getDeploytInfo = params => { return axios.get(`/app/getDeploytInfo.html`, { params: params }); };//工作部署详细信息

export const svaeFeedbackContent = params => { return axios.get(`/app/svaeFeedbackContent.html`, { params: params }); };//保存反馈信息

export const getFeedbcakInfo = params => { return axios.get(`/app/getFeedbcakInfo.html`, { params: params }); };//查看反馈详细信息

// 碎片查看
export const getFragmentPersonalList = params => { return axios.get(`/fsms/mobile/fragment/personal/list/view`, { params: params }); };//碎片查看列表
// 碎片详情查看
export const getFragmentDetail = params => { return axios.get(`/fsms/mobile/fragment/detail/view`, { params: params }); };//碎片查看详情
// 排班表查看
export const getRosterList = params => { return axios.get(`/fsms/mobile/roster/view`, { params: params }); };//排班表确认
// 独立碎片查看
export const getFragmentExclusiveList = params => { return axios.get(`/fsms/mobile/fragment/list/exclusive/view`, { params: params }); };//排班表确认
// 独立碎片分配历史查看
export const getFragmentExclusiveHistory = params => { return axios.get(`/fsms/mobile/fragment/list/exclusive/history`, { params: params }); };//排班表确认
// 客服列表查看
export const getUserKefuList = params => { return axios.get(`/fsms/mobile/user/list/kefu/all`, { params: params }); };//排班表确认






//发起请求之前
axios.interceptors.request.use(
	config => {
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

//服务器响应之后
axios.interceptors.response.use(
	response => {
		//服务器返回token保存到session中
		if (response.data.token != null) {
			sessionStorage.setItem('token', response.data.token);
		}
		return response;
	},
	error => {
		return Promise.reject(error)
	}
);