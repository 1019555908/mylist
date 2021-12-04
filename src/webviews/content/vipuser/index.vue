<template>
  <div>
    <el-form ref="form" :model="temp" size="mini" :inline="true" :rules="rules">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="查询维度" prop="radio">
          <el-radio v-model="radio" label="0" @change="changeRadio('0')">按月查询</el-radio>
          <el-radio v-model="radio" label="1" @change="changeRadio('1')">全局查询</el-radio>
        </el-form-item>
      </el-form>
      <el-row :rules="rules">
        <el-form-item label="查询月份" prop="queryTime" v-if="this.radio==='0'">
          <el-date-picker v-model="temp.queryTime" type="month" format="yyyy 年 MM 月" value-format="yyyy-MM"
            placeholder="选择月" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row :rules="rules">
        <el-form-item label="开通权益号码" v-if="radio==0" key="0">
          <el-input v-model="phoneNumber" placeholder="请输入开通权益号码" oninput="value=value.replace(/[^\d]/g,'')"
            minlength="11" maxlength="11" />
        </el-form-item>
        <el-form-item label="开通权益号码" v-if="radio==1" prop="phone" key="1">
          <el-input v-model="temp.phone" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" minlength="11"
            maxlength="11" />
        </el-form-item>
        <el-form-item label="订购编码" prop="orderId">
          <el-input v-model="temp.orderId" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" />
        </el-form-item>
        <!-- <el-form-item label="会员编码" prop="vipCode">
          <el-input v-model="temp.vipCode" placeholder="请输入" />
        </el-form-item>-->

        <el-form-item label="会员ID" prop="provinceVipId">
          <el-input v-model.trim="temp.provinceVipId" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" />
        </el-form-item>
        <el-form-item label="会员名称" prop="provinceVipName">
          <el-input v-model="temp.provinceVipName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="会员类型" prop="vipType">
          <el-select v-model="temp.vipType" clearable placeholder="会员类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员等级" prop="vipLevel">
          <el-select v-model="temp.vipLevel" clearable placeholder="会员等级">
            <el-option v-for="item in itStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户归属省" prop="provinceCode">
          <el-select clearable v-model="temp.provinceCode" placeholder="请选择" filterable :disabled='!!currentProvince'>
            <el-option v-for="item in provinceCodeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否为统一产品" prop="provinceId">
          <el-select clearable v-model="temp.provinceId" placeholder="请选择" filterable>
            <el-option v-for="item in provinceList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="会员开通时间" prop="selectDate">
          <el-date-picker v-model="selectDate" type="datetimerange" :picker-options="pickerOptions1" range-separator="-"
            start-placeholder="开始日期" end-placeholder="结束日期" :default-value="timeDefaultShow" align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="会员生效时间" prop="crTime">
          <el-date-picker v-model="crTime" type="datetimerange" range-separator="-" start-placeholder="开始日期"
            end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
        </el-form-item>
      </el-row>
      <el-form-item>
        <div style="margin-left: 10px; display: inline-block">
          <el-button type="primary" @click="addMember">新增会员</el-button>
          <el-button type="primary" @click="deleteMember">退订新星会员</el-button>
          <el-button type="primary" :loading="exportLoading" @click="educe()">导出</el-button>
          <el-button type="primary" @click="getList()">查询</el-button>
          <el-button @click="reset">重置查询</el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-table :data="list" ref="multipleTable" v-loading="listLoading" element-loading-text="加载中..." border fit
      highlight-current-row>
      <el-table-column align="center" label="id" prop="id" width="100"></el-table-column>
      <el-table-column align="center" label="开通权益号码" prop="phone" width="130"></el-table-column>
      <el-table-column align="center" label="用户归属省" prop="provinceName" width="100">
        <template slot-scope="scope">
          {{scope.row.provinceName ? scope.row.provinceName : '未知'}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员ID" prop="provinceVipId" width="110"></el-table-column>
      <el-table-column align="center" label="会员编码" prop="vipCode" width="110"></el-table-column>
      <el-table-column align="center" label="会员名称（子会员）" prop="provinceVipName" width="100"></el-table-column>
      <el-table-column align="center" label="会员等级" prop="vipLevel" width="100">
        <template scope="{row}">
          <span v-if="row.vipLevel == '1'">新星</span>
          <span v-if="row.vipLevel == '2'">黄金</span>
          <span v-if="row.vipLevel == '6'">铂金</span>
          <!-- <span v-if="row.vipLevel == '4'">体验版铂金</span> -->
          <span v-if="row.vipLevel == '8'">PLUS</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员类型" prop="vipType" width="100">
        <template scope="{row}">
          <span v-if="row.vipType == '1'">全网会员</span>
          <span v-if="row.vipType == '2'">10G高级会员</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员生效时间" prop="crTime" width="160"></el-table-column>
      <el-table-column align="center" label="会员失效时间" prop="reTime" width="160"></el-table-column>
      <el-table-column align="center" label="会员开通时间" prop="saveTime" width="160"></el-table-column>
      <el-table-column align="center" label="会员开通状态" prop="statusString" width="120"></el-table-column>
      <el-table-column align="center" label="开通渠道" prop="channelId" width="100"></el-table-column>
      <el-table-column align="center" label="开通来源" prop="sourceChannelCode" width="100"></el-table-column>
      <el-table-column align="center" label="开通GoodsId" prop="sourceGoodsIds" width="150"></el-table-column>
      <el-table-column align="center" label="开通CorGoodsid" prop="corGoodsId" width="160"></el-table-column>
      <el-table-column align="center" label="会员退订时间" prop="unsubscribeTime" width="160"></el-table-column>
      <el-table-column align="center" label="会员退订状态" prop="statusString" width="120">
        <template scope="{row}">
          <span v-if="row.reOrderId">{{ row.statusString }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员退订订单编码" prop="reOrderId" width="170"></el-table-column>
      <el-table-column align="center" label="退订渠道" prop="reChannelId" width="100"></el-table-column>
      <!-- <el-table-column label="退订来源" prop=""></el-table-column> -->
      <el-table-column align="center" label="退订Goodsid" prop="reGoodsId" width="150"></el-table-column>
      <el-table-column align="center" label="退订CorGoodsid" prop="reCorGoodsId" width="150"></el-table-column>
      <el-table-column align="center" label="会员订购订单编码" prop="orderId" width="170"></el-table-column>
      <el-table-column align="center" label="是否为统一产品" prop="skuProvince" width="130"></el-table-column>
      <!-- <el-table-column align="center" label="SKU" prop="skuId" width="100"></el-table-column> -->
    </el-table>
<el-button @click="handleBtn">webscorket按钮</el-button>
  </div>
</template>

<script>
// import {
//   queryVipUserInfo,
//   queryVipUserExport,
//   addVipUserInfo,
//   deleteNewStarMember,
// } from '@/api/member'
import moment from 'moment'
export default {
  // eslint-disable-next-line no-undef
  components: {},
  data() {
    return {
      temp: {
        provinceCode:
          localStorage.getItem('provinceId') == 'ALL'
            ? ''
            : Number(localStorage.getItem('provinceId')),
        phone: '',
        orderId: '',
        vipLevel: '',
        vipType: '',
        provinceId: '',
        provinceVipId: '',
        provinceVipName: '',
        saveTimeStart: '',
        saveTimeEnd: '',
        crTimeStart: '',
        crTimeEnd: '',
        page: 1,
        pageSize: 10,
        queryTime: null,
        queryType: 0, //0：按月查询，1：全局查询
      },
      msg:'',
      reTime: '',
      crTime: '',
      dialogStatus: '',
      flag: true,
      list: [],
      textMap: {
        update: '删除',
        create: '新增',
      },
      provinceList: [],
      provinceCodeList: [],
      currentProvince: [],
      rules: {
        vipCode: [
          {
            required: true,
            message: '请选择会员类型',
            trigger: 'change',
          },
        ],
        radio: [{ required: true, message: '请选择', trigger: 'blur' }],
        queryTime: [
          { required: true, message: '请选择日期', trigger: 'change' },
        ],
        phone: [
          { required: true, message: '请输入正确的手机号码', trigger: 'blur' },
          {
            min: 11,
            max: 11,
            message: '请输入正确的手机号码',
            trigger: 'blur',
          },
        ],
      },
      ruleForm: {
        id: '',
        phone: '',
        vipCode: '',
        orderId: '',
        crTime: '',
        reTime: '',
      },
      marketStatus: [
        // {
        //   value: 'CS45745587',
        //   label: '普通',
        // },
        // {
        //   value: 'CS37523209',
        //   label: '黄金',
        // },
        {
          value: 'CS78027018',
          label: '体验铂金',
        },
        {
          value: 'CS49713701',
          label: '新星会员',
        },
      ],
      dialogFormVisible: false,
      id: '',
      total: 0,
      orderId: '',
      listLoading: false,
      exportLoading: false,
      itStatus: [
        {
          value: '1',
          label: '新星',
        },
        {
          value: '2',
          label: '黄金',
        },
        {
          value: '6',
          label: '铂金',
        },
        {
          value: '8',
          label: 'PLUS',
        },
      ],
      options: [
        {
          value: '1',
          label: '全网会员',
        },
        // {
        //   value: '2',
        //   label: '5G高级会员',
        // },
      ],
      radio: '0',
      pickerOptions: {},
      vipopen: [],
      controlTime: null,
      selectDate: null,
      pickerOptions1: {
        //初次进入禁用区域
        disabledDate: (time) => {
          return (
            time.getTime() < this.vipopen[0] - 8.64e6 ||
            time.getTime() < this.vipopen[0] ||
            time.getTime() > this.vipopen[1]
          )
        },
      },
      timeDefaultShow: '',
      phoneNumber: '',
    }
  },
  watch: {
    'temp.queryTime': function (newval) {
      //监听月份改变，会员开通时间默认可视区域在选中月
      if (this.radio === '0') {
        let arr = newval ? newval.split('-') : null //重置避免报错
        if (arr) {
          let year = arr[0] //获取当前日期的年份
          let month = Number(arr[1]) + 1 //获取当前日期的月份
          this.timeDefaultShow = new Date(year + '-' + month) //默认禁止区域
          this.timeDefaultShow.setMonth(
            new Date(year + '-' + month).getMonth() - 1
          ) //默认禁止区域
          this.controlTime = newval ? newval : ''
        }
      } else {
        this.vipopen = []
      }
    },
    controlTime: {
      //利用中间一个变量控制禁用区域，月份改变，禁用区域改变
      handler(newv, oldv) {
        if (this.radio === '0') {
          if (newv) {
            if (newv != oldv) {
              this.selectDate = null
              this.vipopen[0] = moment(newv).startOf('month').valueOf() //会员开通时间当月第一天
              this.vipopen[1] = moment(newv).endOf('month').valueOf() //会员开通时间当月最后一天
            }
          }
        }
      },
    },
  },
  mounted() {
    var ws = new WebSocket("ws://localhost:3000");
    console.log(ws);
    this.changeRadio('0')
    ws.addEventListener('open',this.handelOpen.bind(this),false)
    ws.addEventListener('close',this.handelClose.bind(this),false)
    ws.addEventListener('error',this.handelError.bind(this),false)
    ws.addEventListener('message',this.handelMessage.bind(this),false)
  },
  methods: {
    handleBtn(){
      const msg =this.msg
      // console.log('send',ws)
      
    },
    handelOpen(){
      console.log('webopen')
      
    },
    handelClose(){
      console.log('webclose')
      
    },
    handelError(){
      console.log('weberror')
      
    },
    handelMessage(){
      console.log('webmessage')
      
    },
    changeRadio(radio) {
      this.resetForm()
      this.radio = radio
      this.temp.queryType = radio
      let myDate = new Date()
      this.temp.queryTime = moment(myDate).format('YYYY-MM') //格式是2021-11
      this.controlTime = myDate
      if (this.radio === '0') {
        let arr = this.temp.queryTime ? this.temp.queryTime.split('-') : null //重置避免报错
        if (arr) {
          let year = arr[0] //获取当前日期的年份
          let month = Number(arr[1]) + 1 //获取当前日期的月份
          this.timeDefaultShow = new Date(year + '-' + month)
          this.timeDefaultShow.setMonth(
            new Date(year + '-' + month).getMonth() - 1
          )
          // this.controlTime = this.temp.queryTime ? this.temp.queryTime : ''
          this.pickerOptions1 = {
            //让改变维度的时候也同时限制
            disabledDate: (time) => {
              return (
                time.getTime() < this.vipopen[0] - 8.64e6 ||
                time.getTime() < this.vipopen[0] ||
                time.getTime() > this.vipopen[1]
              )
            },
          }
        }
        this.getList()
      } else if (radio === '1') {
        //每次让会员开通时间定在当前月
        this.total = 0
        this.selectDate = null
        this.temp.queryTime = null
        let arr = this.temp.queryTime ? this.temp.queryTime.split('-') : null //重置避免报错
        if (arr) {
          let year = arr[0] //获取当前日期的年份
          let month = Number(arr[1]) + 1 //获取当前日期的月份
          this.timeDefaultShow = new Date(year + '-' + month)
          this.timeDefaultShow.setMonth(
            new Date(year + '-' + month).getMonth() - 1
          )
          this.pickerOptions1.disabledDate = () => {}
        }
        this.list = []
      }
    },
    cancel() {
      this.dialogFormVisible = false
      this.$refs.ruleForm.clearValidate()
    },
    // 导出
    educe() {
      for (let i in this.temp) {
        if (this.temp[i] == '') {
          delete this.temp[i]
        }
      }
      this.exportLoading = true
      // queryVipUserExport(this.temp)
      //   .then((res) => {
      //     this.exportLoading = false
      //     let that = this
      //     let reader = new FileReader()
      //     reader.addEventListener('loadend', function (e) {
      //       let result = e.target.result
      //       if (result.substr(0, 1) == '{') {
      //         result = JSON.parse(result)
      //         that.$message.error(result.message)
      //       } else {
      //         that.$exportFile(res, '权益超市会员详单导出清单.xlsx')
      //       }
      //     })
      //     reader.readAsText(res)
      //   })
      //   .catch((err) => {
      //     this.exportLoading = false
      //     console.log(err)
      //   })
    },
    //切换维度表单校验重置
    resetForm() {
      this.reset()
      this.$refs.form.resetFields()
    },
    // 查询分页
    getList(page) {
      if (this.reTime && this.reTime[0]) {
        this.temp.saveTimeStart = this.reTime[0].valueOf()
        this.temp.saveTimeEnd = this.reTime[1].valueOf()
      } else {
        this.reTime = ''
        this.temp.saveTimeStart = ''
        this.temp.saveTimeEnd = ''
      }
      if (this.crTime && this.crTime[0]) {
        this.temp.crTimeStart = this.crTime[0].valueOf()
        this.temp.crTimeEnd = this.crTime[1].valueOf()
      } else {
        this.crTime = ''
        this.temp.crTimeStart = ''
        this.temp.crTimeEnd = ''
      }
      if (page) {
        this.temp.pageSize = page.limit
        if ((page.page - 1) * page.limit >= this.total) {
          return
        }
      }
      this.temp.page = page ? page.page : 1
      this.listLoading = true
      for (let i in this.temp) {
        if (this.temp[i] == '' && this.temp[i] != 0) {
          delete this.temp[i]
        }
      }
      this.selectDate
        ? ((this.temp.saveTimeStart = this.selectDate[0].valueOf()),
          (this.temp.saveTimeEnd = this.selectDate[1].valueOf()))
        : ((this.temp.saveTimeStart = null), (this.temp.saveTimeEnd = null))
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.listLoading = false
          if (this.radio === '0') {
            this.temp.queryTime = moment(this.temp.queryTime).format('YYYY-MM')
            let date = new Date(this.temp.queryTime)
            if (this.isValidDate(date)) {
              this.phoneNumber
                ? (this.temp.phone = this.phoneNumber)
                : (this.temp.phone = '')
              if (
                (this.temp.phone && this.temp.phone.length == 11) ||
                this.temp.phone.length == 0
              ) {
                this.publicfun()
              } else {
                this.$message(`请输入正确的手机号`)
              }
            } else if (!this.isValidDate(date)) {
              this.listLoading = false
              this.$message(`请选择月份日期`)
              return
            }
          } else if (this.radio === '1') {
            //如果手机和维度都达到条件
            this.publicfun()
          }
        } else {
          this.listLoading = false
        }
      })
    },
    publicfun() {
      // queryVipUserInfo(this.temp)
      //   .then((res) => {
      //     this.list = res.data.list
      //     this.total = res.data.total
      //     this.listLoading = false
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
    },
    // 新增会员
    addMember() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.ruleForm.phone = ''
      this.ruleForm.vipCode = ''
      this.flag = true
      // this.ruleForm.orderId = ''
      // this.ruleForm.crTime = ''
      // this.ruleForm.reTime = ''
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    deleteMember() {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.ruleForm.id = ''
      this.ruleForm.phone = ''
      this.ruleForm.vipCode = ''
      this.flag = false
    },
    // 删除确认
    updateData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // let query = {
          //   phone: this.ruleForm.phone,
          //   id: this.ruleForm.id,
          // }
          // deleteNewStarMember(query)
          //   .then((res) => {
          //     console.log(res)
          //     setTimeout(() => {
          //       this.$message.success('删除成功')
          //       this.getList()
          //       this.dialogFormVisible = false
          //     }, 0)
          //   })
          //   .catch((err) => {
          //     console.log(err)
          //   })
        }
      })
    },
    //新增确认
    createData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // let query = {
          //   vipCode: this.ruleForm.vipCode,
          //   phone: this.ruleForm.phone,
          // }
          // addVipUserInfo(query)
          //   .then((res) => {
          //     console.log(res)
          //     setTimeout(() => {
          //       this.$message.success('新增成功')
          //       this.getList()
          //       this.dialogFormVisible = false
          //       this.$refs.ruleForm.clearValidate()
          //     }, 0)
          //   })
          //   .catch((err) => {
          //     console.log(err)
          //   })
        }
      })
    },
    // 重置查询
    reset() {
      this.$refs['form'].resetFields()
      this.paytime = ''
      this.phoneNumber = ''
      this.temp.saveTimeStart = ''
      this.temp.phone = ''
      this.temp.saveTimeEnd = ''
      this.temp.crTimeStart = ''
      this.temp.crTimeEnd = ''
      this.reTime = ''
      this.crTime = ''
      if (this.radio === '0') {
        this.selectDate = null
        let myDate = new Date()
        this.temp.queryTime = moment(myDate).format('YYYY-MM')
      } else if (this.radio === '1') {
        this.selectDate = null
        this.temp.queryTime = null
      }
      // this.getList()
    },
    isValidDate(date) {
      //校验日期方法
      return date instanceof Date && !isNaN(date.getTime())
    },
  },
}
</script>

<style lang="less" scoped>
.flex {
  margin: 10px 0;
}

.red {
  color: #f56c6c;
}

.blue {
  color: #409eff;
}

.green {
  color: #67c23a;
}

.table-img {
  width: 100px;
}

.table-staus span {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;

  &.up {
    background-color: #67c23a;
  }

  &.no-up {
    background-color: #909399;
  }
}

/deep/.el-select {
  width: 190px;
}

.formdata {
  display: flex;
  justify-content: space-around;
  position: relative;
}

.addCombo {
  position: relative;
  left: -20px;
  top: -10px;
}

.addBtn {
  position: relative;
  top: 0px;
  left: -10px;
}
</style>
