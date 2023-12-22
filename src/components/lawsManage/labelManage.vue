<template>
    <div class="main labelmain" style="margin-top: 20px;">
        <div class="goback" @click="goBack()" >
            <span>返回上一级</span>
            <i class="el-icon-arrow-left"></i>
        </div>
        <div class="shadow-div shadow-form" style="margin-bottom: 10px" >
            <el-form :inline="true" class="selectform" ref="selectform" :model="selectForm">
                <el-form-item prop="tagCode" label="标签编码:">
                    <el-input placeholder="请输入关键字" style="width: 200px;" v-model="selectForm.tagCode"></el-input>
                </el-form-item>
                <el-form-item prop="tagName" label="标签名称:">
                    <el-input placeholder="请输入关键字" style="width: 200px;" v-model="selectForm.tagName"> </el-input>
                </el-form-item>
                <el-form-item prop="tagType" label="标签类型:">
                    <el-select placeholder="请选择" v-model="selectForm.tagType">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div style="display: inline-block;float: right; ">
                    <el-button type="primary" @click="loadAPI()">查询</el-button>
                    <el-button type="info" @click="resetForm()">重置</el-button>
                </div>
            </el-form>
        </div>
        <!-- 创建任务 -->
        <div style="margin-left: 15px;margin-bottom: 20px;">
            <el-button type="primary" style="width: 130px" @click="dialogFormVisible = true">+ 添加标签</el-button>
            <el-dialog title="新增标签" :visible.sync="dialogFormVisible">
                <el-form :model="formLabelAlign">
                    <el-form-item label="标签编码" :label-width="formLabelWidth" prop="tagCode">
                        <el-input v-model="formLabelAlign.tagCode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="标签名称" :label-width="formLabelWidth" prop="tagName">
                        <el-input v-model="formLabelAlign.tagName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="标签类型" :label-width="formLabelWidth" prop="tagType">
                        <el-select v-model="formLabelAlign.tagType" placeholder="请选择标签类型" style="width: 100%;">
                            <el-option label="数据处理者标签" :value="0"></el-option>
                            <el-option label="规则标签" :value="1"></el-option>
                            <el-option label="境外接收方" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth" prop="tagDesc">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="formLabelAlign.tagDesc"
                            resize="none">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="addTag()">确定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="标签详情" :visible.sync="dialogFormVisible1">
                <el-form :model="formLabelAlign1">
                    <el-form-item label="标签编码" :label-width="formLabelWidth" prop="tagCode">
                        <el-input v-model="formLabelAlign1.tagCode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="标签名称" :label-width="formLabelWidth" prop="tagName">
                        <el-input v-model="formLabelAlign1.tagName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="标签类型" :label-width="formLabelWidth" prop="tagType">
                        <el-select v-model="formLabelAlign1.tagType" placeholder="请选择标签类型" style="width: 100%;">
                            <el-option label="数据处理者标签" :value="0"></el-option>
                            <el-option label="规则标签" :value="1"></el-option>
                            <el-option label="境外接收方" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth" prop="tagDesc">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="formLabelAlign1.tagDesc"
                            resize="none">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="dialogFormVisible1 = false">取消</el-button>
                    <el-button type="primary" @click="updateTag()">确定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="shadow-div">
            <div class="base_table">
                <el-table :data="tableData" ref="LabelTable" style="width: 100%"
                    :header-cell-style="{ background: '#C6D9F1', color: '#101010', padding: '0px', 'text-align': 'center' }"
                    :cell-style="{ padding: '0px' }" :row-style="{ height: '45px' }" :header-row-style="{ height: '38px' }"
                    stripe>
                    <el-table-column :show-overflow-tooltip="true" label="编号" width="40px" align="center" fixed="left">
                        <template slot-scope="scope">
                            {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="ID" :show-overflow-tooltip="true" width="40px" align="center">
                    </el-table-column>
                    <el-table-column prop="tagCode" label="标签编码" :show-overflow-tooltip="true" width="180px" align="center">
                    </el-table-column>
                    <el-table-column prop="tagName" label="标签名称" :show-overflow-tooltip="true" maxwidth="500px" align="left">
                    </el-table-column>
                    <el-table-column prop="tagType" label="标签类型" :show-overflow-tooltip="true" width="120px" align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.tagType == 2" class="labeltypejudgment" style="color: #E41634;">
                                <i class="el-icon-user-solid"></i>
                                境外接收方
                            </div>
                            <div v-if="scope.row.tagType == 1" class="labeltypejudgment" style="color: #0F91E7;">
                                <i class="el-icon-document"></i>
                                规则
                            </div>
                            <div v-if="scope.row.tagType == 0" class="labeltypejudgment" style="color: #E98B0E; ">
                                <i class="el-icon-s-custom"></i>
                                数据处理者
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="notes" label="备注" :show-overflow-tooltip="true" width="180px" align="center">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="更新时间" :show-overflow-tooltip="true" width="145px" align="center">
                    </el-table-column>
                    <el-table-column prop="operate" label="操作" width="80px" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="small"
                                style="color: #3286FF; width: 40px;margin: 0px;padding: 0px;"
                                @click="updateTerm(scope.row.id)">修改</el-button>
                            <el-button type="text" size="small"
                                style="color: #E41634; width: 40px;margin: 0px;padding: 0px;"
                                @click="deleteFile(scope.row.id)">删除</el-button>

                            <!-- 
                            <el-button type="text"  size="small" style="color: #3286FF;width: 40px;"
                                @click="updateTerm(scope.row.id)">详情</el-button>
                            <el-button type="text"  size="small" style="color: #E41634;"
                                @click="deleteFile(scope.row.id)">删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="block" style="display: flex; justify-content: center;margin-top: 10px;padding-bottom: 10px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="hostTotal">
            </el-pagination>
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },


    },
    data() {
        return {
            currentPage: 1, //当前页码
            pageSize: 10, //每页最大条数
            hostTotal: 0, //实际数据总条数
            selectForm: {
                tagCode: '',
                tagName: '',
                tagType: '',
            },
            tableData: [{
                id: '1',
                tagCode: 'foreign_control',
                tagName: '外国组织、个人及其设立或者实际控制的机构',
                tagType: '1',
                notes: '描述境外接收方身份',
                updatetime: '2022-06-22 15:16:00'
            }],

            options: [{
                value: '0',
                label: '数据处理者标签'
            }, {
                value: '1',
                label: '变化内容标签'
            }, {
                value: '2',
                label: '境外接收方'
            }],
            value: '',
            dialogFormVisible: false,
            dialogFormVisible1: false,
            formLabelAlign: {
                tagCode: '',
                tagName: '',
                tagDesc: '',
                tagType: ''
            },
            formLabelAlign1: {
                id: '',
                tagCode: '',
                tagName: '',
                tagDesc: '',
                tagType: ''
            },
            formLabelWidth: '120px'
        };
    },
    //页面元素内容加载前需要执行的方法
    created() {
        this.loadAPI()
    },
    mounted() {
        window.addEventListener("keydown", this.handleSearch);
    },
    destroyed() {
        window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
    },

    methods: {
        goBack() {
            this.$router.push({
                path: "/lawsManage",
                query: {
                    from: "to", //更新客户端信息页面                   
                },
            });
        },
        //查询数据
        async loadAPI() {
            //列表初始化
            let list = {
                tagCode: this.selectForm.tagCode,
                tagName: this.selectForm.tagName,
                tagType: this.selectForm.tagType,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            };
            const { data: res } = await this.$http.post("/api/tag/tagList", list);
            if (res.code == 200) {
                this.tableData = res.data.content
                this.hostTotal = res.data.totalElements
                this.$nextTick(() => {
                    this.$refs["LabelTable"].doLayout();
                });
            }
        },
        //改变页面大小
        handleSizeChange(val) {
            this.pageSize = val;
            this.loadAPI();
        },
        //改变页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.loadAPI();
        },
        //跳转页面
        addlawsFile() {
            this.$router.push("");
        },
        resetForm() {
            this.selectForm.tagCode = '';
            this.selectForm.tagName = '';
            this.selectForm.tagType = '';
            this.loadAPI();
        },
        //修改 弹窗
        async updateTerm(id) {
            this.dialogFormVisible1 = true;
            try {
                const { data: res } = await this.$http.get("/api/tag/getTagById?id=" + id);
                this.formLabelAlign1 = res.data;
            } catch (error) {
                this.$message.error("请求失败，请稍后重试");
            }
        },

        //新增标签
        async addTag() {
            let list = {
                tagName: this.formLabelAlign.tagName,
                tagType: this.formLabelAlign.tagType,
                tagCode: this.formLabelAlign.tagCode,
                tagDesc: this.formLabelAlign.tagDesc,
            }          
            try {
                const { data: res } = await this.$http.post("/api/tag/addTag", list);
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.loadAPI();
            } catch (error) {
                this.$message.error("请求失败，请稍后重试");
            } finally {
                this.dialogFormVisible = false; // 在请求完成后关闭弹窗
            }
        },
        //修改标签
        async updateTag() {
            let list = {
                id: this.formLabelAlign1.id,
                tagName: this.formLabelAlign1.tagName,
                tagType: this.formLabelAlign1.tagType,
                tagCode: this.formLabelAlign1.tagCode,
                tagDesc: this.formLabelAlign1.tagDesc,
            }
            try {
                const { data: res } = await this.$http.post("/api/tag/updateTag", list);
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.loadAPI();
            } catch (error) {
                this.$message.error("请求失败，请稍后重试");
            } finally {
                this.dialogFormVisible1 = false; // 在请求完成后关闭弹窗
            }
        },
        //删除
        async deleteFile(id) {
            this.$confirm("此操作将删除该任务, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })

                .then(async () => {
                    // let list = {
                    //     id: parseInt(id)
                    // }
                    const { data: res } = await this.$http.post("/api/tag/deleteTag?id=" + id);

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
.shadow-div {
    /* padding-top: 20px;
    margin-bottom: 20px; */
    width: calc(100% - 30px);
    background-color: #fff;
    position: relative;
    margin: auto;
    /* margin-bottom: 20px; */
}

/* 边框阴影 */
.main {
    box-shadow: 0 0 8px #cecece;
    margin: auto;
    width: calc(100% - 30px);
    border-radius: 10px;
    margin-bottom: 20px;

}

/* 标签类型 */
.labeltypejudgment {
    width: 120px;
    height: 27px;
    line-height: 27px;
    border-radius: 4px;
    background-color: rgba(226, 37, 15, 0);
    text-align: left;
}

.labelmain {
    padding-top: 10px;
    /* padding-bottom: 20px; */
}


.el-button {
    color: #ffffff;
    height: 30px !important;
    width: 60px;
    line-height: 0px;
    border-radius: 4px;
    padding: 0px !important;

}

.el-button--primary {
    background: #0054AA;
    border-color: #0054AA;
}

.el-button--info {
    background: #d3d4dd;
    border-color: #d3d4dd;
    color: black !important;
}

/* 返回上一级 */
.goback {
    margin-top: -30px!important;
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

.el-table th.el-table__cell>.cell {
    padding: 0px;
}

.el-table .cell {
    padding: 0px;
    /* font-size: 12px; */
}

.el-table .cell.el-tooltip {
    min-width: 40px !important;
    ;
}

/* 查询输入框 */
.selectform .el-input__inner {
    width: 170px;
    height: 30px;
    padding: 0px 10px;
}

/* 斑马线颜色 */
.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
    background: #E6EDF8;
}

</style>