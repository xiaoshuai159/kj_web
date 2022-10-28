<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="num">
          <el-card :body-style="{ display: 'flex', padding: 8 }">
            <p class="numqq">DPDK</p>
          </el-card>
          <el-card :body-style="{ display: 'flex', padding: 10 }">
            <p class="numq">
              状态:{{ status }}<br>CPU占比:{{ cpu_zhanbi }}<br>内存占比:{{ neicun_zhanbi }}
            </p>
          </el-card>
          <el-card :body-style="{ display: 'flex', padding: 10 }">
            <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949" @change="btn1($event)">
            </el-switch>
          </el-card>

          <el-card :body-style="{ display: 'flex', padding: 8 }">
            <p class="numqq">ZEEK</p>
          </el-card>
          <el-card :body-style="{ display: 'flex', padding: 10 }">
            <p class="numq">
              状态:{{ status2 }}<br>CPU占比:{{ cpu_zhanbi2 }}<br>内存占比:{{ neicun_zhanbi2 }}
            </p>
          </el-card>
          <el-card :body-style="{ display: 'flex', padding: 10 }">
            <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949" @change="btn2($event)">
            </el-switch>
          </el-card>

          <el-card :body-style="{ display: 'flex', padding: 8 }">
            <p class="numqq">KAFKA</p>
          </el-card>
          <el-card :body-style="{ display: 'flex', padding: 10 }">
            <p class="numq">
              状态:{{ status3 }}<br>CPU占比:{{ cpu_zhanbi3 }}<br>内存占比:{{ neicun_zhanbi3 }}
            </p>
          </el-card>
          <el-card :body-style="{ display: 'flex', padding: 10 }">
            <el-switch v-model="value3" active-color="#13ce66" inactive-color="#ff4949" @change="btn3($event)">
            </el-switch>
          </el-card>
          <el-card :body-style="{ display: 'flex', padding: 8 }">
            <p class="numqq">MODELS_xy</p>
          </el-card>
          <el-card :body-style="{ display: 'flex', padding: 10 }">
            <p class="numq">
              状态:{{ status4 }}<br>CPU占比:{{ cpu_zhanbi4 }}<br>内存占比:{{ neicun_zhanbi4 }}
            </p>
          </el-card>
          <el-card :body-style="{ display: 'flex', padding: 10 }">
            <el-switch v-model="value4" active-color="#13ce66" inactive-color="#ff4949" @change="btn4($event)">
            </el-switch>
          </el-card>

          <el-card :body-style="{ display: 'flex', padding: 8 }">
            <p class="numqq">MODELS_zq</p>
          </el-card>
          <el-card :body-style="{ display: 'flex', padding: 10 }">
            <p class="numq">
              状态:{{ status5 }}<br>CPU占比:{{ cpu_zhanbi5 }}<br>内存占比:{{ neicun_zhanbi5 }}
            </p>
          </el-card>
          <el-card :body-style="{ display: 'flex', padding: 10 }">
            <el-switch v-model="value5" active-color="#13ce66" inactive-color="#ff4949" @change="btn5($event)">
            </el-switch>
          </el-card>
        </div>
        <div class="card">
          <el-card :body-style="{ display: 'flex', padding: 6 }">
            <div class="container">
              <button class="btn" @click="all_start">全部开启</button>
              <button class="btn" @click="reboot">重新启动</button>
              <button class="btn" @click="close_all">全部关闭</button>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  name: 'Dashboard',
  components: {},

  data() {
    return {
      time: "",
      timer: null,

      value1: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false,

      status: '',
      cpu_zhanbi: '',
      neicun_zhanbi: '',

      status2: '',
      cpu_zhanbi2: '',
      neicun_zhanbi2: '',

      status3: '',
      cpu_zhanbi3: '',
      neicun_zhanbi3: '',

      status4: '',
      cpu_zhanbi4: '',
      neicun_zhanbi4: '',

      status5: '',
      cpu_zhanbi5: '',
      neicun_zhanbi5: ''

    };

  },

  //方法集合

  methods: {

    btn1() {
      if (this.value1 == true) {
        this.dpdk_start()
      } else {
        this.close_dpdk()
      }
    },
    btn2() {
      if (this.value2 == true) {
        this.zeek_start()
      } else {
        this.close_zeek()
      }
    },
    btn3() {
      if (this.value3 == true) {
        this.kafka_start()
      } else {
        this.close_kafka()
      }
    },
    btn4() {
      if (this.value4 == true) {
        this.mol_start()
      } else {

        this.close_mol()
      }
    },

    btn5() {
      if (this.value5 == true) {
        this.mol2_start()
      } else {

        this.close_mol2()
      }
    },

    reboot() {
      this.close_all()

      this.all_start()
    },


    post_dpdk() {

      axios.get("http://192.168.10.59:8000/open_dpdk/", {

      })
        .then((response) => {
          console.log(response.data)
          // this.status = response.data[0].id
          // this.cpu_zhanbi = response.data[0].author
          // this.neicun_zhanbi = response.data[0].title

          if (response.status !== 200) {
            clearInterval(this.timer)
            this.value1 = false
            console.log(response.status)
          } else {
            //this.value1 = false
            this.status = response.data[1].status
            this.cpu_zhanbi = response.data[1].cpu
            this.neicun_zhanbi = response.data[1].memory
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      // 设置定时器
    },
    post_zeek() {
      axios.get("http://192.168.10.59:8000/open_zeek/", {
        params: {
          user: 'start'
        }

      })
        .then((response) => {
          console.log(response.data)
          if (response.status !== 200) {
            clearInterval(this.timer)
            this.value1 = false
            console.log(response.status)
          } else {
            //this.value1 = false
            this.status2 = response.data[1].status
            this.cpu_zhanbi2 = response.data[1].cpu
            this.neicun_zhanbi2 = response.data[1].memery
            console.log(type(response.data))

          }
        })
        .catch(function (error) {
          console.log(error)


        })

    },

    post_kafka() {
      axios.get("http://192.168.10.59:8000/open_kafka/", {
        params: {
          user: 'start'
        }
      })
        .then((response) => {
          console.log(response.data)
          if (response.status !== 200) {
            clearInterval(this.timer)
            this.value1 = false
            console.log(type(response.data))
          } else {
            //this.value1 = false
            //console.log(type(response.data))
            this.status3 = response.data[1].status
            this.cpu_zhanbi3 = response.data[1].cpu
            this.neicun_zhanbi3 = response.data[1].memery

          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    post_mol1() {
      axios.get("http://192.168.10.59:8000/open_model/", {
        params: {
          user: 'start'
        }

      })
        .then((response) => {
          console.log(response.data)


          if (response.status !== 200) {
            clearInterval(this.timer)
            this.value1 = false
            console.log(response.status)
          } else {
            //this.value1 = false
            this.status4 = response.data[1].status
            this.cpu_zhanbi4 = response.data[1].cpu
            this.neicun_zhanbi4 = response.data[1].memery
          }
        })
        .catch(function (error) {
          console.log(error)
        })

    },

    post_mol2() {
      axios.get("http://192.168.10.59:8000/open_model/", {
        params: {
          user: 'start'
        }
      })
        .then((response) => {
          console.log(response.data)


          if (response.status !== 200) {
            clearInterval(this.timer)
            this.value1 = false
            console.log(response.status)
          } else {
            //this.value1 = false
            this.status5 = response.data[2].status
            this.cpu_zhanbi5 = response.data[2].cpu
            this.neicun_zhanbi5 = response.data[2].memery
          }
        })
        .catch(function (error) {
          console.log(error)
        })

    },

    post_all() {

      axios.get("http://192.168.10.59:8000/operator/", {
        params: {
          user: 'all_start'
        }

      })
        .then((response) => {
          console.log(response.data)


          if (response.status !== 200) {
            clearInterval(this.timer)
            this.value1 = false
            this.value2 = false
            this.value3 = false
            this.value4 = false

            console.log(response.status)
          } else {
            //this.value1 = false
            this.status = response.data[1].status
            this.cpu_zhanbi = response.data[1].cpu
            this.neicun_zhanbi = response.data[1].memory

            this.status2 = response.data[2].status
            this.cpu_zhanbi2 = response.data[2].cpu
            this.neicun_zhanbi2 = response.data[2].memory

            this.status3 = response.data[3].status
            this.cpu_zhanbi3 = response.data[3].cpu
            this.neicun_zhanbi3 = response.data[3].memory

            this.status4 = response.data[4].status
            this.cpu_zhanbi4 = response.data[4].cpu
            this.neicun_zhanbi4 = response.data[4].memory

            this.status5 = response.data[5].status
            this.cpu_zhanbi5 = response.data[5].cpu
            this.neicun_zhanbi5 = response.data[5].memory

            this.value1 = true
            this.value2 = true
            this.value3 = true
            this.value4 = true
            this.value5 = true
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    dpdk_start() {
      this.post_dpdk();

      // 设置好定时器，每1s调用一次
      this.timer = setInterval(() => {
        this.post_dpdk();
        //this.post_zeek();
      }, 30000)

    },

    zeek_start() {
      this.post_zeek();
      this.timer = setInterval(() => {
        this.post_zeek();
      }, 30000)
    },

    kafka_start() {
      this.post_kafka();
      this.timer = setInterval(() => {
        this.post_kafka();
      }, 30000)
    },

    mol_start() {
      this.post_mol1();
      this.timer = setInterval(() => {
        this.post_mol1();
      }, 30000)
    },

    mol2_start() {
      this.post_mol2();
      this.timer = setInterval(() => {
        this.post_mol2();
      }, 30000)
    },

    all_start() {
      this.post_all();
      this.timer = setInterval(() => {
        this.post_all();
      }, 30000)

    },

    close_dpdk() {

      clearInterval(this.timer)
      axios.get("http://192.168.10.59:8000/open_dpdk/", {

      })
        .then((response) => {
          console.log(response.data)
          this.status = response.data[0].status
          this.cpu_zhanbi = response.data[0].cpu
          this.neicun_zhanbi = response.data[0].memory
          //this.value1 = false
        })
        .catch(function (error) {
          console.log(error);
          this.value1 = false;
        });
    },

    close_zeek() {

      clearInterval(this.timer)
      axios.get("http://192.168.10.59:8000/comments", {

      })
        .then((response) => {
          console.log(response.data)
          this.status2 = response.data[1].status
          this.cpu_zhanbi2 = response.data[1].cpu
          this.neicun_zhanbi2 = response.data[1].memery

          this.value2 = false

        })

        .catch(function (error) {
          console.log(error);
        });
    },

    close_kafka() {

      clearInterval(this.timer)
      axios.get("http://192.168.10.59:8000/comments", {

      })
        .then((response) => {
          console.log(response.data)
          this.status3 = response.data[2].status
          this.cpu_zhanbi3 = response.data[2].cpu
          this.neicun_zhanbi3 = response.data[2].memery

          this.value3 = false
        })

        .catch(function (error) {
          console.log(error);
        });
    },

    close_mol() {
      clearInterval(this.timer)
      axios.get("http://192.168.10.59:8000", {})
        .then((response) => {
          console.log(response.data)

          this.status4 = response.data[1].status
          this.cpu_zhanbi4 = response.data[1].cpu
          this.neicun_zhanbi4 = response.data[1].memery

          this.value4 = false
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    close_mol2() {
      clearInterval(this.timer)
      axios.get("http://192.168.10.59:8000", {})
        .then((response) => {
          console.log(response.data)

          this.status5 = response.data[2].status
          this.cpu_zhanbi5 = response.data[2].cpu
          this.neicun_zhanbi5 = response.data[2].memery

          this.value4 = false
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    close_all() {

      //clearInterval(this.timer)
      for (let i = 1; i < 10000; i++) {
        clearInterval(i);
      }
      // var pageTimer = {} ; //定义计算器全局变量
      // //赋值模拟
      // pageTimer["timer1"] = setInterval(function(){},2000);
      // pageTimer["timer2"] = setInterval(function(){},2000);
      // //全部清除方法
      // for(var each in pageTimer){
      //     clearInterval(pageTimer[each]);
      // }

      axios.get("http://192.168.10.59:8000/close_service/", {
      })
        .then((response) => {
          console.log(response.data)
          this.status = response.data[0].status
          this.cpu_zhanbi = response.data[0].cpu
          this.neicun_zhanbi = response.data[0].memery

          this.status2 = response.data[0].status
          this.cpu_zhanbi2 = response.data[0].cpu
          this.neicun_zhanbi2 = response.data[0].memery

          this.status3 = response.data[0].status
          this.cpu_zhanbi3 = response.data[0].cpu
          this.neicun_zhanbi3 = response.data[0].memery

          this.status4 = response.data[0].status
          this.cpu_zhanbi4 = response.data[0].cpu
          this.neicun_zhanbi4 = response.data[0].memery

          this.status5 = response.data[0].status
          this.cpu_zhanbi5 = response.data[0].cpu
          this.neicun_zhanbi5 = response.data[0].memery

          this.value1 = false
          this.value2 = false
          this.value3 = false
          this.value4 = false
          this.value5 = false
        })

        .catch(function (error) {
          console.log(error);
        });
    },

  },

  beforeDestroy() {
    // 页面销毁后同时清除定时器，避免占用内存

    clearInterval(this.timer)

    this.timer = null;

  }, //生命周期 – 销毁之前


}

</script>

<style lang="less" scoped>
.el-switch {
  display: flex;
  margin-left: 110px;
  margin-top: 8px;
}

.num {
  display: flex;
  flex-wrap: wrap;
  margin-left: 30px;

  .numq {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 70px;
    //width: 10px;
    height: 14px;
    font-size: 10px;
    //line-height: 80px;
    //text-align: center;
  }

  .numqq {
    margin-top: 0%;
    margin-bottom: 0%;
    margin-left: 70px;
  }

  .el-card {
    display: flex;
    width: 28%;
    margin-bottom: 15px;
    margin-right: 30px;

    //justify-content: center;
    //margin-left: 130px;
  }
}

.card {
  display: flex;
  flex-wrap: wrap;
  margin-left: 130px;

  .el-card {
    display: flex;
    width: 72%;
    margin-bottom: 10px;
    margin-right: 20px;
    //margin-left: 30px;
  }

  .container {
    /* 定义3D元素距视图的距离 */
    perspective: 320px;
  }

  .btn {
    display: inline-block;
    margin-left: 50px;
    //margin: 10px;
    width: 120px;
    height: 60px;
    border: none;
    background-color: #413f3f;
    color: #fff;
    font-size: 18px;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    /* 动画过渡 */
    transition: 0.3s;
  }

  .btn:nth-child(1):hover {
    /* 沿X轴旋转15度 */
    transform: rotateX(15deg);
    /* 阴影 */
    box-shadow: 0 15px 15px rgba(112, 110, 109, 0.56);
  }

  .btn:nth-child(2):hover {
    transform: rotateX(-15deg);
    box-shadow: 0 -15px 15px rgba(81, 80, 79, 0.56);
  }

  .btn:nth-child(3):hover {
    transform: rotateY(15deg);
    box-shadow: -15px 0 15px rgba(122, 121, 120, 0.56);
  }

  .btn:nth-child(4):hover {
    transform: rotateY(-15deg);
    box-shadow: 15px 0 15px rgba(225, 95, 65, 0.56);
  }
}
</style>
