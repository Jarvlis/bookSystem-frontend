import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Divider, message, Space, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
// @ts-ignore
import { history, useModel } from 'umi';
import { SYSTEM_LOGO } from '@/constants';
import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s: any) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const user = await login({ ...values, type });

      if (user) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;

  const handleReset = (event: React.MouseEvent) => {
    event.preventDefault();
    history.push('/user/reset');
  };

  useEffect(() => {
    if (type === 'register') {
      history.push('/user/register');
    }
  }, [type]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="图书信息平台 From Jarvlis"
          subTitle="为读者打造美观便捷的图书信息平台"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            items={[
              {
                label: '读者登录',
                key: 'account',
              },
              {
                label: '读者注册',
                key: 'register',
              },
            ]}
          />
          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'账号或密码错误'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userName"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="系统管理员:admin,图书管理员:staff1"
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="系统管理员密码:123, 图书:123456789"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Space split={<Divider type="vertical" />}>
              <a rel="noreferrer" href="#" onClick={(event) => handleReset(event)}>
                重置密码
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                onClick={() => handleSubmit({ userName: 'admin', userPassword: '123' })}
              >
                游客访问
              </a>
            </Space>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
