import { useState } from "react";
import { RegisterAccount } from "../../api/AccountApi";
import { UserIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash, Lock, Mailbox } from "react-bootstrap-icons";
import Corners from "../Generic/Corners";
import { Button, CustomButton } from "../Generic/ButtonCustom";
import { CustomCheckbox, InputWithIcon } from "../Generic/Form";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [accept, setAccept] = useState(false);
  const navigateTo = useNavigate();
  const [form, setForm] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RegisterAccount(form);
      if (response) {
        console.log("Registrazione avvenuta con successo:", response);
      } else {
        console.error("Errore nella registrazione!");
      }
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
    }
    navigateTo("/");
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
        <div className="w-full max-w-lg relative px-9 border border-gold/30 bg-dark shadow-x2/30 rounded ">
          <Corners />
          <div className="relative rounded-lg z-10">
            <div className="flex flex-col space-y-1.5 p-6   rounded-t-lg pt-13 text-center">
              <h1 className="text-2xl text-white font-light tracking-wider">
                REGISTRATI
              </h1>
              <p className="text-gray-400 ">
                Crea il tuo account e comincia l'avventura!
              </p>
            </div>
            <div className="pb-4 p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-white font-light uppercase text-sm">
                        nome
                      </label>
                      <div className="relative">
                        <InputWithIcon
                          icon={<UserIcon />}
                          value={form.name}
                          onChange={(value) =>
                            setForm({ ...form, name: value })
                          }
                          placeholder="Yuki"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-light uppercase text-sm">
                        cognome
                      </label>
                      <div className="relative">
                        <InputWithIcon
                          icon={<UserIcon />}
                          value={form.surname}
                          onChange={(value) =>
                            setForm({ ...form, surname: value })
                          }
                          placeholder="Doo"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-white font-light uppercase text-sm">
                      username
                    </label>
                    <div className="relative">
                      <InputWithIcon
                        icon={<UserIcon />}
                        value={form.username}
                        onChange={(value) =>
                          setForm({ ...form, username: value })
                        }
                        placeholder="warlock"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-white font-light uppercase text-sm">
                      EMAIL
                    </label>
                    <div className="relative">
                      <InputWithIcon
                      
                        icon={<Mailbox />}
                        value={form.email}
                        onChange={(value) => setForm({ ...form, email: value })}
                        placeholder="warlock"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-white font-light uppercase text-sm">
                      PASSWORD
                    </label>
                    <div className="relative">
                      <InputWithIcon
                        type={showPassword ? "text" : "password"}
                        icon={<Lock />}
                        value={form.password}
                        onChange={(value) =>
                          setForm({ ...form, password: value })
                        }
                        placeholder="warlock"
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
                  <div className="space-y-2 mb-7">
                    <label className="text-white font-light uppercase text-sm">
                      CONFIRM PASSWORD
                    </label>
                    <div className="relative">
                      <InputWithIcon
                        type={showPassword2 ? "text" : "password"}
                        icon={<Lock />}
                        value={form.confirmPassword}
                        onChange={(value) =>
                          setForm({ ...form, confirmPassword: value })
                        }
                        placeholder="warlock"
                      />
                      <button
                        onClick={() => setShowPassword2(!showPassword2)}
                        type="button"
                        className="absolute right-3 top-3 text-gray-500 hover:text-white transition-colors"
                      >
                        {showPassword2 ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeSlash className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2"></div>

                  <div className="flex align-middle space-x-2 z-50">
                    <CustomCheckbox
                      id="terms"
                      value={accept}
                      onChange={(e) => setAccept(e.target.checked)}
                      label={
                        <span className="text-sm text-gray-400 uppercase">
                          Accetto i{" "}
                          <Link
                            to="/TerminiServizio"
                            className="text-white hover:text-gray-400 transition-colors"
                          >
                            Termini di Servizio
                          </Link>{" "}
                          e la{" "}
                          <Link
                            to="/PrivacyPolicy"
                            className="text-white hover:text-gray-400 transition-colors"
                          >
                            Privacy Policy
                          </Link>
                        </span>
                      }
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button
                      className=" px-12 py-6 mx-auto hover:scale-[1.03] group-hover:text-[1.05em] transition-all duration-300 ease-out cursor-pointer border border-gold/30 rounded-full text-md"
                      type="submit"
                    >
                      REGISTRATI
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div className="items-center pb-9 flex flex-col space-y-4 rounded-b-lg z-50">
              <div className="text-center text-sm text-gray-400 border-t-1 py-3">
                Hai già un account?
                <Link
                  to="/Account/Login"
                  className="text-white hover:text-gray-400 transition-colors ml-1 z-100 uppercase"
                >
                  accedi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
