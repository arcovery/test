// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		document.body.classList.add('sidenav-pinned')
		document.body.classList.add('ready')
	}, 200)
})

//封装toast
function toast(data) {
	const dom = document.querySelector('#liveToast')
	dom.querySelector('strong').innerText = data.title
	dom.querySelector('.toast-body').innerText = data.body
	new bootstrap.Toast(dom, { delay: 1000 }).show()
}
//退出按钮事件
logout.onclick = () => {
	localStorage.clear()
	location.href = './login.html'
}


//选择器
function query(data) {
    return document.querySelector(data)
}