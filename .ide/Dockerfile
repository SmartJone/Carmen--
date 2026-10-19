# 可将 node 替换为需要的基础镜像
FROM node:20

# 安装 code-server，未安装时会走双容器模式
RUN curl -fsSL https://code-server.dev/install.sh | sh && echo done

# 指定字符集支持命令行输入中文
ENV LANG C.UTF-8
ENV LANGUAGE C.UTF-8
