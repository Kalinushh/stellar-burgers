import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../slices/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const from = location.state?.from?.pathname || '/';

  const isAuth = useSelector((state) => state.user.user !== null);

  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
    }
  }, [isAuth]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');

    dispatch(loginUser({ email, password }))
      .unwrap()
      .catch((err) => {
        setErrorText(err || 'Ошибка авторизации');
      });
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
