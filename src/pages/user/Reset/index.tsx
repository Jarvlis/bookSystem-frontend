import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, Divider, message, Space, Tabs } from 'antd';
import React, { useState } from 'react';
import { LoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-form';
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

const Reset: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s: any) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values: API.ResetParams) => {
    try {
      // 登录
      const user = await login({ ...values, type });

      if (user) {
        const defaultLoginSuccessMessage = '重置成功！';
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
      const defaultLoginFailureMessage = '重置失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '重置',
            },
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="图书信息平台 From Jarvlis"
          subTitle="为读者打造美观便捷的图书信息平台"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.ResetParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            items={[
              {
                label: '重置密码',
                key: 'account',
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
                placeholder="请输入注册账号"
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
                placeholder="请确认密码"
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                ]}
              />
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入注册所用邮箱"
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入六位验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                phoneName="email"
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async (email: string) => {
                  const formData = new URLSearchParams();
                  console.log(formData);
                  formData.append('email', email);
                  fetch('http://localhost:8080/api/user/sendCode', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData,
                  }).catch((error) =>
                    console.error('There has been a problem with your fetch operation:', error),
                  );
                  message.success('获取验证码成功！请在邮箱查看');
                }}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Space split={<Divider type="vertical" />}>
              <a target="_blank" rel="noreferrer" onClick={() => history.push('/user/login')}>
                返回登录
              </a>
            </Space>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Reset;
