[TOC]



## 是什么
- 用来展示基础业务（增、删、改、查）的前端模板，
- 可实现条件搜索、列表展示、详情查看、新增条目、编辑条目、删除条目五项基础功能



## 开始使用

1. 后端开发相关的接口，其传输格式需要与前端模板相匹配

2. 在config文件夹内新建配置文件，按照规定编辑配置

3. 在菜单中配置页面url，在pageCode参数内输入配置文件的名称，例：

   ```
   jasmvvm/pages/module-template/base-template/base-template.html?pageCode=person
   ```





##  配置说明

### privilegeCode 权限配置项

方式一：

【描述】以标志数组的方式，控制增删改查等按钮的显隐权限

【类型】Array

【值】['bt_add','bt_select', 'bt_update', 'bt_delete','bt_position','bt_export','bt_import']中的一个或多个

方式二：

【描述】请求后台的权限接口，控制增删改查等按钮的显隐权限

【类型】String

【值】菜单权限编码，如：‘anli-vue-0101’

方式三：

【描述】默认拥有全部权限

【类型】null、undefind

【值】空



### dialogconfig  模态框的大小配置

【描述】模态框的大小配置

【类型】obj

【举例】

```javascript
  dialogconfig: {
    addWidth: '780px', // 表单dialog宽
    addHeight: '50%', // 表单dialog高
    detailWidth: '780px', // 详情dialog
    detailHeight: '40%'
  }
```





### ifAttachment  是否带附件功能

【描述】是否在表单及详情界面带有附件功能

【类型】Boolean

【值】true 、 false



### ifHideSearch  是否隐藏搜索框

【描述】默认控制搜索栏的展示或隐藏

【类型】Boolean

【值】true 、 false



### searchPath  表格查询接口

【描述】表格查询接口，不需要带 ip+端口+项目名

【类型】String

【举例】'/jdbc/commonData/projectWbsData/getPage.do'



### searchParams 查询接口的其他参数

【描述】为表格查询接口添加额外的请求参数

【类型】Object

【值】{xxx：’xxx‘}

【举例】

```js
{
  modelWbsId: jasTools.base.getParamsInUrl(location.href).modelWbsId,
  riskProjectId: jasTools.base.getParamsInUrl(location.href).riskId  
}
```



### detailPath 详情接口  

【描述】详情接口 ，不需要带 ip+端口+项目名

【类型】String

【举例】'/jdbc/commonData/projectWbsData/getPage.do'



### savePath 保存接口 

【描述】保存接口 ，不需要带 ip+端口+项目名

【类型】String

【举例】'/jdbc/commonData/projectWbsData/getPage.do'



### updatePath 更新接口   

【描述】更新接口 ，不需要带 ip+端口+项目名

【类型】String

【举例】'/jdbc/commonData/projectWbsData/getPage.do'



### topBtns 表格顶部按钮栏

#### topBtns[n].name 

#### topBtns[n].icon

#### topBtns[n].method

#### topBtns[n].isShow

#### topBtns[n].privilegeCode

#### topBtns[n].isDefaultMethod

#### topBtns[n].method

【举例】

```javascript
[{
   name: '新增', // 必填
   icon: 'fa fa-plus', //选填，按钮的font图标，font-awesome类，仅在topBtns生效
   method: 'addItem',  //选填，方法名，此方法需要在【methods】配置项里配置
   isDefaultMethod：'true', //选填，是否采用默认方法,需要搭配privilegeCode使用，仅在rowBtns生效
   privilegeCode：'bt_delete', //选填，表明按钮的权限，仅在rowBtns生效
   isShow: function (rows) { 
       // 选填，设置按钮disabled的效果（在rowBtns为hidden效果）
       // rows，Array格式，表示勾选的表格行的Obj数组（在rowBtns为被点击的表格行的Obj数组）
      if (rows.length == 1){
        return rows[0].useStatus == '未使用' && rows[0].riskModelType != '1';
      } 
      return false;
   }    
}]
```



### rowBtns  表格右侧按钮列

【描述】同 topBtns 



### isHideBtnCol 是否隐藏表格列

【描述】是否隐藏表格列

【类型】Boolean

【举例】true、false（默认）



### btncolwidth 表格列宽度

【描述】表格按钮列的宽度

【类型】String

【举例】‘180px’ 







### searchFields 搜索栏字段  

【描述】位于搜索栏中，需要显示的字段，按顺序排列显示

【类型】Array

【举例】

```javascript
  searchFields: [
    'riskModelName',
    'riskModelCode',
    'riskModelType'
  ],
```



### tableFields 表格栏字段  

【描述】位于表格栏中，需要显示的字段，按顺序排列显示

【类型】Array

【举例】

