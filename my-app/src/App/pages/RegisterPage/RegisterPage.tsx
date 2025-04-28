import React, { useState } from 'react';
import styles from './RegisterPage.module.scss';
import Header from 'components/Header';
import Button from 'components/Button';
import Text from 'components/Text';
import Input from 'components/Input';
import { Link, useNavigate } from 'react-router';
import { routes } from 'config/routes';
import { auth } from '../../../firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const RegisterPage: React.FC = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullname });
      navigate(routes.profile.create());
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <Header />
      <div className={styles['profile-container']}>
        <Text className={`${styles.field} ${styles['animate-drop']}`} view="p-20" weight="bold">
          Fullname
        </Text>
        <Input
          className={`${styles.input} ${styles['animate-fade-in']}`}
          value={fullname}
          onChange={(value: string) => setFullname(value)}
        />
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
        <Button className={`${styles.login} ${styles['animate-fade-in']}`} onClick={handleRegister}>
          Register
        </Button>
        <Text className={`${styles.register} ${styles['animate-fade-in']}`}>
          Already have an account? Click
          <Link to={routes.profile.create()} className={styles['register-link']}>
            here
          </Link>
          to login
        </Text>
      </div>
    </>
  );
};

export default RegisterPage;
