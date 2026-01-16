---
layout: ../../layouts/MarkdownPostLayout.astro
title: 我的第四篇博客文章
author: Git LFS学习者
description: "关于如何用Git LFS上传大文件的一些命令"
image:
    url: "https://docs.astro.build/assets/rays.webp"
    alt: "The Astro logo on a dark background with rainbow rays."
pubDate: 2026-01-15
tags: ["git", "git lfs", "VS code"]
---
1. Git LFS 初始化相关
git lfs install
作用：在您的系统和项目中初始化 Git LFS
做了什么：创建必要的 Git 钩子（hook），让 Git 能够识别和处理大文件
何时用：项目中第一次使用 Git LFS 时只需运行一次
git lfs track "*.json"
作用：告诉 Git LFS 要追踪哪些文件
例子：git lfs track "*.json" 意思是所有 .json 文件都用 LFS 管理
背景：Git LFS 不会自动管理大文件，需要你明确指定
结果：会更新 .gitattributes 文件记录追踪规则
2. 上传前的准备
git reset
作用：撤销 git add . 的操作，把已暂存的文件恢复为未暂存状态
原因：我们之前用 git add . 添加了大文件，但没有 LFS 追踪，所以要重新来过
简单理解：清空"待上传清单"
git lfs migrate import --include="*.json,*.czml" --everything
作用：把历史记录中的大文件转换为 LFS 管理
--include=".json,.czml"：只转换这些类型的文件
--everything：处理所有提交历史，不仅仅是最新的
效果：让之前已经提交的大文件也由 LFS 管理，而不是占用仓库空间
3. 提交和推送
git add .
作用：把当前目录及子目录的所有改动加入"待上传清单"（暂存区）
注意：这次会由 LFS 接管大文件的处理
简单理解："我要上传这些文件"
git commit -m "使用 Git LFS 上传大文件"
作用：把暂存区的改动保存为一个提交（commit）
-m "信息"：附加一条说明信息，描述这次改动是什么
简单理解："用这些改动创建一个快照，并备注说明"
git push satellite main
作用：把本地的提交推送到远程仓库
satellite：远程仓库的名称（您仓库的别名）
main：要推送的分支名称
简单理解："把我的本地改动上传到 GitHub"
4. 查看和配置
git remote -v
作用：列出所有配置的远程仓库
-v：verbose（详细模式），会显示 fetch 和 push 的地址
输出：satellite https://github.com/Starryriver1220/Satellite-Track.git
简单理解："我的远程仓库在哪里"
git branch -vv
作用：列出所有本地分支，并显示它们的追踪情况
-vv：extra verbose，显示每个分支追踪的远程分支
输出例子：main 1dfd5f6 [satellite/main] 表示 main 追踪 satellite/main
简单理解："我的本地分支都跟踪哪个远程分支"
git branch --set-upstream-to=satellite/main main
作用：设置本地分支追踪远程分支
--set-upstream-to=satellite/main：设置追踪目标为 satellite/main
main：要设置的本地分支
效果：之后 git push 和 git pull 不需要指定分支名，会自动用这个关系
简单理解："告诉 Git，本地 main 分支对应远程 satellite/main 分支"
git status
作用：查看当前工作区的状态
显示内容：
当前分支名称
有无未提交的改动
本地分支是否超前或落后于远程
简单理解："我的项目现在是什么状态"
整个流程的通俗理解
初始化 LFS → 标记要追踪的文件类型 → 重置文件 → 迁移历史文件 → 
添加改动 → 创建提交 → 上传到 GitHub → 建立本地分支与远程分支的关联

就像：准备装箱 → 标记哪些是重物 → 清空购物车 → 重新装重物 → 装箱 → 封箱 → 快递 → 通知快递公司这个箱子对应哪个订单