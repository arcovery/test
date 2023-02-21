const form = query('#form')
const modal = new bootstrap.Modal('#modal')
getStudentsList()
query('#openModal').onclick = addStudentInfo

let id
//获取表单信息
async function getStudentsList() {
	const data = await getStudentsListAPI()
    renderStudentList(data)
}


//编辑学生信息
async function editorStudentInfo(data) {
    query('.modal-title').innerHTML = '修改学员'
	await init()
	modal.show()
	for (const key in data) {if (query(`[name="${key}"]`)) query(`[name="${key}"]`).value = data[key]	}
	document.querySelectorAll(`[name="gender"]`)[data.gender].checked = true
	await getAPI(getCityAPI, 'city', data.province)
    await getAPI(getAreaAPI, 'area', data.province, data.city)
    query('#submit').onclick = callbackAdd.bind(data.id)
}


//删除学生信息
async function delStudentInfo(id) {
	await delStudentsAPI(id)
	getStudentsList()
}

// 添加学生信息
async function addStudentInfo() {
	form.reset()
	await init()
	dom.province.onchange()
    modal.show()
    query('#submit').onclick = callbackAdd.bind(null)
}


//提交表单
async function callbackAdd() {
	const formData = serialize(form, { hash: true })
	if (Object.keys(formData).length != 9) return toast({ title: '失败', body: '必填项不能为空' })
	for (const key in formData) {
		formData[key] = +formData[key] || +formData[key] == 0 ? +formData[key] : formData[key]
	}
	this ? await studentsModifyAPI(this, formData) : await addStudentsAPI(formData)
	getStudentsList()
	modal.hide(modal)
}


//渲染表单
function renderStudentList(data) {
	const html = data.map(
		i => ` <tr><td>${i.name}</td> <td>${i.age}</td><td>${i.gender ? '女' : '男'}</td><td>第${i.group}组</td><td>${i.hope_salary}</td><td>${i.salary}</td><td>${i.province}</td><td>
                                <a href="javascript:;" class="text-success mr-3"><i class="bi bi-pen" onclick=editorStudentInfo(${JSON.stringify(i)})></i></a>
                                <a href="javascript:;" class="text-danger"><i class="bi bi-trash" onclick=delStudentInfo(${JSON.stringify(i.id)})></i></a>
                                </td></tr>`
	)
	query('.list').innerHTML = html
	query('.total').innerHTML = data.length
}