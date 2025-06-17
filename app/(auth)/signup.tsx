import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);
  return <View className="flex-1" />;
}
