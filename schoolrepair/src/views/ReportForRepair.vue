<template>
  <div class="reportForRepair">
    <el-card>
      <el-form ref="formRef" :model="repairData" label-width="80px" :rules="repairRule">
        <el-form-item label="栋" style="width:500px" prop="tung">
          <el-select v-model="repairData.tung" placeholder="请选择">
            <el-option
              v-for="item in tungList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="层" prop="layer">
          <el-select v-model="repairData.layer" placeholder="请选择">
            <el-option
              v-for="item in layerList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="寝室号" prop="dorm">
          <el-input v-model="repairData.dorm"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="repairData.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="submitRepair()">提交</el-button>
          <el-button type="info" size="medium" @click="clearForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <h1>我要保修</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tungList: [
        { id: 1, value: "一栋", label: "一栋" },
        { id: 2, value: "二栋", label: "二栋" },
        { id: 3, value: "三栋", label: "三栋" },
        { id: 4, value: "四栋", label: "四栋" },
        { id: 5, value: "五栋", label: "五栋" },
        { id: 6, value: "六栋", label: "六栋" }
      ],
      layerList: [
        { id: 1, value: "1层", label: "1层" },
        { id: 2, value: "2层", label: "2层" },
        { id: 3, value: "3层", label: "3层" },
        { id: 4, value: "4层", label: "4层" },
        { id: 5, value: "5层", label: "5层" },
        { id: 6, value: "6层", label: "6层" }
      ],
      repairData: {
        layer: "",
        tung: "",
        dorm: "",
        desc: ""
      },
      repairRule: {
        layer: [{ required: true, message: "请选择楼层", trigger: "blur" }],
        tung: [{ required: true, message: "请选择栋", trigger: "blur" }],
        dorm: [{ required: true, message: "请输入寝室号", trigger: "blur" }],
        desc: [{ required: true, message: "请输入描述", trigger: "blur" }]
      }
    };
  },
  methods: {
    async submitRepair() {
      console.log(this.repairData);
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post(
            "http://localhost:5000/api/Repair/repair",
            this.repairData
          );
          if (res.status != 200) {
            return this.$message.error("提交失败");
          } else {
            this.clearForm();
            return this.$message.success("提交成功");
          }
          console.log(res);
        }
      });
    },
    clearForm() {
      this.repairData.tung = this.repairData.layer = this.repairData.dorm = this.repairData.desc =
        "";
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  position: relative;
  margin-left: 38%;
  .el-form-item {
    width: 500px;
  }
  /deep/ .el-input__inner {
    //position: relative;
    width: 300px;
    margin-left: -100px;
  }
}
</style>