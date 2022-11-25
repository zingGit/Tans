import paramiko
import os,zipfile

target_folder = "build/web-mobile" #目标文件夹
output_name = "web-mobile.zip" 
server_host = 22
server_addr = "192.168.0.234"
server_user_name = "root"
server_password = "123456"
web_server_path = "/home/api/web/client/tans"



def zip_dir(dir_path, out_full_name):
    """
    压缩指定文件夹
    :param dir_path: 目标文件夹路径
    :param out_full_name: 压缩文件保存路径+xxxx.zip
    :return: 无
    """
    zip = zipfile.ZipFile(out_full_name, "w", zipfile.ZIP_DEFLATED)
    for path, dirnames, filenames in os.walk(dir_path):
        # 去掉目标跟路径，只对目标文件夹下边的文件及文件夹进行压缩
        fpath = path.replace(dir_path, '')
 
        for filename in filenames:
            zip.write(os.path.join(path, filename), os.path.join(fpath, filename))
    zip.close()
    print("文件夹\"{0}\"已压缩为\"{1}\".".format(dir_path, out_full_name))



def sftp_client_con():
    # 1 创建transport通道
    tran = paramiko.Transport((server_addr, server_host))
    tran.connect(username=server_user_name, password=server_password)
    # 2 创建sftp实例
    sftp = paramiko.SFTPClient.from_transport(tran)

    # 3 执行上传功能
    cwd = os.getcwd()

    local_path = os.path.join(cwd, output_name)        # 本地路径
    remote_path = os.path.join(web_server_path, output_name)    # 远程路径
    print('远程路径:', remote_path)
    put_info = sftp.put(local_path, remote_path, confirm=True)
    print(put_info)
    print(f"上传{local_path}完成")
    # 5 关闭通道
    tran.close()




os.chdir('../')
cwd = os.getcwd()
print("------------开始压缩-----------")
zip_dir(os.path.join(cwd, target_folder), os.path.join(cwd, output_name))
print("------------开始传输-----------")
sftp_client_con()
print("------------传输完毕-----------")