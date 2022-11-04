<template>
  <div>
    <el-row>
      <el-col :span="6" style="margin-right:20px">
        <div >
          <el-select v-model="value" clearable placeholder="请选择网卡" size="small" ref="selectLable" @change="currStationChange">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
        <div>循环次数:
          <div style="display:inline-block" class="inputDiv">
            <el-input v-model="repeatNum" size="small" type="number" @blur="inputBlur"></el-input>
          </div> 次
        </div>
      </el-col>
      <el-col :span="5">
        <div>回放速度:
          <div style="display:inline-block" class="inputDiv">
            <el-input v-model="backNum" size="small" type="number" @blur="inputBlur2"></el-input>
          </div> 包/秒
        </div>
      </el-col>
      <el-col :span="6">
        <!-- action="http://192.168.120.2:8000/upload_file/" :http-request="httpRequest" params.append('i', this.$refs.selectLable.selected.label)
      // params.append('l', this.repeatNum)
      // params.append('p', this.backNum)-->
        <div class="grid-content bg-purple">
          <el-upload class="upload-demo" ref="upload" action="pcap_replay/"
            :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :on-success="fileInfo" :on-exceed="handleExceed" :limit="1"
            :on-error="fileError" :before-upload="beforeUpload" :auto-upload="false" :data="uploadData">
            <el-button slot="trigger" size="small" type="primary" style="margin-left:20px;">选取pcap文件</el-button>
            <el-button style="margin-left: 20px;" size="small" type="success" @click="submitUpload" :loading="loading">回放</el-button>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <div>
      <el-empty :image-size="200" v-if="!isHave"></el-empty>
      <el-card shadow="never" style="margin-top:2%;" v-else>{{repeatData}}</el-card>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Replay',
  data() {
    return {
      loading:false,
      repeatData:{},
      uploadData:{
        i:'',
        l:'5',
        p:'8000'
      },
      repeatNum: 5,
      backNum:8000,
      fileList: [
        // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
      ],
      fileType:["pcap",'pcapng'], //允许文件类型
      fileSize:50, //文件大小限制，单位M
      fileLimit:1, //文件个数限制
      headers: { "Content-Type": "multipart/form-data" },
      options: [],
      value: '',
      isHave: false
    };
  },
  mounted(){
   this.getNetCardList()
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true
    next(0)
  },
  methods: {
    inputBlur(){
      if(this.repeatNum){
        if(parseInt(this.repeatNum)>10||parseInt(this.repeatNum)<1){
          this.$message.error('请输入1-10数字！')
          this.repeatNum = 5
        }
      }else{
        this.$message.error('请输入1-10数字！')
        this.repeatNum=5
      }
    },
    inputBlur2(){
      if(this.backNum){
        if(parseInt(this.backNum)>10000||parseInt(this.backNum)<1){
          this.$message.error('请输入1-10000数字！')
          this.backNum = 5000
        }
      }else{
        this.$message.error('请输入1-10000数字！')
        this.backNum=5000
      }
    },
    currStationChange(val) {
      let opt= {};
      opt= this.options.find((item)=>{
          return item.val === val;
      });
      // console.log(opt.label);
    },
    handleExceed() {
        this.$message({ type: 'error', message: '最多支持1个附件上传' })
      },
    async getNetCardList(){
      const netCardList=await this.$API.replay.reqNetCardList()
      if (netCardList == "") return;
      netCardList.shift()
      for (var i = 0; i < netCardList.length; i++) {
        if (netCardList[i] != "") {
          this.options.push({
            value: `1.选项${i + 1}`,
            label: netCardList[i],
          });
        }
      }
    },
    //文件上传前的处理
    beforeUpload(file){
      if(file.type != null||file.type!=""||file.type!=undefined){
        //截取文件后缀
        const FileExt = file.name.replace(/.+\./,"").toLowerCase()
        // 判断文件大小
        const isLt5M =file.size/1024/1024 < 50
        if(!isLt5M){
          this.$message.error('上传文件不能大于50MB！')
          return false 
        }
        if(this.fileType.includes(FileExt)){
          return true
        }else{
          this.$message.error('上传文件格式不正确！')
          return false 
        }
      }
    },
    // httpRequest(option) {
    //     this.fileList.push(option)
    //   },
    //点击上传
    submitUpload() {
      if(!this.value){
        this.$message.error('请选择网卡！')
        return false
      }else{
        this.$message.success('正在回放，请稍候！')
        this.loading = true
        this.$refs.upload.submit();
      }
      // let params = new FormData()
      // this.fileList.forEach((x) => {
      //     // console.log(x.data);
      //     params.append('f', x.file)
      //   });
      // // console.log(this.$refs.selectLable.selected.label,this.repeatNum,this.backNum);
      // params.append('i', this.$refs.selectLable.selected.label)
      // params.append('l', this.repeatNum)
      // params.append('p', this.backNum)
      // console.log([{'f':params.get('f')},{'i':params.get('i')},{'l':params.get('l')},{'p':params.get('p')}]);
      // const fileInfo= await this.$API.replay.reqfileList([{'f':params.get('f')},{'i':params.get('i')},{'l':params.get('l')},{'p':params.get('p')}])
      // console.log(fileInfo);
      // this.fileList = []//集合清空
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //文件上传成功时的回调
    fileInfo(response, file, fileList) {
      this.isHave = true
      this.loading = false
      console.log(response);
      this.repeatData=response
    },
    //文件上传失败时的回调
    fileError(err, file, fileList) {
      this.isHave = false
      console.log(err);
    },
    filterOptions() {
      let list1 = [];
      for (var i = 0; i < this.netCardList.length; i++) {
        // console.log(this.netCardList[i].value);
        list1.push(this.netCardList[i]);
      }
      let list2 = [...new Set(list1)];
      if (list2 == "") return;
      for (var i = 0; i < list2.length; i++) {
        if (list2[i] != "") {
          this.options.push({
            value: `1.选项${i + 1}`,
            label: list2[i],
          });
        }
      }
    },
  },
  watch:{
    value:{
      handler(newValue){
        // console.log(this.$refs.selectLable.selected.label);
        let a = this.options.find((item,index)=>{
          if(item.value == newValue){
            this.uploadData.i = item.label
            console.log(item.label);
            console.log(this.uploadData);
          }
        })
      }
    },
    repeatNum:{
      handler(newValue){
        this.uploadData.l = newValue
      }
    },
    backNum:{
      handler(newValue){
        this.uploadData.p = newValue
      }
    },

  }
}
</script>

<style scoped lang="less">
.el-select {
  margin-left: 20px;
}

.upload-demo {
  display: inline-block;
}
.inputDiv{
    /deep/.el-input__inner {
    display: inline-block;
    padding:0 5px;
    width:50px
  }
}

/deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
 }
/deep/ input::-webkit-outer-spin-button {
   -webkit-appearance: none !important;
 }
/deep/ input[type="number"] {
   -moz-appearance: textfield;
}
</style>