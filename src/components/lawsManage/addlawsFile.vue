<template>
    <div style="margin-top: 30px;">
        <div class="goback" @click="goBack()">
            <span>返回上一级</span>
            <i class="el-icon-arrow-left"></i>
        </div>
        <div class="addlaws">
            <el-card shadow="always" style="height: 95%;width: 98%;margin: 0 auto; margin-bottom: 20px;">
                <el-timeline>
                    <el-timeline-item placement="top" timestamp="法律法规文件" style="font-weight: 600;color: #4a2525;">
                        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign"
                            ref="formlabelalign" label-position="top">
                            <el-form-item label="文件名称" prop="lawName">
                                <el-input v-model="formLabelAlign.lawName" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item prop="industryld" label="行业:" v-model="formLabelAlign.industryld">
                                <el-select v-model="formLabelAlign.industryld" placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in industryOpt" :key="item.key" :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="出版时间" prop="publishTime"
                                style="display: inline-block;width: 45%;margin-right: 10%;">
                                <el-date-picker v-model="formLabelAlign.publishTime" type="date" placeholder="选择日期"
                                    style="width: 100%;" :prefix-icon="formLabelAlign.publishTime ? '   ' : 'el-icon-date'">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="生效时间" style="display: inline-block; width: 45%;" prop="enactTime">
                                <el-date-picker v-model="formLabelAlign.enactTime" type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placement="bottom-start"
                                    class="input-time" placeholder="请选择时间" style="width: 100%;"
                                    :prefix-icon="formLabelAlign.enactTime ? '   ' : 'el-icon-date'">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="备注" prop="lawDesc">
                                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="formLabelAlign.lawDesc"
                                    resize="none">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="附件" prop="file">
                                <el-upload action="#" name="files" ref="upload" :limit="1" :show-file-list="true"
                                    :on-exceed="handleExceed" :auto-upload="false" class="upload-file"
                                    :file-list="fileList || []" :http-request="uploadFile" :on-change="fileChange"
                                    :on-remove="fileRemove">
                                    <el-button size="small" type="primary" class="styleupload"
                                        style="height: 32px;width: 80px;">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip orange">一次仅能上传一个文件</div>
                                </el-upload>
                            </el-form-item>
                            <!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
                                    multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList"
                                    :http-request="uploadFile">
                                    <el-button size="small" type="primary" class="styleupload"
                                        style="height: 32px;width: 80px;">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">一次仅能上传一个文件</div>
                                </el-upload> -->
                            <!-- </el-form-item> -->
                        </el-form>
                    </el-timeline-item>
                    <el-timeline-item placement="top" class="hiddentime">
                    </el-timeline-item>
                </el-timeline>
                <div style="float: right;margin-bottom: 20px;">
                    <el-button type="primary" @click="loadAPI()">保存</el-button>
                    <el-button type="info" @click="resetForm()">重置</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            labelPosition: 'top',
            id: 0,
            lawName: '',
            IndustryCode: '',
            publishTime: '',
            page: '',
            pageSize: '',
            formLabelAlign: {
                lawName: '',
                industryld: '',
                publishTime: new Date(2016, 9, 10, 18, 40),
                enactTime: new Date(2016, 9, 10, 18, 40),
                lawDesc: '',
                files: [],//上传的文件
                file: '',
            },
            industryOpt: [],
            // lawNameOpt: [],
            fileList: [],
            labelPosition: 'right',
            // uploadURL: "/app/edit", //文件上传地址
        };
    },
    created() {
        this.id = parseInt(this.$route.query.id) || 0;
        this.lawName = this.$route.query.lawName;
        this.industryId = this.$route.query.IndustryCode;
        this.publishTime = this.$route.query.publishTime;
        this.pageSize = this.pageSize;
        this.pageNum = this.currentPage;
        if (this.$route.query.from == 'update' && this.id != 0) { //获取浏览器url的参数，from页面来源: table客户端列表页面，update更新客户端信息页面 
            this.getLawById();
        }
        this.industryAllList();
    },

    mounted() {
        window.addEventListener("keydown", this.handleSearch);

    },
    destroyed() {
        window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
    },
    watch: {
        $route: {
            handler(route) {
                this.resetForm();
                this.industryAllList();
                this.id = parseInt(this.$route.query.id) || 0;
                //console.log('this.id'+this.id)
                if (this.$route.query.from == 'update' && this.id != 0) { //获取浏览器url的参数，from页面来源: table客户端列表页面，update更新客户端信息页面 
                    this.getLawById();
                }
            },
            immediate: true
        }
    },


    methods: {
        goBack() {
            this.$router.push({
                path: "/lawsManage",
                query: {
                    from: "to", //更新客户端信息页面
                    //修改返回原来页面所需参数
                    lawName: this.lawName,
                    industryId: this.IndustryCode,
                    publishTime: this.publishTime,
                    pageSize: this.pageSize,
                    pageNum: this.currentPage

                },
            });

        },
        // 上传文件数量限制
        handleExceed(files, fileList) {
            console.log(files, fileList);
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
                } 个文件`
            );
        },
        //上传文件
        uploadFile(param) {
            console.log("param", param);
            //把上传的文件赋值给data属性的file
            this.formLabelAlign.file = param.file;
            this.formLabelAlign.fileName = param.file;
        },
        //文件已上传则关闭校验
        fileChange(uploadFile, fileList) {
            this.formLabelAlign.file = uploadFile
            if (fileList.length !== 0) {
                this.$refs.formLabelAlign.validateField('file')
            }
        },
        //文件移除重新校验  
        fileRemove(uploadFile, fileList) {
            if (fileList.length === 0) {
                this.formLabelAlign.file = null
                this.$refs.formLabelAlign.validateField('file')
            }
        },
        //按id查询
        async getLawById() {
            console.log('被调用getLawByIdgetLawById');
            const { data: res } = await this.$http.get('/api/law/getLawById?id=' + this.id);
            if (res.code == 200) {
                this.formLabelAlign.lawName = res.data.lawName;
                this.formLabelAlign.industryld = res.data.industryId;
                this.formLabelAlign.publishTime = res.data.publishTime;
                this.formLabelAlign.enactTime = res.data.enactTime;
                this.formLabelAlign.lawDesc = res.data.lawDesc;

            }
        },

        //查询行业
        async industryAllList() {
            const { data: res } = await this.$http.get("/api/industry/industryAllList");
            if (res.code == 200) {
                this.industryOpt = res.data.map((item) => ({
                    key: item.id,
                    value: item.industryName,
                }));
            };
            console.log(this.industryOpt)
        },
        //重置
        resetForm() {
            this.formLabelAlign.lawName = '';
            this.formLabelAlign.industryld = '';
            this.formLabelAlign.publishTime = '';
            this.formLabelAlign.enactTime = '';
            this.formLabelAlign.lawDesc = '';
        },
        //保存
        async loadAPI() {
            // if (
            //     !this.formLabelAlign.lawName ||
            //     !this.formLabelAlign.industryld ||
            //     !this.formLabelAlign.publishTime ||
            //     !this.formLabelAlign.enactTime
            // ) {
            //     this.$message.error("请填写完整信息");
            //     return; // 如果有输入框为空，停止执行后续请求
            // }
            // let list = {
            //     id: this.id,
            //     lawName: this.formLabelAlign.lawName,
            //     industryld: this.formLabelAlign.industryld,
            //     publishTime: this.formLabelAlign.publishTime,
            //     enactTime: this.formLabelAlign.enactTime,
            //     lawDesc: this.formLabelAlign.lawDesc,
            //     // pageSize: this.pageSize,
            //     // pageNum: this.currentPage
            // };

            const formData = new FormData()
            // formData.append('lawName', this.formLabelAlign.lawName)
            // formData.append('industryld', this.formLabelAlign.industryld)
            // formData.append('publishTime', this.formLabelAlign.publishTime)
            // formData.append('lawDesc', this.formLabelAlign.lawDesc)
            // formData.append('file', this.formLabelAlign.file)

            const otherParams = {
                lawName: this.formLabelAlign.lawName,
                industryld: this.formLabelAlign.industryld,
                publishTime: this.formLabelAlign.publishTime,
                lawDesc: this.formLabelAlign.lawDesc,
                // file: this.formLabelAlign.file
            }
            const json = JSON.stringify(otherParams)
            const blob = new Blob([json], { type: 'application/json' })

            formData.append('lawEntity', this.formLabelAlign.file)
            ///formData.append('otherParams', blob)

            if (this.$route.query.from == 'update') {
                const { data: res } = await this.$http.post('/api/law/updateLaw', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (res.code == 200) {
                    this.$message({
                        message: "更新成功",
                        type: "success",
                    });
                } else {
                    this.$message("更新失败");
                }
            } else {
                const { data: res } = await this.$http.post('/api/law/addLaw', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (res.code == 200) {
                    this.$message({
                        message: "添加成功",
                        type: "success",
                    });
                } else {
                    this.$message("添加失败");
                }
            }

        }
    }
}
</script>
<style>
/* .main {
    margin-top: 20px;
} 
*/
.el-form-item {
    margin-bottom: 3px;
}

.el-timeline-item__timestamp {
    color: #000000;
    font-size: 20px;
}

.el-form--label-top .el-form-item__label {
    padding: 0px;
}

/* 返回上一级 */
.goback {
    margin-bottom: 10px;
    margin-right: 30px;
    font-family: "Microsoft YaHei";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #1675d5;
    float: right;
    margin-top: -15px;
    cursor: pointer;


    i {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #1675d5;
    }

}

.el-input__inner {
    height: 38px;
}

.timewidth .el-input__inner {
    width: 510px;
}

/* 时间戳标题 */
.el-timeline-item__timestamp {
    color: #101010;
}

.el-button--primary {
    background: #0054AA;
    border-color: #0054AA;
}

.el-timeline {
    padding: 10px;
}

.el-timeline-item__wrapper {
    padding-left: 30px;
}

.el-timeline-item__node {
    border: 3px solid #3a8ee6;
    background-color: #ffffff;
}

.hiddentime .el-timeline-item__node {
    border: 3px solid #ffffff;
    background-color: #ffffff;
}

.el-timeline-item__wrapper {
    top: -6px;
}

.el-timeline-item__node--normal {
    left: -3px;
    width: 16px;
    height: 16px;
}
</style>