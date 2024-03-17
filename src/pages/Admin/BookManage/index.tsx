import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  BookBorrowApply,
  BookFlowApply,
  BookRegister,
  deleteBook,
  getBooksInfo,
  saveBook,
} from '@/services/ant-design-pro/api';
import { Button, Form, Image, message, Upload, UploadProps } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { ModalForm, ProCard, ProForm, ProFormText } from '@ant-design/pro-components';

import { LIST_IGNORE } from 'antd/es/upload/Upload';
import { useModel } from '@@/plugin-model/useModel';

const BookManage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const [activeKey, setActiveKey] = useState<string>('datalist');
  const isStaff = initialState?.currentUser?.roleName === '2';
  const isReader = initialState?.currentUser?.roleName === '3';
  const isManager = currentUser?.roleName === '1' || currentUser?.roleName === '2';
  const [imageUrl, setImageUrl] = useState('');
  const props: UploadProps = {
    name: 'file',
    action: 'http://localhost:8080/api/book/upload',
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload: (file) => {
      const excelExtensions = ['xls', 'xlsx'];
      // @ts-ignore
      if (!(file.name && excelExtensions.includes(file.name.split('.').pop().toLowerCase()))) {
        message.error(`请上传Excel类型的文件`);
        return LIST_IGNORE;
      }
      return true;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  const imageProps: UploadProps = {
    name: 'file',
    action: 'http://localhost:8000/image',
    method: 'POST',
    data: {
      uid: '0575f4ced841f91ab75607d0a36b9a9a',
      token: 'c19ca135df5546e421cbc300197d8421',
    },
    showUploadList: false,
    maxCount: 1,
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload: (file) => {
      const excelExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'];
      // @ts-ignore
      if (!(file.name && excelExtensions.includes(file.name.split('.').pop().toLowerCase()))) {
        message.error(`请上传图片类型的文件`);
        return LIST_IGNORE;
      }
      return true;
    },
    onChange(info) {
      console.log(info);
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        console.log(info.file);
        setImageUrl(info.file.response.data.url);
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm<API.BookRegister & API.BookFlow & API.BookBorrow>();

  const columns: ProColumns<API.Book & API.BookFlow>[] = [
    {
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '图书ID',
      dataIndex: 'bookid',
      width: 48,
    },
    {
      title: '书名',
      dataIndex: 'bookname',
    },
    {
      title: '出版时间',
      dataIndex: 'publishtime',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '出版社',
      dataIndex: 'publisher',
    },
    {
      title: '类别',
      dataIndex: 'category',
      hideInSearch: true,
    },
    {
      title: '页数',
      dataIndex: 'pages',
      hideInSearch: true,
    },
    {
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '单位ID',
      dataIndex: 'deptid',
      hideInSearch: true,
      width: 48,
    },
    {
      title: '图书状态',
      dataIndex: 'bookstatus',
      valueEnum: {
        0: { text: '在馆', status: 'Success' },
        1: { text: '借出', status: 'Error' },
        2: { text: '未公开', status: 'Error' },
      },
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <ModalForm<API.BookFlow>
          title="书籍详情"
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
            bookid: record.bookid,
            bookname: record.bookname,
            publishtime: record.publishtime,
            author: record.author,
            publisher: record.publisher,
            category: record.category,
            pages: record.pages,
            price: record.price,
            deptid: record.deptid,
            bookstatus: record.bookstatus,
            picturepath: record.picturepath,
          }}
        >
          <ProForm.Group>
            <ProFormText width="md" name="bookid" label="图书ID" />
            <ProFormText width="md" name="bookname" label="图书所属单位ID" />
            <ProFormText width="md" name="publishtime" label="出版时间" />
            <ProFormText width="md" name="author" label="作者" />
            <ProFormText width="md" name="publisher" label="出版社" />
            <ProFormText width="md" name="category" label="类别" />
            <ProFormText width="md" name="pages" label="页数" />
            <ProFormText width="md" name="price" label="价格" />
            <ProFormText width="md" name="pica" label="照片路径" />
            <div>
              <span>封面图:</span>
              <Image src={record.picturepath} width={100} />
            </div>
            <ProFormText width="md" name="bookstatus" label="图书状态" />
            <ProFormText width="md" name="deptid" label="所属部门ID" />
          </ProForm.Group>
        </ModalForm>,
        isReader && (
          <ModalForm<API.BookBorrow>
            title="借阅申请"
            trigger={
              <a rel="noopener noreferrer" key="view">
                借阅
              </a>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
              onCancel: () => {},
            }}
            submitTimeout={3000}
            onFinish={async (values) => {
              if (record.bookstatus !== 0) {
                message.error('该书籍不在馆');
                return false;
              }
              const res = await BookBorrowApply(values);
              if (res) {
                message.success('借阅申请成功');
              } else {
                message.error('借阅申请失败');
              }
              return true;
            }}
          >
            <ProForm.Group>
              <ProFormText
                width="md"
                name="bookid"
                label="图书ID"
                initialValue={record.bookid}
                readonly={true}
              />
              <ProFormText
                width="md"
                name="userid"
                label="借阅人ID"
                initialValue={currentUser?.userid}
                readonly={true}
              />
              <ProFormText
                width="md"
                name="flowtounit"
                label="单位所属ID"
                initialValue={record?.deptid}
                readonly={true}
              />
              <ProFormText
                width="md"
                name="reason"
                label="借阅原因"
                placeholder="请输入借阅原因"
                required={true}
              />
              <ProFormText
                width="md"
                name="contact"
                label="申请人联系方式"
                placeholder={currentUser?.contactphone || '请输入申请人联系方式'}
                required={true}
              />
              <ProFormText width="md" name="remarks" label="备注" placeholder="请输入备注信息" />
            </ProForm.Group>
          </ModalForm>
        ),
        isManager && record.deptid === initialState?.currentUser?.deptid && (
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.bookid);
            }}
          >
            编辑
          </a>
        ),
        isStaff && record.deptid !== initialState?.currentUser?.deptid && (
          <ModalForm<API.BookFlow>
            title="流通申请"
            trigger={
              <a rel="noopener noreferrer" key="view">
                流通
              </a>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
              onCancel: () => {},
            }}
            submitTimeout={3000}
            onFinish={async (values) => {
              const res = await BookFlowApply(values);
              if (res) {
                message.success('申请流通成功');
              } else {
                message.error('申请失败');
              }
              return true;
            }}
          >
            <ProForm.Group>
              <ProFormText
                width="md"
                name="bookid"
                label="图书ID"
                initialValue={record.bookid}
                readonly={true}
              />
              <ProFormText
                width="md"
                name="ownerunit"
                label="图书所属单位ID"
                initialValue={record.deptid}
                readonly={true}
              />
              <ProFormText
                width="md"
                name="applicant"
                label="申请人姓名"
                initialValue={currentUser?.username}
                readonly={true}
              />
              <ProFormText
                width="md"
                name="flowtounit"
                label="流入单位ID"
                initialValue={currentUser?.deptid}
                readonly={true}
              />
              <ProFormText
                width="md"
                name="reason"
                label="申请原因"
                placeholder="请输入申请流入原因"
                required={true}
              />
              <ProFormText
                width="md"
                name="contact"
                label="申请人联系方式"
                placeholder="请输入申请人联系方式"
                required={true}
              />
              <ProFormText width="md" name="remarks" label="备注" placeholder="请输入备注信息" />
            </ProForm.Group>
          </ModalForm>
        ),
      ],
    },
  ];

  const columnCard: ProColumns<API.Book>[] = [
    {
      dataIndex: 'bookid',
      key: 'bookname',
      hideInSearch: true,
      render: (text, record, _, action) => [
        <ProCard
          extra={record[0]?.bookid}
          style={{
            maxWidth: 300,
            marginBlockStart: 24,
            display: 'inline-block',
          }}
          size="small"
        >
          <Image src={record[0]?.picturepath} width={150} />
          <div>{record[0]?.bookname}</div>
          <div>{record[0]?.author}</div>
          <div>{record[0]?.publisher}</div>
          <div>{record[0]?.publishtime}</div>
        </ProCard>,
      ],
    },
    {
      dataIndex: 'bookid',
      key: 'bookname',
      hideInSearch: true,
      render: (text, record, _, action) => [
        <ProCard
          extra={record[1]?.bookid}
          style={{
            maxWidth: 300,
            marginBlockStart: 24,
            display: 'inline-block',
          }}
          size="small"
        >
          <Image src={record[1]?.picturepath} width={150} />
          <div>{record[1]?.bookname}</div>
          <div>{record[1]?.author}</div>
          <div>{record[1]?.publisher}</div>
          <div>{record[1]?.publishtime}</div>
        </ProCard>,
      ],
    },
    {
      dataIndex: 'bookid',
      key: 'bookname',
      hideInSearch: true,
      render: (text, record, _, action) => [
        <ProCard
          extra={record[2]?.bookid}
          style={{
            maxWidth: 300,
            marginBlockStart: 24,
            display: 'inline-block',
          }}
          size="small"
        >
          <Image src={record[2]?.picturepath} width={150} />
          <div>{record[2]?.bookname}</div>
          <div>{record[2]?.author}</div>
          <div>{record[2]?.publisher}</div>
          <div>{record[2]?.publishtime}</div>
        </ProCard>,
      ],
    },
    {
      dataIndex: 'bookid',
      key: 'bookname',
      hideInSearch: true,
      render: (text, record, _, action) => [
        <ProCard
          extra={record[3]?.bookid}
          style={{
            maxWidth: 300,
            marginBlockStart: 24,
            display: 'inline-block',
          }}
          size="small"
        >
          <Image src={record[3]?.picturepath} width={150} />
          <div>{record[3]?.bookname}</div>
          <div>{record[3]?.author}</div>
          <div>{record[3]?.publisher}</div>
          <div>{record[3]?.publishtime}</div>
        </ProCard>,
      ],
    },
  ];

  const columnsMap: Record<string, ProColumns<API.Book>[]> = {
    datalist: columns,
    datacard: columnCard,
  };

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    actionRef.current?.reload(); // 刷新表单
  };

  // @ts-ignore
  return (
    <ProTable<API.Book>
      debounceTime={500}
      columns={columnsMap[activeKey]}
      actionRef={actionRef}
      cardBordered
      // @ts-ignore
      request={async (params: API.Book) => {
        const { bookname, author, publisher, bookid } = params;
        const searchParams = {
          bookname,
          author,
          publisher,
          bookid,
        };
        const bookList = await getBooksInfo(searchParams);
        // @ts-ignore
        let res = bookList.filter(
          (item: API.Book) =>
            !(item.bookstatus === 2 && item.deptid !== initialState?.currentUser?.deptid),
        );
        if (currentUser?.roleName === '0' || currentUser?.roleName === '1') {
          res = res.filter((item: API.Book) => item.bookstatus !== 2);
        }

        if (activeKey == 'datacard') {
          const finalRes = [];
          let tmp: any[] = [];
          for (let i = 0; i < res.length; i++) {
            if (tmp.length < 4) {
              tmp.push(res[i]);
            } else {
              finalRes.push(tmp);
              tmp = [];
              tmp.push(res[i]);
            }
          }
          console.log(finalRes);
          if (tmp.length !== 0) {
            console.log(tmp);
            finalRes.push(tmp);
          }
          res = finalRes;
        }

        return {
          data: res,
          // @ts-ignore
          total: activeKey === 'datalist' ? res.length : parseInt(res.length / 4),
          success: true,
        };
      }}
      editable={{
        type: 'multiple',
        onDelete: async (key, row) => {
          if (
            initialState?.currentUser?.roleName === '1' ||
            initialState?.currentUser?.roleName === '2'
          ) {
            if (initialState.currentUser.deptid !== row.deptid) {
              if (initialState.currentUser.deptid !== row.deptid) {
                message.error('您不能删除其它单位的书');
                return;
              }
            }
            if (row.bookstatus === 1) {
              message.error('不在馆图书无法删除');
              return;
            }
            const successDelete = await deleteBook(row.bookid);
            if (successDelete) {
              message.success('删除成功');
            } else {
              message.error('删除失败');
            }
          } else {
            return;
          }
        },
        onSave: async (key, row) => {
          if (
            !(
              initialState?.currentUser?.roleName === '1' ||
              initialState?.currentUser?.roleName === '2'
            )
          ) {
            return;
          }
          const formData = {
            bookid: row.bookid ?? 0,
            bookname: row.bookname ?? '',
            publishtime: row.publishtime ?? '',
            author: row.author ?? '',
            publisher: row.publisher ?? '',
            category: row.category ?? '',
            pages: row.pages ?? '',
            price: row.price ?? '',
            picturepath: row.picturepath ?? '',
            bookstatus: row.bookstatus ?? 0,
            deptid: row.deptid ?? 0,
          };
          const successSave = await saveBook(formData);
          if (successSave) {
            message.success('保存成功');
          } else {
            message.error('保存失败');
          }
        },
        onCancel: async () => {},
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      toolbar={{
        multipleLine: true,
        tabs: {
          activeKey,
          onChange: (key) => handleTabChange(key),
          items: [
            {
              key: 'datalist',
              tab: '列表',
            },
            {
              key: 'datacard',
              tab: '卡片',
            },
          ],
        },
      }}
      rowKey="bookid"
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
      headerTitle="书籍信息"
      toolBarRender={() => [
        isStaff && (
          <ModalForm<API.BookRegister>
            title="增加书籍"
            trigger={
              <Button type="primary">
                <PlusOutlined />
                增加书籍
              </Button>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
              onCancel: () => {},
            }}
            submitTimeout={3000}
            onFinish={async (values: API.BookRegister) => {
              const { bookname, author, publisher, deptid } = values;
              if (bookname == null || author == null || publisher == null || deptid == null) {
                message.error('新增书籍失败');
                return false;
              }
              values.picturepath = imageUrl;
              const id = await BookRegister({ ...values });
              if (id) {
                message.success('新增书籍成功');
                setTimeout(() => {
                  actionRef.current?.reload(); // 刷新表单
                }, 0);
                return true;
              }
              return false;
            }}
          >
            <ProForm.Group>
              <ProFormText
                width="md"
                name="bookname"
                label="书名"
                required={true}
                placeholder="请输入书名"
              />
              <ProFormText
                width="md"
                name="author"
                label="作者"
                required={true}
                placeholder="请输入书籍作者"
              />
              <ProFormText
                width="md"
                name="publisher"
                label="出版社"
                required={true}
                placeholder="请输入出版社"
              />
              <ProFormText
                width="md"
                name="publishtime"
                label="出版时间"
                placeholder="请输入出版时间，如:2022-02-01"
              />
              <ProFormText width="md" name="category" label="类别" placeholder="请输入书的类别" />
              <ProFormText width="md" name="pages" label="书页数" placeholder="请输入书的页数" />
              <ProFormText width="md" name="price" label="价格" placeholder="请输入图书价格" />
              <ProFormText
                width="md"
                name="deptid"
                label="归属单位id"
                placeholder="请输入归属单位的id"
              />
              <ProFormText
                width="md"
                name="picturepath"
                label="封面图"
                readonly={true}
                initialValue={imageUrl === '' ? '点击右边上传封面图' : imageUrl}
              />
              <Upload {...imageProps}>
                <Button icon={<UploadOutlined />}>上传图片</Button>
              </Upload>
            </ProForm.Group>
          </ModalForm>
        ),
        isStaff && (
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>批量导入</Button>
          </Upload>
        ),
      ]}
    />
  );
};

export default BookManage;
