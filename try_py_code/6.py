#-*- coding-8 -*-
import requests
import lxml
from bs4 import BeautifulSoup
import xlwt


def craw(url):
    user_agent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0'
    headers = {
'Host':'www.qcc.com',
'User-Agent':r'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0',
'Accept':'*/*',
'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
'Accept-Encoding':'gzip, deflate',
'Referer':'http://www.qcc.com/',
'Cookie':r'UM_distinctid***************',
'Connection':'keep-alive',
'If-Modified-Since':'Wed, 30 **********',
'If-None-Match':'"59*******"',
'Cache-Control':'max-age=0',

}
    response = requests.get(url,headers = headers)
    if response.status_code != 200:
        response.encoding = 'utf-8'
        print(response.status_code)
        print('ERROR')    
    soup = BeautifulSoup(response.text,'lxml')
    #print(soup)
    com_names = soup.find_all(class_='ma_h1')
    #print(com_names)
    #com_name1 = com_names[1].get_text()
    #print(com_name1)
    peo_names = soup.find_all(class_='a-blue')
    #print(peo_names)
    peo_phones = soup.find_all(class_='m-t-xs')
    #tags = peo_phones[4].find(text = True).strip()
    #print(tags)
    #tttt = peo_phones[0].contents[5].get_text()
    #print (tttt)
    #else_comtent = peo_phones[0].find(class_='m-l')
    #print(else_comtent)
    global com_name_list
    global peo_name_list
    global peo_phone_list
    global com_place_list
    global zhuceziben_list
    global chenglishijian_list
    print('开始爬取数据，请勿打开excel')
    for i in range(0,len(com_names)):
        n = 1+3*i
        m = i+2*(i+1)
        peo_phone = peo_phones[n].find(text = True).strip()
        com_place = peo_phones[m].find(text = True).strip()
        zhuceziben = peo_phones[3*i].find(class_='m-l').get_text()
        chenglishijian = peo_phones[3*i].contents[5].get_text()
        peo_phone_list.append(peo_phone)
        com_place_list.append(com_place)   
        zhuceziben_list.append(zhuceziben)
        chenglishijian_list.append(chenglishijian)
    for com_name,peo_name in zip(com_names,peo_names):
        com_name = com_name.get_text()
        peo_name = peo_name.get_text()
        com_name_list.append(com_name)
        peo_name_list.append(peo_name)
        
    

        
if __name__ == '__main__':
    com_name_list = []
    peo_name_list = []
    peo_phone_list = []
    com_place_list = []
    zhuceziben_list = []
    chenglishijian_list = []
    key_word = input('请输入您想搜索的关键词：')
    print('正在搜索，请稍后')
    for x in range(1,11):
        url = r'http://www.qcc.com/search?key={}#p:{}&'.format(key_word,x)
        s1 = craw(url)
    workbook = xlwt.Workbook()
    #创建sheet对象，新建sheet
    sheet1 = workbook.add_sheet('xlwt', cell_overwrite_ok=True)
    #---设置excel样式---
    #初始化样式
    style = xlwt.XFStyle()
    #创建字体样式
    font = xlwt.Font()
    font.name = 'Times New Roman'
    font.bold = True #加粗
    #设置字体
    style.font = font
    #使用样式写入数据
    # sheet.write(0, 1, "xxxxx", style)
    print('正在存储数据，请勿打开excel')
    #向sheet中写入数据
    name_list = ['公司名字','法定代表人','联系方式','注册人资本','成立时间','公司地址']
    for cc in range(0,len(name_list)):
        sheet1.write(0,cc,name_list[cc],style)
    for i in range(0,len(com_name_list)):
        sheet1.write(i+1,0,com_name_list[i],style)#公司名字
        sheet1.write(i+1,1,peo_name_list[i],style)#法定代表人
        sheet1.write(i+1,2,peo_phone_list[i],style)#联系方式
        sheet1.write(i+1,3,zhuceziben_list[i],style)#注册人资本
        sheet1.write(i+1,4,chenglishijian_list[i],style)#成立时间
        sheet1.write(i+1,5,com_place_list[i],style)#公司地址
    #保存excel文件，有同名的直接覆盖
    workbook.save(r'F:\work\2017_08_02\xlwt.xls')
    print('the excel save success')