<template>
  <div class="list">
    <!--    面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="userobj.query"
        class="input-with-select"
        style="width:300px;margin-right:20px"
        @keydown.enter.native="goodsInit"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain @click="adddialogFormVisible =true">添加商品</el-button>
    </div>
    <!-- 商品列表页 -->
    <template>
      <el-table :data="goodsList" border style="width: 100% ;margin-top:20px">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="goods_name" label="商品名称" width="520"></el-table-column>
        <el-table-column property="goods_price" label="商品价格" ></el-table-column>
        <el-table-column property="goods_state" label="商品状态" ></el-table-column>
        <el-table-column property="goods_weight" label="商品重量"  ></el-table-column>
        <el-table-column property="add_time" label="创建时间" width="120"></el-table-column>
        <el-table-column label="操作" width="280" >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" round></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" round></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="分配角色" placement="top">
              <el-button type="warning" icon="el-icon-check" round></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="userobj.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="userobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { getAllGoodsList } from '@/api/goods_index.js'
export default {
  data () {
    return {
      total: 0,
      userobj: {
        query: '',
        pagenum: 10,
        pagesize: 10
      },
      goodsList: [],
      goodsFrom: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_state: '',
        add_time: ''
      }
    }
  },
  methods: {
    // 获取每页总条数时触发
    handleSizeChange (val) {
      // 修改全局的pagesize
      this.userobj.pagesize = val
      // 重新刷新数据
      this.goodsInit()
    },
    // 切换当前页码时触发
    handleCurrentChange (val) {
      // 修改全局pagenum
      this.userobj.pagenum = val
      // 重新刷新数据
      this.goodsInit()
    },
    goodsInit () {
      getAllGoodsList(this.userobj)
        .then(res => {
          console.log(res)
          this.goodsList = res.data.data.goods
          this.total = res.data.data.total
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.goodsInit()
  }
}
</script>
<style lang="less" scoped>
</style>
