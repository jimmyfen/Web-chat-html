function Socket(vue){
    this.vue = vue;
    let name = sessionStorage.getItem('name'), url = 'wss://chat.fzhang.cn/ws';
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
            this.vue.fd = data.content.fds;
            this.vue.list = data.content.list;
            this.vue.total = this.vue.fd.length;
            this.vue.name = data.content.name;
            sessionStorage.setItem('name', data.content.name);
            sessionStorage.setItem('fd', data.content.fd);
            this.vue.messageList.push({position: 'middle', content: '你 加入了群聊'});
            this.vue.scrollToBottom();
        }

        // 新加入的用户
        if (data.command === 'ADD_USER') {
            this.vue.fd.push(data.content.fd);
            this.vue.list.push({name: data.content.name});
            this.vue.total = this.vue.fd.length;
            this.vue.messageList.push({postion: 'middle', content: data.content.name + ' 加入了群聊'});
            this.vue.scrollToBottom();
        }

        // 用户退出
        if (data.command === 'DELETE_USER') {
            let index = this.vue.fd.indexOf(data.content.fd);
            if (index > -1) {
              this.vue.fd.splice(index, 1);
              this.vue.list.splice(index, 1);
              this.vue.total = this.vue.fd.length;
              this.vue.messageList.push({position: 'middle', content: data.content.name + ' 退出了群聊'});
              this.vue.scrollToBottom();
            }
        }

        // 收到用户发送消息
        if (['MESSAGE', 'IMOJI', 'IMAGE'].indexOf(data.command) > -1) {
            this.vue.messageList.push({position: 'left', name: this.vue.list[this.vue.fd.indexOf(data.fd)].name, content: data.content});
            this.vue.scrollToBottom();
        }

        // 用户修改昵称
        if (data.command === 'CHANGE_NAME') {
            let index = this.vue.fd.indexOf(data.content.fd);
            this.vue.list[index].name = data.content.name;
            this.vue.messageList.push({position: 'middle', content: data.content.originName + ' 将昵称改为 ' + data.content.name});
            // this.vue.$set(this.vue.list, data.content.fd, {name: data.content.name});
            this.vue.scrollToBottom();
        }
    }
}

export default Socket;
