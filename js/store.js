//获取-学生统计数据
async function getStudentStatistics() {
	const data = await getStudentStatisticsAPI()
	localStorage.setItem('data', JSON.stringify(data))
}
