import {
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
  EnvironmentOutlined,
  SolutionOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { SYSTEM_LOGO } from '@/constants';
import Footer from '@/components/Footer';
import { register } from '@/services/ant-design-pro/api';
import styles from './index.less';
import { LoginForm, ProFormText } from '@ant-design/pro-form';

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  // 表单提交
  const handleSubmit = async (values: API.RegisterParams) => {
    const { password, checkPassword } = values;
    // 校验
    if (password !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    try {
      // 注册
      const id = await register(values);
      if (id) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        // await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  useEffect(() => {
    if (type === 'login') {
      history.push('/user/login');
    }
  }, [type]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="图书信息平台 From Jarvlis"
          subTitle="为读者打造美观便捷的图书信息平台"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            items={[
              {
                label: '读者登录',
                key: 'login',
              },
              {
                label: '读者注册',
                key: 'account',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入要注册的账号"
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请再次输入密码"
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                ]}
              />
              <ProFormText
                name="contactphone"
                fieldProps={{
                  size: 'large',
                  prefix: <PhoneOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入联系电话"
                rules={[
                  {
                    required: true,
                    message: '联系电话是必填项！',
                  },
                ]}
              />
              <ProFormText
                name="realname"
                fieldProps={{
                  size: 'large',
                  prefix: <SolutionOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入真实姓名"
                rules={[
                  {
                    required: true,
                    message: '真实姓名是必填项！',
                  },
                ]}
              />
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入邮箱"
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                ]}
              />
              <ProFormText
                name="address"
                fieldProps={{
                  size: 'large',
                  prefix: <EnvironmentOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入居民地址"
                rules={[
                  {
                    required: true,
                    message: '地址是必填项！',
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
