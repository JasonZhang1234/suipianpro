import axios from 'axios';
import { Loading } from 'vant';
import { Toast } from 'vant';
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
//菜单

export const getMenuView= params => { return axios.get(`/fsms/mobile/menu/view`, { params: params }); };//菜单

// 碎片查看
export const getFragmentPersonalList = params => { return axios.get(`/fsms/mobile/fragment/personal/list/view`, { params: params }); };//碎片查看列表
// 碎片详情查看
export const getFragmentDetail = params => { return axios.get(`/fsms/mobile/fragment/detail/view`, { params: params }); };//碎片查看详情
// 排班表查看
export const getRosterList = params => { return axios.get(`/fsms/mobile/roster/view`, { params: params }); };
// 独立碎片查看
export const getFragmentExclusiveList = params => { return axios.get(`/fsms/mobile/fragment/list/exclusive/view`, { params: params }); };
// 独立碎片分配历史查看
export const getFragmentExclusiveHistory = params => { return axios.get(`/fsms/mobile/fragment/list/exclusive/history`, { params: params }); };
// 客服列表查看
export const getUserKefuList = params => { return axios.get(`/fsms/mobile/user/list/kefu/all`, { params: params }); };
//排他性碎片分发提交
export const postExclusiveConfirm = params => { return axios.get(`/fsms/mobile/user/list/exclusive/confirm`, { params: params }); };
//临时碎片包查看
export const getFragmentTempView= params => { return axios.get(`/fsms/mobile/fragment/temp/view`, { params: params }); };
//临时碎片包申请权限查看
export const getFragmentTempCheck= params => { return axios.get(`/fsms/mobile/fragment/temp/view/check`, { params: params }); };
//临时碎片包申请
export const getFragmentTempApply= params => { return axios.get(`/fsms/mobile/fragment/temp/apply`, { params: params }); };
//碎片提交
export const postFragmentPersonalSave= params => { return axios.get(`/fsms/mobile/fragment/personal/finish/save`, { params: params }); };
//临时碎片包审批查看
export const getApprovalView = params => { return axios.get(`/fsms/mobile/fragment/temp/approval/view`, { params: params }); };
//临时碎片包审批
export const postApprovalSave = params => { return axios.get(`/fsms/mobile/fragment/temp/approval/save`, { params: params }); };
//消息列表
export const getNoticeList = params => { return axios.get(`/fsms/mobile/notice/list/view`, { params: params }); };
//消息列表详情
export const getNoticeDetail = params => { return axios.get(`/fsms/mobile/notice/detail/view`, { params: params }); };
//消息未读数
export const getNoticeCount = params => { return axios.get(`/fsms/mobile/notice/unread/count`, { params: params }); };

//发起请求之前
axios.interceptors.request.use(
	config => {
		// 自定义加载图标
		Toast.loading({
			duration: 0, // 持续展示 toast
			message: '加载中...',
			forbidClick: true,
			loadingType: 'spinner'
		});
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

//服务器响应之后
axios.interceptors.response.use(
	response => {
		Toast.clear()
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