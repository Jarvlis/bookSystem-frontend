import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { detailRegister, getDepartments } from '@/services/ant-design-pro/api';
import { message } from 'antd';

export default () => {
  return (
    <ProForm
      onFinish={async (values: API.RegisterParams) => {
        const result = await detailRegister(values);
        // @ts-ignore
        if (result !== 1) {
          message.error('注册失败');
        } else {
          message.success('注册成功');
        }
      }}
    >
      <ProFormText
        width="md"
        name="username"
        label="用户名"
        tooltip="最长为 12 位"
        placeholder="请输入名称"
        required={true}
      />
      <ProFormText.Password
        width="md"
        name="password"
        label="密码"
        tooltip="最长为 12 位"
        placeholder="请输入密码"
        required={true}
      />
      <ProFormText
        width="md"
        name="realName"
        label="真实姓名"
        tooltip="最长为 12 位"
        placeholder="请输入真实姓名"
        required={true}
      />
      <ProFormText
        width="md"
        name="contactPhone"
        label="联系电话"
        tooltip="最长为 12 位"
        placeholder="请输入联系电话"
        required={true}
      />
      <ProFormText
        width="md"
        name="email"
        label="邮箱"
        tooltip="最长为 12 位"
        placeholder="请输入邮箱"
        required={true}
      />
      <ProFormText
        width="md"
        name="address"
        label="住址"
        tooltip="最长为 12 位"
        placeholder="请输入住址"
        required={true}
      />
      <ProFormSelect
        width="md"
        label="工作单位"
        name="deptid"
        required={true}
        request={async (): Promise<{ label: string; value: string }[]> => {
          const res = await getDepartments();
          return Promise.resolve(
            res.map((item) => ({ label: item.deptname || '', value: item.deptid + '' })),
          );
        }}
      />
    </ProForm>
  );
};
