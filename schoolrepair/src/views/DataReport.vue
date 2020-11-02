<template>
  <div class="about">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card>
          <div id="dataQc" style="width:500px;height:500px;"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div id="dataUserProp" style="width:500px;height:500px;"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div id="dataUserCommit" style="width:500px;height:500px;"></div>
        </el-card>
      </el-col>
    </el-row>
    <h1>报表</h1>
  </div>
</template>

<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      dataQC: [],
      dataUserProp: [],
      dataUserCommit: []
    };
  },
  created() {
    this.getDataQC();
    this.getUserProp();
    this.getUserCommit();
  },
  mounted() {},
  methods: {
    async getDataQC() {
      const { data: res } = await this.$http.get(
        "http://localhost:5000/api/DataReport/dataQC"
      );
      if (res.status != 200) {
        return this.$message.error("获取数据失败");
      } else {
        this.dataQC = res.responseInfo;
        console.log(this.dataQC.arrayT);
        this.QCechart();
        return this.$message.success("获取数据成功");
      }
    },
    async getUserProp() {
      const { data: res } = await this.$http.get(
        "http://localhost:5000/api/DataReport/userProp"
      );
      if (res.status != 200) {
        return this.$message.error("获取数据失败");
      } else {
        this.dataUserProp = res.responseInfo;
        console.log(this.dataUserProp);
        this.userPropechart();
        return this.$message.success("获取数据成功");
      }
    },
    async getUserCommit() {
      const { data: res } = await this.$http.get(
        "http://localhost:5000/api/DataReport/ptComment"
      );
      if (res.status != 200) {
        return this.$message.error("获取数据失败");
      } else {
        this.dataUserCommit = res.responseInfo;
        console.log(this.dataUserCommit);
        this.userCommitchart();
        return this.$message.success("获取数据成功");
      }
    },
    userCommitchart() {
      var myChart = echarts.init(document.getElementById("dataUserCommit"));
      var option = {
        title: {
          text: "评论分布",left: 'center'
        },
        tooltip: {},
        legend: {
          orient: "vertical",
          left: "left",
          data: ["无评论", "好评", "中评", "差评"]
        },
        series: [
          {
            name: "数量",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: this.dataUserCommit[0], name: "无评论" },
              { value: this.dataUserCommit[1], name: "好评" },
              { value: this.dataUserCommit[2], name: "中评" },
              { value: this.dataUserCommit[3], name: "差评" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    userPropechart() {
      var myChart = echarts.init(document.getElementById("dataUserProp"));
      var option = {
        //color: ["#F56C6C", "#9C8C17", "#67C23A"],
        title: {
          text: "角色比例"
        },
        tooltip: {},
        xAxis: {
          type: "category",
          data: ["管理员", "电工", "木工", "普通用户"]
        },
        yAxis: { type: "value" },
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              normal: {
                color: function(params) {
                  let colors = ["#ccc", "#FF4053", "#f1af5a", "#23b2ff"];
                  return colors[params.dataIndex];
                }
              }
            },
            data: this.dataUserProp
          }
        ]
      };
      myChart.setOption(option);
    },
    QCechart() {
      var myChart = echarts.init(document.getElementById("dataQc"));
      var option = {
        //color: ["#F56C6C", "#9C8C17", "#67C23A"],
        title: {
          text: "任务完成量统计"
        },
        tooltip: {},
        xAxis: {
          type: "category",
          data: ["总量", "未接受", "正在处理", "已完成"]
        },
        yAxis: { type: "value" },
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              normal: {
                color: function(params) {
                  let colors = ["#ccc", "#FF4053", "#f1af5a", "#23b2ff"];
                  return colors[params.dataIndex];
                }
              }
            },
            data: this.dataQC.arrayT
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>