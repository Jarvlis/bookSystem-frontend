import { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { deleteDept, DeptRegister, getDepartments, saveDept } from '@/services/ant-design-pro/api';
import { Button, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';

const columns: ProColumns<API.Dept>[] = [
  {
    dataIndex: 'deptid',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '单位名',
    dataIndex: 'deptname',
    copyable: true,
  },
  {
    title: '联系人',
    dataIndex: 'contact',
    copyable: true,
    hideInSearch: true,
  },
  {
    title: '联系电话',
    dataIndex: 'contactphone',
    copyable: true,
    hideInSearch: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    hideInSearch: true,
  },
  {
    title: '地址',
    dataIndex: 'address',
    copyable: true,
    hideInSearch: true,
  },
  {
    title: '单位性质',
    dataIndex: 'property',
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.deptid);
        }}
      >
        编辑
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm<API.DeptRegister>();
  return (
    <ProTable<API.Dept>
      debounceTime={500}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // @ts-ignore
      request={async (params: API.Dept) => {
        const deptname = params.deptname || '';
        const deptList = await getDepartments(deptname);
        return {
          data: deptList,
          // @ts-ignore
          total: deptList.length,
          success: true,
        };
      }}
      editable={{
        type: 'multiple',
        onDelete: async (key, row) => {
          const successDelete = await deleteDept(row.deptid);
          if (successDelete) {
            message.success('删除成功');
          } else {
            message.error('删除失败');
          }
        },
        onSave: async (key, row) => {
          const formData = {
            deptid: row.deptid ?? 0,
            deptname: row.deptname ?? '',
            contact: row.contact ?? '',
            contactphone: row.contactphone ?? '',
            email: row.email ?? '',
            address: row.address ?? '',
            property: row.property ?? '',
          };
          const successSave = await saveDept(formData);
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
      rowKey="deptid"
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
      dateFormatter="string"
      headerTitle="单位信息"
      toolBarRender={() => [
        <ModalForm<API.DeptRegister>
          title="创建单位"
          trigger={
            <Button type="primary">
              <PlusOutlined />
              创建单位
            </Button>
          }
          form={form}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log('run'),
          }}
          submitTimeout={3000}
          onFinish={async (values: API.DeptRegister) => {
            const { deptname, email, address } = values;
            if (deptname == null || email == null || address == null) {
              message.error('新增单位失败');
              return false;
            }
            const id = await DeptRegister({ ...values });
            if (id) {
              message.success('新增单位成功');
              setTimeout(() => {
                actionRef.current?.reload(); // 刷新表单
              }, 0);
              return true;
            }
            return false;
          }}
        >
          <ProForm.Group>
            <ProFormText width="md" name="deptname" label="单位名" placeholder="请输入单位名" />
            <ProFormText width="md" name="contact" label="联系人" placeholder="请输入单位联系人" />
            <ProFormText
              width="md"
              name="contactphone"
              label="联系电话"
              placeholder="请输入单位联系电话"
            />
            <ProFormText width="md" name="email" label="邮件" placeholder="请输入邮件地址" />
            <ProFormText width="md" name="address" label="地址" placeholder="请输入单位地址" />
            <ProFormText width="md" name="property" label="单位性质" placeholder="请输入单位性质" />
          </ProForm.Group>
        </ModalForm>,
      ]}
    />
  );
};
