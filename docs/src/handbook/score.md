# 成绩
你可以通过Ham查看你的课程成绩、计算你的GPA或综测成绩，并查询课程给分情况。

## 综测成绩类型
不同学院有着不同但综测成绩计算方法。Ham会自动识别通识、公共、必修、选修、跨专业课程，根据不同的方式计算综测成绩。

结合不同的学院，Ham提供了两种不同的计算方法：
> B1: 必修、通识课成绩
> 
> B2: 选修、跨专业课程成绩

### 新版F2计算方式
计算公式为
```
F2 = B1 + B2 × 0.002
其中: B2最多选8门
```
使用该计算方式时，Ham会以高F2优先的原则，选择8门选修课程。

你可以点击“选择”，查看Ham选择了哪些选修成绩进行计算。或者，你可以在长按后自选成绩计算综测成绩。

如果你不想计算某门课程，可以在"成绩设置"-"编辑成绩启用状态"启用或关闭某门课程的成绩。

目前正在使用该计算方式的学院：
- 计算机学院

### 旧版F2计算方式
计算公式为
```
F2 = B1 × 0.98 + B2 × 0.02
```
目前正在使用该计算方式的学院：
- 资源与环境科学学院

### 使用JavaScript计算综测成绩
Ham支持使用自定义JavaScript脚本计算综测成绩。 当然，在“成绩”→“设置”→“选择计算方式”里， 你可以选择其他同学分享的脚本计算综测成绩。

分享的脚本由两部分组成：

- 系统自带
- [Github](https://github.com/whu-ham/ScoreCalculator)



## 计算学分、GPA
点击“选择”进入自选模式。你可以在自选模式自由地选择课程来计算学分或GPA

~~为了避免计算学分错误的情况（比如根据培养计划，某课程不算学分），Ham不会提供多选选项。你需要仔细核对每个课程的学分情况，保证计算的GPA与学院计算的相符。~~

Ham已提供多选成绩选项，但你也要仔细核对每个课程的学分情况。

## 安全性与生物识别
为了防止你的成绩被别人不经意看到，"成绩"默认开启生物识别，你需要完成生物识别（Face ID、指纹识别等）才能查看成绩。

当然，如果你觉得这过于繁琐，也可以在设置里关闭该选项。

## 给分
你可以通过Ham查询课程给分情况。

### 使用前
使用给分前，你必须：
- 已获取成绩
- 同意上传匿名成绩至Ham的服务器

Ham会对需要上传的信息进行脱敏处理，你的学号不会直接上传到服务器，而是选取特征值来上传。因此，在Ham的服务器中，不能直接查看你的成绩。

每次你打开"给分"时，Ham都会将你的成绩上传到服务器中，用以给其他用户提供参考。

当然，你可以选择拒绝上传，但这也意味着你无法使用"给分"。

### 查询给分
在搜索框输入课程名或授课人姓名，可查询单一课程或单一授课人的给分情况。

当然，你不必输入全部的课程名。比如《毛泽东思想和中国特色社会主义理论体系概论》这门课，你输入"毛概"后，Ham也会知道你想要什么。

### 课程评价

你可以对上过的课程发布匿名评价。发布后，其他同学搜索这门课时，可以看到你对该门课程的评论与评分。

在你发布过评论后，才可以查看其他同学的课程评论。

### 想上

若你对某门课感兴趣，可在课程详情页点“想上”。

## 必要的权限
### 生物识别
- iOS: Face ID
- Android: 打开设备密码（不是权限，但也是必备项）


