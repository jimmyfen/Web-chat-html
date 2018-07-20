<template>
    <div id="app" class="scroll">
        <template v-if="!isMobile">
            <el-container>
                <el-header>
                    欢迎来到聊天室
                </el-header>
            </el-container>

            <el-container>
                <el-aside width="200px">
                    <div>
                        <el-input placeholder="请输入昵称" v-model="name" @blur.stop.prevent="sendName" @keyup.native.13.prevent="blur">
                            <template slot="prepend">昵称</template>
                        </el-input>
                    </div>
                    <div class="line bg-head">在线人数：{{total}}</div>
                    <div class="scroll" style="max-height: 500px;">
                        <div class="line bg-body" v-for="item in list">{{item.name}}</div>
                    </div>
                </el-aside>
                <el-container>
                    <el-header height="50px">聊天窗口</el-header>
                    <el-main>
                        <div class="chat-box scroll">
                            <template v-for="item in messageList">
                                <div class="chat-item" v-if="item.position === 'left'">
                                    <div class="name">{{item.name}}</div>
                                    <div class="content" v-html="item.content" @click.stop="showBigImage"></div>
                                </div>
                                <div class="chat-item right" v-else-if="item.position === 'right'">
                                    <div class="name">{{item.name}}</div>
                                    <div class="content" v-html="item.content" @click.stop="showBigImage"></div>
                                </div>
                                <div class="middle" v-else><span class="tips">{{item.content}}</span></div>
                                <div class="clear"></div>
                            </template>
                        </div>
                        <div class="toolbar">
                            <div class="icon">
                                <img src="http://chat.fzhang.cn/statics/emoji/0.png" @click.stop="show" />
                                <div class="img-list" v-if="showEmoji">
                                    <img :src="src" v-for="(src, index) in emojiList" :data-index="index" @click.stop="sendEmoji" />
                                </div>
                            </div>
                            <div class="icon file">
                                <input type="file" @change="sendImage" />
                                <img src="http://chat.fzhang.cn/statics/emoji/pic.png">
                            </div>
                            <div class="clear"></div>
                        </div>
                        <el-input type="textarea" v-model="content" placeholder="请输入内容" :autosize="true" @keydown.native.13.prevent @keyup.native.13.prevent="sendMessage">
                        </el-input>
                        <div style="position: relative; border: 1px solid #dcdfe6; height: 28px; border-top: none;">
                            <el-button type="primary" size="mini" @click.stop="sendMessage">发送</el-button>
                        </div>
                    </el-main>
                </el-container>
            </el-container>
            <div v-if="showImage" class="big-img"><img :src="imageSrc"></div>
        </template>
        <template v-else>
            <el-container>
                <el-header height="5vh">
                    <i class="el-icon-menu" @click.stop="showMenuF"></i>&emsp; 聊天窗口
                </el-header>
                <div class="list" v-if="showMenu">
                    <el-input placeholder="请输入昵称" v-model="name" @blur.prevent="sendName" @click.native.stop @keyup.native.13.prevent="blur" size="mini">
                        <template slot="prepend">昵称</template>
                    </el-input>
                    <div class="line bg-head">在线人数：{{total}}</div>
                    <div class="scroll" style="max-height: 30vh;">
                        <div class="line bg-body" v-for="item in list">{{item.name}}</div>
                    </div>
                </div>
                <el-main>
                    <div class="chat-box scroll">
                        <template v-for="item in messageList">
                            <div class="chat-item" v-if="item.position === 'left'">
                                <div class="name">{{item.name}}</div>
                                <div class="content" v-html="item.content" @click.stop="showBigImage"></div>
                            </div>
                            <div class="chat-item right" v-else-if="item.position === 'right'">
                                <div class="name">{{item.name}}</div>
                                <div class="content" v-html="item.content" @click.stop="showBigImage"></div>
                            </div>
                            <div class="middle" v-else><span class="tips">{{item.content}}</span></div>
                            <div class="clear"></div>
                        </template>
                    </div>
                    <div class="toolbar">
                        <div class="icon">
                            <img src="http://chat.fzhang.cn/statics/emoji/0.png" @click.stop="show" />
                            <div class="img-list" v-if="showEmoji">
                                <img :src="src" v-for="(src, index) in emojiList" :data-index="index" @click.stop="sendEmoji" />
                            </div>
                        </div>
                        <div class="icon file">
                            <input type="file" @change="sendImage" />
                            <img src="http://chat.fzhang.cn/statics/emoji/pic.png">
                        </div>
                        <div class="clear"></div>
                    </div>
                    <el-input type="textarea" v-model="content" placeholder="请输入内容" :autosize="true" @keydown.native.13.prevent @keyup.native.13.prevent="sendMessage">
                    </el-input>
                    <div style="position: relative; height: 5vh; background-color: #fff;">
                        <el-button type="primary" size="mini" @click.stop="sendMessage">发送</el-button>
                    </div>
                </el-main>
            </el-container>
            <div v-if="showImage" class="big-img"><img :src="imageSrc"></div>
        </template>
    </div>
