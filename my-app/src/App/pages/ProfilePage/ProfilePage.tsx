import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './ProfilePage.module.scss';
import Header from 'components/Header';
import Button from 'components/Button';
import Text from 'components/Text';
import Input from 'components/Input';
import { Link } from 'react-router';
import { routes } from 'config/routes';
import { authStore } from 'store/RootStore/authStore/authStore';

const ProfilePage: React.FC = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification((prev) => (prev ? { ...prev, visible: false } : null));
    }, 2000);
  };

  const handleLogin = async () => {
    try {
      await authStore.login(email, password);
      showNotification('Login successful!', 'success');
    } catch (error) {
      showNotification('Login failed. Please check your credentials.', 'error');
    }
  };

  const handleLogout = () => {
    authStore.logout();
  };

  if (authStore.user) {
    return (
      <>
        {notification?.visible && (
          <div className={`${styles.notification} ${styles[notification.type]}`}>{notification.message}</div>
        )}
        <Header />
        <div className={styles['profile-container']}>
          <div className={`${styles.name} ${styles['animate-drop']}`}>{authStore.user.displayName || 'User'}</div>
          <h1 className={`${styles.email} ${styles['animate-fade-in']}`} style={{ animationDelay: '0.2s' }}>
            {authStore.user.email}
          </h1>
          <Button
            className={`${styles.logout} ${styles['animate-fade-in']}`}
            style={{ animationDelay: '0.4s' }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </>
    );
  } else {
    return (
      <>
        {notification?.visible && (
          <div className={`${styles.notification} ${styles[notification.type]}`}>{notification.message}</div>
        )}
        <Header />
        <div className={styles['profile-container']}>
          <Text className={`${styles.field} ${styles['animate-drop']}`} view="p-20" weight="bold">
            Email
          </Text>
          <Input
            className={`${styles.input} ${styles['animate-fade-in']}`}
            value={email}
            onChange={(value: string) => setEmail(value)}
          />
          <Text className={`${styles.field} ${styles['animate-drop']}`} view="p-20" weight="bold">
            Password
          </Text>
          <Input
            className={`${styles.input} ${styles['animate-fade-in']}`}
            type="password"
            value={password}
            onChange={(value: string) => setPassword(value)}
          />
          <Button className={`${styles.login} ${styles['animate-fade-in']}`} onClick={handleLogin}>
            Login
          </Button>
          <Text className={`${styles.register} ${styles['animate-fade-in']}`}>
            Don't have an account? Click
            <Link to={routes.register.create()} className={styles['register-link']}>
              here
            </Link>
            to create
          </Text>
        </div>
      </>
    );
  }
});

export default ProfilePage;
