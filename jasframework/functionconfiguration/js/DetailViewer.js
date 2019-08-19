/**
 * 
 * 类描述: 根据业务数据生成查看页面。
 *
 * @author zhanggf
 * @version 1.0
 * 创建时间： 2012-08-30 上午17:46:07
 *********************************更新记录******************************
 * 版本：  1.0       修改日期：   2012-10-16       修改人： zhanggf
 * 修改内容： 
 **********************************************************************
 */
(function($) {
	
	/**
     * 方法描述：定义查看UI类并初始化类中的属性和方法。
     */
	$.jasfcFactory( "jasfc.DetailViewer", {
		options: {
			idField:'',
			functionName:'',
			detailfunctionData:null,
			configuration:'',
			businessDataId:'',
			divid:''
		},
		/**
		 * 方法描述：根据配置信息加载查看页面
		 * param target DOM
		 * param detailFieldsStr 查看页面配置信息（带有json格式的字符串数据）
		 * param comandConfigstr 查看页面关闭按钮配置信息（带有json格式的字符串数据）
		 * param functionName 功能点id
		 * param businessDataId 选中记录id
		 * param pkfield 表的唯一标示列
		 */
		initPageUI : function(){
			var target = this.options.divid;
			var detailFieldsStr =this.options.detailfunctionData;
			var functionName =this.options.functionName;
			var businessDataId =this.options.businessDataId;
			var pkfield =this.options.idField;
			var detailFields =JSON.parse(detailFieldsStr);
			var configuration =this.options.configuration;
			var table ="<div id=\"contentArea\">";
			if(configuration.ishasrelated==1){
				var height=document.documentElement.clientHeight-40;
				table += "<div id=\"tt\" class=\"easyui-tabs\" style=\"height:"+height+"px;\"><div title=\""+title+"\">";
			}
			//循环加载注册
			table +="<table class=\"detail-table\">";
			
			if(detailFields.length % 2 != 0){
				for(var i=0;i<detailFields.length-1;i++){
					var fieldID =detailFields[i].fieldID;
					if(detailFields[i].formuitype=="combox"&&detailFields[i].isPkfield!=null && detailFields[i].isPkfield==1){
						fieldID+="Name";
					}
					detailFields[i].fieldName=detailFields[i].fieldName+"：";
					if(i%2==0){
						table +="<tr>";
					}
					
					table +="<th><span>"+detailFields[i].fieldName+"</span></th><td><span id=\""+fieldID+"\"</span></td>";
					if(i%2!=0){
						table +="</tr>";
					}
				}
				detailFields[detailFields.length-1].fieldName=detailFields[detailFields.length-1].fieldName+"：";
				table += "<tr><th><span>"+detailFields[detailFields.length-1].fieldName+"</span></th><td colspan=\"3\"><span id=\""+detailFields[detailFields.length-1].fieldID+"\"</span></td></tr>";
			}else{
				for(var i=0;i<detailFields.length;i++){
					var fieldID =detailFields[i].fieldID;
					if(detailFields[i].formuitype=="combox"&&detailFields[i].isPkfield!=null && detailFields[i].isPkfield==1){
						fieldID+="Name";
					}
					detailFields[i].fieldName=detailFields[i].fieldName+"：";
					if(i%2==0){
						table +="<tr>";
					}
					table +="<th><span>"+detailFields[i].fieldName+"</span></th><td><span id=\""+fieldID+"\"</span></td>";
					if(i%2!=0){
						table +="</tr>";
					}
				}
			}
			if(configuration.geometrytype!='none'){
				table +="<tr><th><span>"+configuration.i18related.spatialdata+"：</span></th><td colspan=\"3\"><span id=\"detailfeaure\"></span></td></tr>";
			}
			table += "</table>";
			if(configuration.hasattachment ==1){
				table +="<div id=\"uploadanddownloadDIV\" align=\"right\"></div>";
			}
			//如果存在关联表加载关联信息
			if(configuration.ishasrelated==1){
				table += "</div>";
				for(var i=0;i<configuration.subAllFields.length;i++){
					table += "<div title=\""+configuration.subAllFields[i].tablename+"\"><iframe id=\"subdetail"+i+"\" frameborder=\"0\" style=\"width:100%;height:99%;\"></iframe></div>";
				}
				table += "</div>";
			}
			table +="<div class=\"button-area\"><table style=\"width:100%;\"><tr><td align=\"center\">";
			for(var i=0;i<configuration.commandsConfig.length;i++){
				if(configuration.commandsConfig[i].privilegeNumber =='OKButton'){
					table +="<a href=\"#\" id=\"OKButton\" class=\"easyui-linkbutton\" iconCls='icon-ok' plain=\"false\">"+configuration.commandsConfig[i].parentName+"</a>";
				}
			}
			table += "</td></tr></table></div></div>";
			$(target).append($(table));
			if(configuration.ishasrelated==1){
				//点击从表tab页加载从表页面
				$("#tt").tabs({
					onSelect:function(title,index){
						for(var i=0;i<configuration.subAllFields.length;i++){
							if(title==configuration.subAllFields[i].tablename){
								$('#subdetail'+i).attr('src','subIndexHtml.htm?functionName='+configuration.subAllFields[i].functionnumber
										+'&subIdField='+configuration.subAllFields[i].subeventid+'&subeventid='+masterFieldValue+"&detailFlag=true");
								//$('#subdetail'+i).attr('src','subIndexHtml.htm?functionName='+configuration.subAllFields[i].functionnumber+"&businessDataId="+businessDataId+"&subpkfield="+configuration.subAllFields[i].subeventid+"&detailFlag=true"+"&subeventid="+masterFieldValue);
							}
						}
					}
				});
			}
			
			//【确定】按钮关闭对话框事件
			$('#OKButton').bind('click', function() {
				top.closeDlg("view");
			});
			this.getDetailData(target,detailFields,functionName,businessDataId,pkfield,configuration);
		},
		/**
		 * 方法描述：绑定查看页面数据
		 * param target DOM
		 * param detailFields 查看参数配置
		 * param functionName 功能点id
		 * param businessDataId 选中记录id值
		 * param pkfield 表的唯一标示列
		 */
		getDetailData : function(target,detailFields,functionName,businessDataId,pkfield,configuration){
			showLoadingMessage("正在处理，请稍候...");	//显示等待提示对话框
			$.ajax({
				url : '../getDetailAction.do',
				data :'functionName='+functionName+"&dataSourceName=defaultDataSource&businessDataId="+businessDataId+
					'&geometrytype='+configuration.geometrytype+'&pkfield='+pkfield,
				type : 'POST',
				success : function(data) {
					hiddenLoadingMessage();	//隐藏等待提示对话框
					var obj =JSON.parse(data); 
					$('span').each(function(i,item) {
						    var pp = item.id;
						    if(pp!=''){
							    if(eval('('+'obj\.'+pp+')') !=null){
							    	$('#'+pp).text(eval('('+'obj\.'+pp+')'));
							    }else{
							    	$('#'+pp).text('');
							    }
						    }
//						}
					});
					//如果包含附件
					if(configuration.hasattachment ==1){
						loadDataForDetail(configuration,businessDataId);
					}
				},
				error : function(data) {
					top.showAlert(configuration.i18related.error, configuration.i18related.queryerror, 'error');
				}
			});
		}
	}); 
	
	/**
	 * 方法描述：点击确定按钮关闭窗口
	 */
//	function close() {
//		top.closeDlg("view");
//	};
})(jQuery);


