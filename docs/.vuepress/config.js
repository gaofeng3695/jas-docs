module.exports = {
  // 设置网站标题
  title: 'JAS开发平台',
  // 设置输出目录
  dest: './jas-docs',
  // 设置站点根路径，如果你在访问的地址是 'www.xxxx.com/wxDocs' 那么就设置成 '/wxDocs/'  
  base: '/jas-docs/',
  // 添加 github 链接，但是这个要放在公司的内网服务器，所以为空
  // repo: '' 
  head: [
    ['link', {
      rel: 'icon',
      href: '/logo.ico'
    }]
  ],

  themeConfig: {
    // displayAllHeaders: true, // 默认值：false
    sidebarDepth: 2,
    nav: [
      {
        text: '平台前端',
        link: '/platform-fontend/'
      },
      {
        text: '平台后端',
        link: '/platform-backend/'
      }
    ],
    sidebar: {
      '/platform-fontend/': [
        ['config-guide', '基础业务模板配置指导'],
        ['font-end-proxy/', '前后端分离开发说明'],


      ],
      '/platform-backend/': [
        'H5开发规范',
        'H5版本管理规范'
      ]
    }
  }

}