<template>
  <div class="role">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--添加角色 -->
    <el-button type="text" @click="adddialogFormVisible = true">添加角色</el-button>
    <el-dialog title="收货地址" :visible.sync="adddialogFormVisible">
      <el-form :model="addForm" :label-width="'100px'">
        <el-form-item label="角色名称">
          <el-input v-model="addForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addForm.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adddialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色列表展示页 -->
    <el-table :data="roleList" style="width: 100%">
      <!-- 展开结构 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            v-for="first in scope.row.children"
            :key="first.id"
            style="margin-bottom:10px;border-bottom:1px dashed #ccc"
          >
            <el-col :span="4">
              <el-tag
                closable
                type="success"
                @close="delRightById(scope.row,first.id)"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id">
                <el-col :span="4">
                  <el-tag
                    closable
                    type="success"
                    @close="delRightById(scope.row,second.id)"
                  >{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    type="warning"
                    v-for="third in second.children"
                    :key="third.id"
                    style="margin:0px 10px 5px 0px"
                    @close="delRightById(scope.row,third.id)"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-col :span="24" v-show="scope.row.children.length == 0">没有任何的权限，请先分配！！</el-col>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" round></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" round></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="分配角色" placement="top">
            <el-button
              type="warning"
              icon="el-icon-check"
              round
              @click="showGrantDialog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 角色授权 -->
    <el-dialog title="角色授权" :visible.sync="grantdialogFormVisible">
      <el-tree
        ref="mytree"
        :data="rightList"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="checkedArr"
        :props="defaultProps"
        :model="grantform"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllRoleList, delRightByRoleId } from '@/api/role_index.js'
import { getAllRightList, grantRightById } from '@/api/right_index.js'
export default {
  data () {
    return {
      roleList: [],
      rightList: [],
      checkedArr: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      grantdialogFormVisible: false,
      grantform: {
        roleId: '',
        rids: ''
      },
      adddialogFormVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    // 角色初始化
    async roleListInit () {
      let res = await getAllRoleList()
      this.roleList = res.data.data
    },
    // 点击删除权限
    async delRightById (row, rightId) {
      let res = await delRightByRoleId(row.id, rightId)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        // 刷新当前展开行的数据对象
        row.children = res.data.data
      }
    },
    // 树形组件的动态数据加载
    async showGrantDialog (row) {
      this.grantdialogFormVisible = true
      this.grantform.roleId = row.id
      let res = await getAllRightList('tree')
      console.log(row)
      this.rightList = res.data.data
      this.checkedArr.length = 0
      // 嵌套循环
      if (row.children && row.children.length > 0) {
        row.children.forEach(first => {
          if (first.children && first.children.length > 0) {
            first.children.forEach(second => {
              if (second.children && second.children.length > 0) {
                second.children.forEach(third => {
                  this.checkedArr.push(third.id)
                })
              }
            })
          }
        })
      }
    },
    async grantSubmit () {
      let arr = this.$refs.mytree.getCheckedNodes()
      var temp = []
      // 遍历数组，对数组进行拼接
      arr.forEach(item => {
        temp.push(item.id + ',' + item.pid)
      })
      var tempStr = temp.join(',')
      var tempArr = tempStr.split(',')
      // 数组去重
      var finnalArr = [...new Set(tempArr)]
      console.log(finnalArr.join(','))
      this.grantform.rids = finnalArr.join(',')
      // 调用接口方法实现权限的分配
      let res = await grantRightById(this.grantform)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
      }
      this.grantdialogFormVisible = false
      this.roleListInit()
    }
  },
  mounted () {
    this.roleListInit()
  }
}
</script>
<style lang="less" scoped>
</style>
