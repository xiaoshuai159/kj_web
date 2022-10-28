<template>
  <div>
    <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">
            <el-card class="box-card">
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-card>
        </div></el-col>
        <el-col :span="10"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    name:'Replay'
}
</script>

<style scoped>
.upload-demo{
    margin-top: 50px;
    margin-left: 80px;
    margin-bottom: 30px;

}
</style>