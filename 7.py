#!/usr/bin/python3
#-*- coding: utf-8 -*-
 
import urllib.request
import re
 
#人可以识别的路径，编码类型为utf-8，即汉语
chinaCompany="重庆腾讯信息技术有限公司"
testUrl="https://www.qcc.com/search?key=" + chinaCompany
print("visit web:"+testUrl)
 
#转化为机器可以识别带中文的网址，编码类型为unicode。只转换汉字部分，不能全部网址进行转换
company=urllib.parse.quote(chinaCompany)
testUrl="https://www.qcc.com/search?key=" + company
print("visit web:"+testUrl)
 
#浏览器伪装池，将爬虫伪装成浏览器，避免被网站屏蔽
headers=("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36 SE 2.X MetaSr 1.0")
opener = urllib.request.build_opener()
opener.addheaders = [headers]
urllib.request.install_opener(opener)
 
#爬取第一个页面，即搜索企业名字，获得访问企业信息的跳转链接
searchRet=urllib.request.urlopen(testUrl).read().decode("utf-8", "ignore")	
matchPat='addSearchIndex.*?href="(.*?)" target="_blank" class="ma_h1"'
nextUrls =  re.compile(matchPat, re.S).findall(searchRet)
 
nextUrl =  "https://www.qcc.com" + str(nextUrls[0])
print("企业详细信息可以查看下一个链接：" + nextUrl)
 
#爬取第二个页面，即查看企业详细信息，法人及关联公司
searchRet=urllib.request.urlopen(nextUrl).read().decode("utf-8", "ignore")
matchPat = 'btn-touzi.*?href="(.*?)".*?他关联'
nextUrls =  re.compile(matchPat, re.S).findall(searchRet)
bossNum = len(nextUrls)
 
#循环找出每个boss的关联公司有哪些
for idx in range(bossNum):
    #爬取第三个页面，查看股东有哪些关联公司
    nextUrl = "https://www.qcc.com" +  str(nextUrls[idx])
    searchRet=urllib.request.urlopen(nextUrl).read().decode("utf-8", "ignore")
    matchPat = 'class="cvlu">(.*?)的合作伙伴'
    bossName = re.compile(matchPat, re.S).findall(searchRet)[0]
    print("===========")
    print("股东<" + str(bossName) + ">的详细信息可查看："+ nextUrl + "。    他的关联公司如下：") 
    matchPat = 'firm_.*?>(.*?)</a>'
    relatedCompany = re.compile(matchPat, re.S).findall(searchRet)
    print(relatedCompany)