</template>

<script>
import Socket from '../socket/socket';
export default {
    data: function(){
        let agent = navigator.userAgent.toLowerCase(), isMobile = agent.indexOf('iphone') > -1 || agent.indexOf('ipad') > -1 || agent.indexOf('android') > -1;
        
        return {
            name: '',
            fd: [],
            list: [],
            messageList: [],
            total: 0,
            content: '',
            showEmoji: false,
            isMobile: isMobile,
            showMenu: false,
            showImage: false,
            imageSrc: '',
            emojiList: [
                'http://chat.fzhang.cn/statics/emoji/0.png',
                'http://chat.fzhang.cn/statics/emoji/1.png',
                'http://chat.fzhang.cn/statics/emoji/2.png',
                'http://chat.fzhang.cn/statics/emoji/3.png',
                'http://chat.fzhang.cn/statics/emoji/4.png',
                'http://chat.fzhang.cn/statics/emoji/5.png',
                'http://chat.fzhang.cn/statics/emoji/6.png',
                'http://chat.fzhang.cn/statics/emoji/7.png',
                'http://chat.fzhang.cn/statics/emoji/8.png',
                'http://chat.fzhang.cn/statics/emoji/9.png',
                'http://chat.fzhang.cn/statics/emoji/10.png',
                'http://chat.fzhang.cn/statics/emoji/11.png',
                'http://chat.fzhang.cn/statics/emoji/12.png',
                'http://chat.fzhang.cn/statics/emoji/13.png',
                'http://chat.fzhang.cn/statics/emoji/14.png',
                'http://chat.fzhang.cn/statics/emoji/15.png',
                'http://chat.fzhang.cn/statics/emoji/16.png',
                'http://chat.fzhang.cn/statics/emoji/17.png'
            ]
        };
    },
    methods: {
        show: function(){
            this.showEmoji = true;
        },
        sendEmoji: function(e){
            let name = sessionStorage.getItem('name');
            this.socket.ws.send(JSON.stringify({command: 'IMOJI', content: e.target.getAttribute('data-index')}));
            this.showEmoji = false;
            this.messageList.push({position: 'right', name: name, content: '<img src="' + e.target.src + '" />'});
            this.scrollToBottom();
        },
        sendImage: function(e){
            let input = e.target, file = input.files[0], fileReader = new FileReader(), name = sessionStorage.getItem('name');
            fileReader.readAsDataURL(file);
            fileReader.onload = function(){
                let message = {command: 'IMAGE', content: '<img src="' + fileReader.result + '" />'};
                this.socket.ws.send(JSON.stringify(message));
                input.value = '';
                this.messageList.push({position: 'right', name: name, content: message.content});
                this.scrollToBottom();
            }.bind(this);
        },
        sendMessage: function(e){
            e.preventDefault();
            if (this.content !== '') {
                let name = sessionStorage.getItem('name');
                this.socket.ws.send(JSON.stringify({command: 'MESSAGE', content: this.content}));
                this.messageList.push({position: 'right', name: name, content: this.content});
                this.content = '';
                this.scrollToBottom();
            }
        },
        sendName: function(e){
            let fd = parseInt(sessionStorage.getItem('fd')), index = this.fd.indexOf(fd);
            this.socket.ws.send(JSON.stringify({command: 'CHANGE_NAME', content: this.name}));
            this.messageList.push({position: 'middle', content: '你 将昵称改为 ' + this.name});
            this.list[index].name = this.name;
            sessionStorage.setItem('name', this.name);
            this.scrollToBottom();
        },
        blur: function(e){
            e.target.blur();
        },
        showMenuF: function(e){
            this.showMenu = !this.showMenu;
        },
        showBigImage: function(e){
            if (e.target.tagName.toLowerCase() === 'img') {
                this.imageSrc = e.target.src;
                this.showImage = !this.showImage;
            }
        },
        scrollToBottom: function(){
            setTimeout(function(){
                let dom = document.querySelector('.chat-box');
                dom.scrollTo(0, dom.scrollHeight);
            }, 500);
        }
    },
    mounted() {
        this.socket = new Socket(this);
        document.addEventListener('click', function(){
            this.showEmoji = false;
            this.showMenu = false;
            this.showImage = false
        }.bind(this));
    },
}
</script>

