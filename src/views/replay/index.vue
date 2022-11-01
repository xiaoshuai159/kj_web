<template>
  <div>
    <el-upload
        class="upload-demo"
        ref="upload"
        action="http://192.168.120.2:8000/upload_file/" 
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-success="fileInfo"
        :on-error="fileError"
        :auto-upload="false"
        >
        <el-button slot="trigger" size="small" type="primary" style="margin-left:20px;">选取pcap文件</el-button>
        <el-select v-model="value" clearable placeholder="请选择网卡" size="small">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select> 
        <el-select v-model="value2" clearable placeholder="请选择循环次数" size="small">
            <el-option
            v-for="item in options2"
            :key="item.value2"
            :label="item.label2"
            :value="item.value2">
            </el-option>
        </el-select>
        <el-select v-model="value3" clearable placeholder="请选择回放速度" size="small">
            <el-option  
            v-for="item in options3"
            :key="item.value3"
            :label="item.label3"
            :value="item.value3">
            </el-option>
        </el-select>
        <el-button style="margin-left: 20px;" size="small" type="success" @click="submitUpload">回放</el-button>
    </el-upload>
    <div>
      <el-empty :image-size="200" v-if="!isHave"></el-empty>
      <el-card shadow="never" style='margin-top:2%;' v-else>我有数据啦</el-card>
    </div>
    
  </div>
</template>

<script>
export default {
    name:'Replay',
    data() {
      return {
        fileList: [
            // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
        ],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        options2: [{
          value2: '选项1',
          label2: '黄金糕'
        }, {
          value2: '选项2',
          label2: '双皮奶'
        }, {
          value2: '选项3',
          label2: '蚵仔煎'
        }, {
          value2: '选项4',
          label2: '龙须面'
        }, {
          value2: '选项5',
          label2: '北京烤鸭'
        }],
        value2: '',
        options3: [{
          value3: '选项1',
          label3: '黄金糕'
        }, {
          value3: '选项2',
          label3: '双皮奶'
        }, {
          value3: '选项3',
          label3: '蚵仔煎'
        }, {
          value3: '选项4',
          label3: '龙须面'
        }, {
          value3: '选项5',
          label3: '北京烤鸭'
        }],
        value3: '',
        isHave:false
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
        console.log(this.$refs.upload.submit());
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      //文件上传成功时的回调
      fileInfo(response, file, fileList){
        this.isHave = true
        console.log(response);
      },
      //文件上传失败时的回调
      fileError(err, file, fileList){
        this.isHave = false
        console.log(err);
      }
    }
}
</script>

<style scoped lang="less">
.el-select{
    margin-left: 20px;
}
</style>