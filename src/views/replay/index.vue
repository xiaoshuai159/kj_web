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
      <el-card shadow="never" style="margin-top:2%;" v-else>
        <div v-for="(item,value) in repeatData" :key="value" style="margin:15px 5px">
          {{item}}
          <!-- <p><span v-for="val in item" style="margin-right:20px">{{ val }}</span></p> -->
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Replay',
  data() {
    return {
      loading:false,
      repeatData:[],
      // repeatData:[ "Actual: 3617 packets (2490782 bytes) sent in 0.452004 seconds", "Rated: 5510530.8 Bps, 44.08 Mbps, 8002.14 pps", "Flows: 112 flows, 247.78 fps, 1522 flow packets, 2095 non-flow", "Statistics for network device: enp7s0f0", "\tSuccessful packets: 3617", "\tFailed packets: 0", "\tTruncated packets: 0", "\tRetried packets (ENOBUFS): 0", "\tRetried packets (EAGAIN): 0" ],
      uploadData:{
        i:'',
        l:'5',
        p:'8000'
      },
      repeatNum: 1,
      backNum:8000,
      fileList: [
        // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
      ],
      fileType:["pcap",'pcapng'], //允许文件类型
      fileSize:50, //文件大小限制，单位M
      fileLimit:1, //文件个数限制
      headers: { "Content-Type": "multipart/form-data" },
      options: [
        // {
        // value:'1.选项1',
        // label:'enp7s0f0',
        // }
      ],
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
    //输入框数字限制
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
    //上传文件数量超出提示
    handleExceed() {
      this.$message({ type: 'error', message: '最多支持1个附件上传' })
    },
    //获取网卡信息
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
      if(!file){
        this.$message.error('请选择pcap文件')
        return false
      }
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
      }else if(this.$refs.upload.uploadFiles.length <= 0){
        this.$message.error("请选择pcap文件");
        return false
      }else{
        this.$message.success('正在回放，请稍候！')
        this.loading = true
        this.$refs.upload.submit();
        // this.repeatData=[ "Actual: 3617 packets (2490782 bytes) sent in 0.452004 seconds", "Rated: 5510530.8 Bps, 44.08 Mbps, 8002.14 pps", "Flows: 112 flows, 247.78 fps, 1522 flow packets, 2095 non-flow", "Statistics for network device: enp7s0f0", "\tSuccessful packets: 3617", "\tFailed packets: 0", "\tTruncated packets: 0", "\tRetried packets (ENOBUFS): 0", "\tRetried packets (EAGAIN): 0" ]
        return true
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
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      console.log(file);
    },
    //文件上传成功时的回调
    fileInfo(response, file, fileList) {
      this.isHave = true
      this.loading = false
      // console.log(response[0]);     
      this.repeatData=response[0]
      // console.log(file);
      // console.log(fileList);
      this.$refs.upload.clearFiles();
      this.fileList = []
      
      // console.log(this.fileList);
      // let v1=Object.values(response[0])
      // console.log(v1);
      // for (let i=0;i<v1.length;i++){
      //   console.log(v1[i]);
      //   this.repeatData[i] = v1[i]
      // }
    },
    //文件上传失败时的回调
    fileError(err, file, fileList) {
      this.isHave = false
      console.log(err);
    },
  },
  watch:{
    value:{
      handler(newValue){
        // console.log(this.$refs.selectLable.selected.label);
        let a = this.options.find((item,index)=>{
          if(item.value == newValue){
            this.uploadData.i = item.label
            // console.log(item.label);
            // console.log(this.uploadData);
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
    }
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