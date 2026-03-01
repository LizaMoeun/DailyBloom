import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';

export function Verify() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join('');
    
    if (verificationCode.length === 6) {
      // Simulate verification
      setIsVerified(true);
      localStorage.setItem('isAuthenticated', 'true');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  };

  const handleResend = () => {
    alert('Verification code sent to ' + email);
    setCode(['', '', '', '', '', '']);
    document.getElementById('code-0')?.focus();
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8 bg-white" 
      style={{ color: '#4A3F35' }}
    >
      {/* Back Button */}
      {!isVerified && (
        <Link
          to="/register"
          className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
          style={{ border: '2px solid #F8C8DC', color: '#4A3F35' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      )}

      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md"
        style={{ padding: '48px', border: '1px solid #F8C8DC' }}
      >
        {!isVerified ? (
          <>
            <div className="text-center mb-8">
              <div 
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: '#F8C8DC' }}
              >
                <Mail className="w-10 h-10" style={{ color: '#4A3F35' }} />
              </div>
              <h1 className="text-3xl mb-2" style={{ color: '#4A3F35' }}>Verify Your Email</h1>
              <p className="opacity-70" style={{ color: '#4A3F35' }}>
                We sent a code to <span className="font-semibold">{email}</span>
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="block mb-4 text-sm text-center opacity-70" style={{ color: '#4A3F35' }}>
                  Enter 6-digit code
                </label>
                <div className="flex gap-3 justify-center">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl rounded-xl border-2 focus:outline-none transition-all"
                      style={{ 
                        borderColor: digit ? '#F8C8DC' : '#E0E0E0',
                        color: '#4A3F35',
                        backgroundColor: 'white'
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #F8C8DC 0%, #E8B8CC 100%)', color: '#4A3F35' }}
              >
                Verify Email
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm opacity-70 mb-2" style={{ color: '#4A3F35' }}>
                Didn't receive the code?
              </p>
              <button
                onClick={handleResend}
                className="text-sm transition-all hover:opacity-80"
                style={{ color: '#E8B8CC' }}
              >
                Resend Code
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div 
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: '#C8E6C9' }}
            >
              <CheckCircle className="w-10 h-10" style={{ color: '#4A3F35' }} />
            </div>
            <h2 className="text-2xl mb-2" style={{ color: '#4A3F35' }}>Email Verified!</h2>
            <p className="opacity-70" style={{ color: '#4A3F35' }}>
              Redirecting to your dashboard...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}