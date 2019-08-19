
var resultList = [];  //各业务系统数据记录
var systemList =[];  //系统集合
var currentDataList = {total:0,rows:[],systemId:""};   //当前datagrid的数据源
var initPageNo = 1; //默认显示第一页
var initPageSize = 15; //默认显示15条数据
var currentPageNo = initPageNo;  //当前页
var currentPageSize = initPageSize; //当前页容量
var selectTaskObj = null;  //当前选中行对象
/**
 * 初始化页面，加载页面数据。
 */

$(document).ready(function() {
	initData();
	initSystemList();
	initTaskDatagrid();
});

/**
 * 方法描述：初始化数据，读取各业务系统的代办工作列表
 */
function initData(){
	$.ajax({
		url:rootPath+"/workflow/getMyTodoTask.do",
		async:false,
		dataType:"json",
		success:function(result){
			resultList=result;
			if(resultList!=null && resultList.length>0){
				getDataListBySystemId(resultList[0].systemId,initPageNo,initPageSize);
			}
		}
	});
}
/**
 * 方法描述：初始化左侧系统列表
 */
function initSystemList(){
	for(var i=0; i<resultList.length;i++){
		var data = resultList[i];
		var obj = {id:data.systemId,text:data.systemName};
		systemList.push(obj);
	}
	$("#systemList").tree({
		data:systemList,
		onClick: function(node){
			//获取系统编号，根据系统编号获取值
			getDataListBySystemId(node.id,initPageNo,initPageSize);
			//重新加载taskDatagrid列表
			$('#toDoTaskList').datagrid("loadData",currentDataList);
		}
	});
}


/**
 * 方法描述：根据系统编号获取系统分页信息
 * @param systemId
 */
function getDataListBySystemId(systemId, pageNo, pageSize){
	pageNo=pageNo||initPageNo;
	pageSize=pageSize||initPageSize;
	
	if (pageNo <= 1) {
		pageNo = initPageNo;
	}
	if (pageSize <= 1) {
		pageSize = initPageSize;
	}
	for(var i=0;i<resultList.length;i++){
		if(resultList[i].systemId==systemId){			
			currentDataList.systemId = resultList[i].systemId;
			if(resultList[i].success){
				var limit = pageSize;
				//在总记录中截取所需长度的记录
				var sumPage = Math.ceil(1.0*resultList[i].taskCount/limit);
				if(pageNo>sumPage){
					pageNo=sumPage;
				}
				var start = (pageNo - 1) * pageSize;
				
				if(start+limit>resultList[i].taskCount){
					currentDataList.rows = resultList[i].taskList.slice(start);
				}else{
					currentDataList.rows = resultList[i].taskList.slice(start,start+limit);
				}
				currentDataList.total=resultList[i].taskCount;
			}else{
				currentDataList.total=0;
				currentDataList.rows = [];
			}
			break;
		}
	}
}
/**
 * 方法描述：初始化datagrid数据列表
 */
function initTaskDatagrid(){
	$('#toDoTaskList').datagrid({
		title : getLanguageValue('myundotask.queryListTitle'),
		toolbar : '#toolbar',
		idField : 'taskId',
		pagination : true,
		rownumbers : true,
		singleSelect:true,
	//	fitColumns:true,
		pageSize:initPageSize,
		data:currentDataList,
		columns : [ [ {
			field : 'ck',
			title : getLanguageValue('ck'),
			checkbox : true
		}, {
			field : 'taskId',
			title : getLanguageValue('taskId'),
			width : 80
		}, {
			field : 'taskName',
			title : getLanguageValue('taskName'),
			width : 200,
			sortable : true
		},{
			field : 'procName',
			title : "流程名称",
			width : 200,
			sortable : true
		},{
			field : 'subject',
			title : "主题",
			width : 200,
			sortable : true
		}, {
			field : 'startTime',
			title : "任务开始时间",
			width : 160,
			sortable : true
		}, {
			field : 'approveUsers',
			title : "审批人",
			width : 120,
			sortable : true
		},{
			field : 'systemId',
			title : "系统编号",
			width : 160
		},{
			field : 'systemName',
			title : "系统名称",
			width : 160
		},{
			field : 'approveUrl',
			title : "审批Url",
			hidden:true,
			width : 160
		} ] ],
		onDblClickRow : function(i, row) {
			//双击弹出审批页面
			selectTaskObj = row;
			window.open(row.approveUrl); 
			//top.getDlg(row.approveUrl, 'approveUI',getLanguageValue("approveWork"), 900, 550);
		},
		onBeforeLoad:function(param){
			currentPageNo = param.page;
			currentPageSize = param.rows;
			//获取分页信息
			getDataListBySystemId(currentDataList.systemId,currentPageNo,currentPageSize);
			//重新加载taskDatagrid列表
			$('#toDoTaskList').datagrid("loadData",currentDataList);
		}
	});
	initDatagrigHeight('toDoTaskList', '', '30',"taskInfo");
}

/**
 * 描述：任务审批按钮（办理按钮）处理函数，弹出任务审批页面窗口
 */
function showTaskApprovePage() {
	var rows = $('#toDoTaskList').datagrid("getSelections");
	if (rows.length == 1) {
		selectTaskObj = rows[0];
		window.open(rows[0].approveUrl); 
		//top.getDlg(rows[0].approveUrl, 'approveUI',getLanguageValue("approveWork"), 900, 550);
	} else {
		top.showAlert(getLanguageValue("tip"), getLanguageValue("chooserecord"), 'info');
	}
}

/**
 * 审批完成后重新加载数据
 */
function reloadData(){
	if(selectTaskObj==null){
		return;
	}
	//删除数据
	var systemId = selectTaskObj.systemId;
	var taskId = selectTaskObj.taskId;
	for(var i=0;i<resultList.length;i++){
		if(resultList[i].systemId==systemId){			
			currentDataList.systemId = resultList[i].systemId;
			if(resultList[i].success){
				var taskList = resultList[i].taskList;
				for(var j=0; j<taskList.length; j++){
					if(taskList[j].taskId==taskId){
						resultList[i].taskList.splice(j,1);
						resultList[i].taskCount-=1;
						getDataListBySystemId(systemId,currentPageNo,currentPageSize);
						//重新加载taskDatagrid列表
						$('#toDoTaskList').datagrid("loadData",currentDataList);
						break;
					}
				}
			}
			
		}
	}
	
}
