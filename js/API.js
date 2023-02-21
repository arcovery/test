//axios 基址
axios.defaults.baseURL = 'http://ajax-api.itheima.net'

//请求拦截器
axios.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	if (window.location.pathname == '/login' || '/register') {
		return config
	} else if (token) config.headers.Authorization = token
	return config
})
//响应拦截器
axios.interceptors.response.use(
	response => {
		console.log(response)
		if (response.status == 200) {
			toast({
				title: '成功',
				body: response.data.message,
			})
		} else {
			toast({
				title: '成功',
				body: '操作成功',
			})
		}

		return response.data.data
	},
	error => {
		console.dir(error)
		if (error.response.status == 401) {
			toast({
				title: '用户登录超时',
				body: error.response.data.message,
			})
		}
		Promise.reject(error)
	}
)
//登录API
function login(data) {
	return axios.post('/login', data)
}
//注册API
function register(data) {
	return axios.post('/register', data)
}
//获取-学生统计数据
function getStudentStatisticsAPI() {
	return axios.get('/dashboard')
}
//获取-学生列表
function getStudentsListAPI(data) {
	return axios.get('/students', data)
}
///删除-学生
function delStudentsAPI(id) {
	return axios.delete(`/students/${id}`)
}
///添加-学生
function addStudentsAPI(data) {
	return axios.post(`/students`, data)
}
//获取-学生详情
function getStudentsInfoAPI(id) {
	return axios.get(`/students/${id}`)
}
//修改-学生详情
function studentsModifyAPI(id, data) {
	return axios.put(`/students/${id}`, data)
}
//获取个人信息
function getSettingAPI() {
	return axios.get('/api/settings')
}
//获取省份信息
function getProvinceAPI() {
	return axios.get('/api/province')
}
//获取城市信息
function getCityAPI(pname) {
	return axios.get('/api/city?pname=' + pname)
}
//获取地区信息
function getAreaAPI(pname, cname) {
	return axios.get('/api/area?pname=' + pname + '&cname=' + cname)
}
//修改个人信息
function sendSettingAPI(params) {
	return axios.put('/api/settings', params)
}
