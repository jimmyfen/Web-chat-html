function Socket(vue){
    this.vue = vue;
    let name = sessionStorage.getItem('name'), url = 'ws://chat.fzhang.cn:9501';
    url = name ? (url + '?name=' + name) : url;
    this.ws = new WebSocket(url);
    this.ws.onopen = this.open;
    this.ws.onclose = this.close;
    this.ws.onmessage = this.message.bind(this);
}

Socket.prototype = {
    open: function(){

    },
    close: function(){

    },
    message: function(e){
        let data = JSON.parse(e.data);
        // 第一次进入或刷新页面 初始化
        if (data.command === 'INIT') {
            this.vue.list = data.content.fds;
            this.vue.total = Object.keys(data.content.fds).length;
            this.vue.name = data.content.name;
            sessionStorage.setItem('name', data.content.name);
        }

        // 新加入的用户
        if (data.command === 'ADD_USER') {
            this.vue.$set(this.vue.list, data.content.fd, {name: data.content.name});
            this.vue.total = Object.keys(this.vue.list).length;
        }

        // 用户退出
        if (data.command === 'DELETE_USER') {
            this.vue.$delete(this.vue.list, data.content.fd);
            this.vue.total = Object.keys(this.vue.list).length;
        }
    }
}

export default Socket;