<template>
  <div class="index">
    <el-card>
      <div slot="header"></div>
      <div>
        <el-carousel height="700px">
          <el-carousel-item>
            <img src="../assets/lunbo1.jpg" alt style="height:100%;width:100%" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/lunbo2.jpg" alt style="height:100%;width:100%" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/lunbo3.jpg" alt style="height:100%;width:100%" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/lunbo4.jpg" alt style="height:100%;width:100%" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/lunbo5.jpg" alt style="height:100%;width:100%" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-card>
    <el-card>
      <div slot="header">公告</div>
      <div>
        <span>暂无公告</span>
      </div>
    </el-card>
    <el-card>
      <div slot="header" class="title">报修需知</div>
      <div class="baoRepairNotice">
        <ul>
          <li>一、为了保障您的维修能正常进行，请您在报修时填写真实的资料，以便我们和您联系。</li>
          <li>
            二、报修时如果为多个项目，请分别填写报修件，方便我们对维修进行合理的安排。
            报修时如果为多个项目，请分别填写报修件，方便我们对维修进行合理的安排。
          </li>
          <li>
            三、收到您的信息后我们的工作人员会根据具体情况及时安排维修，
            并以最快的速度帮您解决问题，希望您填写信息时务必保证信息的准确性，以便提高工作效率，感谢支持。
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.index {
  overflow: hidden;
  .el-card {
    line-height: 30px;
    /deep/.el-card__header {
      background-color: cadetblue;
    }
  }
  .el-card:nth-child(1) {
    width: 69%;
    float: left;
    height: 770px;
  }
  .el-card:nth-child(2) {
    width: 30%;
    float: right;
    height: 385px;
  }
  .el-card:nth-child(3) {
    margin-top: 20px;
    width: 30%;
    float: right;
    height: 365px;
    .baoRepairNotice {
      ul {
        li {
          text-indent: 2em;
          list-style: none;
          text-align: left;
        }
      }
    }
  }
}
</style>