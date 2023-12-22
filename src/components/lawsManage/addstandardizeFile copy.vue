<template>
    <div style="margin-top: 30px;">
        <div class="goback" @click="goBack()">
            <span>返回上一级</span>
            <i class="el-icon-arrow-left"></i>
        </div>
        <div>
            <el-card shadow="always" style="height: 95%;width: 98%;margin: 0 auto; margin-bottom: 20px;">
                <el-timeline>
                    <el-timeline-item placement="top" timestamp="标准化来源" style="font-weight: 600;:color: #4a2525;">
                        <el-form :label-position="labelPosition" label-width="80px" :model="standardOrigin"
                            ref="standardorigin">
                            <el-form-item label="法律名称" prop="lawId">
                                <el-select v-model="standardOrigin.lawId" placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in lawids" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="条款内容" prop="lawtermId">
                                <el-select v-model="standardOrigin.lawtermId" placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in lawtermids" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-timeline-item>
                    <el-timeline-item placement="top" timestamp="标准化规则" style="font-weight: 600;color: #4a2525;">
                        <el-form :label-position="labelPosition" label-width="80px" :model="standardRule"
                            ref="standardrule">
                            <!-- <el-form-item label="数据处理者" prop="dataProcessor">
                                <el-input v-model="standardRule.dataProcessor" placeholder="请输入"></el-input>
                            </el-form-item> -->
                            <el-form-item label="数据出境行为" prop="exitBehavior">
                                <el-input v-model="standardRule.exitBehavior" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="违规标志" prop="violationSign">
                                <el-input v-model="standardRule.violationSign" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="违规类型" prop="violationType">
                                <el-select v-model="standardRule.violationType" placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in options3" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
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
            lawtermId: '',

            page: '',
            pageSize: '',
            standardOrigin: {
                lawId: '',
                lawtermId: '',
            },
            standardRule: {
                // dataProcessor: '',
                exitBehavior: '',
                violationSign: '',
                violationType: ''
            },
            lawids: [{
                value: '选项1',
                label: '未申报安全评估（应报未报）'
            }, {
                value: '选项2',
                label: '未通过安全评估出境'
            }, {
                value: '选项3',
                label: '未重新申报安全评估（夹带私货）'
            }, {
                value: '选项4',
                label: '未重新申报安全评估（其他情形）'
            }, {
                value: '选项5',
                label: '未备案个人信息出境标准合同（应备未备）'
            }],
            lawtermids: [{
                value: '选项1',
                label: '未申报安全评估（应报未报）'
            }, {
                value: '选项2',
                label: '未通过安全评估出境'
            }, {
                value: '选项3',
                label: '未重新申报安全评估（夹带私货）'
            }, {
                value: '选项4',
                label: '未重新申报安全评估（其他情形）'
            }, {
                value: '选项5',
                label: '未备案个人信息出境标准合同（应备未备）'
            }],
            options3: [{
                value: '选项1',
                label: '未申报安全评估（应报未报）'
            }, {
                value: '选项2',
                label: '未通过安全评估出境'
            }, {
                value: '选项3',
                label: '未重新申报安全评估（夹带私货）'
            }, {
                value: '选项4',
                label: '未重新申报安全评估（其他情形）'
            }, {
                value: '选项5',
                label: '未备案个人信息出境标准合同（应备未备）'
            }],
        };
    },
    created() {
        this.id = parseInt(this.$route.query.id) || 0;
        this.lawtermId = parseInt(this.$route.query.id);
        if (this.$route.query.from == 'update' && this.id != 0) { //获取浏览器url的参数，from页面来源: table客户端列表页面，update更新客户端信息页面 
            console.log('调用getStandardizaById');
            this.getStandardizaById();
        }
        this.getAllList()


    },

    mounted() {
        window.addEventListener("keydown", this.handleSearch);
    },
    destroyed() {
        window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
    },

    methods: {
        //返回上一级
        goBack() {
            this.$router.push({
                path: "/lawsManage",
                query: {
                    from: "to", //更新客户端信息页面
                    //修改返回原来页面所需参数
                    lawtermId: this.lawtermId,
                    pageSize: this.pageSize,
                    pageNum: this.currentPage

                },
            });

        },
        //standardOrigin\\lawId\lawtermId\\standardRule\\dataProcessor\exitBehavior\violationSign\violationType
        //按id查询
        async getStandardizaById() {
            console.log('被调用getStandardizaById');
            const { data: res } = await this.$http.get('/standardiza/getStandardizaById?id=' + this.id);
            if (res.code == 200) {
                this.standardOrigin.lawId = res.data.lawId;
                this.standardOrigin.lawtermId = res.data.lawtermId;
                //this.standardRule.dataProcessor = res.data.dataProcessor;
                this.standardRule.exitBehavior = res.data.exitBehavior;
                this.standardRule.violationSign = res.data.violationSign;
                this.standardRule.violationType = res.data.violationType;
            }
        },
        //查询法律名称和条款内容 返回的是级联关系
        async getAllList() {
            const { data: res } = await this.$http.get('/digitalizeRule/getAllList');
            if (res.code == 200) {
                this.lawids = res.data.map((item) => ({
                    key: item.id,
                    value: item.value,
                }));
                this.lawtermids = res.data.map((item) => ({
                    key: item.id,
                    value: item.lawtermResultList.value,
                }));
            }
        },
        //重置
        resetForm() {
            this.standardOrigin.lawId = '';
            this.standardOrigin.lawtermId = '';
            //this.standardRule.dataProcessor = '';
            this.standardRule.exitBehavior = '';
            this.standardRule.violationSign = '';
            this.standardRule.violationType = '';
        },
        //保存
        async loadAPI() {
            if (
                !this.standardOrigin.lawId ||
                !this.standardOrigin.lawtermId ||
                //!this.standardRule.dataProcessor ||
                !this.standardRule.exitBehavior ||
                !this.standardRule.violationSign ||
                !this.standardRule.violationType
            ) {
                this.$message.error("请填写完整信息");
                return; // 如果有输入框为空，停止执行后续请求
            }
            let list = {
                id: this.id,
                lawId: this.standardOrigin.lawId,
                lawtermId: this.standardOrigin.lawtermId,
                // dataProcessor: this.standardRule.dataProcessor,
                exitBehavior: this.standardRule.exitBehavior,
                violationSign: this.standardRule.violationSign,
                violationType: this.standardRule.violationType,
                // pageSize: this.pageSize,
                // pageNum: this.currentPages
            };
            if (this.$route.query.from == 'update') {
                const { date: res } = await this.$http.post('/standardiza/updateStandardiza', list);
                if (res.code == 200) {
                    this.$message({
                        message: "更新成功",
                        type: "success",
                    });
                } else {
                    this.$message("更新失败");
                }
            } else {
                const { date: res } = await this.$http.post('/standardiza/addStandardiza', list);
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

.el-timeline {
    padding: 10px;
}

.el-timeline-item__wrapper {
    padding-left: 30px;
}

.el-button--primary {
    background: #0054AA;
    border-color: #0054AA;
}

.el-timeline-item__node {
    border: 3px solid #3a8ee6;
    background-color: #ffffff;
}

.hiddentime .el-timeline-item__node {
    border: 3px solid #ffffff;
    background-color: #ffffff;
}
.el-timeline-item__wrapper{
    top: -8px;
}
</style>