import { useState } from "react";
import { LoginAccount, RegisterAccount, SetToken } from "../../api/AccountApi";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash, Lock, Mailbox } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import Corners from "../Generic/Corners";
import { CustomCheckbox, FormField, InputWithIcon } from "../Generic/Form";
import { Button, CustomButton } from "../Generic/ButtonCustom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);  
    try {
      await LoginAccount(form);
      dispatch(SetToken());
      navigate("/");
    } catch (err) {
      console.error("Errore login:", err);
      setError(true);
    }
  };

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <img
          src="/sfondo.avif"
          alt="Sfondo Onirico"
          className="h-full w-full object-cover blur-sm brightness-[0.2]"
        />
      </div>
      <div className=" flex items-center justify-center py-16 ">
        <div className="w-full max-w-lg relative px-9 border border-gold/30 bg-dark shadow-x2/30 rounded">
          <Corners />
          <div className="relative rounded-lg z-10">
            <div className="flex flex-col space-y-1.5 p-6   rounded-t-lg pt-13 text-center">
              <h1 className="text-2xl text-white font-light tracking-wider uppercase">
                Login
              </h1>
              <p className="text-gray-400 ">Accedi con le tue credenziali</p>
            </div>
            <div className="pb-4 p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <FormField label="EMAIL">
                    <InputWithIcon
                      icon={<Mailbox />}
                      value={form.email}
                      onChange={(value) => setForm({ ...form, email: value })}
                      placeholder="example@valaxma.com"
                    />
                  </FormField>
                  <div className="space-y-2 mb-6">
                    <label className="text-white font-light uppercase text-sm">
                      PASSWORD
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <input
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="mt-2 pl-10 bg-dark-darker border border-gold/30 focus:white text-white placeholder:text-gray-500 flex h-10 w-full rounded-md text-sm"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                        className="absolute right-3 top-3 text-gray-500 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeSlash className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  {error && <p className="text-xs text-red-500 ">Credenziali errate</p>}
                  <div className="flex align-middle space-x-2 z-50">
                    <CustomCheckbox
                      id="remember"
                      label="Ricordami"
                      value={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    <div className="flex-1 text-right">
                      <Link
                        href="/forgot-password"
                        className="text-sm text-white hover:text-gray-400 transition-colors"
                      >
                        Hai dimenticato la password?
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      className=" px-12 py-6 mx-auto hover:scale-[1.03] group-hover:text-[1.05em] transition-all duration-300 ease-out cursor-pointer border border-gold/30 rounded-full text-md"
                      type="submit"
                    >
                      ACCEDI
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div className="items-center pb-9 flex flex-col space-y-4 rounded-b-lg z-50">
              <div className="text-center text-sm text-gray-400 border-t-1 py-3">
                Non hai ancora un account?
                <Link
                  to="/Account/Register"
                  className="text-white hover:text-gray-400 transition-colors ml-1 z-100 uppercase tracking-wide"
                >
                  Registrati
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
