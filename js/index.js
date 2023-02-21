//获取-学生统计数据
async function getStudentStatistics() {
	data = await getStudentStatisticsAPI()
	console.log(data)
	renderLine(data.year)
	renderSalary(data.salaryData)
	renderPage(data.overview)
	renderLines(data.groupData, 1)
}

////获取-学生统计数据
getStudentStatistics()
//渲染函数
function renderPage(data) {
	for (const key in data) {query(`[name=${key}]`).innerHTML = data[key]}
}
function renderLine(data) {
	const dom = query('#line')
	const myeCharts = echarts.init(dom)
	const month = data.map(item => item.month)
	const salary = data.map(item => item.salary)
	let option = {
		xAxis: {
			type: 'category',
			data: month,
		},
		tooltip: {
			trigger: 'axis',
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				data: salary,
				type: 'line',
				smooth: true,
				lineStyle: {
					color: '#5470C6',
					width: 5,
				},
				symbolSize: 12,
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgba(58,77,233,0.8)',
						},
						{
							offset: 1,
							color: 'rgba(58,77,233,0.3)',
						},
					]),
				},
			},
		],
	}
	myeCharts.setOption(option)
}

function renderSalary(data) {
	const dom = query('#salary')
	const myeCharts = echarts.init(dom)
    const salaryData = data.map(item =>{ return { "value": item.g_count + item.b_count, "name": item.label }})
	option = {
		title: {
			text: '班级薪资分布',
			left: 'center',
		},
		tooltip: {
			trigger: 'item',
		},
		legend: {
			bottom: '5%',
			left: 'center',
		},
		series: [
			{
				name: '班级工资分布',
				type: 'pie',
				radius: ['55%', '70%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2,
				},
				label: {
					show: false,
					position: 'center',
				},
				emphasis: {
					label: {
						show: false,
					},
				},
				labelLine: {
					show: false,
				},
				data: salaryData,
			},
		],
	}
	myeCharts.setOption(option)
}

function renderLines(data, index) {
	const dom = query('#lines')
	const myeCharts = echarts.init(dom)
	const lines = data[index].map(item =>{return{'name': item.name, 'hope_salary': item.hope_salary, 'salary': item.salary }})
	let option = {
		legend: {},
		tooltip: {},
		dataset: {
			source: lines,
		},
		xAxis: { type: 'category' },
		yAxis: {},
		series: [
			{ type: 'bar', name: '期望薪资' },
			{ type: 'bar', name: '就业薪资' },
		],
	}
	myeCharts.setOption(option)
}

btns.onclick = function () {
	renderLines(data.groupData, Number(event.target.innerHTML))
	for (let index = 0; index < this.children.length; index++) {this.children[index].classList.remove('btn-blue')}
	event.target.classList.add('btn-blue')
}