```javascript
  tableFields: [
    'riskModelName',
    'riskModelCode',
    'useStatus',
    'modelStatistics',
    'description',
    'createUserName',
    'createDatetime',
    'oid'
  ]
```



### addFields 表单(新增、编辑)页面字段

#### addFields[n].title 表单分组的title
#### addFields[n].fields 表单分组下的字段

【举例】

```javascript
  addFields: [{
      title: '模型信息',
      fields: [
        'riskModelName',
        'riskModelCode',
      ]
    },
    {
      title: '其他信息',
      fields: [
        'createUserName',
        'createDatetime',
        'description',
      ]
    }
  ],
```



### detailFields 表单(新增、编辑)页面字段

【描述】同 addFields



### fieldsConfig  字段配置

#### fieldsConfig[field].type

【描述】字段的表单类型类型

【类型】String

【值】['select','multiSelect'(仅表单),'cascader'(仅表单),'input','number','date','textarea'(仅表单),'daterange'(仅搜索)]

#### fieldsConfig[field].name

【描述】字段名称

【类型】String

#### fieldsConfig[field].isRequired

【描述】表单验证中的必填项

【类型】Boolean

#### fieldsConfig[field].disabled

【描述】表单项不可更改

【类型】Boolean

#### fieldsConfig[field].options

【描述】仅用于select类型，固定的下拉选项的数组

【类型】Array

【举例】

```javascript
[{
    key:1,
   	value:'是'
}，{
    key:0,
   	value:'否'    
}]
```

#### fieldsConfig[field].optionUrl

【描述】仅用于select类型，下拉选项的请求接口

【类型】String

#### fieldsConfig[field].props

【描述】仅用于select类型，下拉选项的返回接口的字段名称可以自定义

【类型】Obejct

【举例】     

```javascript
      type: 'select',
      optionUrl: '/jdbc/commonData/getRiskModelList/simpleQuery.do',     
	  props: {
        label: 'VALUE',
        value: 'KEY'
      }
```

#### fieldsConfig[field].domainName

【描述】仅用于select类型，通用阈值接口所用到的入参，调取选项接口

【类型】String

#### fieldsConfig[field].childSelect

【描述】仅用于select类型，级联下拉选的下一级字段的数组

【类型】Array

#### fieldsConfig[field].childUrl

【描述】仅用于select类型，级联下拉选的下一级字段选项的请求接口

【类型】String

#### fieldsConfig[field].width

【描述】表格中字段的宽度

【类型】String

【值】如：‘160px’

#### fieldsConfig[field].sortable

【描述】表格中该字段是否排序

【类型】Boolean

#### fieldsConfig[field].queryFields

【描述】仅用于搜索栏中的datarange类型，传入两个值，作为查询接口中的两个字段

【类型】Array

【举例】 ['mydatestart', 'mydateend']

#### fieldsConfig[field].tablehidden

【描述】是否在表格中隐藏该字段，可通过界面中的表格配置按钮，显示该字段

【类型】Boolean

#### fieldsConfig[field].maxLength

【描述】仅用于表单页中的textarea类型，最大字符串的长度

【类型】Number

【值】如：200

#### fieldsConfig[field].rules

【描述】用于表单项的验证，格式同elementUi中的el-form-item的rules的配置

【类型】见Element文档

#### fieldsConfig[field].max

【描述】仅用于表单页中的number类型，数字的最大值

【类型】Number

#### fieldsConfig[field].precision

【描述】仅用于表单页中的number类型，格式化小数点后的位数，默认是3

【类型】Number

#### fieldsConfig[field].isMoreSearch

【描述】仅用于EasyUi模板中，是否是高级搜索里的字段

【类型】Boolean




### methods 函数配置项

【描述】topBtns和rowBtns中methods属性中用到的函数集合，默认传入选中的表格行的Obj数组（rows）

【类型】Object

【举例】

```javascript
  methods: {
    detailItem: function (rows) { // detailItem 在topBtns配置项里用到了
      var that = this;
      var url = jasTools.base.rootPath + '/jasmvvm/pages/detail-risk-model-manage.html'
      top.jasTools.dialog.show({
        height: '50%',
        width: '800px',
        title: '查看',
        src: url,
        cbForClose: function (param) {
          that.$refs.table.refresh();
        }
      });
    },
  }
```







## Q&A

1. 【提问】前端模板不满足业务需求，怎么办？

   答：在module-template文件夹下，复制base-template模板文件夹，按照业务需求在复制的文件夹内修改模板，保持原模板不变

2. 【提问】需要更改模板中的通用组件，怎么办？

   答：在module-template文件夹下的components内，新建组件文件，复制通用组件中的相关组件进行修改，然后在新建的模板中进行引用

