import { ProForm, ProFormGroup, ProFormText } from '@ant-design/pro-components';
import { message, Switch } from 'antd';
import { useState } from 'react';
import { saveUsers } from '@/services/ant-design-pro/api';
// @ts-ignore
import { useModel } from '@@/plugin-model/useModel';

const ReaderInfo = () => {
  const [readonly, setReadonly] = useState(true);
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Switch
        style={{
          marginBlockEnd: 16,
        }}
        checked={readonly}
        checkedChildren="只读"
        unCheckedChildren="编辑"
        onChange={setReadonly}
      />
      <ProForm<API.CurrentUser>
        readonly={readonly}
        name="个人信息详情"
        initialValues={{
          ...currentUser,
        }}
        onValuesChange={() => {}}
        onReset={() => {
          if (currentUser?.deptid === 0) {
            return;
          }
        }}
        onFinish={async (value) => {
          if (currentUser?.deptid === 0) {
            return;
          }
          const successSave = await saveUsers({ ...currentUser, ...value });
          if (successSave) {
            message.success('保存成功');
          } else {
            message.error('保存失败');
          }
        }}
      >
        <ProFormGroup title="个人信息详情">
          <ProFormText
            width="md"
            name="username"
            label="用户账号"
            placeholder="请输入用户账号"
            readonly={true}
          />
          <ProFormText width="md" name="realname" label="真实姓名" placeholder="请输入真实姓名" />
          <ProFormText width="md" name="email" label="邮箱" placeholder="请输入Email邮箱地址" />
          <ProFormText
            width="md"
            name="contactphone"
            label="联系方式"
            placeholder="请输入联系方式"
          />
          <ProFormText width="md" name="address" label="地址" placeholder="请输入个人地址" />
        </ProFormGroup>
      </ProForm>
    </div>
  );
};

export default ReaderInfo;
