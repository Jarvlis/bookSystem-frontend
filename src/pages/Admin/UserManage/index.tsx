import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { deleteUsers, saveUsers, searchUsers } from '@/services/ant-design-pro/api';
import { Form, message } from 'antd';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';

const UserManage: React.FC = () => {
  const [form] = Form.useForm<API.CurrentUser>();

  const columns: ProColumns<API.CurrentUser>[] = [
    {
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户ID',
      dataIndex: 'userid',
      width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      editable: false,
    },
    {
      title: '真实姓名',
      dataIndex: 'realname',

      hideInSearch: true,
    },
    {
      title: '工号',
      dataIndex: 'workid',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      hideInSearch: true,
    },
    {
      title: '电话',
      dataIndex: 'contactphone',
      hideInSearch: true,
    },
    {
      title: '邮件',
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: '账号状态',
      dataIndex: 'accountstatus',
      hideInSearch: true,
    },
    {
      title: '用户地址',
      dataIndex: 'address',
      hideInSearch: true,
    },
    {
      title: '所属部门ID',
      dataIndex: 'deptid',
      hideInSearch: true,
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      valueType: 'select',
      hideInSearch: true,
      editable: false,
      valueEnum: {
        '0': { text: '游客', status: 'Error' },
        '1': { text: '管理员', status: 'Default' },
        '2': {
          text: '工作人员',
          status: 'Success',
        },
        '3': {
          text: '读者',
          status: 'Error',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createtime',
      valueType: 'dateTime',
      hideInSearch: true,
      editable: false,
    },
    {
      title: '上次登录时间',
      dataIndex: 'lastlogintime',
      valueType: 'dateTime',
      hideInSearch: true,
      editable: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.userid);
          }}
        >
          编辑
        </a>,
        <ModalForm<API.CurrentUser>
          title="用户详情"
          trigger={
            <a rel="noopener noreferrer" key="view">
              详情
            </a>
          }
          form={form}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log('run'),
          }}
          onFinish={async () => {
            return true;
          }}
          readonly={true}
          initialValues={{
            userid: record.userid,
            username: record.username,
            roleid: record.roleName,
            accountstatus: record.accountstatus,
            address: record.address,
            avatarpath: record.avatarpath,
            contactphone: record.contactphone,
            email: record.email,
            gender: record.gender,
            createtime: record.createtime,
            lastlogintime: record.lastlogintime,
            realname: record.realname,
            workid: record.workid,
            deptid: record.deptid,
          }}
        >
          <ProForm.Group>
            <ProFormText width="md" name="userid" label="用户ID" />
            <ProFormText width="md" name="roleid" label="角色ID" />
            <ProFormText width="md" name="deptid" label="部门ID" />
            <ProFormText width="md" name="username" label="用户账号" />
            <ProFormText width="md" name="avatarpath" label="用户头像路径" />
            <ProFormText width="md" name="contactphone" label="联系电话" />
            <ProFormText width="md" name="realname" label="真实姓名" />
            <ProFormText width="md" name="email" label="邮箱" />
            <ProFormText width="md" name="address" label="地址" />
            <ProFormText width="md" name="gender" label="性别" />
            <ProFormText width="md" name="createtime" label="创建时间" />
          </ProForm.Group>
        </ModalForm>,
      ],
    },
  ];

  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      debounceTime={500}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // @ts-ignore
      request={async (params: API.SearchUser) => {
        const userList = await searchUsers({ ...params });
        return {
          data: userList,
          // @ts-ignore
          total: userList.length,
          success: true,
        };
      }}
      editable={{
        type: 'multiple',
        onDelete: async (key, row) => {
          const successDelete = await deleteUsers(row.userid);
          if (successDelete) {
            message.success('删除成功');
          } else {
            message.error('删除失败');
          }
        },
        onSave: async (key, row) => {
          const formData = {
            accountstatus: row.accountstatus ?? 0,
            address: row.address ?? '',
            avatarpath: row.avatarpath ?? '',
            contactphone: row.contactphone ?? '',
            email: row.email ?? '',
            gender: row.gender ?? '',
            deptid: row.deptid ?? 1,
            realname: row.realname ?? '',
            roleName: row.roleName ?? '',
            userid: row.userid ?? '',
            username: row.username ?? '',
            workid: row.workid ?? '',
          };
          const successSave = await saveUsers(formData);
          if (successSave) {
            message.success('保存成功');
          } else {
            message.error('保存失败');
          }
        },
        onCancel: async (key, record) => {},
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="userid"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      headerTitle="用户信息"
    />
  );
};

export default UserManage;
