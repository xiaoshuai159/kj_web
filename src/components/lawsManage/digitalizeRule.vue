<template>
    <div>
        <div class="shadow-div shadow-form" style="margin-bottom: 10px;">
            <el-form :inline="true" class="selectform digselectfrom" ref="selectform" :model="selectForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="standardizaId" label="标准化ID:">
                            <el-input placeholder="请输入关键字" v-model="selectForm.standardizaId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="text-align: center;">
                        <el-form-item prop="id" label="数字化ID:">
                            <el-input placeholder="请输入关键字" v-model="selectForm.id"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="text-align: center;">
                        <el-form-item prop="srcTageId" label="数据处理者:">
                            <el-select v-model="selectForm.srcTageId" placeholder="请选择">
                                <el-option v-for="item in srctageIds" :key="item.key" :label="item.label"
                                    :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="text-align: right;">
                        <el-form-item prop="datalevels" label="涉及数据分级:" style="margin-right: 0px!important;">
                            <el-select v-model="selectForm.datalevels" placeholder="请选择">
                                <el-option v-for="item in options3" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="violationSign" label="违规类型:">
                            <el-select v-model="selectForm.violationSign" placeholder="请选择">
                                <el-option v-for="item in options1" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="18">
                        <div style="display: inline-block;float: right; ">
                            <el-button type="primary" @click="searchForm()">查询</el-button>
                            <el-button type="info" @click="resetForm()">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 创建任务 -->
        <div style="margin-left: 15px;margin-bottom: 20px;">
            <el-button type="primary" @click="addRule()" style="width: 100px;">+ 新增规则</el-button>
            <el-button type="info" icon="el-icon-edit" @click="toLableManage()"
                style="width: 100px; background-color: white;"> 标签管理</el-button>
        </div>
        <div class="shadow-div">
            <div class="base_table">
                <el-table :data="tableData" ref="digitalizeTable" style="width: 100%" tooltip-effect="dark"
                    :header-cell-style="{ background: '#C6D9F1', color: '#101010', padding: '0px', 'text-align': 'center' }"
                    :cell-style="{ padding: '0px' }" :row-style="{ height: '45px' }" :header-row-style="{ height: '38px' }"
                    stripe>
                    <el-table-column prop="number" :show-overflow-tooltip="true" label="编号" width="40px" align="center"
                        fixed="left">
                        <template slot-scope="scope">
                            {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="standardizaId" :show-overflow-tooltip="true" label="标准化ID" width="60px"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="id" :show-overflow-tooltip="true" label="数字化ID" width="60px" align="center">
                    </el-table-column>
                    <el-table-column prop="srcTagName" :show-overflow-tooltip="true" label="数据处理者" width="180px"
                        align="left">
                    </el-table-column>
                    <el-table-column prop="dstTagName" :show-overflow-tooltip="true" label="境外接收方" width="80px"
                        align="left">
                    </el-table-column>
                    <el-table-column prop="dataLevels" label="涉及数据分级" width="160px" align="left"
                        :style="{ lineHeight: '18px' }">
                        <template slot-scope="scope">
                            <div v-if="scope.row.dataLevels && scope.row.dataLevels.includes('1')" class="datacalssifylevel"
                                style="color: #E08009; background-color: rgba(253, 168, 63, 0.3);width: 60px; display: inline-block;">
                                个人数据
                            </div>
                            <div v-if="scope.row.dataLevels && scope.row.dataLevels.includes('2')" class="datacalssifylevel"
                                style="color: #E41634; background-color:rgba(234, 104, 123, 0.3);width: 90px;display: inline-block;">
                                个人敏感数据
                            </div>
                            <div v-if="scope.row.dataLevels && scope.row.dataLevels.includes('3')" class="datacalssifylevel"
                                style="color: #E2250F; background-color: rgba(226, 37, 15, 0.25);width: 60px;display: inline-block;">
                                重要数据
                            </div>
                            <div v-if="scope.row.dataLevels && scope.row.dataLevels.includes('4')" class="datacalssifylevel"
                                style="color: #56AB61; background-color: rgba(224, 255, 208, 0.94);width: 60px;display: inline-block;">
                                一般数据
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dataClasses" :show-overflow-tooltip="true" label="涉及数据分类" width="120px"
                        align="left">
                        <template slot-scope="scope">
                            {{ scope.row.dataClasses ? formatsecondLevelDataLabels(scope.row.dataClasses) : '' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="dataLabeles" :show-overflow-tooltip="true" label="涉及数据标签" width="120px"
                        align="left">
                        <template slot-scope="scope">
                            {{ scope.row.dataLabeles ? formatthirdLevelDataLabels(scope.row.dataLabeles) : '' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" :show-overflow-tooltip="true" label="数据阈值" width="70px" align="center">
                    </el-table-column>
                    <el-table-column prop="timeType" :show-overflow-tooltip="true" label="时间类型" width="130px"
                        align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.timeType == 'enact_time'">
                                法律文件生效时间起
                            </div>
                            <div v-if="scope.row.timeType == 'lastyear_1_1'">
                                自上年1月1日起
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isBeian" :show-overflow-tooltip="true" label="是否备案" width="50px" align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.isBeian == 1" class="istrue">
                                是
                            </div>
                            <div v-if="scope.row.isBeian == 0" class="isfalse">
                                否
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="beianResult" :show-overflow-tooltip="true" label="备案是否通过" width="50px"
                        align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.beianResult == 1" class="istrue">
                                是
                            </div>
                            <div v-if="scope.row.beianResult == 0" class="isfalse">
                                否
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="beianIsValid" :show-overflow-tooltip="true" label="备案是否在有效期内" width="70px"
                        align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.beianIsValid == 1" class="istrue">
                                是
                            </div>
                            <div v-if="scope.row.beianIsValid == 0" class="isfalse">
                                否
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isShenbao" :show-overflow-tooltip="true" label="是否申报" width="50px"
                        align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.isShenbao == 1" class="istrue">
                                是
                            </div>
                            <div v-if="scope.row.isShenbao == 0" class="isfalse">
                                否
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="shenbaoResult" :show-overflow-tooltip="true" label="申报是否通过" width="50px"
                        align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.shenbaoResult == 1" class="istrue">
                                是
                            </div>
                            <div v-if="scope.row.shenbaoResult == 0" class="isfalse">
                                否
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="shenbaoIsValid" :show-overflow-tooltip="true" label="申报是否在有效期内" width="70px"
                        align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.shenbaoIsValid == 1" class="istrue">
                                是
                            </div>
                            <div v-if="scope.row.shenbaoIsValid == 0" class="isfalse">
                                否
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="changeTagId" :show-overflow-tooltip="true" label="违规标志" width="120px"
                        align="center">
                    </el-table-column> -->
                    <el-table-column prop="violationSign" :show-overflow-tooltip="true" label="违规类型" width="120px"
                        align="center">
                        <template slot-scope="scope">
                            {{ labelFormatter(scope.row.violationSign) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="operate" label="操作" width="80px" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="small"
                                style="color: #3286FF; width: 40px;margin: 0px;padding: 0px;"
                                @click="updateDigRule(scope.row.id)">修改</el-button>
                            <el-button type="text" size="small"
                                style="color: #E41634; width: 40px;margin: 0px;padding: 0px;"
                                @click="deleteDigitalize(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="hostTotal" width="100px">
            </el-pagination>
        </div>
    </div>
</template>

<script>

export default {
    data() {

        return {
            currentPage: 1,
            pageSize: 10,
            hostTotal: 0,
            secondLevelOptions: [],//存放第二级数据
            thirdLevelOptions: [],//存放第三级数据
            cascadeData: [],
            selectForm: {
                standardizaId: '',
                id: '',
                violationSign: '',
                srcTageId: '',
                datalevels: '',
            },

            options1: [{
                value: '1',
                label: '未申报安全评估（应报未报）'
            }, {
                value: '2',
                label: '未通过安全评估出境'
            }, {
                value: '3',
                label: '未重新申报安全评估（夹带私货）'
            }, {
                value: '4',
                label: '未重新申报安全评估（其他情形）'
            }, {
                value: '5',
                label: '未备案个人信息出境标准合同（应备未备）'
            }],
            srctageIds: [],
            options3: [{
                value: '1',
                label: '个人信息'
            }, {
                value: '2',
                label: '个人敏感信息'
            }, {
                value: '3',
                label: '重要数据'
            }, {
                value: '4',
                label: '一般数据'
            }],
            calcsigns: [
                { value: 1, label: '大于等于' },
                { value: 2, label: '大于' },
                { value: 3, label: '等于' },
                { value: 4, label: '小于' },
                { value: 5, label: '小于等于' }
            ],
            options: [
                { value: 1, label: '未申报安全评估（应报未报）' },
                { value: 2, label: '未通过安全评估出境' },
                { value: 3, label: '未重新申报安全评估（夹带私货）' },
                { value: 4, label: '未重新申报安全评估（其他情形）' },
                { value: 5, label: '未备案个人信息出境标准合同（应备未备）' },
                { value: 6, label: '未通过个人信息出境标准合同备案出境' },
                { value: 7, label: '未重新备案个人信息出境标准合同（夹带私货）' },
                { value: 8, label: '未重新备案个人信息出境标准合同（其他情形）' },
                { value: 9, label: '应向个人告知并取得个人同意' },
                { value: 10, label: '违反国标要求' },
                { value: 11, label: '违反行标要求' },
                { value: 12, label: '违反地标要求' },
                { value: 13, label: '违反《中华人民共和国人类遗传资源管理条例》要求' },
                { value: 14, label: '未经中华人民共和国主管机关批准出境' },
            ],
            units: [
                { value: 1, label: '条' },
                { value: 2, label: '人' },
            ],
            tableData: [],
        };

    },
    //页面元素内容加载前需要执行的方法
    created() {
        this.loadAPI();
        this.getptagListByType();
        this.getdatalevelAllList();
    },

    mounted() {
        window.addEventListener("keydown", this.handleSearch);
    },
    destroyed() {
        window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
    },

    methods: {

        //涉及数据 获取完整的级联数据
        async getdatalevelAllList() {
            const { data: res } = await this.$http.get('/api/datalabel/getAllList');
            if (res.code == 200) {
                this.cascadeData = res.data;
                this.processSecondLevelData();
                this.processThirdLevelData();
            }
        },
        processSecondLevelData() {
            if (this.cascadeData) {
                this.extractSecondLevelData(this.cascadeData); // 提取第二级数据
            }
        },

        extractSecondLevelData(data) {
            const secondLevelData = [];
            const extractData = (arr) => {
                arr.forEach(item => {
                    secondLevelData.push({
                        label: item.label,
                        value: item.value
                    });
                    if (item.children && item.children.length > 0) {
                        extractData(item.children);
                    }
                });
            };
            extractData(data);
            this.secondLevelOptions = secondLevelData;
        },

        processThirdLevelData() {
            if (this.cascadeData) {
                this.extractThirdLevelData(this.cascadeData);
            }
        },

        //提取第三级数据
        extractThirdLevelData(data) {
            const thirdLevelData = [];
            const extractData = (arr) => {
                arr.forEach(item => {
                    if (item.children && item.children.length > 0) {
                        extractData(item.children);
                    } else {
                        thirdLevelData.push({
                            label: item.label,
                            value: item.value
                        });
                    }
                });
            };
            extractData(data);
            this.thirdLevelOptions = thirdLevelData;
        },


        //涉及数据分类
        findsecondLevelLabelByValue(value) {
            const item = this.secondLevelOptions.find(item => item.value === value);
            return item ? item.label : '';
        },

        //转换数据标签
        formatsecondLevelDataLabels(dataclasses) {
            const values = dataclasses.split(',');
            if (values.length === 1) {
                return this.findsecondLevelLabelByValue(parseInt(values[0]))
            } else {
                const labels = values.slice(0, 3).map(value => this.findsecondLevelLabelByValue(parseInt(value)));

                return labels.join('、'); // 将获取到的 label 用逗号分隔拼接起来
            };

        },

        //涉及数据标签
        findthirdLevelLabelByValue(value) {
            const item = this.thirdLevelOptions.find(item => item.value === value);
            return item ? item.label : '';
        },

        //转换数据标签
        formatthirdLevelDataLabels(dataLabeles) {
            const values = dataLabeles.split(',');
            if (values.length === 1) {
                return this.findthirdLevelLabelByValue(parseInt(values[0]));
            } else {
                const labels = values.slice(0, 3).map(value => this.findthirdLevelLabelByValue(parseInt(value)));
                return labels.join('、'); // 将获取到的 label 用逗号分隔拼接起来
            }

        },
        //违规类型
        labelFormatter(value) {
            const option = this.options.find(option => option.value == value)
            return option ? option.label : ''
        },

        //运算符
        labelFormatter2(value) {
            const calcsign = this.calcsigns.find(calcsign => calcsign.value == value)
            return calcsign ? calcsign.label : ''
        },

        //运算单位
        labelFormatter2(value) {
            const unit = this.units.find(unit => unit.value == value)
            return unit ? unit.label : ''
        },

        //跳转页面
        addRule() {
            this.$router.push("/lawsManage/adddigitalFile");
        },
        //页面元素内容加载前需要执行的方法

        handleSizeChange(val) {
            this.pageSize = val;
            this.loadAPI();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.loadAPI();
        },
        resetForm() {
            this.selectForm.standardizaId = '';
            this.selectForm.id = '';
            this.selectForm.violationSign = '';
            this.selectForm.srcTageId = '';
            this.selectForm.datalevels = '';
            this.currentPage = 1;
            this.loadAPI();
        },
        //查询数据处理者

        //获取数据处理者
        async getptagListByType() {
            let list = {
                tagType: 0
            }
            const { data: res } = await this.$http.post('/api/tag/tagListByType', list);
            if (res.code == 200) {
                this.srctageIds = res.data.map((item) => ({
                    label: item.tagName,
                    key: item.id,
                }));
                // this.processorOptions = res.data.map(obj => obj.tagName);
                //this.processores = this.processorOptions;
            }
        },

        searchForm() {
            this.currentPage = 1;
            this.loadAPI();
        },

        //查询数据
        async loadAPI() {
            //列表初始化
            let list = {
                standardizaId: this.selectForm.standardizaId,//标准化
                id: this.selectForm.id,//数字化
                violationSign: this.selectForm.violationSign,//违规类型
                srcTageId: this.selectForm.srcTageId,//数据处理者
                datalevels: this.selectForm.datalevels,//分级分类
                pageSize: this.pageSize,
                pageNum: this.currentPage
            };
            const { data: res } = await this.$http.post("/api/digitalizeRule/digitalizeList", list);
            if (res.code == 200) {
                this.tableData = res.data.content;
                this.hostTotal = res.data.totalElements;
                this.$nextTick(() => {
                    this.$refs["digitalizeTable"].doLayout();
                });
            }
        },
        //新增跳转
        toLableManage() {
            this.$router.push("/knowledgeManage/labelManage");
        },
        //修改  修改跳转
        async updateDigRule(id) {
            this.$router.push({
                path: "/lawsManage/adddigitalFile",
                query: {
                    from: "update", //更新客户端信息页面
                    id: id,
                    standardizaId: this.selectForm.standardizaId,
                    violationSign: this.selectForm.violationSign,
                    srcTageId: this.selectForm.srcTageId,
                    datalevels: this.selectForm.datalevels,
                    page: this.currentPage,
                    pageSize: this.pageSize,
                },
            });
        },
        //删除
        async deleteDigitalize(id) {
            this.$confirm("此操作将删除该任务, 是否继续?", "提示", {
                cancelButtonText: "取消",
                confirmButtonText: "确定",
                type: "warning",
            })
                .then(async () => {
                    const { data: res } = await this.$http.post("/api/digitalizeRule/deleteDigitalize?id=" + id);
                    if (res.code == 200) {
                        let totalPage = Math.ceil((this.taskTotal - 1) / this.pageSize); // 总页数

                        let currentPage =
                            this.currentPage > totalPage
                                ? totalPage
                                : this.currentPage;

                        this.currentPage = currentPage < 1 ? 1 : currentPage;
                        this.loadAPI();
                        this.$message({
                            message: "删除成功",
                            type: "success",
                        });
                    } else {
                        this.$message(res.message);
                    }
                })
                .catch(() => {
                    this.$message("已取消删除");
                });
        },

    }
}
</script>
<style>
/* label标签 */
.digselectfrom .el-form-item {
    margin-right: 0px;
}

.digselectfrom .el-form-item__label {
    text-align: left;
    margin-right: 10px;
}

/* 是否标签 */

.istrue {
    color: #56AB61;
    background-color: rgba(224, 255, 208, 0.94);
    width: 30px;
    height: 27px;
    line-height: 27px;
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #92c799;
}

.isfalse {
    color: #E2250F;
    background-color: rgba(226, 37, 15, 0.25);
    width: 30px;
    height: 27px;
    line-height: 27px;
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #ee9f95;
}

/* 数据分级标签 */
.datacalssifylevel {
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    border-radius: 4px;
    /* margin-bottom: 1px; */

}

.el-message-box__btns #span {
    color: #E2250F;
}



/* .block {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    padding-bottom: 10px;
} */
/* .addbutton {
    padding: 0px !important;
    width: 100px
} */
</style>