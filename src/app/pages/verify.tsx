import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../lib/supabaseClient';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export function Verify() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [status, setStatus] = useState<'idle' | 'sent' | 'verifying' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (!storedEmail) {
      navigate('/register');
      return;
    }
    setEmail(storedEmail);
    sendOtp(storedEmail);
  }, [navigate]);

  const sendOtp = async (email: string) => {
    setStatus('sent');
    await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = code.join('');
    if (token.length !== 6) return;

    setStatus('verifying');
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (error) {
      setErrorMsg(error.message);
      setStatus('error');
    } else {
      setStatus('success');
      setTimeout(() => navigate('/dashboard'), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white" style={{ color: '#4A3F35' }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-12" style={{ border: '1px solid #F8C8DC' }}>
        {status !== 'success' ? (
          <>
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ background: '#F8C8DC' }}>
                <Mail className="w-10 h-10" style={{ color: '#4A3F35' }} />
              </div>
              <h1 className="text-3xl mb-2">Check Your Email</h1>
              <p className="opacity-70">
               We sent a verification link to {email}.
               </p>
               <p>
                 Please open your inbox and click the link to verify your account.
               </p>
               <p className="text-sm opacity-60 mt-2">
                If you don’t see the email, check your spam or junk folder.
               </p>
            </div>

            {status === 'error' && <p className="text-red-500 text-center mt-4">{errorMsg}</p>}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#C8E6C9' }}>
              <CheckCircle className="w-10 h-10" style={{ color: '#4A3F35' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}