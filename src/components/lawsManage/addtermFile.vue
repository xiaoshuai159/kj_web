<template>
    <div style="margin-top: 30px;">
        <div class="goback" @click="goBack()">
            <span>返回上一级</span>
            <i class="el-icon-arrow-left"></i>
        </div>
        <div>
            <el-card shadow="always" style="height: 95%;width: 98%;margin: 0 auto; margin-bottom: 20px;">
                <el-timeline>
                    <el-timeline-item placement="top" timestamp="条款详情" style="font-weight: 600;color: #4a2525;">
                        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign"
                            ref="formlabelalign">
                            <el-form-item label="法律名称" prop="lawName">
                                <el-select v-model="formLabelAlign.lawName" placeholder="请选择法律名称" style="width: 100%;">
                                    <el-option v-for="item in lawNameOpt" :key="item.key" :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="条款章节" prop="lawtermSerialNumber">
                                <el-input v-model="formLabelAlign.lawtermSerialNumber" placeholder="请输入"></el-input>
                                <!-- <el-select v-model="formLabelAlign.lawtermSerialNumber" placeholder="请选择条款章节"
                                    style="width: 100%;">
                                    <el-option v-for="item in lawtermSerialOpt" :key="item.key" :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select> -->
                            </el-form-item>
                            <el-form-item label="条款内容" prop="lawtermContent">
                                <el-input v-model="formLabelAlign.lawtermContent" placeholder="请输入"></el-input>
                            </el-form-item>
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
            page: '',
            pageSize: '',
            lawtermContent: '',
            formLabelAlign: {
                lawName: '',
                lawtermSerialNumber: '',
                lawtermContent: '',
                // fileName:'',
            },
            lawNameOpt: [],
            // lawtermSerialOpt: [],

        };
    },
    created() {
        this.id = parseInt(this.$route.query.id) || 0;
        this.lawName = this.$route.query.lawName;
        this.lawtermContent = this.$route.query.lawtermContent;
        this.page = this.currentPage;
        this.pageSize = this.pageSize;
        if (this.$route.query.from == 'update' && this.id != 0) { //获取浏览器url的参数，from页面来源: table客户端列表页面，update更新客户端信息页面 
            this.getLawTermById();
        };
        this.lawAllList();
        //this.getlawtermByIdList();


    },

    mounted() {
        window.addEventListener("keydown", this.handleSearch);

    },
    destroyed() {
        window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
    },
    //当路由发生变化，先清空原来的数据 
    watch: {
        $route: {
            handler(route) {
                this.resetForm();
                this.id = parseInt(this.$route.query.id) || 0;
                if (this.$route.query.from == 'update' && this.id != 0) { //获取浏览器url的参数，from页面来源: table客户端列表页面，update更新客户端信息页面 
                    this.getLawTermById();
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
                    lawtermContent: this.lawtermContent,
                    pageSize: this.pageSize,
                    pageNum: this.currentPage

                },
            });
        },
        //按id查询
        async getLawTermById() {
            console.log('被调用getLawByIdgetLawById');
            const { data: res } = await this.$http.get('/api/lawterm/getLawTermById?id=' + this.id);
            if (res.code == 200) {
                this.formLabelAlign.lawName = res.data.lawId;
                this.formLabelAlign.lawtermSerialNumber = res.data.lawtermSerialNumber;
                this.formLabelAlign.lawtermContent = res.data.lawtermContent;
                // this.formLabelAlign.lawDesc = res.data.lawDesc;

            }
        },
        //查询法律名称
        async lawAllList() {
            const { data: res } = await this.$http.get("/api/law/lawAllList");
            if (res.code == 200) {
                this.lawNameOpt = res.data.map((item) => ({
                    key: item.id,
                    value: item.lawName,
                }));
            };
            //console.log(this.lawNameOpt)
        },
        // //当下拉选择框的值发生变化
        // handleLawNameChange(value) {
        //     this.getlawtermByIdList(value);
        //    // console.log('所选法律名称的值为：', value);
        //     // 在这里可以进行相应的操作，比如将值保存到组件的 data 中或者发送请求等
        // },
        // //按照选择的法律名称查询条款内容
        // async getlawtermByIdList(value) {
        //     const { data: res } = await this.$http.get("/lawterm/getLawTermById?id="+value);
        //     if (res.code == 200) {
        //        this.lawtermSerialOpt = res.data.lawtermSerialNumber;
        //         // this.lawtermSerialOpt = res.data.map((item) => ({
        //         //     //key: item.id,
        //         //     value: item.lawtermSerialNumber,
        //         // }));
        //         //this.lawtermSerialOpt.value=res.data.lawtermSerialNumber;
        //     }
        //     console.log('条款'+this.lawtermSerialOpt)
        // },

        //重置
        resetForm() {
            this.formLabelAlign.lawName = '';
            this.formLabelAlign.lawtermSerialNumber = '';
            this.formLabelAlign.lawtermContent = '';
            //this.formLabelAlign.lawDesc = '';
        },
        //保存
        async loadAPI() {

            if (
                !this.formLabelAlign.lawName ||
                !this.formLabelAlign.lawtermSerialNumber ||
                !this.formLabelAlign.lawtermContent
            ) {
                this.$message.error("请填写完整信息");
                return; // 如果有输入框为空，停止执行后续请求
            }
            let list = {
                id: this.id,
                lawId: this.formLabelAlign.lawName,
                lawtermSerialNumber: this.formLabelAlign.lawtermSerialNumber,
                lawtermContent: this.formLabelAlign.lawtermContent,
                //lawDesc: this.formLabelAlign.lawDesc,
                // pageSize: this.pageSize,
                // pageNum: this.currentPage
            };
            if (this.$route.query.from == 'update') {
                const { data: res } = await this.$http.post('/api/lawterm/updateLawTerm', list);
                if (res.code == 200) {
                    this.$message({
                        message: "更新成功",
                        type: "success",
                    });
                } else {
                    this.$message("更新失败");
                }
            } else {
                const { data: res } = await this.$http.post('/api/lawterm/addLawTerm', list);
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

.el-timeline-item__node {
    border: 3px solid #3a8ee6;
    background-color: #ffffff;
}

.el-timeline {
    padding: 10px;
}

.el-timeline-item__wrapper {
    padding-left: 30px;
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