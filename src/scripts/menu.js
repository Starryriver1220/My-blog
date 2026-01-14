// 找到菜单按钮：就是说在网页中找到那个菜单按钮，把它存储到变量 menu 中
// const：声明一个常量（不能改变的变量）
// menu：变量的名字
// document.querySelector：在整个网页中搜索元素
// .menu：搜索 class="menu" 的元素
const menu = document.querySelector('.menu');

// 给菜单按钮添加点击事件监听器：就是说当用户点击菜单按钮时，执行后面的代码
// menu?：可选链操作符，表示如果 menu 存在才继续执行后面的代码，防止报错
// addEventListener：添加事件监听器
// 'click'：监听点击动作
// () => { ... }：箭头函数，表示当点击发生时，执行里面的代码
// .getAttribute = 获取元素的属性值；'aria-expanded' = 获取这个属性；返回值： 'true' 或 'false'（字符串）
// === = 比较是否相等；结果： true 或 false（布尔值）
// !isExpanded：! = 反转（取反）的意思；true 变成 false；false 变成 true，例如：isExpanded = true；!isExpanded = false
menu?.addEventListener('click', () => {
    const isExpanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', `${!isExpanded}`);
});