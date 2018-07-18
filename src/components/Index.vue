<template>
    <div id="app" class="scroll">
        <el-container>
            <el-header>
                欢迎来到聊天室
            </el-header>
        </el-container>

        <el-container>
            <el-aside width="200px">
                <div>
                    <el-input placeholder="请输入昵称" v-model="name">
                        <template slot="prepend">昵称</template>
                    </el-input>
                </div>
                <div class="line bg-head">在线人数：{{total}}</div>
                <div class="scroll" style="max-height: 500px;">
                    <div class="line bg-body" v-for="(item, index) in list" :data-fd="index">{{item.name}}</div>
                </div>
            </el-aside>
            <el-container>
                <el-header height="50px">聊天窗口</el-header>
                <el-main>
                    <div class="chat-box scroll">                        
                        <div class="chat-item">
                            <div class="name">lala</div>
                            <div class="content">11111111111111111111111111111111111111111</div>
                        </div>  
                        <div class="clear"></div>                     
                        <div class="chat-item right">
                            <div class="name">lala</div>
                            <div class="content">1111111111111111111111111111111111111111111</div>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="toolbar">
                    </div>
                    <el-input type="textarea" v-model="content" class="scroll" placeholder="请输入内容" :autosize="true">
                    </el-input>
                    <div style="position: relative; border: 1px solid #dcdfe6; height: 28px; border-top: none;">
                        <el-button type="primary" size="mini">发送</el-button>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Socket from '../socket/socket';
export default {
    data: function(){
        return {
            name: '',
            list: {},
            total: 0,
            content: ''
        };
    },
    mounted() {
        this.socket = new Socket(this);
    },
}
</script>

<style>
.el-header {line-height: 60px; font-size: 24px}
.el-aside {margin: 50px 0 0 50px; box-shadow: 0 1px 2px #f2f6fc;}
.el-aside .line {height:40px; line-height: 40px; border-bottom: 1px solid #fff; width: 100%; text-align: center;}
.bg-head {background-color: rgba(127, 207, 205, 1); color: #fff; margin-top: 20px;}
.bg-body {background-color: rgba(127, 207, 205, .2);}

.el-container .el-container .el-header {margin: 50px 0 0 15%; width: 600px; background-color: #409eff; line-height: 50px; text-align: left; font-size: 18px; color: #fff;}
.el-main {margin: 0 0 0 15%; padding: 0; width: 600px;}
.chat-box {height: 600px; border: 1px solid #dcdfe6; background-color: #F2F6FC;}
.toolbar {height: 30px; border-left: 1px solid #dcdfe6; border-right: 1px solid #dcdfe6;}
.el-container textarea {width: 600px; border-top: none; border-radius: 0; height: 100px; border-bottom: none; resize: none; font-size: 16px;}
.el-container textarea:focus {border-left: 1px solid #dcdfe6; border-right: 1px solid #dcdfe6;}
.el-button {position: absolute; bottom: 0; right: 0;}

.chat-item {max-width: 300px; margin: 10px; float: left;}
.chat-item.right {float: right;}
.chat-item.right .name {text-align: right;}
.chat-item .name {color: #409EFF; font-size: 16px;}
.chat-item .content {word-break: break-all; margin-top: 5px; background-color: rgba(103, 194, 58, .7); padding: 10px; border-radius: 5px; color: #fff; position: relative;}
.chat-item .content::before {display:block; position: absolute; border-bottom: 5px solid rgba(103, 194, 58, .7); border-left: 5px solid transparent; border-right: 5px solid transparent; width: 0; height: 0; content:''; top: -5px;}
.chat-item.right .content::before {right: 8px;}

.clear {clear: both;}

.scroll {overflow: auto;}
.scroll::scrollbar {width: 5px;}
.scroll::-webkit-scrollbar {width: 5px;}
.scroll::scrollbarbutton {background-color: rgba(127, 207, 205, .2);}
.scroll::-webkit-scrollbar-button {display: none;}
.scroll::-webkit-scrollbar-track {background-color: rgba(127, 207, 205, .2);}
.scroll::-webkit-scrollbar-track-piece {background-color: #fff;}
.scroll::-webkit-scrollbar-thumb {background: rgba(127, 207, 205, .3);}
</style>