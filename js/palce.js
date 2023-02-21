//dom管理
const dom = {
	province: query('[name="province"]'),
	city: query('[name="city"]'),
	area: query('[name="area"]'),
}

//数据中转
async function getAPI(API, place, pname, cname) {
	const data = await API(pname, cname)
	renderPlace(data, place)
}
//界面渲染
function renderPlace(data, place) {
	const dom = query('[name=' + place + ']')
	const children = data.map(i => `<option>${i}</option>`).join('')
	dom.innerHTML = children
}

//省份改变事件
dom.province.onchange = async function () {
	await getAPI(getCityAPI, 'city', this.value)
	callback()
}
//城市改变事件
dom.city.onchange = callback
function callback() {
	getAPI(getAreaAPI, 'area', dom.province.value, dom.city.value)
}

//初始化界面
async function init() {
	// const getSetting = await getSettingAPI()
	await getAPI(getProvinceAPI, 'province')
}