<style>
.bg-head {background-color: rgba(127, 207, 205, 1); color: #fff; margin-top: 20px;}
.bg-body {background-color: rgba(127, 207, 205, .2);}
.clear {clear: both;}
@media screen and (min-width: 601px) {
    /* 用户列表 */
    .el-header {line-height: 60px; font-size: 24px; text-align: center;}
    .el-aside {margin: 50px 0 0 50px; box-shadow: 0 1px 2px #f2f6fc;}
    .el-aside .line {height:40px; line-height: 40px; width: 100%; text-align: center;}
    /* 聊天窗口 */
    .el-container .el-container .el-header {margin: 50px 0 0 15%; width: 600px; background-color: #409eff; line-height: 50px; text-align: left; font-size: 18px; color: #fff;}
    .el-main {margin: 0 0 0 15%; padding: 0 !important; width: 600px;}
    .chat-box {height: 500px; border: 1px solid #dcdfe6; background-color: #F2F6FC;}
    .toolbar {height: 30px; border-left: 1px solid #dcdfe6; border-right: 1px solid #dcdfe6;}
    .el-container textarea {width: 600px; border-top: none; border-radius: 0; height: 100px; border-bottom: none; resize: none; font-size: 16px;}
    .el-container textarea:focus {border-left: 1px solid #dcdfe6; border-right: 1px solid #dcdfe6;}
    .el-button {position: absolute; bottom: 0; right: 0;}

    .chat-item {max-width: 400px; margin: 10px; float: left;}
    .chat-item.right {float: right;}
    .chat-item.right .name {text-align: right;}
    .chat-item .name {color: #409EFF; font-size: 16px;}
    .chat-item .content {word-break: break-all; margin-top: 5px; background-color: rgba(103, 194, 58, .7); padding: 10px; border-radius: 5px; color: #fff; position: relative;}
    .chat-item .content::before {display:block; position: absolute; border-bottom: 5px solid rgba(103, 194, 58, .7); border-left: 5px solid transparent; border-right: 5px solid transparent; width: 0; height: 0; content:''; top: -5px;}
    .chat-item.right .content::before {right: 8px;}
    .chat-item .content img {max-width: 100%; max-height: 300px;}
    .middle {text-align: center; margin: 10px;}
    .tips {padding: 2px 10px; background-color: #C0C4CC; color: #fff; border-radius: 5px; clear: both; font-size: 12px; display: inline-block;}
    /* emoji表情 */
    .toolbar .icon {height: 100%; line-height: 100%; float: left; vertical-align: middle; width: 35px; cursor: pointer; position: relative;}
    .toolbar .icon img {margin: 5px; cursor: pointer;}
    .toolbar .icon.file {overflow: hidden;}
    .toolbar .icon.file img {position: absolute; top: 0; left: 0;}
    .toolbar .icon.file input {width: 100px; height: 100px; z-index: 100; position: absolute; left: 0; top: 0; cursor: pointer; opacity: 0;}
    .toolbar .icon .img-list {width: 170px; height: 150px; position: absolute; left: 5px; bottom: 35px; z-index: 100; background: #fff; border: 1px solid #dcdfe6;}

    .big-img {width: 100%; height: 100%; background-color: rgba(0, 0, 0, .7); position: absolute; left: 0; top: 0; z-index: 1000;}
    .big-img img {max-width: 80%; max-height: 80%; position: absolute; margin: auto; left: 0; top: 0; bottom: 0; right: 0;}

    /* 滚动条 */
    .scroll {overflow: auto;}
    .scroll::scrollbar {width: 5px;}
    .scroll::-webkit-scrollbar {width: 5px;}
    .scroll::scrollbarbutton {background-color: rgba(127, 207, 205, .2);}
    .scroll::-webkit-scrollbar-button {display: none;}
    .scroll::-webkit-scrollbar-track {background-color: rgba(127, 207, 205, .2);}
    .scroll::-webkit-scrollbar-track-piece {background-color: #fff;}
    .scroll::-webkit-scrollbar-thumb {background: rgba(127, 207, 205, .3);}
}

@media screen and (max-width: 600px) {
    #app {background-color: #F2F6FC;}
    section {overflow: auto;}
    .el-header {margin: 0; background-color: #409eff; line-height: 5vh; text-align: left; font-size: 18px; color: #fff; position: relative; overflow: auto;}
    .list {position: absolute; top: 6vh; left: 10px; z-index:100; max-width: 40vw; border: 1px solid #E4E7ED; box-shadow: 0 1px 2px #E4E7ED; padding: 5px; background-color: #fff;}
    .list .el-input-group__prepend {padding: 0 10px;}
    .list .el-input__inner {padding: 0 10px;}
    .line {height: 28px; line-height: 28px; font-size: 14px; text-align: center; border-bottom: 1px solid #fff;}
    .scroll {overflow: auto;}

    .el-main {padding: 0 !important; height: 95vh;}

    .chat-box {height: 80vh;}
    .toolbar {height: 5vh; background-color: #fff;}
    .toolbar .icon {height: 100%; line-height: 100%; float: left; vertical-align: middle; width: 35px; cursor: pointer; position: relative;}
    .toolbar .icon img {margin: 5px; cursor: pointer;}
    .toolbar .icon.file {overflow: hidden;}
    .toolbar .icon.file img {position: absolute; top: 0; left: 0;}
    .toolbar .icon.file input {width: 100px; height: 100px; z-index: 100; position: absolute; left: 0; top: 0; cursor: pointer; opacity: 0;}
    .toolbar .icon .img-list {width: 170px; height: 150px; position: absolute; left: 5px; bottom: 35px; z-index: 100; background: #fff; border: 1px solid #dcdfe6;}
    .el-button {position: absolute; bottom: 0; right: 0;}

    .el-textarea__inner {height: 5vh !important; overflow: auto; border: none !important; resize: none;}

    .chat-item {max-width: 60vw; margin: 10px; float: left;}
    .chat-item.right {float: right;}
    .chat-item.right .name {text-align: right;}
    .chat-item .name {color: #409EFF; font-size: 16px;}
    .chat-item .content {word-break: break-all; margin-top: 5px; background-color: rgba(103, 194, 58, .7); padding: 10px; border-radius: 5px; color: #fff; position: relative;}
    .chat-item .content::before {display:block; position: absolute; border-bottom: 5px solid rgba(103, 194, 58, .7); border-left: 5px solid transparent; border-right: 5px solid transparent; width: 0; height: 0; content:''; top: -5px;}
    .chat-item.right .content::before {right: 8px;}
    .chat-item .content img {max-width: 100%; max-height: 30vh;}

    .middle {text-align: center; margin: 10px;}
    .tips {padding: 2px 10px; background-color: #C0C4CC; color: #fff; border-radius: 5px; clear: both; font-size: 12px; display: inline-block;}

    .big-img {width: 100%; height: 100%; background-color: rgba(0, 0, 0, 1); position: absolute; left: 0; top: 0; z-index: 1000;}
    .big-img img {max-width: 80%; max-height: 80%; position: absolute; margin: auto; left: 0; top: 0; bottom: 0; right: 0;}
}
</style>